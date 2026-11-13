// ===== Lưu, đồng bộ & xử lý ảnh đại diện của học sinh =====
// Ảnh đại diện được nén thành JPEG 256x256 (~15-30KB) và đồng bộ lên Firebase
// tại users/{uid}/avatar để mọi người đều nhìn thấy trong bình luận và trên mọi thiết bị.

import { useEffect, useState } from 'react';
import { onValue, ref, remove, set } from 'firebase/database';
import { database } from './firebase.js';

const KEY = (uid) => `mtsedu_avatar_${uid}`;
const MIGRATED_KEY = (uid) => `mtsedu_avatar_synced_${uid}`;
const AVATAR_EVENT = 'mts_avatar_changed';
const MAX_FILE_MB = 8;
const OUT_SIZE = 256;

const avatarCache = new Map();

function readLocal(uid) {
  if (!uid) return null;
  try {
    return localStorage.getItem(KEY(uid));
  } catch {
    return null;
  }
}

function writeLocal(uid, dataUrl) {
  if (!uid) return false;
  try {
    if (dataUrl) {
      localStorage.setItem(KEY(uid), dataUrl);
      avatarCache.set(uid, dataUrl);
    } else {
      localStorage.removeItem(KEY(uid));
      avatarCache.delete(uid);
    }
    window.dispatchEvent(new CustomEvent(AVATAR_EVENT, { detail: { uid, avatar: dataUrl || null } }));
    return true;
  } catch {
    return false;
  }
}

export function getAvatar(uid) {
  if (!uid) return null;
  return avatarCache.get(uid) ?? readLocal(uid);
}

export async function saveAvatar(uid, dataUrl) {
  if (!uid || !dataUrl) return false;
  const savedLocal = writeLocal(uid, dataUrl);
  try {
    localStorage.setItem(MIGRATED_KEY(uid), '1');
  } catch { /* bỏ qua */ }
  if (database) {
    await set(ref(database, `users/${uid}/avatar`), dataUrl);
    return true;
  }
  return savedLocal;
}

export async function removeAvatar(uid) {
  if (!uid) return;
  writeLocal(uid, null);
  try {
    localStorage.setItem(MIGRATED_KEY(uid), '1');
  } catch { /* bỏ qua */ }
  if (database) {
    await remove(ref(database, `users/${uid}/avatar`));
  }
}

/** Đồng bộ và theo dõi ảnh đại diện của 1 tài khoản (local + Firebase). */
export function useUserAvatar(uid) {
  const [avatar, setAvatar] = useState(() => getAvatar(uid));

  useEffect(() => {
    setAvatar(getAvatar(uid));
    if (!uid) return undefined;

    const onLocalChange = (e) => {
      if (e.detail?.uid === uid) setAvatar(e.detail.avatar || null);
    };
    window.addEventListener(AVATAR_EVENT, onLocalChange);

    let unsubDb = () => {};
    if (database) {
      unsubDb = onValue(ref(database, `users/${uid}/avatar`), (snap) => {
        const remote = snap.val();
        if (remote) {
          writeLocal(uid, remote);
          setAvatar(remote);
          try { localStorage.setItem(MIGRATED_KEY(uid), '1'); } catch { /* bỏ qua */ }
        } else {
          // Tự động đẩy ảnh cũ từ localStorage lên Firebase 1 lần nếu tài khoản từng đổi ảnh trước đó
          const localOnly = readLocal(uid);
          let alreadySynced = false;
          try { alreadySynced = Boolean(localStorage.getItem(MIGRATED_KEY(uid))); } catch { /* bỏ qua */ }
          if (localOnly && !alreadySynced) {
            try { localStorage.setItem(MIGRATED_KEY(uid), '1'); } catch { /* bỏ qua */ }
            set(ref(database, `users/${uid}/avatar`), localOnly).catch(() => {});
          } else {
            writeLocal(uid, null);
            setAvatar(null);
          }
        }
      });
    }

    return () => {
      window.removeEventListener(AVATAR_EVENT, onLocalChange);
      unsubDb();
    };
  }, [uid]);

  return avatar;
}

/** Theo dõi ảnh đại diện công khai cho danh sách nhiều người dùng (vd: người bình luận). */
export function useAvatarsMap(uids = []) {
  const uniqueUids = [...new Set((uids || []).filter(Boolean))].sort();
  const uidsKey = uniqueUids.join('|');

  const [map, setMap] = useState(() => {
    const init = {};
    for (const id of uniqueUids) {
      const cached = avatarCache.get(id);
      if (cached) init[id] = cached;
    }
    return init;
  });

  useEffect(() => {
    if (!database || uniqueUids.length === 0) return undefined;

    const unsubs = uniqueUids.map((id) =>
      onValue(ref(database, `users/${id}/avatar`), (snap) => {
        const val = snap.val() || null;
        if (val) avatarCache.set(id, val);
        else avatarCache.delete(id);
        setMap((prev) => (prev[id] === val ? prev : { ...prev, [id]: val }));
      }),
    );

    const onLocalChange = (e) => {
      const changedUid = e.detail?.uid;
      if (!changedUid || !uniqueUids.includes(changedUid)) return;
      const val = e.detail.avatar || null;
      setMap((prev) => (prev[changedUid] === val ? prev : { ...prev, [changedUid]: val }));
    };
    window.addEventListener(AVATAR_EVENT, onLocalChange);

    return () => {
      window.removeEventListener(AVATAR_EVENT, onLocalChange);
      unsubs.forEach((u) => u());
    };
  }, [uidsKey]); // eslint-disable-line react-hooks/exhaustive-deps

  return map;
}

// File ảnh -> dataURL JPEG vuông 256x256 (tự cắt giữa, tự xoay đúng chiều ảnh chụp điện thoại)
export async function processImage(file) {
  if (!file || !file.type.startsWith('image/')) throw new Error('Vui lòng chọn file ảnh (JPG, PNG, WebP).');
  if (file.size > MAX_FILE_MB * 1024 * 1024) throw new Error(`Ảnh quá lớn. Chọn ảnh dưới ${MAX_FILE_MB}MB.`);

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

  const w = bitmap.width, h = bitmap.height;
  const side = Math.min(w, h);
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = OUT_SIZE;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, OUT_SIZE, OUT_SIZE);
  ctx.drawImage(bitmap, (w - side) / 2, (h - side) / 2, side, side, 0, 0, OUT_SIZE, OUT_SIZE);
  return canvas.toDataURL('image/jpeg', 0.85);
}
