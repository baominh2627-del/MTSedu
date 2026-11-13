// Theo dõi thời gian truy cập web và thời gian xem video của từng học sinh.
// Dữ liệu ghi vào Firebase:
//   activity/{userId}: { name, username, role, siteSeconds, videoSeconds, lastSeen,
//                        days/{YYYY-MM-DD}: { site, video } }
//   videoWatch/{userId}/{videoId}: { title, seconds, lastWatched }
import { ref, update, increment } from 'firebase/database';
import { database } from './firebase.js';

const FLUSH_EVERY_SEC = 15;

const todayKey = () => {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};

export const getUid = (user) => (user ? user.id || user.uid || `user_${user.username}` : null);

// Bộ đếm: cộng dồn giây khi isActive() = true và tab đang hiển thị, gửi lên Firebase theo lô.
function createCounter({ isActive, flush }) {
  let pending = 0;
  let last = Date.now();
  const tick = () => {
    const now = Date.now();
    const dt = (now - last) / 1000;
    last = now;
    // dt lớn (máy ngủ, tab bị đóng băng) thì bỏ qua để không tính sai
    if (dt > 0 && dt < 5 && document.visibilityState === 'visible' && isActive()) pending += dt;
    if (pending >= FLUSH_EVERY_SEC) send();
  };
  const send = () => {
    const sec = Math.round(pending);
    if (sec <= 0) return;
    pending = 0;
    flush(sec);
  };
  const timer = setInterval(tick, 1000);
  const onHide = () => { tick(); send(); };
  document.addEventListener('visibilitychange', onHide);
  window.addEventListener('pagehide', onHide);
  return () => {
    clearInterval(timer);
    document.removeEventListener('visibilitychange', onHide);
    window.removeEventListener('pagehide', onHide);
    tick();
    send();
  };
}

function writeUpdates(updates) {
  if (!database) return;
  update(ref(database), updates).catch((e) => console.warn('Activity tracking failed:', e.message));
}

function baseProfile(user, uid) {
  return {
    [`activity/${uid}/name`]: user.displayName || user.username || uid,
    [`activity/${uid}/username`]: user.username || '',
    [`activity/${uid}/role`]: user.role || 'student',
    [`activity/${uid}/lastSeen`]: Date.now(),
  };
}

// Thời gian ở trên web (tab đang mở và hiển thị).
export function startSiteTracking(user) {
  const uid = getUid(user);
  if (!uid || !database) return () => {};
  return createCounter({
    isActive: () => true,
    flush: (sec) => writeUpdates({
      ...baseProfile(user, uid),
      [`activity/${uid}/siteSeconds`]: increment(sec),
      [`activity/${uid}/days/${todayKey()}/site`]: increment(sec),
    }),
  });
}

// Thời gian xem một video. Trả về { setPlaying(bool), stop() }.
// - local: gọi setPlaying theo sự kiện play/pause của thẻ <video> (chính xác).
// - YouTube/Drive (iframe): không đọc được trạng thái phát nên tính theo thời gian mở video.
export function startVideoTracking(user, video, initiallyPlaying = true) {
  const uid = getUid(user);
  if (!uid || !database) return { setPlaying() {}, stop() {} };
  let playing = initiallyPlaying;
  const stop = createCounter({
    isActive: () => playing,
    flush: (sec) => writeUpdates({
      ...baseProfile(user, uid),
      [`activity/${uid}/videoSeconds`]: increment(sec),
      [`activity/${uid}/days/${todayKey()}/video`]: increment(sec),
      [`videoWatch/${uid}/${video.id}/title`]: video.title,
      [`videoWatch/${uid}/${video.id}/seconds`]: increment(sec),
      [`videoWatch/${uid}/${video.id}/lastWatched`]: Date.now(),
    }),
  });
  return { setPlaying: (v) => { playing = v; }, stop };
}

export function formatDuration(totalSeconds) {
  const s = Math.max(0, Math.round(Number(totalSeconds) || 0));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  if (h > 0) return `${h} giờ ${m} phút`;
  if (m > 0) return `${m} phút`;
  return `${s} giây`;
}
