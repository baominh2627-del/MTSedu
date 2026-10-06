import React, { useRef, useState } from 'react';
import { useAuth } from './AuthContext.jsx';
import { getAvatar, saveAvatar, removeAvatar, processImage } from './avatarService.js';

// ===== DỮ LIỆU MẪU: thay bằng dữ liệu thật khi có backend =====
const STATS = [
  { label: 'Số khóa học', value: '3', tone: 'bg-blue-50' },
  { label: 'Số bài làm', value: '12', tone: 'bg-violet-50' },
  { label: 'Thời gian học', value: '28 giờ', tone: 'bg-emerald-50' },
  { label: 'Chuỗi ngày học', value: '5 ngày', tone: 'bg-amber-50' },
];
const PROGRESS = [
  { name: 'Toán', pct: 68, bar: 'bg-blue-500' },
  { name: 'Vật lý', pct: 52, bar: 'bg-violet-500' },
  { name: 'Hóa học', pct: 40, bar: 'bg-emerald-500' },
  { name: 'Tiếng Anh', pct: 30, bar: 'bg-amber-400' },
];
const HISTORY = [
  { title: 'Đề HSA - Toán 01', subject: 'Toán', score: '44/50', time: '32 phút', date: '06/10' },
  { title: 'Chương 1 - Vật lý', subject: 'Vật lý', score: '8.5/10', time: '25 phút', date: '05/10' },
  { title: 'Hóa 12 - Chương 2', subject: 'Hóa học', score: '9/10', time: '22 phút', date: '03/10' },
];
const WEEK = [
  ['Thứ 2', '06/10', 'Toán 16:00 - 18:00'], ['Thứ 3', '07/10', 'Vật lý 14:00 - 16:00'],
  ['Thứ 4', '08/10', 'Hóa học 15:00 - 17:00'], ['Thứ 5', '09/10', ''],
  ['Thứ 6', '10/10', 'Toán 16:00 - 18:00'], ['Thứ 7', '11/10', 'Vật lý 09:00 - 11:00'], ['CN', '12/10', ''],
];
const NAV = [
  { label: 'Tổng quan', to: 'profile' }, { label: 'Khóa học', to: 'math' },
  { label: 'Đề thi', to: 'mock_exams' }, { label: 'Tài liệu' }, { label: 'Thống kê' },
];

// Logo & linh vật: file CỐ ĐỊNH trong /public, không đổi theo học sinh.
function Logo({ className = '' }) {
  const [ok, setOk] = useState(true);
  return ok ? (
    <img src="/mts-logo.png" alt="MTSedu" className={className} onError={() => setOk(false)} />
  ) : (
    <span className="text-2xl font-bold text-blue-600">MTSedu</span>
  );
}
function Mascot({ className = '' }) {
  const [ok, setOk] = useState(true);
  return ok ? <img src="/mts-mascot.png" alt="" className={className} onError={() => setOk(false)} /> : null;
}

const Card = ({ title, children, className = '' }) => (
  <section className={`bg-white rounded-2xl border border-blue-100 shadow-[0_6px_24px_rgba(47,128,237,0.08)] p-5 ${className}`}>
    {title && <h3 className="text-lg font-bold text-slate-800 mb-4">{title}</h3>}
    {children}
  </section>
);

export default function ProfilePage({ onNavigate }) {
  const { user, logout } = useAuth();
  const uid = user?.id || user?.uid || ('user_' + user?.username);
  const name = user?.displayName || user?.username || 'Học sinh';
  const fileRef = useRef(null);
  const [avatar, setAvatar] = useState(() => getAvatar(uid));
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // cho phép chọn lại cùng 1 file
    if (!file) return;
    setError(''); setBusy(true);
    try {
      const dataUrl = await processImage(file);
      if (!saveAvatar(uid, dataUrl)) throw new Error('Không lưu được ảnh (bộ nhớ trình duyệt đầy).');
      setAvatar(dataUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleRemove = () => { removeAvatar(uid); setAvatar(null); setError(''); };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-blue-50">
        <p className="text-slate-700">Bạn cần đăng nhập để xem trang cá nhân.</p>
        <button onClick={() => onNavigate('login')} className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold">Đăng nhập</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eef5ff] to-[#f8fbff] text-slate-800">
      {/* Topbar */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-blue-100 px-4 sm:px-6 py-3 flex items-center justify-between">
        <button onClick={() => onNavigate('home')} className="flex items-center gap-3">
          <Logo className="h-11 w-auto" />
        </button>
        <div className="flex items-center gap-3">
          <span className="hidden sm:block font-semibold">{name}</span>
          <div className="w-10 h-10 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center font-bold text-blue-600">
            {avatar ? <img src={avatar} alt="" className="w-full h-full object-cover" /> : name.charAt(0).toUpperCase()}
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-6 py-6 max-w-[1400px] mx-auto">
        {/* Sidebar (mobile: thanh cuộn ngang) */}
        <aside className="lg:w-[220px] shrink-0">
          <nav className="flex lg:flex-col gap-2 overflow-x-auto pb-1">
            {NAV.map((item) => (
              <button
                key={item.label}
                onClick={() => item.to && onNavigate(item.to)}
                className={`px-4 py-3 rounded-xl text-left font-medium whitespace-nowrap transition-colors ${
                  item.to === 'profile' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-blue-50'
                } ${item.to ? '' : 'opacity-50 cursor-default'}`}
              >
                {item.label}
              </button>
            ))}
            <button onClick={() => onNavigate('home')} className="px-4 py-3 rounded-xl text-left font-medium text-slate-600 hover:bg-blue-50 whitespace-nowrap lg:mt-4">Trang chủ</button>
            <button onClick={logout} className="px-4 py-3 rounded-xl text-left font-medium text-red-500 hover:bg-red-50 whitespace-nowrap">Đăng xuất</button>
          </nav>
          <div className="hidden lg:flex flex-col items-center mt-10 text-center text-sm text-blue-600 italic">
            <Mascot className="w-32" />
            <p className="mt-2">"Học hôm nay vững tương lai"</p>
          </div>
        </aside>

        <main className="flex-1 min-w-0 flex flex-col gap-6">
          {/* Hồ sơ + upload ảnh đại diện */}
          <Card className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="flex flex-col items-center gap-3">
              <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-blue-100 bg-blue-50 flex items-center justify-center text-5xl font-bold text-blue-500">
                {avatar ? <img src={avatar} alt={`Ảnh đại diện của ${name}`} className="w-full h-full object-cover" /> : name.charAt(0).toUpperCase()}
                {busy && <div className="absolute inset-0 bg-white/70 flex items-center justify-center text-sm text-slate-600">Đang xử lý...</div>}
              </div>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
              <button onClick={() => fileRef.current?.click()} disabled={busy} className="px-4 py-2 rounded-lg border border-blue-300 text-blue-600 text-sm font-medium hover:bg-blue-50 disabled:opacity-50">
                {avatar ? 'Đổi ảnh đại diện' : 'Tải ảnh đại diện'}
              </button>
              {avatar && <button onClick={handleRemove} className="text-xs text-slate-500 underline hover:text-red-500">Xóa ảnh</button>}
              {error && <p role="alert" className="text-xs text-red-500 max-w-[200px] text-center">{error}</p>}
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold">{name}</h1>
              <p className="text-slate-500 mt-1">Học sinh · Lớp 12</p>
              {user?.email && <p className="text-slate-500 mt-3 text-sm">{user.email}</p>}
              <p className="italic text-slate-500 mt-4">"Cố gắng mỗi ngày, để trở thành phiên bản tốt hơn của chính mình!"</p>
            </div>
          </Card>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className={`${s.tone} rounded-2xl p-4`}>
                <p className="text-sm text-slate-500">{s.label}</p>
                <p className="text-2xl font-bold mt-1">{s.value}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card title="Tiến độ khóa học">
              <div className="flex flex-col gap-4">
                {PROGRESS.map((p) => (
                  <div key={p.name}>
                    <div className="flex justify-between text-sm mb-1"><span>{p.name}</span><span className="text-slate-500">{p.pct}%</span></div>
                    <div className="h-2 rounded-full bg-slate-100"><div className={`h-2 rounded-full ${p.bar}`} style={{ width: `${p.pct}%` }} /></div>
                  </div>
                ))}
              </div>
            </Card>
            <Card title="Lịch sử làm bài gần đây">
              <ul className="flex flex-col divide-y divide-slate-100">
                {HISTORY.map((h) => (
                  <li key={h.title} className="py-3 flex items-center justify-between gap-3">
                    <div className="min-w-0"><p className="font-medium truncate">{h.title}</p><p className="text-xs text-slate-500">{h.subject}</p></div>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold shrink-0">{h.score}</span>
                    <span className="hidden sm:block text-xs text-slate-500 shrink-0">{h.time} · {h.date}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <Card title="Lịch học trong tuần">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {WEEK.map(([d, date, slot]) => (
                <div key={d} className="text-center">
                  <p className="text-sm font-semibold">{d}</p>
                  <p className="text-xs text-slate-400 mb-2">{date}</p>
                  <div className={`rounded-lg p-2 text-xs min-h-[48px] flex items-center justify-center ${slot ? 'bg-blue-50 text-blue-700' : 'text-slate-300'}`}>{slot || '-'}</div>
                </div>
              ))}
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
