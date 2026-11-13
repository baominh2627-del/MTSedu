import { ref, push, set, update, remove, onValue } from 'firebase/database';
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

// Tiến độ đánh dấu đã học của học sinh: videoProgress/{uid}/{videoId}
export function subscribeVideoProgress(uid, onData) {
  if (!database || !uid) { onData({}); return () => {}; }
  return onValue(
    ref(database, `videoProgress/${uid}`),
    (snap) => onData(snap.val() || {}),
    () => onData({}),
  );
}

export async function setLessonCompleted(uid, videoId, completed) {
  if (!database || !uid || !videoId) return;
  await set(ref(database, `videoProgress/${uid}/${videoId}`), {
    completed: Boolean(completed),
    updatedAt: Date.now(),
  });
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

const safeName = (n) => n.replace(/[^\w.-]+/g, '_');

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

async function resolveVideoPart({ name, source, link, videoFile, existingFile, duration }, storagePathPrefix, onProgress) {
  const part = { name: (name || 'Video bài giảng').trim(), source, duration: (duration || '').trim() };
  if (source === 'youtube') {
    part.youtubeId = parseYoutubeId(link);
    if (!part.youtubeId) throw new Error(`Link YouTube không hợp lệ (${part.name}).`);
  } else if (source === 'drive') {
    part.driveId = parseDriveId(link);
    if (!part.driveId) throw new Error(`Link Google Drive không hợp lệ (${part.name}).`);
  } else if (videoFile) {
    part.file = await uploadFile(videoFile, `${storagePathPrefix}_${safeName(videoFile.name)}`, onProgress);
  } else if (existingFile) {
    part.file = existingFile;
  } else {
    throw new Error(`Chọn file video để tải lên (${part.name}).`);
  }
  return part;
}

async function buildVideoPayload(form, id, existing, onProgress) {
  if (!form.title?.trim()) throw new Error('Vui lòng nhập tên video.');
  if (!form.tags?.length) throw new Error('Chọn ít nhất một nhãn phân loại.');
  if (!form.coverFile && !existing?.cover) throw new Error('Video bắt buộc phải có ảnh bìa.');

  const primaryPart = await resolveVideoPart(
    {
      name: form.part1Name || 'Phần 1: Video bài giảng',
      source: form.source,
      link: form.link,
      videoFile: form.videoFile,
      existingFile: existing?.source === 'local' ? existing?.file : '',
      duration: form.duration,
    },
    `videos/${id}`,
    onProgress,
  );

  const parts = [primaryPart];
  const hasPart2 = Boolean(form.hasPart2 && (form.part2Link?.trim() || form.part2File || form.part2ExistingFile));
  if (hasPart2) {
    const part2 = await resolveVideoPart(
      {
        name: form.part2Name || 'Phần 2: Bài tập & Ví dụ',
        source: form.part2Source || 'youtube',
        link: form.part2Link,
        videoFile: form.part2File,
        existingFile: form.part2ExistingFile,
        duration: form.part2Duration,
      },
      `videos/${id}_p2`,
      onProgress,
    );
    parts.push(part2);
  }

  let cover = existing?.cover || '';
  if (form.coverFile) {
    cover = await uploadFile(form.coverFile, `video-covers/${id}_${safeName(form.coverFile.name)}`);
  }

  let docUrl = (form.docUrl || '').trim();
  let docName = (form.docName || '').trim();
  if (form.docFile) {
    docUrl = await uploadFile(form.docFile, `video-docs/${id}_${safeName(form.docFile.name)}`);
    if (!docName) docName = form.docFile.name;
  }

  const orderNum = Number(form.order);
  const data = {
    title: form.title.trim(),
    course: (form.course || '').trim(),
    chapter: (form.chapter || '').trim(),
    order: Number.isFinite(orderNum) && orderNum > 0 ? orderNum : 0,
    tags: form.tags,
    source: primaryPart.source,
    youtubeId: primaryPart.youtubeId || '',
    driveId: primaryPart.driveId || '',
    file: primaryPart.file || '',
    cover,
    teacher: (form.teacher || '').trim(),
    duration: (form.duration || '').trim(),
    description: (form.description || '').trim(),
    docName: docUrl ? (docName || 'Tài liệu bài giảng') : '',
    docUrl,
    quizTitle: (form.quizUrl || '').trim() ? ((form.quizTitle || '').trim() || 'Làm bài kiểm tra liên quan') : '',
    quizUrl: (form.quizUrl || '').trim(),
    quizQuestions: Number(form.quizQuestions) || null,
    quizMinutes: Number(form.quizMinutes) || null,
    parts: parts.length > 1 || form.part1Name?.trim() ? parts : null,
    createdAt: existing?.createdAt || Date.now(),
  };

  return data;
}

export async function addVideo(form, onProgress) {
  if (!database) throw new Error('Firebase chưa sẵn sàng.');
  const node = push(ref(database, 'videos'));
  const data = await buildVideoPayload(form, node.key, null, onProgress);
  await set(node, data);
  return node.key;
}

export async function updateVideo(id, form, existing, onProgress) {
  if (!database) throw new Error('Firebase chưa sẵn sàng.');
  const data = await buildVideoPayload(form, id, existing, onProgress);
  await update(ref(database, `videos/${id}`), data);
  return id;
}

export async function deleteVideo(id) {
  await remove(ref(database, `videos/${id}`));
}
