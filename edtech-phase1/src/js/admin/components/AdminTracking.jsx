import { useMemo, useState } from 'react';
import { formatDuration } from '../../activityService.js';

const ONLINE_WINDOW_MS = 2 * 60 * 1000;

function lastNDays(n) {
  const out = [];
  const p = (x) => String(x).padStart(2, '0');
  for (let i = 0; i < n; i++) {
    const d = new Date(); d.setDate(d.getDate() - i);
    out.push(`${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`);
  }
  return out;
}

// rootData: toàn bộ database (đã được AdminDashboard subscribe)
export default function AdminTracking({ rootData }) {
  const [selected, setSelected] = useState(null);
  const [range, setRange] = useState(7);

  const rows = useMemo(() => {
    const users = rootData?.users || {};
    const activity = rootData?.activity || {};
    const days = lastNDays(range);
    return Object.entries(users)
      .filter(([, u]) => (u.role || 'student') !== 'admin')
      .map(([id, u]) => {
        const a = activity[id] || {};
        const inRange = days.reduce((acc, d) => {
          acc.site += a.days?.[d]?.site || 0;
          acc.video += a.days?.[d]?.video || 0;
          return acc;
        }, { site: 0, video: 0 });
        return {
          id, name: u.displayName || u.username || id, username: u.username,
          siteTotal: a.siteSeconds || 0, videoTotal: a.videoSeconds || 0,
          siteRange: inRange.site, videoRange: inRange.video,
          lastSeen: a.lastSeen || 0,
          activeDays: Object.keys(a.days || {}).length,
        };
      })
      .sort((x, y) => y.lastSeen - x.lastSeen);
  }, [rootData, range]);

  const detail = selected ? rows.find((r) => r.id === selected) : null;
  const watch = selected ? Object.entries(rootData?.videoWatch?.[selected] || {}).map(([vid, w]) => ({ vid, ...w })).sort((a, b) => (b.lastWatched || 0) - (a.lastWatched || 0)) : [];
  const dayRows = selected ? Object.entries(rootData?.activity?.[selected]?.days || {}).sort((a, b) => b[0].localeCompare(a[0])).slice(0, 14) : [];

  if (!rootData) return <p className="text-sm text-slate-500">Đang tải dữ liệu…</p>;

  return (
    <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_6px_24px_rgba(47,128,237,0.08)] sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-bold text-slate-800">⏱️ Theo dõi học sinh ({rows.length})</h3>
        <select value={range} onChange={(e) => setRange(Number(e.target.value))} className="rounded-xl border border-slate-200 px-3 py-2 text-sm">
          <option value={1}>Hôm nay</option><option value={7}>7 ngày qua</option><option value={30}>30 ngày qua</option>
        </select>
      </div>
      {rows.length === 0 ? <p className="text-sm text-slate-500">Chưa có học sinh nào.</p> : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-600"><tr>
              {['Học sinh', 'Trạng thái', 'Truy cập web (kỳ lọc)', 'Xem video (kỳ lọc)', 'Tổng truy cập', 'Tổng xem video', 'Số ngày học'].map((h) => <th key={h} className="px-3 py-3 font-semibold">{h}</th>)}
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((r) => {
                const online = Date.now() - r.lastSeen < ONLINE_WINDOW_MS;
                return (
                  <tr key={r.id} onClick={() => setSelected(r.id === selected ? null : r.id)} className={`cursor-pointer hover:bg-blue-50 ${r.id === selected ? 'bg-blue-50' : ''}`}>
                    <td className="px-3 py-3 font-medium">{r.name}<span className="block text-xs font-normal text-slate-500">@{r.username}</span></td>
                    <td className="px-3 py-3">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${online ? 'text-emerald-700' : 'text-slate-500'}`}>
                        <span className={`h-2 w-2 rounded-full ${online ? 'bg-emerald-500' : 'bg-slate-300'}`} />{online ? 'Đang online' : (r.lastSeen ? new Date(r.lastSeen).toLocaleString('vi-VN') : 'Chưa truy cập')}
                      </span>
                    </td>
                    <td className="px-3 py-3">{formatDuration(r.siteRange)}</td>
                    <td className="px-3 py-3">{formatDuration(r.videoRange)}</td>
                    <td className="px-3 py-3">{formatDuration(r.siteTotal)}</td>
                    <td className="px-3 py-3">{formatDuration(r.videoTotal)}</td>
                    <td className="px-3 py-3">{r.activeDays}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {detail && (
        <div className="mt-6 grid gap-5 border-t border-slate-100 pt-5 md:grid-cols-2">
          <div>
            <h4 className="mb-2 font-bold text-slate-800">Chi tiết: {detail.name} — theo ngày</h4>
            {dayRows.length === 0 ? <p className="text-sm text-slate-500">Chưa có dữ liệu.</p> : (
              <table className="w-full text-sm"><thead className="text-slate-500"><tr><th className="py-1 text-left">Ngày</th><th className="text-left">Web</th><th className="text-left">Video</th></tr></thead>
                <tbody>{dayRows.map(([d, v]) => <tr key={d} className="border-t border-slate-100"><td className="py-1.5">{d}</td><td>{formatDuration(v.site)}</td><td>{formatDuration(v.video)}</td></tr>)}</tbody></table>
            )}
          </div>
          <div>
            <h4 className="mb-2 font-bold text-slate-800">Video đã xem</h4>
            {watch.length === 0 ? <p className="text-sm text-slate-500">Chưa xem video nào.</p> : (
              <ul className="divide-y divide-slate-100 text-sm">
                {watch.map((w) => <li key={w.vid} className="flex justify-between gap-3 py-1.5"><span className="truncate">{w.title || w.vid}</span><span className="shrink-0 font-semibold">{formatDuration(w.seconds)}</span></li>)}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
