// ===== Lưu & xử lý ảnh đại diện của học sinh =====
// Logo web là file cố định trong /public, KHÔNG đi qua file này.
// Chỉ ảnh đại diện của từng học sinh mới được upload/lưu ở đây.

const KEY = (uid) => `mtsedu_avatar_${uid}`;
const MAX_FILE_MB = 8;
const OUT_SIZE = 256; // ảnh vuông 256x256 -> nhẹ (~15-30KB)

export function getAvatar(uid) {
  try { return localStorage.getItem(KEY(uid)); } catch { return null; }
}

// Muốn đồng bộ nhiều thiết bị: thay thân 2 hàm này bằng ghi/đọc Firestore.
export function saveAvatar(uid, dataUrl) {
  try { localStorage.setItem(KEY(uid), dataUrl); return true; } catch { return false; }
}

export function removeAvatar(uid) {
  try { localStorage.removeItem(KEY(uid)); } catch { /* bỏ qua */ }
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
