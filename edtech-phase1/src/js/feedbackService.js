import { push, ref, remove, set, update } from 'firebase/database';
import { getUid } from './activityService.js';
import { database } from './firebase.js';

export const FEEDBACK_TYPES = [
  'Lỗi đáp án/câu hỏi sai',
  'Lỗi giao diện/form/kỹ thuật',
  'Góp ý thêm tính năng',
  'Vấn đề khác',
];

export const FEEDBACK_STATUS = {
  UNREAD: 'unread',
  RESOLVED: 'resolved',
};

function requireFeedbackDb() {
  if (!database) {
    throw new Error('Chưa kết nối được máy chủ phản hồi. Vui lòng thử lại sau.');
  }
  return database;
}

/** Chuyển lỗi Firebase thành thông báo dễ hiểu cho người dùng và admin. */
export function formatFeedbackError(err, fallback) {
  const code = err?.code || '';
  const msg = err?.message || '';
  if (code === 'PERMISSION_DENIED' || /permission_denied/i.test(msg)) {
    return 'Chưa có quyền đọc/ghi mục feedbacks trên Firebase. Hãy cập nhật Firebase Rules theo file _Database/firebase-rules.json.';
  }
  return msg || fallback;
}

/** Gửi góp ý / báo lỗi mới lên Firebase tại nút feedbacks/{id}. */
export async function submitFeedback({ type, content, user, page }) {
  const db = requireFeedbackDb();
  const cleanContent = (content || '').trim();
  if (!cleanContent) {
    throw new Error('Vui lòng nhập mô tả chi tiết trước khi gửi.');
  }

  const uid = getUid(user);
  const node = push(ref(db, 'feedbacks'));
  await set(node, {
    type: (type || FEEDBACK_TYPES[0]).trim(),
    content: cleanContent.slice(0, 3000),
    page: page || '#home',
    uid: uid || null,
    username: user?.username || '',
    authorName: user?.displayName || user?.username || 'Khách',
    role: user?.role || 'guest',
    status: FEEDBACK_STATUS.UNREAD,
    createdAt: Date.now(),
  });
  return node.key;
}

/** Cập nhật trạng thái xử lý của một góp ý. */
export async function setFeedbackStatus(id, status) {
  const db = requireFeedbackDb();
  if (!id) return;
  const nextStatus = status === FEEDBACK_STATUS.RESOLVED ? FEEDBACK_STATUS.RESOLVED : FEEDBACK_STATUS.UNREAD;
  await update(ref(db, `feedbacks/${id}`), {
    status: nextStatus,
    updatedAt: Date.now(),
  });
}

/** Đánh dấu hàng loạt góp ý sang trạng thái đã xử lý. */
export async function markFeedbacksResolved(ids) {
  const db = requireFeedbackDb();
  const list = (ids || []).filter(Boolean);
  if (list.length === 0) return;

  const now = Date.now();
  const updates = {};
  for (const id of list) {
    updates[`feedbacks/${id}/status`] = FEEDBACK_STATUS.RESOLVED;
    updates[`feedbacks/${id}/updatedAt`] = now;
  }
  await update(ref(db), updates);
}

/** Xóa một góp ý khỏi Firebase. */
export async function deleteFeedback(id) {
  const db = requireFeedbackDb();
  if (!id) return;
  await remove(ref(db, `feedbacks/${id}`));
}

/** Chuẩn hóa node feedbacks từ rootData và sắp xếp mới nhất lên đầu. */
export function normalizeFeedbacks(feedbackMap) {
  if (!feedbackMap || typeof feedbackMap !== 'object') return [];
  const items = [];
  for (const [id, raw] of Object.entries(feedbackMap)) {
    if (!raw || typeof raw !== 'object') continue;
    items.push({
      id,
      type: raw.type || FEEDBACK_TYPES[3],
      content: raw.content || '',
      page: raw.page || '#home',
      uid: raw.uid || null,
      username: raw.username || '',
      authorName: raw.authorName || raw.username || 'Khách',
      role: raw.role || 'guest',
      status: raw.status === FEEDBACK_STATUS.RESOLVED ? FEEDBACK_STATUS.RESOLVED : FEEDBACK_STATUS.UNREAD,
      createdAt: Number(raw.createdAt) || 0,
      updatedAt: Number(raw.updatedAt) || 0,
    });
  }
  return items.sort((a, b) => b.createdAt - a.createdAt);
}
