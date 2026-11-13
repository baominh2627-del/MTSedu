import { ref, push, set, remove, onValue } from 'firebase/database';
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app, database } from './firebase.js';

// Video do admin đăng được lưu ở Firebase: videos/{id}
export function subscribeVideos(onData) {
  if (!database) { onData([]); return () => {}; }
  return onValue(
    ref(database, 'videos'),
    (snap) => {
      const val = snap.val() || {};
      const list = Object.entries(val).map(([id, v]) => ({ ...v, id }));
      list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      onData(list);
    },
    () => onData([]),
  );
}

function uploadFile(file, path, onProgress) {
  if (!app) return Promise.reject(new Error('Firebase chưa sẵn sàng.'));
  const task = uploadBytesResumable(sRef(getStorage(app), path), file);
  return new Promise((resolve, reject) => {
    task.on(
      'state_changed',
      (s) => onProgress && onProgress(Math.round((s.bytesTransferred / s.totalBytes) * 100)),
      (err) => reject(new Error(`Tải lên thất bại (${err.code}). Kiểm tra Firebase Storage đã bật và rules cho phép ghi.`)),
      async () => resolve(await getDownloadURL(task.snapshot.ref)),
    );
  });
}

export function parseYoutubeId(input) {
  const s = (input || '').trim();
  if (/^[\w-]{11}$/.test(s)) return s;
  const m = s.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);
  return m ? m[1] : '';
}

export function parseDriveId(input) {
  const s = (input || '').trim();
  const m = s.match(/\/d\/([\w-]+)/) || s.match(/[?&]id=([\w-]+)/);
  if (m) return m[1];
  return /^[\w-]{20,}$/.test(s) ? s : '';
}

export async function addVideo({ title, tags, source, link, teacher, duration, coverFile, videoFile }, onProgress) {
  if (!database) throw new Error('Firebase chưa sẵn sàng.');
  if (!title.trim()) throw new Error('Vui lòng nhập tên video.');
  if (!tags.length) throw new Error('Chọn ít nhất một nhãn phân loại.');
  if (!coverFile) throw new Error('Video bắt buộc phải có ảnh bìa.');

  const node = push(ref(database, 'videos'));
  const id = node.key;
  const data = { title: title.trim(), tags, source, teacher: teacher.trim(), duration: duration.trim(), createdAt: Date.now() };

  if (source === 'youtube') {
    data.youtubeId = parseYoutubeId(link);
    if (!data.youtubeId) throw new Error('Link YouTube không hợp lệ.');
  } else if (source === 'drive') {
    data.driveId = parseDriveId(link);
    if (!data.driveId) throw new Error('Link Google Drive không hợp lệ.');
  } else {
    if (!videoFile) throw new Error('Chọn file video để tải lên.');
  }

  const safe = (n) => n.replace(/[^\w.-]+/g, '_');
  data.cover = await uploadFile(coverFile, `video-covers/${id}_${safe(coverFile.name)}`);
  if (source === 'local') {
    data.file = await uploadFile(videoFile, `videos/${id}_${safe(videoFile.name)}`, onProgress);
  }
  await set(node, data);
  return id;
}

export async function deleteVideo(id) {
  await remove(ref(database, `videos/${id}`));
}
