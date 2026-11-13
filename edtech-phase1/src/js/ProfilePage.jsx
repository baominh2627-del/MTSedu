import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from './AuthContext.jsx';
import { useUserAvatar, saveAvatar, removeAvatar, processImage } from './avatarService.js';
import { formatDuration, getUid, toDateKey } from './activityService.js';
import { subscribeStudentStats } from './studentStatsService.js';
import AdminDashboard from './admin/components/AdminDashboard.jsx';

const NAV = [
  { label: 'Tổng quan', to: 'profile' },
  { label: 'Khóa học', to: 'math' },
  { label: 'Đề thi', to: 'mock_exams' },
  { label: 'Video bài giảng', to: 'videos' },
];

const WEEKDAYS = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
const PROGRESS_COLORS = ['bg-blue-500', 'bg-violet-500', 'bg-emerald-500', 'bg-amber-400'];

function formatDayLabel(dateKey) {
  const [y, m, d] = dateKey.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  return `${WEEKDAYS[dt.getDay()]} · ${String(d).padStart(2, '0')}/${String(m).padStart(2, '0')}/${y}`;
}

function formatDateTime(ts, isoStr) {
  const ms = Number(ts) || (isoStr ? Date.parse(isoStr) : 0);
  if (!ms) return '—';
  return new Date(ms).toLocaleString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function formatScore(val) {
  if (val === null || val === undefined || val === '') return null;
  const n = Number(val);
  if (!Number.isFinite(n)) return String(val);
  return Number.isInteger(n) ? String(n) : n.toFixed(2).replace(/\.?0+$/, '');
}

// Logo & linh vật: file CỐ ĐỊNH trong /public, không đổi theo học sinh.
function Logo({ className = '' }) {
  const [ok, setOk] = useState(true);
  return (
    <>
      {ok && (
        <img
          src={`${import.meta.env.BASE_URL}net_ve.svg`}
          alt=""
          className={className}
          onError={() => setOk(false)}
        />
      )}
      <span
        className="text-[19px] sm:text-[22px] tracking-tight font-bold text-slate-900 whitespace-nowrap"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        BM Education
      </span>
    </>
  );
}

function Mascot({ className = '' }) {
  const [ok, setOk] = useState(true);
  return ok ? <img src="/mts-mascot.png" alt="" className={className} onError={() => setOk(false)} /> : null;
}

const Card = ({ title, action, children, className = '' }) => (
  <section className={`bg-white rounded-2xl border border-blue-100 shadow-[0_6px_24px_rgba(47,128,237,0.08)] p-5 ${className}`}>
    {(title || action) && (
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        {title && <h3 className="text-lg font-bold text-slate-800">{title}</h3>}
        {action}
      </div>
    )}
    {children}
  </section>
);

function DailyStudyCard({ stats }) {
  const [range, setRange] = useState(7);
  const today = toDateKey(new Date());

  const filteredRows = useMemo(() => {
    const rows = stats?.dailyRows || [];
    if (range <= 0) return rows;
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - (range - 1));
    const cutoffKey = toDateKey(cutoff);
    return rows.filter((r) => r.date >= cutoffKey);
  }, [stats, range]);

  const { rangeSite, rangeVideo, maxTotal } = useMemo(() => {
    let s = 0;
    let v = 0;
    let mx = 1;
    for (const r of filteredRows) {
      s += r.site;
      v += r.video;
      if (r.total > mx) mx = r.total;
    }
    return { rangeSite: s, rangeVideo: v, maxTotal: mx };
  }, [filteredRows]);

  return (
    <Card
      title="⏱️ Thời gian học theo ngày"
      action={
        <select
          value={range}
          onChange={(e) => setRange(Number(e.target.value))}
          aria-label="Chọn khoảng thời gian học theo ngày"
          className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 outline-none focus:border-blue-400"
        >
          <option value={7}>7 ngày qua</option>
          <option value={30}>30 ngày qua</option>
          <option value={0}>Tất cả</option>
        </select>
      }
    >
      {!stats ? (
        <p className="text-sm text-slate-500">Đang tải dữ liệu...</p>
      ) : (
        <>
          <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1 rounded-xl bg-slate-50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-600">
            <span>
              Kỳ lọc — Web: <strong className="text-slate-900">{formatDuration(rangeSite)}</strong>
            </span>
            <span>
              Video: <strong className="text-slate-900">{formatDuration(rangeVideo)}</strong>
            </span>
            <span>
              Tổng trên web: <strong className="text-blue-700">{formatDuration(stats.siteTotal)}</strong>
            </span>
          </div>

          <div className="max-h-[340px] overflow-y-auto pr-1">
            <table className="w-full text-left text-sm">
              <thead className="sticky top-0 bg-white text-xs uppercase text-slate-400 border-b border-slate-100">
                <tr>
                  <th className="py-2 font-semibold">Ngày</th>
                  <th className="py-2 font-semibold">Trên web</th>
                  <th className="py-2 font-semibold">Xem video</th>
                  <th className="py-2 font-semibold text-right">Tổng ngày</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRows.map((row) => {
                  const pct = Math.min(100, Math.round((row.total / maxTotal) * 100));
                  const isToday = row.date === today;
                  return (
                    <tr key={row.date} className={isToday ? 'bg-blue-50/40' : ''}>
                      <td className="py-2.5 pr-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-medium text-slate-800">{formatDayLabel(row.date)}</span>
                          {isToday && (
                            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                              Hôm nay
                            </span>
                          )}
                        </div>
                        <div className="mt-1 h-1 w-24 rounded-full bg-slate-100 overflow-hidden">
                          <div className="h-full rounded-full bg-blue-500" style={{ width: `${pct}%` }} />
                        </div>
                      </td>
                      <td className="py-2.5 pr-2 text-slate-700 whitespace-nowrap">{formatDuration(row.site)}</td>
                      <td className="py-2.5 pr-2 text-slate-600 whitespace-nowrap">{formatDuration(row.video)}</td>
                      <td className="py-2.5 text-right font-semibold text-slate-900 whitespace-nowrap">
                        {formatDuration(row.total)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-slate-400">
            Thời gian trên web và xem video được tự động cập nhật khi bạn đang học.
          </p>
        </>
      )}
    </Card>
  );
}

function ExamHistoryCard({ stats, onNavigate }) {
  const [showAll, setShowAll] = useState(false);
  const results = stats?.examResults || [];
  const visible = showAll ? results : results.slice(0, 6);

  return (
    <Card
      title={`📊 Lịch sử bài đã làm (${results.length})`}
      action={
        results.length > 6 ? (
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
          >
            {showAll ? 'Thu gọn' : `Xem tất cả (${results.length})`}
          </button>
        ) : null
      }
    >
      {!stats ? (
        <p className="text-sm text-slate-500">Đang tải dữ liệu...</p>
      ) : results.length === 0 ? (
        <div className="py-6 text-center">
          <p className="text-sm text-slate-500 mb-3">Bạn chưa có bài kiểm tra nào được ghi nhận.</p>
          <button
            type="button"
            onClick={() => onNavigate('mock_exams')}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Vào làm bài ngay →
          </button>
        </div>
      ) : (
        <ul className="flex flex-col divide-y divide-slate-100 max-h-[380px] overflow-y-auto pr-1">
          {visible.map((item) => {
            const score = formatScore(item.tongDiem);
            const hasParts =
              item.diemPhan1 !== undefined || item.diemPhan2 !== undefined || item.diemPhan3 !== undefined;
            return (
              <li key={item.id} className="py-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium text-slate-800 truncate">{item.maDe}</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {formatDateTime(item.timestamp, item.thoiGianNop)}
                    {hasParts && ` · P1: ${item.diemPhan1 ?? 0} | P2: ${item.diemPhan2 ?? 0} | P3: ${item.diemPhan3 ?? 0}`}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold shrink-0">
                  {score !== null ? `${score} điểm` : 'Đã nộp'}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}

export default function ProfilePage({ onNavigate }) {
  const { user, logout } = useAuth();
  const uid = getUid(user);
  const name = user?.displayName || user?.username || 'Học sinh';
  const fileRef = useRef(null);
  const avatar = useUserAvatar(uid);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const isAdmin = user?.role === 'admin' || user?.username === 'admin';
  const [showAdmin, setShowAdmin] = useState(false);
  const [stats, setStats] = useState(null);
  const [statsError, setStatsError] = useState('');

  useEffect(() => {
    if (!user) return undefined;
    setStatsError('');
    return subscribeStudentStats(user, setStats, setStatsError);
  }, [uid]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // cho phép chọn lại cùng 1 file
    if (!file) return;
    setError('');
    setBusy(true);
    try {
      const dataUrl = await processImage(file);
      if (!(await saveAvatar(uid, dataUrl))) throw new Error('Không lưu được ảnh.');
    } catch (err) {
      setError(err.message || 'Không lưu được ảnh đại diện.');
    } finally {
      setBusy(false);
    }
  };

  const handleRemove = async () => {
    setError('');
    setBusy(true);
    try {
      await removeAvatar(uid);
    } catch (err) {
      setError(err.message || 'Không xóa được ảnh đại diện.');
    } finally {
      setBusy(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-blue-50">
        <p className="text-slate-700">Bạn cần đăng nhập để xem trang cá nhân.</p>
        <button onClick={() => onNavigate('login')} className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold">
          Đăng nhập
        </button>
      </div>
    );
  }

  const summaryCards = [
    {
      label: 'Số bài đã làm',
      value: stats ? String(stats.examResults.length) : '—',
      sub: stats
        ? stats.distinctExamCount > 0
          ? `${stats.distinctExamCount} đề khác nhau`
          : 'Chưa có bài nộp'
        : 'Đang tải...',
      tone: 'bg-blue-50',
    },
    {
      label: 'Tổng giờ học trên web',
      value: stats ? formatDuration(stats.siteTotal) : '—',
      sub: stats ? `Hôm nay: ${formatDuration(stats.todaySite)}` : 'Đang tải...',
      tone: 'bg-emerald-50',
    },
    {
      label: 'Thời gian xem video',
      value: stats ? formatDuration(stats.videoTotal) : '—',
      sub: stats ? `Hôm nay: ${formatDuration(stats.todayVideo)}` : 'Đang tải...',
      tone: 'bg-violet-50',
    },
    {
      label: 'Số ngày học',
      value: stats ? `${stats.activeDaysCount} ngày` : '—',
      sub: stats ? `Chuỗi liên tiếp: ${stats.streakDays} ngày` : 'Đang tải...',
      tone: 'bg-amber-50',
    },
  ];

  const coursesProgress = stats?.coursesProgress || [];
  const watchedVideos = stats?.watchedVideos || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eef5ff] to-[#f8fbff] text-slate-800">
      {/* Topbar */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-blue-100 px-4 sm:px-6 py-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 cursor-pointer hover:opacity-75 transition-opacity"
          aria-label="BM Education - Về trang chủ"
        >
          <Logo className="h-11 w-11 object-contain shrink-0" />
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
            <button
              onClick={() => onNavigate('home')}
              className="px-4 py-3 rounded-xl text-left font-medium text-slate-600 hover:bg-blue-50 whitespace-nowrap"
            >
              Trang chủ
            </button>

            {/* Dành riêng cho tài khoản Admin */}
            {isAdmin && (
              <button
                type="button"
                onClick={() => setShowAdmin((value) => !value)}
                aria-pressed={showAdmin}
                className={`px-4 py-3 rounded-xl text-left font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${
                  showAdmin ? 'bg-emerald-600 text-white' : 'text-emerald-700 bg-emerald-100 hover:bg-emerald-200'
                }`}
              >
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6V4m0 2a2 2 0 100 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
                {showAdmin ? 'Thông tin' : 'Quản trị'}
              </button>
            )}

            {NAV.map((item) => {
              const isOverviewActive = item.to === 'profile' && !showAdmin;
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    if (item.to === 'profile') setShowAdmin(false);
                    if (item.to) onNavigate(item.to);
                  }}
                  className={`px-4 py-3 rounded-xl text-left font-medium whitespace-nowrap transition-colors ${
                    isOverviewActive ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-blue-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            <button
              onClick={logout}
              className="px-4 py-3 rounded-xl text-left font-medium text-red-500 hover:bg-red-50 whitespace-nowrap"
            >
              Đăng xuất
            </button>
          </nav>
          <div className="hidden lg:flex flex-col items-center mt-10 text-center text-sm text-blue-600 italic">
            <Mascot className="w-32" />
            <p className="mt-2">"Học hôm nay vững tương lai"</p>
          </div>
        </aside>

        <main className="flex-1 min-w-0 flex flex-col gap-6">
          {isAdmin && showAdmin ? (
            <AdminDashboard />
          ) : (
            <>
              {/* Hồ sơ + upload ảnh đại diện */}
              <Card className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="flex flex-col items-center gap-3">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-blue-100 bg-blue-50 flex items-center justify-center text-5xl font-bold text-blue-500">
                    {avatar ? (
                      <img src={avatar} alt={`Ảnh đại diện của ${name}`} className="w-full h-full object-cover" />
                    ) : (
                      name.charAt(0).toUpperCase()
                    )}
                    {busy && (
                      <div className="absolute inset-0 bg-white/70 flex items-center justify-center text-sm text-slate-600">
                        Đang xử lý...
                      </div>
                    )}
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
                  <button
                    onClick={() => fileRef.current?.click()}
                    disabled={busy}
                    className="px-4 py-2 rounded-lg border border-blue-300 text-blue-600 text-sm font-medium hover:bg-blue-50 disabled:opacity-50"
                  >
                    {avatar ? 'Đổi ảnh đại diện' : 'Tải ảnh đại diện'}
                  </button>
                  {avatar && (
                    <button type="button" onClick={handleRemove} disabled={busy} className="text-xs text-slate-500 underline hover:text-red-500 disabled:opacity-50">
                      Xóa ảnh
                    </button>
                  )}
                  {error && (
                    <p role="alert" className="text-xs text-red-500 max-w-[200px] text-center">
                      {error}
                    </p>
                  )}
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="text-3xl font-bold">{name}</h1>
                  <p className="text-slate-500 mt-1">
                    {isAdmin ? 'Quản trị viên' : 'Học sinh'}
                    {user?.username ? ` · @${user.username}` : ''}
                  </p>
                  {user?.email && <p className="text-slate-500 mt-3 text-sm">{user.email}</p>}
                  <p className="italic text-slate-500 mt-4">
                    "Cố gắng mỗi ngày, để trở thành phiên bản tốt hơn của chính mình!"
                  </p>
                </div>
              </Card>

              {statsError && (
                <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  Không tải được đầy đủ dữ liệu học tập: {statsError}
                </p>
              )}

              {/* Thống kê tổng quan thực tế từ Firebase */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {summaryCards.map((s) => (
                  <div key={s.label} className={`${s.tone} rounded-2xl p-4`}>
                    <p className="text-sm text-slate-500">{s.label}</p>
                    <p className="text-xl sm:text-2xl font-bold mt-1 text-slate-900">{s.value}</p>
                    <p className="text-xs text-slate-500 mt-1">{s.sub}</p>
                  </div>
                ))}
              </div>

              {/* Thời gian học theo ngày + Lịch sử làm bài */}
              <div className="grid lg:grid-cols-2 gap-6">
                <DailyStudyCard stats={stats} />
                <ExamHistoryCard stats={stats} onNavigate={onNavigate} />
              </div>

              {/* Tiến độ khóa học video & video đã xem */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card
                  title="🎬 Tiến độ khóa học video"
                  action={
                    stats ? (
                      <span className="text-xs font-medium text-slate-500">
                        {stats.completedLessonsCount} bài đã hoàn thành
                      </span>
                    ) : null
                  }
                >
                  {!stats ? (
                    <p className="text-sm text-slate-500">Đang tải dữ liệu...</p>
                  ) : coursesProgress.length === 0 ? (
                    <p className="text-sm text-slate-500">Chưa có khóa học video nào.</p>
                  ) : (
                    <div className="flex flex-col gap-4 max-h-[260px] overflow-y-auto pr-1">
                      {coursesProgress.map((course, idx) => (
                        <div key={course.id}>
                          <div className="flex justify-between gap-2 text-sm mb-1">
                            <span className="font-medium text-slate-700 truncate">{course.title}</span>
                            <span className="text-slate-500 shrink-0">
                              {course.doneCount}/{course.totalLessons} ({course.pct}%)
                            </span>
                          </div>
                          <div className="h-2 rounded-full bg-slate-100">
                            <div
                              className={`h-2 rounded-full ${PROGRESS_COLORS[idx % PROGRESS_COLORS.length]}`}
                              style={{ width: `${course.pct}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>

                <Card
                  title={`📺 Video đã xem gần đây (${watchedVideos.length})`}
                  action={
                    <button
                      type="button"
                      onClick={() => onNavigate('videos')}
                      className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                    >
                      Mở thư viện video →
                    </button>
                  }
                >
                  {!stats ? (
                    <p className="text-sm text-slate-500">Đang tải dữ liệu...</p>
                  ) : watchedVideos.length === 0 ? (
                    <p className="text-sm text-slate-500">Bạn chưa xem video bài giảng nào.</p>
                  ) : (
                    <ul className="divide-y divide-slate-100 text-sm max-h-[260px] overflow-y-auto pr-1">
                      {watchedVideos.map((w) => (
                        <li key={w.vid} className="flex items-center justify-between gap-3 py-2.5">
                          <div className="min-w-0">
                            <p className="font-medium text-slate-800 truncate">{w.title}</p>
                            {w.lastWatched > 0 && (
                              <p className="text-xs text-slate-400">{formatDateTime(w.lastWatched)}</p>
                            )}
                          </div>
                          <span className="shrink-0 font-semibold text-slate-700">{formatDuration(w.seconds)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </Card>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
