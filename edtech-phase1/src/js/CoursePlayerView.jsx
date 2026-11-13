import React, { useState, useEffect, useMemo, useRef } from 'react';
import { startVideoTracking, getUid } from './activityService.js';
import {
  REACTION_TYPES,
  getReactionInfo,
  handleYoutubeThumbFallback,
  subscribeVideoReactions,
  toggleVideoReaction,
} from './videoService.js';
import VideoComments from './VideoComments.jsx';
import { useExamOverlay } from './ExamFullscreenOverlay.jsx';

const SOURCE_LABEL = { youtube: 'YouTube', drive: 'Google Drive', local: 'Tải lên' };

function formatMMSS(sec) {
  const s = Math.max(0, Math.floor(sec));
  const m = String(Math.floor(s / 60)).padStart(2, '0');
  const rem = String(s % 60).padStart(2, '0');
  return `${m}:${rem}`;
}

function LecturePlayerFrame({ part, lesson, trackerRef, onPlayStateChange }) {
  if (part.source === 'youtube' && part.youtubeId) {
    return (
      <iframe
        key={`yt-${part.youtubeId}`}
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${part.youtubeId}?rel=0`}
        title={lesson.title}
        referrerPolicy="strict-origin-when-cross-origin"
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
      />
    );
  }
  if (part.source === 'drive' && part.driveId) {
    return (
      <iframe
        key={`gd-${part.driveId}`}
        className="w-full h-full"
        src={`https://drive.google.com/file/d/${part.driveId}/preview`}
        title={lesson.title}
        allow="autoplay; fullscreen"
        allowFullScreen
      />
    );
  }
  if (part.file) {
    return (
      <video
        key={`loc-${part.file}`}
        className="w-full h-full bg-black"
        src={part.file}
        poster={lesson.cover}
        controls
        controlsList="nodownload"
        onPlay={() => { trackerRef.current?.setPlaying(true); onPlayStateChange(true); }}
        onPause={() => { trackerRef.current?.setPlaying(false); onPlayStateChange(false); }}
        onEnded={() => { trackerRef.current?.setPlaying(false); onPlayStateChange(false); }}
      />
    );
  }
  return (
    <div className="w-full h-full flex items-center justify-center text-white/70 text-sm p-6 text-center">
      Video đang được cập nhật nguồn phát.
    </div>
  );
}

export default function CoursePlayerView({
  course,
  onBack,
  user,
  isLoggedIn,
  onRequireLogin,
  progressMap = {},
  onToggleComplete,
}) {
  const uid = getUid(user);
  const { openExam } = useExamOverlay();
  const flatLessons = useMemo(() => {
    const out = [];
    for (const ch of course.chapters || []) {
      for (const lesson of ch.lessons || []) {
        out.push({ chapter: ch, lesson });
      }
    }
    return out;
  }, [course]);

  const initialLessonId = useMemo(() => {
    const firstUnfinished = flatLessons.find((x) => !progressMap[x.lesson.id]?.completed);
    return (firstUnfinished || flatLessons[0])?.lesson?.id || null;
  }, [course.id]); // eslint-disable-line

  const [activeLessonId, setActiveLessonId] = useState(initialLessonId);
  const [activePartIdx, setActivePartIdx] = useState(0);
  const [openChapters, setOpenChapters] = useState(() => {
    const init = {};
    for (const ch of course.chapters || []) init[ch.id] = true;
    return init;
  });
  const [syllabusSearch, setSyllabusSearch] = useState('');
  const [activeTab, setActiveTab] = useState('docs');
  const [showTimeline, setShowTimeline] = useState(false);
  const [sessionSec, setSessionSec] = useState(0);
  const [isTrackingActive, setIsTrackingActive] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [videoReactions, setVideoReactions] = useState({});
  const [reactionError, setReactionError] = useState('');

  const trackerRef = useRef(null);
  const activeEntryIdx = Math.max(0, flatLessons.findIndex((x) => x.lesson.id === activeLessonId));
  const activeEntry = flatLessons[activeEntryIdx] || flatLessons[0];
  const activeChapter = activeEntry?.chapter;
  const activeLesson = activeEntry?.lesson;
  const activePart = activeLesson?.parts?.[activePartIdx] || activeLesson?.parts?.[0] || {};

  // Load saved local note per (user, lesson)
  useEffect(() => {
    if (!activeLesson) return;
    const key = `mts_video_note_${uid || 'guest'}_${activeLesson.id}`;
    setNoteText(localStorage.getItem(key) || '');
  }, [activeLesson?.id, uid]);

  const saveNote = (val) => {
    setNoteText(val);
    if (!activeLesson) return;
    const key = `mts_video_note_${uid || 'guest'}_${activeLesson.id}`;
    localStorage.setItem(key, val);
  };

  useEffect(() => {
    setVideoReactions({});
    setReactionError('');
    if (!activeLesson?.id) return undefined;
    return subscribeVideoReactions(activeLesson.id, setVideoReactions);
  }, [activeLesson?.id]);

  // Track video watch time into Firebase
  useEffect(() => {
    if (!activeLesson || !user) return undefined;
    const autoPlayCount = activePart.source !== 'local';
    setIsTrackingActive(autoPlayCount);
    setSessionSec(0);
    const tracker = startVideoTracking(user, activeLesson, autoPlayCount);
    trackerRef.current = tracker;
    return () => {
      tracker.stop();
      trackerRef.current = null;
    };
  }, [activeLesson?.id, activePartIdx, uid]); // eslint-disable-line

  useEffect(() => {
    const timer = setInterval(() => {
      if (isTrackingActive && document.visibilityState === 'visible') {
        setSessionSec((s) => s + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isTrackingActive]);

  if (!activeLesson) {
    return (
      <div className="bg-white border border-black/10 rounded-xl p-8 sm:p-10 text-center space-y-4 max-w-2xl mx-auto">
        {course.tags?.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1.5">
            {course.tags.map((t) => (
              <span key={t} className="text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full text-xs font-semibold">{t}</span>
            ))}
          </div>
        )}
        <h2 className="text-xl sm:text-2xl font-bold text-black">{course.title}</h2>
        {course.teacher && <p className="text-xs text-gray-500">Giáo viên: {course.teacher}</p>}
        {course.description && (
          <p className="text-sm text-gray-600 whitespace-pre-line">{course.description}</p>
        )}
        <p className="text-sm text-gray-500 pt-2">Khóa học này chưa có bài giảng nào. Admin có thể đăng video vào khóa từ Trang cá nhân → Quản trị → Đăng video.</p>
        <button onClick={onBack} className="px-4 py-2 rounded-lg bg-black text-white text-sm font-semibold cursor-pointer">
          ← Quay lại thư mục Video
        </button>
      </div>
    );
  }

  const selectLesson = (lessonId, chapterId) => {
    setActiveLessonId(lessonId);
    setActivePartIdx(0);
    setShowTimeline(false);
    if (chapterId) setOpenChapters((p) => ({ ...p, [chapterId]: true }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stepLesson = (delta) => {
    const target = flatLessons[activeEntryIdx + delta];
    if (!target) return;
    selectLesson(target.lesson.id, target.chapter.id);
  };

  const doneCount = flatLessons.filter((x) => progressMap[x.lesson.id]?.completed).length;
  const progressPct = flatLessons.length ? Math.round((doneCount / flatLessons.length) * 100) : 0;
  const isCurrentDone = Boolean(progressMap[activeLesson.id]?.completed);

  const openQuizLink = (quiz) => {
    if (!isLoggedIn) { onRequireLogin(); return; }
    try {
      const url = new URL(quiz.url, window.location.origin);
      url.searchParams.set('mtsedu_user', user.username || '');
      url.searchParams.set('mtsedu_name', user.displayName || user.username || '');
      url.searchParams.set('mtsedu_id', user.id || (`user_${user.username}`));
      url.searchParams.set('mtsedu_return', `${window.location.origin}${window.location.pathname}#videos`);
      openExam(url.toString(), quiz.title || 'Bài kiểm tra');
    } catch {
      window.open(quiz.url, '_blank', 'noreferrer');
    }
  };

  return (
    <div className="space-y-5">
      {/* Header bar: Back + Breadcrumb + Lesson Title + Timeline Popover */}
      <div className="bg-white border border-black/10 rounded-xl p-4 sm:p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1.5 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-gray-500">
              <button onClick={onBack} className="font-semibold text-black hover:text-black/70 hover:underline transition-colors cursor-pointer">
                ← Thư mục Video
              </button>
              <span>/</span>
              <span className="font-semibold text-gray-800 truncate max-w-[260px] sm:max-w-none">{course.title}</span>
              <span>/</span>
              <span className="truncate max-w-[240px] sm:max-w-none">{activeChapter?.title}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-black tracking-tight">{activeLesson.title}</h1>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 relative">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-green-50 text-green-700 border border-green-200">
              <span className={`w-2 h-2 rounded-full ${isTrackingActive ? 'bg-green-600 animate-pulse' : 'bg-gray-400'}`} />
              {isTrackingActive ? 'Đang ghi nhận:' : 'Tạm dừng:'} <strong>{formatMMSS(sessionSec)}</strong>
            </span>

            <button
              type="button"
              onClick={() => setShowTimeline((v) => !v)}
              className="px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold border border-black/15 bg-white hover:bg-gray-50 transition cursor-pointer"
            >
              Mục lục nhanh ▾
            </button>

            {showTimeline && (
              <div className="absolute right-0 top-full mt-2 w-80 max-h-96 overflow-y-auto z-30 bg-white border border-black/10 rounded-xl shadow-xl p-4">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-black/8">
                  <span className="text-xs font-bold uppercase tracking-wide text-gray-500">Lộ trình bài giảng</span>
                  <button onClick={() => setShowTimeline(false)} className="text-xs text-gray-500 hover:text-black cursor-pointer">Đóng</button>
                </div>
                <div className="space-y-3 border-l-2 border-black/15 pl-3 ml-1.5">
                  {flatLessons.map(({ chapter, lesson }) => {
                    const active = lesson.id === activeLesson.id;
                    const done = Boolean(progressMap[lesson.id]?.completed);
                    return (
                      <div key={lesson.id} onClick={() => selectLesson(lesson.id, chapter.id)} className="relative cursor-pointer group">
                        <span className={`absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full border-2 border-white ${
                          active ? 'bg-black' : done ? 'bg-green-600' : 'bg-gray-300'
                        }`} />
                        <p className={`text-xs leading-snug ${active ? 'font-bold text-black' : 'text-gray-700 group-hover:text-black'}`}>
                          {lesson.title}
                        </p>
                        {(lesson.duration || chapter.title) && (
                          <p className="text-xs text-gray-400 truncate">{lesson.duration || chapter.title}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2-Column Main Split: Left 8/12 (Player + Tabs) | Right 4/12 (Course Outline) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-8 space-y-5">
          <div className="bg-white border border-black/10 rounded-xl overflow-hidden shadow-sm">
            <div className="aspect-video w-full bg-black">
              <LecturePlayerFrame
                part={activePart}
                lesson={activeLesson}
                trackerRef={trackerRef}
                onPlayStateChange={setIsTrackingActive}
              />
            </div>

            <div className="p-4 space-y-3 border-t border-black/8">
              {activeLesson.parts.length > 1 && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-gray-500 mr-1">Các phần video:</span>
                  {activeLesson.parts.map((part, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActivePartIdx(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                        idx === activePartIdx
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-gray-700 border-black/15 hover:border-black'
                      }`}
                    >
                      {part.name}{part.duration ? ` (${part.duration})` : ''}
                    </button>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  disabled={activeEntryIdx <= 0}
                  onClick={() => stepLesson(-1)}
                  className="px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold border border-black/15 bg-white hover:bg-gray-50 disabled:opacity-40 cursor-pointer"
                >
                  ← Bài trước
                </button>

                <button
                  type="button"
                  onClick={() => onToggleComplete(activeLesson.id, !isCurrentDone)}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold border transition cursor-pointer ${
                    isCurrentDone
                      ? 'bg-green-50 text-green-700 border-green-300'
                      : 'bg-white text-gray-700 border-black/15 hover:border-black hover:text-black'
                  }`}
                >
                  {isCurrentDone ? '✓ Đã hoàn thành bài này' : '○ Đánh dấu đã học xong'}
                </button>

                <button
                  type="button"
                  disabled={activeEntryIdx >= flatLessons.length - 1}
                  onClick={() => stepLesson(1)}
                  className="px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-black hover:bg-black/80 text-white disabled:opacity-40 cursor-pointer"
                >
                  Bài tiếp theo →
                </button>
              </div>

              <div className="pt-3 border-t border-black/8 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-gray-500 mr-1">Cảm xúc bài giảng:</span>
                {REACTION_TYPES.map((r) => {
                  const { count, active } = getReactionInfo(videoReactions, r.key, uid);
                  return (
                    <button
                      key={r.key}
                      type="button"
                      title={r.label}
                      onClick={() => {
                        if (!isLoggedIn) { onRequireLogin(); return; }
                        setReactionError('');
                        toggleVideoReaction(activeLesson.id, r.key, user, active).catch((err) => {
                          setReactionError(err.message || 'Không thả được cảm xúc (kiểm tra Firebase Rules videoReactions).');
                        });
                      }}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition cursor-pointer ${
                        active
                          ? 'bg-black text-white border-black'
                          : 'bg-black/[0.04] text-gray-700 border-black/10 hover:bg-black/10'
                      }`}
                    >
                      <span>{r.emoji}</span>
                      {count > 0 && <span>{count}</span>}
                    </button>
                  );
                })}
                {reactionError && <span className="text-xs text-red-600">{reactionError}</span>}
              </div>
            </div>
          </div>

          {/* Study Tabs */}
          <div className="bg-white border border-black/10 rounded-xl shadow-sm overflow-hidden">
            <div className="flex border-b border-black/8 overflow-x-auto">
              {[
                ['docs', `Tài liệu & BTVN${activeLesson.docs.length ? ` (${activeLesson.docs.length})` : ''}`],
                ['quiz', 'Làm bài kiểm tra'],
                ['notes', 'Mô tả & Ghi chú'],
              ].map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveTab(id)}
                  className={`px-4 sm:px-5 py-3.5 text-sm font-semibold border-b-2 transition whitespace-nowrap cursor-pointer ${
                    activeTab === id
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-black'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="p-5">
              {activeTab === 'docs' && (
                activeLesson.docs.length === 0 ? (
                  <p className="text-sm text-gray-500">Bài giảng này chưa có tài liệu đính kèm.</p>
                ) : (
                  <div className="space-y-2.5">
                    {activeLesson.docs.map((doc, i) => (
                      <div key={i} className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-black/10 bg-gray-50/60">
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-black/5 text-gray-800 border border-black/10 shrink-0">
                            {doc.type || 'PDF'}
                          </span>
                          <span className="text-sm font-medium text-gray-800 truncate">{doc.name}</span>
                        </div>
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-black hover:bg-black/80 text-white transition shrink-0"
                        >
                          Xem / Tải về
                        </a>
                      </div>
                    ))}
                  </div>
                )
              )}

              {activeTab === 'quiz' && (
                !activeLesson.quiz ? (
                  <p className="text-sm text-gray-500">Bài giảng này chưa gắn bài kiểm tra đi kèm.</p>
                ) : (
                  <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-black/10 bg-gray-50/60">
                    <div className="space-y-1">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Bài kiểm tra liên quan</p>
                      <h4 className="text-base font-bold text-black">{activeLesson.quiz.title}</h4>
                      {(activeLesson.quiz.questions || activeLesson.quiz.minutes) && (
                        <p className="text-sm text-gray-500">
                          {activeLesson.quiz.questions ? `${activeLesson.quiz.questions} câu hỏi` : ''}
                          {activeLesson.quiz.questions && activeLesson.quiz.minutes ? ' · ' : ''}
                          {activeLesson.quiz.minutes ? `${activeLesson.quiz.minutes} phút` : ''}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => openQuizLink(activeLesson.quiz)}
                      className="px-4 py-2.5 rounded-xl text-sm font-semibold bg-black hover:bg-black/80 text-white cursor-pointer"
                    >
                      Bắt đầu làm bài →
                    </button>
                  </div>
                )
              )}

              {activeTab === 'notes' && (
                <div className="space-y-4">
                  {course.description && (
                    <div className="p-3.5 rounded-xl bg-gray-50 border border-black/8 text-sm text-gray-700 whitespace-pre-line">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">Giới thiệu khóa học</p>
                      {course.description}
                    </div>
                  )}
                  {activeLesson.description && (
                    <div className="p-3.5 rounded-xl bg-gray-50 border border-black/8 text-sm text-gray-700 whitespace-pre-line">
                      {activeLesson.description}
                    </div>
                  )}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-800">
                      Ghi chú cá nhân cho bài này
                    </label>
                    <textarea
                      rows="4"
                      value={noteText}
                      onChange={(e) => saveNote(e.target.value)}
                      placeholder="Ghi lại công thức hoặc đoạn cần xem lại..."
                      className="w-full rounded-xl border border-black/15 bg-white p-3 text-sm text-black outline-none focus:border-black/40"
                    />
                    <p className="text-xs text-gray-400">Ghi chú được lưu tự động trên trình duyệt theo tài khoản của bạn.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Public per-video discussion comments */}
          <VideoComments
            videoId={activeLesson.id}
            videoTitle={activeLesson.title}
            user={user}
            isLoggedIn={isLoggedIn}
            onRequireLogin={onRequireLogin}
          />
        </div>

        {/* RIGHT COLUMN: COURSE SYLLABUS / CHAPTER ACCORDION */}
        <aside className="lg:col-span-4 bg-white border border-black/10 rounded-xl shadow-sm overflow-hidden lg:sticky lg:top-[84px]">
          <div className="p-4 border-b border-black/8 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-base sm:text-lg font-bold text-black">Đề cương khóa học</h3>
              <span className="text-xs font-semibold text-gray-700 bg-black/5 px-2.5 py-1 rounded-full">
                {doneCount}/{flatLessons.length} bài ({progressPct}%)
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
              <div className="h-full bg-green-600 transition-all duration-300" style={{ width: `${progressPct}%` }} />
            </div>
            <input
              type="text"
              value={syllabusSearch}
              onChange={(e) => setSyllabusSearch(e.target.value)}
              placeholder="Tìm nhanh tên bài trong khóa..."
              className="w-full px-3 py-2 rounded-lg text-xs sm:text-sm bg-gray-50 border border-black/10 text-black placeholder-gray-400 outline-none focus:border-black/40"
            />
          </div>

          <div className="max-h-[620px] overflow-y-auto divide-y divide-black/8">
            {course.chapters.map((chapter) => {
              const q = syllabusSearch.trim().toLowerCase();
              const visibleLessons = q
                ? chapter.lessons.filter((l) => l.title.toLowerCase().includes(q))
                : chapter.lessons;
              if (q && visibleLessons.length === 0) return null;

              const isOpen = q ? true : Boolean(openChapters[chapter.id]);
              const chDone = chapter.lessons.filter((l) => progressMap[l.id]?.completed).length;

              return (
                <div key={chapter.id}>
                  <button
                    type="button"
                    onClick={() => setOpenChapters((p) => ({ ...p, [chapter.id]: !p[chapter.id] }))}
                    className="w-full px-4 py-3.5 flex items-start justify-between gap-2 text-left bg-gray-50/80 hover:bg-gray-100/80 transition cursor-pointer"
                  >
                    <div>
                      <p className="text-sm font-bold text-black">{chapter.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{chDone}/{chapter.lessons.length} bài hoàn thành</p>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">{isOpen ? '▲' : '▼'}</span>
                  </button>

                  {isOpen && (
                    <div className="divide-y divide-black/5">
                      {visibleLessons.map((lesson) => {
                        const isActive = lesson.id === activeLesson.id;
                        const isDone = Boolean(progressMap[lesson.id]?.completed);
                        return (
                          <button
                            key={lesson.id}
                            type="button"
                            onClick={() => selectLesson(lesson.id, chapter.id)}
                            className={`w-full px-4 py-3 text-left flex items-start gap-3 transition cursor-pointer border-l-4 ${
                              isActive
                                ? 'border-black bg-black/[0.04]'
                                : 'border-transparent hover:bg-gray-50'
                            }`}
                          >
                            <span
                              className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 border ${
                                isDone
                                  ? 'bg-green-600 border-green-600 text-white'
                                  : isActive
                                    ? 'border-black bg-black text-white font-bold'
                                    : 'border-gray-300 text-gray-400'
                              }`}
                            >
                              {isDone ? '✓' : '▶'}
                            </span>

                            {lesson.cover && (
                              <img
                                src={lesson.cover}
                                alt={lesson.title}
                                loading="lazy"
                                onError={(e) => handleYoutubeThumbFallback(e.currentTarget)}
                                onLoad={(e) => e.currentTarget.naturalWidth <= 120 && handleYoutubeThumbFallback(e.currentTarget)}
                                className="w-16 aspect-video rounded object-cover border border-black/10 bg-gray-100 shrink-0"
                              />
                            )}

                            <div className="flex-1 min-w-0 space-y-1">
                              <p className={`text-sm leading-snug ${isActive ? 'font-bold text-black' : 'font-medium text-gray-800'}`}>
                                {lesson.title}
                              </p>
                              <div className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
                                {lesson.duration && <span>{lesson.duration} ·</span>}
                                <span>{SOURCE_LABEL[lesson.source] || lesson.source}</span>
                                {lesson.parts.length > 1 && (
                                  <span className="px-1.5 py-0.5 rounded bg-black/5 text-gray-700 font-medium">{lesson.parts.length} phần</span>
                                )}
                                {lesson.docs.length > 0 && (
                                  <span className="px-1.5 py-0.5 rounded bg-black/5 text-gray-700 font-medium">Tài liệu</span>
                                )}
                                {lesson.quiz && (
                                  <span className="px-1.5 py-0.5 rounded bg-black/5 text-gray-700 font-medium">Bài thi</span>
                                )}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
}
