import { onValue, ref } from 'firebase/database';
import { database } from './firebase.js';
import { getUid, toDateKey } from './activityService.js';
import { subscribeCourses, subscribeVideos, subscribeVideoProgress } from './videoService.js';
import { groupVideosIntoCourses, videos as builtInVideos } from '../data/videosData.js';

function normalizeExamResult(id, raw, fallbackMaDe = '') {
  if (!raw || typeof raw !== 'object') return null;
  const timestamp = Number(raw.serverTimestamp) || (raw.thoiGianNop ? Date.parse(raw.thoiGianNop) || 0 : 0);
  const maDe = raw.maDe || raw.testId || fallbackMaDe || 'Bài kiểm tra';
  const tongDiem = raw.tongDiem ?? raw.score ?? null;
  if (tongDiem === null && !raw.thoiGianNop && !raw.maDe && !raw.testId) return null;

  return {
    id,
    maDe,
    tongDiem,
    diemPhan1: raw.diemPhan1,
    diemPhan2: raw.diemPhan2,
    diemPhan3: raw.diemPhan3,
    soLanThoat: Number(raw.soLanThoat) || 0,
    thoiGianNop: raw.thoiGianNop || (timestamp ? new Date(timestamp).toISOString() : ''),
    timestamp,
  };
}

function collectStudentExams(userResults, testResultsRoot, candidateIds) {
  const byId = new Map();

  for (const [id, raw] of Object.entries(userResults || {})) {
    const item = normalizeExamResult(id, raw);
    if (item) byId.set(id, item);
  }

  for (const [maDe, node] of Object.entries(testResultsRoot || {})) {
    if (!node || typeof node !== 'object') continue;
    for (const [id, raw] of Object.entries(node)) {
      if (!raw || typeof raw !== 'object' || !candidateIds.has(raw.userId)) continue;
      if (byId.has(id)) continue;
      const item = normalizeExamResult(id, raw, maDe);
      if (item) byId.set(id, item);
    }
  }

  return Array.from(byId.values()).sort((a, b) => b.timestamp - a.timestamp);
}

const isDayActive = (entry) => (Number(entry?.site) || 0) > 0 || (Number(entry?.video) || 0) > 0;

function computeStreak(daysObj) {
  const cursor = new Date();
  if (!isDayActive(daysObj[toDateKey(cursor)])) {
    cursor.setDate(cursor.getDate() - 1);
  }
  let streak = 0;
  for (let i = 0; i < 3650; i++) {
    if (!isDayActive(daysObj[toDateKey(cursor)])) break;
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function buildDailyRows(daysObj) {
  const today = toDateKey(new Date());
  const map = new Map();

  for (const [date, entry] of Object.entries(daysObj || {})) {
    const site = Number(entry?.site) || 0;
    const video = Number(entry?.video) || 0;
    if (date === today || site > 0 || video > 0) {
      map.set(date, { date, site, video, total: site + video });
    }
  }

  if (!map.has(today)) {
    map.set(today, { date: today, site: 0, video: 0, total: 0 });
  }

  return Array.from(map.values()).sort((a, b) => b.date.localeCompare(a.date));
}

function buildCourseProgress(videos, courses, videoProgress) {
  const seen = new Set();
  const merged = [];
  for (const v of [...(videos || []), ...builtInVideos]) {
    if (!v?.id || seen.has(v.id)) continue;
    seen.add(v.id);
    merged.push(v);
  }
  return groupVideosIntoCourses(merged, courses)
    .filter((course) => course.totalLessons > 0)
    .map((course) => {
      let doneCount = 0;
      for (const ch of course.chapters || []) {
        for (const lesson of ch.lessons || []) {
          if (videoProgress?.[lesson.id]?.completed) doneCount += 1;
        }
      }
      const totalLessons = course.totalLessons || 0;
      const pct = totalLessons ? Math.round((doneCount / totalLessons) * 100) : 0;
      return { id: course.id, title: course.title, doneCount, totalLessons, pct, latestAt: course.latestAt || 0 };
    })
    .sort((a, b) => (b.pct - a.pct) || (b.latestAt - a.latestAt));
}

function buildStatsSnapshot(state, candidateIds, loading) {
  const activity = state.activity || {};
  const daysObj = activity.days || {};
  const today = toDateKey(new Date());
  const examResults = collectStudentExams(state.userResults, state.testResults, candidateIds);
  const dailyRows = buildDailyRows(daysObj);
  const watchedVideos = Object.entries(state.videoWatch || {})
    .map(([vid, w]) => ({
      vid,
      title: w?.title || vid,
      seconds: Number(w?.seconds) || 0,
      lastWatched: Number(w?.lastWatched) || 0,
    }))
    .sort((a, b) => b.lastWatched - a.lastWatched);

  return {
    loading,
    siteTotal: Number(activity.siteSeconds) || 0,
    videoTotal: Number(activity.videoSeconds) || 0,
    todaySite: Number(daysObj[today]?.site) || 0,
    todayVideo: Number(daysObj[today]?.video) || 0,
    activeDaysCount: Object.values(daysObj).filter(isDayActive).length,
    streakDays: computeStreak(daysObj),
    dailyRows,
    examResults,
    distinctExamCount: new Set(examResults.map((r) => r.maDe)).size,
    coursesProgress: buildCourseProgress(state.videos, state.courses, state.videoProgress),
    watchedVideos,
    completedLessonsCount: Object.values(state.videoProgress || {}).filter((p) => p?.completed).length,
  };
}

/**
 * Subscribe realtime tới dữ liệu học tập của chính học sinh từ Firebase:
 * thời gian truy cập web/video (tổng & từng ngày), lịch sử bài thi và tiến độ video.
 */
export function subscribeStudentStats(user, onData, onError = () => {}) {
  const uid = getUid(user);
  const candidateIds = new Set(
    [uid, user?.id, user?.uid, user?.username ? `user_${user.username}` : null].filter(Boolean)
  );

  const state = {
    activity: null,
    userResults: null,
    testResults: null,
    videoWatch: null,
    videoProgress: null,
    videos: [],
    courses: [],
  };

  if (!uid || !database) {
    onData(buildStatsSnapshot(state, candidateIds, false));
    return () => {};
  }

  const pending = new Set(['activity', 'userResults', 'testResults', 'videoWatch', 'videoProgress', 'videos', 'courses']);
  const emit = () => onData(buildStatsSnapshot(state, candidateIds, pending.size > 0));
  const markReady = (key) => {
    pending.delete(key);
    emit();
  };

  const listen = (key, path, optional = false) =>
    onValue(
      ref(database, path),
      (snap) => {
        state[key] = snap.val() || {};
        markReady(key);
      },
      (err) => {
        if (!optional) onError(err?.message || 'Không tải được dữ liệu học tập.');
        else console.warn(`Student stats (${path}):`, err?.message);
        markReady(key);
      }
    );

  const unsubs = [
    listen('activity', `activity/${uid}`),
    listen('userResults', `users/${uid}/results`),
    listen('testResults', 'testResults', true),
    listen('videoWatch', `videoWatch/${uid}`, true),
    subscribeVideoProgress(uid, (val) => {
      state.videoProgress = val || {};
      markReady('videoProgress');
    }),
    subscribeVideos((list) => {
      state.videos = list || [];
      markReady('videos');
    }),
    subscribeCourses((list) => {
      state.courses = list || [];
      markReady('courses');
    }),
  ];

  emit();
  return () => unsubs.forEach((fn) => fn && fn());
}
