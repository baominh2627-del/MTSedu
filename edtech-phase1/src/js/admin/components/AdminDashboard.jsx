import { useEffect, useMemo, useState } from 'react';
import { collectAdminResults, createAdminUser, createBulkAdminUsers, deleteAdminUser, subscribeAdminData } from '../services/adminService.js';

const TABS = [
  { id: 'single', label: '➕ Thêm tài khoản' },
  { id: 'bulk', label: '📋 Thêm hàng loạt' },
  { id: 'users', label: '👥 Danh sách users' },
  { id: 'results', label: '📊 Lịch sử bài làm' },
];
const firebaseLinks = [
  ['🔥 Xem Realtime Database MTS', 'https://console.firebase.google.com/project/mtsedu-85ea3/database/mtsedu-85ea3-default-rtdb/data'],
  ['📊 Xem testResults (bài làm)', 'https://console.firebase.google.com/project/mtsedu-85ea3/database/mtsedu-85ea3-default-rtdb/data/~2FtestResults'],
  ['👥 Xem users (tài khoản)', 'https://console.firebase.google.com/project/mtsedu-85ea3/database/mtsedu-85ea3-default-rtdb/data/~2Fusers'],
];

function ActionStatus({ status }) {
  if (!status) return null;
  const tone = status.type === 'error' ? 'border-red-200 bg-red-50 text-red-700' : 'border-emerald-200 bg-emerald-50 text-emerald-700';
  return <p role="status" className={`mt-4 rounded-xl border px-4 py-3 text-sm ${tone}`}>{status.message}</p>;
}

function Field({ label, ...props }) {
  return <label className="block text-sm font-medium text-slate-600">{label}<input {...props} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal text-slate-800 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100" /></label>;
}

export default function AdminDashboard() {
  const [tab, setTab] = useState('single');
  const [form, setForm] = useState({ username: '', password: '', displayName: '', role: 'student' });
  const [bulkText, setBulkText] = useState('');
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState(null);
  const [rootData, setRootData] = useState(null);
  const [loadError, setLoadError] = useState('');

  useEffect(() => subscribeAdminData(setRootData, (error) => setLoadError(error.message)), []);
  const users = useMemo(() => Object.entries(rootData?.users || {}).map(([id, user]) => ({ id, ...user })), [rootData]);
  const results = useMemo(() => collectAdminResults(rootData), [rootData]);
  const updateField = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  async function handleCreate(event) {
    event.preventDefault(); setBusy(true); setStatus(null);
    try {
      await createAdminUser(form);
      setStatus({ type: 'success', message: `Đã tạo tài khoản @${form.username.trim().toLowerCase()}.` });
      setForm({ username: '', password: '', displayName: '', role: 'student' });
    } catch (error) { setStatus({ type: 'error', message: error.message }); }
    finally { setBusy(false); }
  }

  async function handleBulk() {
    setBusy(true); setStatus(null);
    try {
      const result = await createBulkAdminUsers(bulkText);
      setStatus({ type: result.errors.length ? 'error' : 'success', message: `Đã thêm ${result.created}/${result.total} tài khoản.${result.errors.length ? ` ${result.errors.join(' · ')}` : ''}` });
      if (!result.errors.length) setBulkText('');
    } catch (error) { setStatus({ type: 'error', message: error.message }); }
    finally { setBusy(false); }
  }

  async function handleDelete(user) {
    if (!window.confirm(`Xóa tài khoản “${user.displayName || user.username || user.id}”? Thao tác này không thể hoàn tác.`)) return;
    try { await deleteAdminUser(user.id); setStatus({ type: 'success', message: 'Đã xóa tài khoản.' }); }
    catch (error) { setStatus({ type: 'error', message: error.message }); }
  }

  return <section className="flex flex-col gap-5" aria-labelledby="admin-dashboard-title">
    <div>
      <h2 id="admin-dashboard-title" className="text-2xl font-bold text-slate-800">🎓 Quản trị MTS Education</h2>
      <p className="mt-1 text-sm text-slate-500">Quản lý tài khoản và theo dõi bài làm từ Firebase.</p>
    </div>
    <div className="flex flex-wrap gap-2">
      {firebaseLinks.map(([label, href]) => <a key={href} href={href} target="_blank" rel="noreferrer" className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700">{label}</a>)}
    </div>
    <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Chức năng quản trị">
      {TABS.map((item) => <button key={item.id} type="button" role="tab" aria-selected={tab === item.id} onClick={() => { setTab(item.id); setStatus(null); }} className={`whitespace-nowrap rounded-xl border px-4 py-3 text-sm font-semibold transition ${tab === item.id ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-600 hover:bg-blue-50'}`}>{item.label}</button>)}
    </div>
    {status && <ActionStatus status={status} />}
    {loadError && <ActionStatus status={{ type: 'error', message: `Không đọc được dữ liệu Firebase: ${loadError}` }} />}

    {tab === 'single' && <form onSubmit={handleCreate} className="rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_6px_24px_rgba(47,128,237,0.08)] sm:p-6">
      <h3 className="mb-5 text-lg font-bold text-slate-800">➕ Thêm tài khoản mới</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Tên đăng nhập (username)" name="username" value={form.username} onChange={updateField} placeholder="vd: hocsinh01" autoComplete="off" required />
        <Field label="Mật khẩu" name="password" type="password" value={form.password} onChange={updateField} placeholder="Nhập mật khẩu" autoComplete="new-password" required />
        <Field label="Tên hiển thị" name="displayName" value={form.displayName} onChange={updateField} placeholder="vd: Nguyễn Văn A" required />
        <label className="block text-sm font-medium text-slate-600">Vai trò<select name="role" value={form.role} onChange={updateField} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal text-slate-800 outline-none focus:border-blue-400"><option value="student">Học sinh</option><option value="admin">Admin</option></select></label>
      </div>
      <button disabled={busy} className="mt-5 w-full rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-700 disabled:opacity-60">{busy ? 'Đang lưu…' : '➕ Thêm vào Firebase ngay'}</button>
    </form>}

    {tab === 'bulk' && <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_6px_24px_rgba(47,128,237,0.08)] sm:p-6">
      <h3 className="mb-2 text-lg font-bold text-slate-800">📋 Thêm tài khoản hàng loạt</h3>
      <p className="mb-4 text-sm text-slate-500">Mỗi dòng theo định dạng: username,mật khẩu,Tên hiển thị</p>
      <textarea rows="7" value={bulkText} onChange={(event) => setBulkText(event.target.value)} placeholder={'hocsinh01,matkhau123,Nguyễn Văn A\nhocsinh02,matkhau456,Trần Thị B'} className="w-full rounded-xl border border-slate-200 px-4 py-3 font-mono text-sm outline-none focus:border-blue-400" />
      <button type="button" disabled={busy || !bulkText.trim()} onClick={handleBulk} className="mt-4 w-full rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-700 disabled:opacity-60">{busy ? 'Đang xử lý…' : '📋 Thêm tất cả vào Firebase'}</button>
    </div>}

    {tab === 'users' && <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_6px_24px_rgba(47,128,237,0.08)] sm:p-6">
      <h3 className="mb-4 text-lg font-bold text-slate-800">👥 Danh sách tài khoản ({users.length})</h3>
      {!rootData ? <p className="text-sm text-slate-500">Đang tải dữ liệu…</p> : users.length === 0 ? <p className="text-sm text-slate-500">Chưa có tài khoản nào.</p> : <ul className="divide-y divide-slate-100">{users.map((user) => <li key={user.id} className="flex flex-wrap items-center justify-between gap-3 py-4"><div><p className="font-semibold text-slate-800">{user.displayName || '—'} <span className="ml-2 rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-700">{user.role || 'student'}</span></p><p className="mt-1 text-xs text-slate-500">@{user.username || user.id} · Tạo: {user.createdAt || '—'}</p></div><button type="button" onClick={() => handleDelete(user)} className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50">Xóa</button></li>)}</ul>}
    </div>}

    {tab === 'results' && <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_6px_24px_rgba(47,128,237,0.08)] sm:p-6">
      <h3 className="mb-1 text-lg font-bold text-slate-800">📊 Lịch sử bài làm</h3><p className="mb-4 text-sm text-slate-500">Tổng cộng: {results.length} lượt nộp</p>
      {!rootData ? <p className="text-sm text-slate-500">Đang tải dữ liệu…</p> : results.length === 0 ? <p className="text-sm text-slate-500">Chưa có dữ liệu bài làm.</p> : <div className="overflow-x-auto"><table className="w-full min-w-[850px] text-left text-sm"><thead className="bg-slate-50 text-slate-600"><tr>{['Học sinh','Mã đề','Phần 1','Phần 2','Phần 3','Tổng điểm','Thoát','Ngày nộp'].map((heading) => <th key={heading} className="px-3 py-3 font-semibold">{heading}</th>)}</tr></thead><tbody className="divide-y divide-slate-100">{results.map((result) => <tr key={`${result.maDe}-${result.id}`}><td className="px-3 py-3 font-medium">{result.hoTen}<span className="block text-xs font-normal text-slate-500">Lớp: {result.lop}</span></td><td className="px-3 py-3">{result.maDe}</td><td className="px-3 py-3">{result.diemPhan1}</td><td className="px-3 py-3">{result.diemPhan2}</td><td className="px-3 py-3">{result.diemPhan3}</td><td className="px-3 py-3 font-bold text-emerald-700">{result.tongDiem}</td><td className="px-3 py-3">{result.soLanThoat}</td><td className="px-3 py-3">{result.thoiGianNop ? new Date(result.thoiGianNop).toLocaleString('vi-VN') : '—'}</td></tr>)}</tbody></table></div>}
    </div>}
  </section>;
}
