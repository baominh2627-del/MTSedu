import { useEffect, useState } from 'react';
import { addVideo, deleteVideo, subscribeVideos } from '../../videoService.js';
import { videoFilters } from '../../../data/videosData.js';

const ALL_TAGS = videoFilters.flatMap((g) => g.items);
const SOURCES = [['youtube', 'YouTube'], ['drive', 'Google Drive'], ['local', 'Tải file lên']];
const empty = { title: '', tags: [], source: 'youtube', link: '', teacher: '', duration: '', coverFile: null, videoFile: null };
const input = 'mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal text-slate-800 outline-none focus:border-blue-400';

export default function AdminVideos() {
  const [form, setForm] = useState(empty);
  const [videos, setVideos] = useState([]);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(null);
  const [msg, setMsg] = useState(null);
  const [fileKey, setFileKey] = useState(0);

  useEffect(() => subscribeVideos(setVideos), []);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const toggleTag = (t) => set('tags', form.tags.includes(t) ? form.tags.filter((x) => x !== t) : [...form.tags, t]);

  async function submit(e) {
    e.preventDefault();
    setBusy(true); setMsg(null); setProgress(null);
    try {
      await addVideo(form, setProgress);
      setMsg({ ok: true, text: 'Đã đăng video.' });
      setForm(empty); setFileKey((k) => k + 1);
    } catch (err) { setMsg({ ok: false, text: err.message }); }
    finally { setBusy(false); setProgress(null); }
  }

  async function remove(v) {
    if (!window.confirm(`Xóa video “${v.title}”?`)) return;
    try { await deleteVideo(v.id); } catch (err) { setMsg({ ok: false, text: err.message }); }
  }

  return (
    <div className="flex flex-col gap-5">
      <form onSubmit={submit} className="rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_6px_24px_rgba(47,128,237,0.08)] sm:p-6">
        <h3 className="mb-5 text-lg font-bold text-slate-800">🎬 Đăng video bài giảng</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-slate-600 sm:col-span-2">Tên video
            <input className={input} value={form.title} onChange={(e) => set('title', e.target.value)} required />
          </label>
          <label className="block text-sm font-medium text-slate-600">Nguồn video
            <select className={input} value={form.source} onChange={(e) => set('source', e.target.value)}>
              {SOURCES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </label>
          {form.source === 'local' ? (
            <label className="block text-sm font-medium text-slate-600">File video
              <input key={`v${fileKey}`} type="file" accept="video/*" className={input} onChange={(e) => set('videoFile', e.target.files[0] || null)} />
            </label>
          ) : (
            <label className="block text-sm font-medium text-slate-600">{form.source === 'youtube' ? 'Link YouTube' : 'Link Google Drive'}
              <input className={input} value={form.link} onChange={(e) => set('link', e.target.value)} placeholder={form.source === 'youtube' ? 'https://youtu.be/...' : 'https://drive.google.com/file/d/.../view'} />
            </label>
          )}
          <label className="block text-sm font-medium text-slate-600">Ảnh bìa (bắt buộc)
            <input key={`c${fileKey}`} type="file" accept="image/*" className={input} onChange={(e) => set('coverFile', e.target.files[0] || null)} />
          </label>
          <label className="block text-sm font-medium text-slate-600">Giáo viên (tuỳ chọn)
            <input className={input} value={form.teacher} onChange={(e) => set('teacher', e.target.value)} />
          </label>
          <label className="block text-sm font-medium text-slate-600">Thời lượng (tuỳ chọn)
            <input className={input} value={form.duration} onChange={(e) => set('duration', e.target.value)} placeholder="vd: 45 phút" />
          </label>
        </div>
        <div className="mt-4">
          <p className="mb-2 text-sm font-medium text-slate-600">Phân loại</p>
          <div className="flex flex-wrap gap-2">
            {ALL_TAGS.map((t) => (
              <button key={t} type="button" onClick={() => toggleTag(t)} className={`rounded-full border px-3 py-1.5 text-sm ${form.tags.includes(t) ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-600'}`}>{t}</button>
            ))}
          </div>
        </div>
        {form.source === 'drive' && <p className="mt-3 text-xs text-slate-500">File Drive cần để chế độ “Bất kỳ ai có liên kết” thì học sinh mới xem được.</p>}
        <button disabled={busy} className="mt-5 w-full rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-700 disabled:opacity-60">
          {busy ? (progress !== null ? `Đang tải lên… ${progress}%` : 'Đang lưu…') : '🎬 Đăng video'}
        </button>
        {msg && <p role="status" className={`mt-4 rounded-xl border px-4 py-3 text-sm ${msg.ok ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-red-200 bg-red-50 text-red-700'}`}>{msg.text}</p>}
      </form>

      <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_6px_24px_rgba(47,128,237,0.08)] sm:p-6">
        <h3 className="mb-4 text-lg font-bold text-slate-800">Video đã đăng ({videos.length})</h3>
        {videos.length === 0 ? <p className="text-sm text-slate-500">Chưa có video nào.</p> : (
          <ul className="divide-y divide-slate-100">
            {videos.map((v) => (
              <li key={v.id} className="flex items-center gap-3 py-3">
                <img src={v.cover} alt="" className="h-12 w-20 rounded-lg object-cover bg-slate-100" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-slate-800">{v.title}</p>
                  <p className="text-xs text-slate-500">{v.source} · {(v.tags || []).join(', ')}</p>
                </div>
                <button type="button" onClick={() => remove(v)} className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50">Xóa</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
