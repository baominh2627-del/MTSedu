import { get, onValue, ref, remove, set } from 'firebase/database';
import { database } from '../../firebase.js';

async function hashPassword(password) {
  const bytes = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function requireDatabase() {
  if (!database) throw new Error('Firebase chưa sẵn sàng. Kiểm tra cấu hình trong .env.');
  return database;
}

export async function createAdminUser({ username, password, displayName, role = 'student' }) {
  const db = requireDatabase();
  const cleanUsername = username.trim().toLowerCase();
  if (!cleanUsername || /\s/.test(cleanUsername)) throw new Error('Tên đăng nhập không được để trống hoặc chứa khoảng trắng.');
  if (!password || !displayName.trim()) throw new Error('Vui lòng nhập đủ mật khẩu và tên hiển thị.');
  const userId = `user_${cleanUsername}`;
  const existing = await get(ref(db, `users/${userId}`));
  if (existing.exists()) throw new Error(`Tên đăng nhập “${cleanUsername}” đã tồn tại.`);
  await set(ref(db, `users/${userId}`), {
    username: cleanUsername,
    displayName: displayName.trim(),
    password: await hashPassword(password),
    role,
    createdAt: new Date().toISOString().slice(0, 10),
    results: {},
  });
}

export async function createBulkAdminUsers(lines, onProgress = () => {}) {
  const entries = lines.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  let created = 0;
  const errors = [];
  for (const [index, line] of entries.entries()) {
    const [username, password, ...nameParts] = line.split(',').map((value) => value.trim());
    const displayName = nameParts.join(',');
    try {
      if (!username || !password || !displayName) throw new Error('Định dạng cần: username,mật khẩu,Tên hiển thị');
      await createAdminUser({ username, password, displayName, role: 'student' });
      created += 1;
    } catch (error) {
      errors.push(`Dòng ${index + 1}: ${error.message}`);
    }
    onProgress(index + 1, entries.length);
  }
  return { created, total: entries.length, errors };
}

export function subscribeAdminData(onData, onError) {
  try {
    const db = requireDatabase();
    return onValue(ref(db, '/'), (snapshot) => onData(snapshot.val() || {}), onError);
  } catch (error) {
    onError(error);
    return () => {};
  }
}

export async function deleteAdminUser(userId) {
  await remove(ref(requireDatabase(), `users/${userId}`));
}

export function collectAdminResults(rootData) {
  const ignored = new Set(['users', 'rules', 'metadata', 'testResults', 'examLogs']);
  const results = [];
  for (const [testId, testNode] of Object.entries(rootData || {})) {
    if (ignored.has(testId) || !testNode || typeof testNode !== 'object') continue;
    for (const [id, value] of Object.entries(testNode)) {
      if (!value || typeof value !== 'object' || (!value.hoTen && value.tongDiem === undefined)) continue;
      results.push({
        id,
        maDe: value.maDe || testId,
        hoTen: value.hoTen || 'Ẩn danh',
        lop: value.lop || '—',
        diemPhan1: value.diemPhan1 ?? 0,
        diemPhan2: value.diemPhan2 ?? 0,
        diemPhan3: value.diemPhan3 ?? 0,
        tongDiem: value.tongDiem ?? 0,
        soLanThoat: value.soLanThoat ?? 0,
        thoiGianNop: value.thoiGianNop || '',
        serverTimestamp: value.serverTimestamp || 0,
      });
    }
  }
  return results.sort((a, b) => (Number(b.serverTimestamp) || 0) - (Number(a.serverTimestamp) || 0));
}
