import { ref, push, set, update, remove, onValue } from 'firebase/database';
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app, database } from './firebase.js';

// Khóa học do admin tạo được lưu ở Firebase: courses/{id}
export function subscribeCourses(onData, onError) {
  if (!database) { onData([]); return () => {}; }
  return onValue(
    ref(database, 'courses'),
    (snap) => {
      const val = snap.val() || {};
      const list = Object.entries(val).map(([id, c]) => ({ ...c, id }));
      list.sort((a, b) => (b.updatedAt || b.createdAt || 0) - (a.updatedAt || a.createdAt || 0));
      onData(list);
    },
    (err) => {
      onData([]);
      if (onError) onError(err);
    },
  );
}

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

export function getYoutubeThumbnail(youtubeId, quality = 'maxresdefault') {
  return youtubeId ? `https://i.ytimg.com/vi/${youtubeId}/${quality}.jpg` : '';
}

export function handleYoutubeThumbFallback(imgEl) {
  if (!imgEl?.src) return;
  const match = imgEl.src.match(/i\.ytimg\.com\/vi\/([\w-]{11})\/maxresdefault\.jpg/);
  if (match) imgEl.src = getYoutubeThumbnail(match[1], 'hqdefault');
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

  const manualCoverUrl = (form.coverUrl || '').trim();
  const autoYoutubeCover = primaryPart.source === 'youtube' ? getYoutubeThumbnail(primaryPart.youtubeId) : '';
  if (!form.coverFile && !manualCoverUrl && !existing?.cover && !autoYoutubeCover) {
    throw new Error('Video bắt buộc phải có ảnh bìa.');
  }

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

  let cover = manualCoverUrl || existing?.cover || autoYoutubeCover;
  if (form.coverFile) {
    cover = await compressCoverImage(form.coverFile);
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
    courseId: (form.courseId || '').trim(),
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

/** Nén ảnh bìa khóa học thành JPEG 16:9 gọn nhẹ (không phụ thuộc Firebase Storage). */
export async function compressCoverImage(file) {
  if (!file || !file.type?.startsWith('image/')) {
    throw new Error('Vui lòng chọn file ảnh hợp lệ (JPG, PNG, WebP).');
  }
  if (file.size > 8 * 1024 * 1024) {
    throw new Error('Ảnh quá lớn. Chọn ảnh dưới 8MB.');
  }

  let bitmap;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
  } catch {
    bitmap = await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Không đọc được ảnh này. Thử ảnh khác.'));
      img.src = URL.createObjectURL(file);
    });
  }

  const outW = 640;
  const outH = 360;
  const srcRatio = bitmap.width / bitmap.height;
  const targetRatio = outW / outH;
  let sx = 0; let sy = 0; let sw = bitmap.width; let sh = bitmap.height;
  if (srcRatio > targetRatio) {
    sw = bitmap.height * targetRatio;
    sx = (bitmap.width - sw) / 2;
  } else {
    sh = bitmap.width / targetRatio;
    sy = (bitmap.height - sh) / 2;
  }

  const canvas = document.createElement('canvas');
  canvas.width = outW;
  canvas.height = outH;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, outW, outH);
  ctx.drawImage(bitmap, sx, sy, sw, sh, 0, 0, outW, outH);
  return canvas.toDataURL('image/jpeg', 0.82);
}

function normalizeCourseChaptersInput(chaptersInput) {
  if (Array.isArray(chaptersInput)) {
    return chaptersInput.map((c) => String(c || '').trim()).filter(Boolean);
  }
  return String(chaptersInput || '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function wrapCourseDbError(err) {
  const msg = String(err?.message || '');
  if (/permission_denied/i.test(msg) || err?.code === 'PERMISSION_DENIED') {
    return new Error('Chưa có quyền ghi mục courses trên Firebase Realtime Database. Hãy cập nhật Rules từ _Database/firebase-rules.json.');
  }
  return err instanceof Error ? err : new Error(msg || 'Không lưu được khóa học.');
}

async function buildCoursePayload(form, existing = null) {
  const title = (form.title || '').trim();
  if (!title) throw new Error('Vui lòng nhập tên khóa học.');
  if (!form.tags?.length) throw new Error('Chọn ít nhất một nhãn phân loại (Môn học / Lớp / Kỳ thi).');

  let cover = '';
  if (form.coverFile) {
    cover = await compressCoverImage(form.coverFile);
  } else if ((form.coverUrl || '').trim()) {
    cover = form.coverUrl.trim();
  } else if (!form.removeCover && existing?.hasExplicitCover) {
    cover = existing.cover || '';
  }

  const now = Date.now();
  return {
    title,
    sourceTitle: (existing?.sourceTitle || (existing && !existing._fromDb ? existing.title : '') || '').trim(),
    cover,
    teacher: (form.teacher || '').trim() || 'Bảo Minh',
    description: (form.description || '').trim(),
    tags: [...form.tags],
    chapters: normalizeCourseChaptersInput(form.chapters),
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  };
}

export async function addCourse(form) {
  if (!database) throw new Error('Firebase chưa sẵn sàng.');
  try {
    const node = push(ref(database, 'courses'));
    const data = await buildCoursePayload(form, null);
    await set(node, data);
    return { id: node.key, ...data };
  } catch (err) {
    throw wrapCourseDbError(err);
  }
}

export async function updateCourse(courseId, form, existing, linkedFirebaseVideoIds = []) {
  if (!database) throw new Error('Firebase chưa sẵn sàng.');
  try {
    const data = await buildCoursePayload(form, existing);
    let targetId = existing?._fromDb ? (existing.dbId || courseId) : null;
    if (!targetId) {
      const node = push(ref(database, 'courses'));
      targetId = node.key;
      await set(node, data);
    } else {
      await update(ref(database, `courses/${targetId}`), data);
    }

    if (linkedFirebaseVideoIds.length > 0 && (data.title !== existing?.title || !existing?._fromDb)) {
      const patch = {};
      for (const vid of linkedFirebaseVideoIds) {
        patch[`videos/${vid}/course`] = data.title;
        patch[`videos/${vid}/courseId`] = targetId;
      }
      await update(ref(database), patch);
    }

    return { id: targetId, ...data };
  } catch (err) {
    throw wrapCourseDbError(err);
  }
}

export async function deleteCourse(course, deleteLinkedVideos = false) {
  if (!database) throw new Error('Firebase chưa sẵn sàng.');
  try {
    const patch = {};
    if (course?.dbId) patch[`courses/${course.dbId}`] = null;
    if (deleteLinkedVideos) {
      for (const vid of course?.firebaseVideoIds || []) {
        patch[`videos/${vid}`] = null;
      }
    }
    if (Object.keys(patch).length === 0) return;
    await update(ref(database), patch);
  } catch (err) {
    throw wrapCourseDbError(err);
  }
}

const sanitizeKey = (k) => String(k || '').replace(/[.#$[\]/]/g, '_');

// Bình luận công khai cho từng video: videoComments/{videoId}/{commentId}
export function subscribeVideoComments(videoId, onData, onError) {
  const key = sanitizeKey(videoId);
  if (!database || !key) { onData([]); return () => {}; }
  return onValue(
    ref(database, `videoComments/${key}`),
    (snap) => {
      const val = snap.val() || {};
      const list = Object.entries(val).map(([id, c]) => ({ ...c, id }));
      list.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
      onData(list);
    },
    (err) => {
      onData([]);
      if (onError) onError(err);
    },
  );
}

export async function addVideoComment(videoId, user, text, replyTo = null) {
  if (!database) throw new Error('Firebase chưa sẵn sàng.');
  const key = sanitizeKey(videoId);
  const body = (text || '').trim();
  if (!key || !body) throw new Error('Vui lòng nhập nội dung bình luận.');
  const uid = user ? (user.id || user.uid || `user_${user.username}`) : '';
  if (!uid) throw new Error('Vui lòng đăng nhập để bình luận.');

  const node = push(ref(database, `videoComments/${key}`));
  await set(node, {
    uid,
    username: user.username || '',
    authorName: user.displayName || user.username || 'Học sinh',
    role: user.role || 'student',
    text: body.slice(0, 1500),
    replyToId: replyTo?.id || null,
    replyToName: replyTo?.authorName || null,
    createdAt: Date.now(),
  });
  return node.key;
}

export async function deleteVideoComment(videoId, commentId) {
  if (!database) throw new Error('Firebase chưa sẵn sàng.');
  const key = sanitizeKey(videoId);
  if (!key || !commentId) return;
  await remove(ref(database, `videoComments/${key}/${commentId}`));
}

export const REACTION_TYPES = [
  { key: 'like', emoji: '👍', label: 'Thích' },
  { key: 'heart', emoji: '❤️', label: 'Yêu thích' },
  { key: 'fire', emoji: '🔥', label: 'Hay quá' },
  { key: 'haha', emoji: '😆', label: 'Vui' },
  { key: 'clap', emoji: '👏', label: 'Tuyệt vời' },
  { key: 'idea', emoji: '💡', label: 'Dễ hiểu' },
];

export function getReactionInfo(reactionsObj, reactionKey, uid) {
  const bucket = reactionsObj?.[reactionKey];
  if (!bucket || typeof bucket !== 'object') return { count: 0, active: false };
  const users = Object.keys(bucket).filter((k) => Boolean(bucket[k]));
  return { count: users.length, active: Boolean(uid && bucket[uid]) };
}

async function toggleReactionAtPath(basePath, reactionKey, user, currentlyActive) {
  if (!database) throw new Error('Firebase chưa sẵn sàng.');
  const uid = user ? (user.id || user.uid || `user_${user.username}`) : '';
  if (!uid) throw new Error('Vui lòng đăng nhập để thả cảm xúc.');
  const targetRef = ref(database, `${basePath}/${reactionKey}/${uid}`);
  if (currentlyActive) await remove(targetRef);
  else await set(targetRef, true);
}

export async function toggleCommentReaction(videoId, commentId, reactionKey, user, currentlyActive) {
  const key = sanitizeKey(videoId);
  if (!key || !commentId) return;
  await toggleReactionAtPath(`videoComments/${key}/${commentId}/reactions`, reactionKey, user, currentlyActive);
}

export function subscribeVideoReactions(videoId, onData, onError) {
  const key = sanitizeKey(videoId);
  if (!database || !key) { onData({}); return () => {}; }
  return onValue(
    ref(database, `videoReactions/${key}`),
    (snap) => onData(snap.val() || {}),
    (err) => {
      onData({});
      if (onError) onError(err);
    },
  );
}

export async function toggleVideoReaction(videoId, reactionKey, user, currentlyActive) {
  const key = sanitizeKey(videoId);
  if (!key) return;
  await toggleReactionAtPath(`videoReactions/${key}`, reactionKey, user, currentlyActive);
}
