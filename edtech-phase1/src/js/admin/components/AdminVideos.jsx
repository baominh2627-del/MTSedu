import { useEffect, useMemo, useState } from 'react';
import { addVideo, deleteVideo, getYoutubeThumbnail, handleYoutubeThumbFallback, parseYoutubeId, subscribeVideos, updateVideo } from '../../videoService.js';
import { videos as builtInVideos, videoFilters } from '../../../data/videosData.js';
import { subjectsData } from '../../../data/subjectsData.js';

const ALL_TAGS = videoFilters.flatMap((g) => g.items);
const SOURCES = [['youtube', 'YouTube'], ['drive', 'Google Drive'], ['local', 'Tải file lên']];
const inputCls = 'mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal text-slate-800 outline-none focus:border-blue-400';

const emptyForm = {
  title: '',
  course: '',
  chapter: '',
  order: '',
  tags: [],
  source: 'youtube',
  link: '',
  videoFile: null,
  part1Name: '',
  coverFile: null,
  coverUrl: '',
  teacher: '',
  duration: '',
  description: '',
  docName: '',
  docUrl: '',
  docFile: null,
  quizTitle: '',
  quizUrl: '',
  quizQuestions: '',
  quizMinutes: '',
  hasPart2: false,
  part2Name: '',
  part2Source: 'youtube',
  part2Link: '',
  part2File: null,
  part2ExistingFile: '',
  part2Duration: '',
};

function VideoSourceInputs({ source, link, onSourceChange, onLinkChange, onFileChange, fileKey, fileHint }) {
  return (
    <>
      <label className="block text-sm font-medium text-slate-600">
        Nguồn video
        <select className={inputCls} value={source} onChange={(e) => onSourceChange(e.target.value)}>
          {SOURCES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </label>
      {source === 'local' ? (
        <label className="block text-sm font-medium text-slate-600">
          File video{fileHint ? ` (${fileHint})` : ''}
          <input key={fileKey} type="file" accept="video/*" className={inputCls} onChange={(e) => onFileChange(e.target.files[0] || null)} />
        </label>
      ) : (
        <label className="block text-sm font-medium text-slate-600">
          {source === 'youtube' ? 'Link YouTube' : 'Link Google Drive'}
          <input
            className={inputCls}
            value={link}
            onChange={(e) => onLinkChange(e.target.value)}
            placeholder={source === 'youtube' ? 'https://youtu.be/...' : 'https://drive.google.com/file/d/.../view'}
          />
        </label>
      )}
    </>
  );
}

export default function AdminVideos() {
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [videos, setVideos] = useState([]);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(null);
  const [msg, setMsg] = useState(null);
  const [fileKey, setFileKey] = useState(0);

  useEffect(() => subscribeVideos(setVideos), []);

  const allVideos = useMemo(
    () => [...videos, ...builtInVideos.map((v) => ({ ...v, _static: true }))],
    [videos],
  );
  const existingCourses = useMemo(
    () => [...new Set(allVideos.map((v) => (v.course || '').trim()).filter(Boolean))],
    [allVideos],
  );
  const existingChapters = useMemo(
    () => [...new Set(allVideos.filter((v) => !form.course || (v.course || '').trim() === form.course.trim()).map((v) => (v.chapter || '').trim()).filter(Boolean))],
    [allVideos, form.course],
  );
  const allQuizzes = useMemo(() => {
    const out = [];
    for (const subj of Object.values(subjectsData || {})) {
      for (const test of subj?.tests || []) {
        if (test.link) out.push({ ...test, subject: subj.title });
      }
    }
    return out;
  }, []);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const toggleTag = (t) => set('tags', form.tags.includes(t) ? form.tags.filter((x) => x !== t) : [...form.tags, t]);

  function resetForm() {
    setForm(emptyForm);
    setEditing(null);
    setShowAdvanced(false);
    setFileKey((k) => k + 1);
  }

  function startEdit(v) {
    const p1 = Array.isArray(v.parts) && v.parts[0] ? v.parts[0] : null;
    const p2 = Array.isArray(v.parts) && v.parts[1] ? v.parts[1] : null;
    const toLink = (item) => (item?.source === 'youtube' ? item.youtubeId : item?.source === 'drive' ? item.driveId : '');
    setEditing(v);
    setForm({
      ...emptyForm,
      title: v.title || '',
      course: v.course || '',
      chapter: v.chapter || '',
      order: v.order ? String(v.order) : '',
      tags: v.tags || [],
      source: v.source || 'youtube',
      link: toLink(v),
      part1Name: p1?.name && p1.name !== 'Phần 1: Video bài giảng' ? p1.name : '',
      coverUrl: v.cover || '',
      teacher: v.teacher || '',
      duration: v.duration || '',
      description: v.description || '',
      docName: v.docName || '',
      docUrl: v.docUrl || '',
      quizTitle: v.quizTitle || '',
      quizUrl: v.quizUrl || '',
      quizQuestions: v.quizQuestions ? String(v.quizQuestions) : '',
      quizMinutes: v.quizMinutes ? String(v.quizMinutes) : '',
      hasPart2: Boolean(p2),
      part2Name: p2?.name || '',
      part2Source: p2?.source || 'youtube',
      part2Link: p2 ? toLink(p2) : '',
      part2ExistingFile: p2?.file || '',
      part2Duration: p2?.duration || '',
    });
    setShowAdvanced(Boolean(v.docUrl || v.quizUrl || v.description || p2));
    setMsg(null);
    setFileKey((k) => k + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function submit(e) {
    e.preventDefault();
    setBusy(true); setMsg(null); setProgress(null);
    try {
      if (editing) {
        await updateVideo(editing.id, form, editing, setProgress);
        setMsg({ ok: true, text: 'Đã cập nhật bài giảng.' });
      } else {
        await addVideo(form, setProgress);
        setMsg({ ok: true, text: 'Đã đăng video bài giảng.' });
      }
      resetForm();
    } catch (err) {
      setMsg({ ok: false, text: err.message });
    } finally {
      setBusy(false); setProgress(null);
    }
  }

  async function handleDelete(v) {
    if (!window.confirm(`Xóa video “${v.title}”?`)) return;
    try {
      await deleteVideo(v.id);
      if (editing?.id === v.id) resetForm();
    } catch (err) {
      setMsg({ ok: false, text: err.message });
    }
  }

  const pickQuizPreset = (url) => {
    const found = allQuizzes.find((q) => q.link === url);
    if (!found) {
      set('quizUrl', url);
      return;
    }
    setForm((f) => ({
      ...f,
      quizUrl: found.link,
      quizTitle: found.title,
      quizQuestions: String(found.questions || ''),
      quizMinutes: String(found.time || ''),
    }));
  };

  return (
    <div className="flex flex-col gap-5">
      <form onSubmit={submit} className="rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_6px_24px_rgba(47,128,237,0.08)] sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-lg font-bold text-slate-800">
            {editing ? `✏️ Sửa bài giảng: ${editing.title}` : '🎬 Đăng video bài giảng'}
          </h3>
          {editing && (
            <button type="button" onClick={resetForm} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50">
              Hủy sửa
            </button>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-slate-600 sm:col-span-2">
            Tên bài giảng
            <input className={inputCls} value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="vd: Bài 1: Bất phương trình bậc nhất 2 ẩn" required />
          </label>

          <label className="block text-sm font-medium text-slate-600">
            Khóa học / Chuyên đề
            <input
              list="mts-course-suggestions"
              className={inputCls}
              value={form.course}
              onChange={(e) => set('course', e.target.value)}
              placeholder="vd: Toán 10 — Đại số & Bất phương trình"
            />
            <datalist id="mts-course-suggestions">
              {existingCourses.map((c) => <option key={c} value={c} />)}
            </datalist>
          </label>

          <div className="grid grid-cols-3 gap-3">
            <label className="col-span-2 block text-sm font-medium text-slate-600">
              Chương / Phần
              <input
                list="mts-chapter-suggestions"
                className={inputCls}
                value={form.chapter}
                onChange={(e) => set('chapter', e.target.value)}
                placeholder="vd: Chương 2: Hệ BPT"
              />
              <datalist id="mts-chapter-suggestions">
                {existingChapters.map((ch) => <option key={ch} value={ch} />)}
              </datalist>
            </label>
            <label className="block text-sm font-medium text-slate-600">
              Thứ tự
              <input type="number" min="1" className={inputCls} value={form.order} onChange={(e) => set('order', e.target.value)} placeholder="1" />
            </label>
          </div>

          <VideoSourceInputs
            source={form.source}
            link={form.link}
            onSourceChange={(v) => set('source', v)}
            onLinkChange={(v) => set('link', v)}
            onFileChange={(f) => set('videoFile', f)}
            fileKey={`v1-${fileKey}`}
            fileHint={editing?.source === 'local' ? 'để trống nếu giữ video cũ' : ''}
          />

          <label className="block text-sm font-medium text-slate-600">
            Ảnh bìa {editing ? '(để trống nếu giữ ảnh cũ)' : form.source === 'youtube' ? '(tự lấy từ YouTube nếu để trống)' : '(bắt buộc)'}
            <input key={`c-${fileKey}`} type="file" accept="image/*" className={inputCls} onChange={(e) => set('coverFile', e.target.files[0] || null)} />
          </label>

          <label className="block text-sm font-medium text-slate-600">
            Link ảnh bìa (tùy chọn)
            <input
              className={inputCls}
              value={form.coverUrl}
              onChange={(e) => set('coverUrl', e.target.value)}
              placeholder={form.source === 'youtube' ? 'Tự lấy thumbnail YouTube nếu để trống' : 'https://...'}
            />
          </label>

          {!form.coverFile && (form.coverUrl.trim() || (form.source === 'youtube' && parseYoutubeId(form.link))) && (
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 sm:col-span-2">
              <img
                src={form.coverUrl.trim() || getYoutubeThumbnail(parseYoutubeId(form.link))}
                alt="Xem trước ảnh bìa"
                onError={(e) => handleYoutubeThumbFallback(e.currentTarget)}
                onLoad={(e) => e.currentTarget.naturalWidth <= 120 && handleYoutubeThumbFallback(e.currentTarget)}
                className="h-12 w-20 rounded-md object-cover border border-slate-200 bg-white shrink-0"
              />
              <span className="text-xs text-slate-600">
                {form.coverUrl.trim() ? 'Xem trước ảnh bìa từ link đã nhập.' : 'Đang tự động lấy ảnh bìa tương ứng từ video YouTube.'}
              </span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 sm:col-span-2">
            <label className="block text-sm font-medium text-slate-600">
              Giáo viên
              <input className={inputCls} value={form.teacher} onChange={(e) => set('teacher', e.target.value)} placeholder="vd: Bảo Minh" />
            </label>
            <label className="block text-sm font-medium text-slate-600">
              Thời lượng
              <input className={inputCls} value={form.duration} onChange={(e) => set('duration', e.target.value)} placeholder="vd: 42:30" />
            </label>
          </div>
        </div>

        <div className="mt-4">
          <p className="mb-2 text-sm font-medium text-slate-600">Phân loại</p>
          <div className="flex flex-wrap gap-2">
            {ALL_TAGS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => toggleTag(t)}
                className={`rounded-full border px-3 py-1.5 text-sm ${form.tags.includes(t) ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-600'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {form.source === 'drive' && (
          <p className="mt-3 text-xs text-slate-500">File Drive cần để chế độ “Bất kỳ ai có liên kết” thì học sinh mới xem được.</p>
        )}

        {/* Tuỳ chọn mở rộng: Phần 2, Tài liệu, Đề thi, Mô tả */}
        <div className="mt-5 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={() => setShowAdvanced((v) => !v)}
            className="text-sm font-semibold text-blue-600 hover:underline"
          >
            {showAdvanced ? '▾ Ẩn tuỳ chọn mở rộng' : '▸ Thêm Phần 2 video, Tài liệu PDF, Bài kiểm tra & Mô tả (tuỳ chọn)'}
          </button>

          {showAdvanced && (
            <div className="mt-4 space-y-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-600 sm:col-span-2">
                  Tên phần 1 (nếu bài có nhiều phần)
                  <input className={inputCls} value={form.part1Name} onChange={(e) => set('part1Name', e.target.value)} placeholder="vd: Phần 1: Lý thuyết trọng tâm" />
                </label>

                <div className="sm:col-span-2">
                  <label className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                    <input type="checkbox" checked={form.hasPart2} onChange={(e) => set('hasPart2', e.target.checked)} className="h-4 w-4 accent-slate-900" />
                    Bài giảng có thêm Phần 2
                  </label>
                </div>

                {form.hasPart2 && (
                  <>
                    <label className="block text-sm font-medium text-slate-600">
                      Tên phần 2
                      <input className={inputCls} value={form.part2Name} onChange={(e) => set('part2Name', e.target.value)} placeholder="vd: Phần 2: Ví dụ áp dụng" />
                    </label>
                    <label className="block text-sm font-medium text-slate-600">
                      Thời lượng phần 2
                      <input className={inputCls} value={form.part2Duration} onChange={(e) => set('part2Duration', e.target.value)} placeholder="vd: 24:10" />
                    </label>
                    <VideoSourceInputs
                      source={form.part2Source}
                      link={form.part2Link}
                      onSourceChange={(v) => set('part2Source', v)}
                      onLinkChange={(v) => set('part2Link', v)}
                      onFileChange={(f) => set('part2File', f)}
                      fileKey={`v2-${fileKey}`}
                    />
                  </>
                )}

                <label className="block text-sm font-medium text-slate-600">
                  Tên tài liệu PDF / BTVN
                  <input className={inputCls} value={form.docName} onChange={(e) => set('docName', e.target.value)} placeholder="vd: Tài liệu & BTVN Bài 1.pdf" />
                </label>
                <label className="block text-sm font-medium text-slate-600">
                  Link tài liệu (Google Drive / PDF)
                  <input className={inputCls} value={form.docUrl} onChange={(e) => set('docUrl', e.target.value)} placeholder="https://drive.google.com/..." />
                </label>
                <label className="block text-sm font-medium text-slate-600 sm:col-span-2">
                  Hoặc tải file tài liệu lên (PDF / Word / Slide)
                  <input key={`d-${fileKey}`} type="file" accept=".pdf,.doc,.docx,.ppt,.pptx" className={inputCls} onChange={(e) => set('docFile', e.target.files[0] || null)} />
                </label>

                <label className="block text-sm font-medium text-slate-600">
                  Chọn nhanh đề thi có sẵn
                  <select className={inputCls} value={allQuizzes.some((q) => q.link === form.quizUrl) ? form.quizUrl : ''} onChange={(e) => pickQuizPreset(e.target.value)}>
                    <option value="">— Không gắn hoặc tự nhập bên cạnh —</option>
                    {allQuizzes.map((q) => (
                      <option key={q.id} value={q.link}>[{q.subject}] {q.title}</option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm font-medium text-slate-600">
                  Link bài kiểm tra liên quan
                  <input className={inputCls} value={form.quizUrl} onChange={(e) => set('quizUrl', e.target.value)} placeholder="https://..." />
                </label>
                {form.quizUrl && (
                  <label className="block text-sm font-medium text-slate-600 sm:col-span-2">
                    Tên bài kiểm tra hiển thị
                    <input className={inputCls} value={form.quizTitle} onChange={(e) => set('quizTitle', e.target.value)} placeholder="vd: Đề kiểm tra Bài 1" />
                  </label>
                )}

                <label className="block text-sm font-medium text-slate-600 sm:col-span-2">
                  Mô tả nội dung bài giảng
                  <textarea rows="3" className={inputCls} value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Tóm tắt kiến thức trọng tâm của bài..." />
                </label>
              </div>
            </div>
          )}
        </div>

        <button disabled={busy} className="mt-5 w-full rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-700 disabled:opacity-60">
          {busy ? (progress !== null ? `Đang tải lên… ${progress}%` : 'Đang lưu…') : (editing ? '💾 Lưu thay đổi' : '🎬 Đăng video')}
        </button>
        {msg && <p role="status" className={`mt-4 rounded-xl border px-4 py-3 text-sm ${msg.ok ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-red-200 bg-red-50 text-red-700'}`}>{msg.text}</p>}
      </form>

      <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_6px_24px_rgba(47,128,237,0.08)] sm:p-6">
        <h3 className="mb-4 text-lg font-bold text-slate-800">Video đã đăng ({allVideos.length})</h3>
        {allVideos.length === 0 ? <p className="text-sm text-slate-500">Chưa có video nào.</p> : (
          <ul className="divide-y divide-slate-100">
            {allVideos.map((v) => (
              <li key={v.id} className="flex flex-wrap items-center gap-3 py-3">
                <img
                  src={v.cover}
                  alt=""
                  onError={(e) => handleYoutubeThumbFallback(e.currentTarget)}
                  onLoad={(e) => e.currentTarget.naturalWidth <= 120 && handleYoutubeThumbFallback(e.currentTarget)}
                  className="h-12 w-20 rounded-lg object-cover bg-slate-100"
                />
                <div className="min-w-0 flex-1">
                  {(v.course || v.chapter) && (
                    <p className="truncate text-xs font-medium text-blue-600">
                      {v.course || 'Khóa học'}{v.chapter ? ` › ${v.chapter}` : ''}{v.order ? ` · #${v.order}` : ''}
                    </p>
                  )}
                  <p className="truncate font-semibold text-slate-800">{v.title}</p>
                  <p className="text-xs text-slate-500">
                    {v.source} · {(v.tags || []).join(', ')}
                    {v.docUrl ? ' · Có tài liệu' : ''}
                    {v.quizUrl ? ' · Có đề thi' : ''}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {v._static ? (
                    <span className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-500">Tích hợp sẵn</span>
                  ) : (
                    <>
                      <button type="button" onClick={() => startEdit(v)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Sửa</button>
                      <button type="button" onClick={() => handleDelete(v)} className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50">Xóa</button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
