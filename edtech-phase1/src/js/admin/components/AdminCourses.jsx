import { useEffect, useMemo, useState } from 'react';
import { addCourse, deleteCourse, handleYoutubeThumbFallback, subscribeCourses, subscribeVideos, updateCourse } from '../../videoService.js';
import { videos as builtInVideos, groupVideosIntoCourses, videoFilters } from '../../../data/videosData.js';

export const VIDEO_ALL_TAGS = videoFilters.flatMap((g) => g.items);
const inputCls = 'mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal text-slate-800 outline-none focus:border-blue-400';

export function VideoTagPicker({ selected = [], onToggle }) {
  return (
    <div className="flex flex-wrap gap-2">
      {VIDEO_ALL_TAGS.map((tag) => {
        const active = selected.includes(tag);
        return (
          <button
            key={tag}
            type="button"
            onClick={() => onToggle(tag)}
            className={`rounded-full border px-3 py-1.5 text-sm transition ${
              active ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}

const emptyCourseForm = {
  title: '',
  teacher: '',
  coverFile: null,
  coverUrl: '',
  removeCover: false,
  tags: [],
  chaptersText: '',
  description: '',
};

function toCourseFormState(course) {
  if (!course) return emptyCourseForm;
  const savedCover = course.hasExplicitCover ? (course.cover || '') : '';
  return {
    title: course.title || '',
    teacher: course.teacher || '',
    coverFile: null,
    coverUrl: savedCover.startsWith('data:') ? '' : savedCover,
    removeCover: false,
    tags: Array.isArray(course.tags) ? [...course.tags] : [],
    chaptersText: (course.declaredChapters?.length ? course.declaredChapters : course.chapters?.map((ch) => ch.title) || []).join('\n'),
    description: course.description || '',
  };
}

export function CourseFormCard({ compact = false, editing = null, onSaved, onCancel }) {
  const [form, setForm] = useState(() => toCourseFormState(editing));
  const [fileKey, setFileKey] = useState(0);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    setForm(toCourseFormState(editing));
    if (editing) setMsg(null);
    setFileKey((k) => k + 1);
  }, [editing]);

  useEffect(() => {
    if (form.coverFile) {
      const objUrl = URL.createObjectURL(form.coverFile);
      setPreviewUrl(objUrl);
      return () => URL.revokeObjectURL(objUrl);
    }
    const url = form.coverUrl.trim();
    if (url) {
      setPreviewUrl(url);
      return undefined;
    }
    if (editing?.hasExplicitCover && !form.removeCover && editing.cover) {
      setPreviewUrl(editing.cover);
      return undefined;
    }
    setPreviewUrl('');
    return undefined;
  }, [form.coverFile, form.coverUrl, form.removeCover, editing]);

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const toggleTag = (tag) => set('tags', form.tags.includes(tag) ? form.tags.filter((t) => t !== tag) : [...form.tags, tag]);

  const resetLocal = () => {
    setForm(emptyCourseForm);
    setFileKey((k) => k + 1);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      const payload = {
        ...form,
        chapters: form.chaptersText,
      };
      let saved;
      if (editing) {
        saved = await updateCourse(editing.dbId || editing.id, payload, editing, editing.firebaseVideoIds || []);
        setMsg({ ok: true, text: `Đã cập nhật khóa học “${saved.title}”.` });
      } else {
        saved = await addCourse(payload);
        setMsg({ ok: true, text: `Đã tạo khóa học “${saved.title}”.` });
        resetLocal();
      }
      if (onSaved) onSaved(saved, Boolean(editing));
    } catch (err) {
      setMsg({ ok: false, text: err.message });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={compact ? 'rounded-xl border border-blue-200 bg-blue-50/40 p-4' : 'rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_6px_24px_rgba(47,128,237,0.08)] sm:p-6'}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h3 className={compact ? 'text-base font-bold text-slate-800' : 'text-lg font-bold text-slate-800'}>
          {editing ? `✏️ Sửa khóa học: ${editing.title}` : '📚 Tạo khóa học mới'}
        </h3>
        {(editing || onCancel) && (
          <button
            type="button"
            onClick={() => {
              resetLocal();
              setMsg(null);
              if (onCancel) onCancel();
            }}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            {editing ? 'Hủy sửa' : 'Đóng'}
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-slate-600">
            Tên khóa học *
            <input
              className={inputCls}
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              placeholder="vd: Hóa học 12 — Chương trình mới"
              required
            />
          </label>

          <label className="block text-sm font-medium text-slate-600">
            Giáo viên giảng dạy
            <input
              className={inputCls}
              value={form.teacher}
              onChange={(e) => set('teacher', e.target.value)}
              placeholder="vd: Bảo Minh"
            />
          </label>

          <label className="block text-sm font-medium text-slate-600">
            Ảnh bìa khóa học (tùy chọn)
            <input
              key={`cc-${fileKey}`}
              type="file"
              accept="image/*"
              className={inputCls}
              onChange={(e) => {
                set('coverFile', e.target.files[0] || null);
                set('removeCover', false);
              }}
            />
          </label>

          <label className="block text-sm font-medium text-slate-600">
            Link ảnh bìa (tùy chọn)
            <input
              className={inputCls}
              value={form.coverUrl}
              onChange={(e) => {
                set('coverUrl', e.target.value);
                set('removeCover', false);
              }}
              placeholder="https://... (để trống sẽ tự lấy ảnh video đầu)"
            />
          </label>

          {previewUrl && (
            <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 sm:col-span-2">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={previewUrl}
                  alt="Xem trước ảnh bìa khóa học"
                  onError={(e) => handleYoutubeThumbFallback(e.currentTarget)}
                  className="h-12 w-20 rounded-md border border-slate-200 bg-slate-100 object-cover shrink-0"
                />
                <span className="truncate text-xs text-slate-600">
                  {form.coverFile ? `Đã chọn file: ${form.coverFile.name}` : 'Xem trước ảnh bìa khóa học.'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  set('coverFile', null);
                  set('coverUrl', '');
                  set('removeCover', true);
                  setFileKey((k) => k + 1);
                }}
                className="shrink-0 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50"
              >
                Gỡ ảnh
              </button>
            </div>
          )}
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-slate-600">Phân loại khóa học *</p>
          <VideoTagPicker selected={form.tags} onToggle={toggleTag} />
        </div>

        {!compact && (
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-slate-600">
              Danh sách chương dự kiến (tùy chọn)
              <textarea
                rows="3"
                className={inputCls}
                value={form.chaptersText}
                onChange={(e) => set('chaptersText', e.target.value)}
                placeholder={'Mỗi dòng 1 chương, vd:\nChương 1: Este - Lipit\nChương 2: Cacbohidrat'}
              />
            </label>
            <label className="block text-sm font-medium text-slate-600">
              Mô tả khóa học (tùy chọn)
              <textarea
                rows="3"
                className={inputCls}
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
                placeholder="Giới thiệu nội dung trọng tâm của khóa học..."
              />
            </label>
          </div>
        )}

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-700 disabled:opacity-60"
        >
          {busy ? 'Đang lưu…' : (editing ? '💾 Lưu thay đổi khóa học' : (compact ? '✨ Tạo & Chọn khóa học này' : '✨ Tạo khóa học'))}
        </button>

        {msg && (
          <p role="status" className={`rounded-xl border px-4 py-3 text-sm ${msg.ok ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-red-200 bg-red-50 text-red-700'}`}>
            {msg.text}
          </p>
        )}
      </form>
    </div>
  );
}

export default function AdminCourses({ onAddVideoToCourse }) {
  const [dbCourses, setDbCourses] = useState([]);
  const [dbVideos, setDbVideos] = useState([]);
  const [editing, setEditing] = useState(null);
  const [justCreated, setJustCreated] = useState(null);
  const [msg, setMsg] = useState(null);

  useEffect(() => subscribeCourses(setDbCourses, (err) => setMsg({ ok: false, text: err.message })), []);
  useEffect(() => subscribeVideos(setDbVideos), []);

  const allVideos = useMemo(
    () => [...dbVideos, ...builtInVideos.map((v) => ({ ...v, _static: true }))],
    [dbVideos],
  );
  const courses = useMemo(() => groupVideosIntoCourses(allVideos, dbCourses), [allVideos, dbCourses]);

  async function handleDelete(course) {
    setMsg(null);
    if (course._fromDb && course.hasStaticLessons) {
      if (!window.confirm(`Khôi phục khóa học “${course.title}” về cấu hình mặc định ban đầu?`)) return;
      try {
        await deleteCourse(course, false);
        if (editing?.id === course.id) setEditing(null);
      } catch (err) {
        setMsg({ ok: false, text: err.message });
      }
      return;
    }

    const linkedCount = course.firebaseVideoIds?.length || 0;
    const confirmText = linkedCount > 0
      ? `Khóa học “${course.title}” đang có ${linkedCount} video đã đăng. Bấm OK để xóa khóa học VÀ toàn bộ ${linkedCount} video thuộc khóa này?`
      : `Xóa khóa học “${course.title}”?`;
    if (!window.confirm(confirmText)) return;

    try {
      await deleteCourse(course, linkedCount > 0);
      if (editing?.id === course.id) setEditing(null);
      if (justCreated?.id === course.id) setJustCreated(null);
      setMsg({ ok: true, text: `Đã xóa khóa học “${course.title}”.` });
    } catch (err) {
      setMsg({ ok: false, text: err.message });
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <CourseFormCard
        editing={editing}
        onSaved={(saved, wasEditing) => {
          setMsg(null);
          if (wasEditing) {
            setEditing(null);
          } else {
            setJustCreated(saved);
          }
        }}
        onCancel={editing ? () => setEditing(null) : undefined}
      />

      {justCreated && onAddVideoToCourse && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-800">
          <span>
            Khóa học <strong>{justCreated.title}</strong> đã sẵn sàng. Bạn có thể đăng ngay bài giảng đầu tiên vào khóa này.
          </span>
          <button
            type="button"
            onClick={() => onAddVideoToCourse(justCreated)}
            className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700"
          >
            🎬 Đăng video vào khóa này →
          </button>
        </div>
      )}

      {msg && (
        <p role="status" className={`rounded-xl border px-4 py-3 text-sm ${msg.ok ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-red-200 bg-red-50 text-red-700'}`}>
          {msg.text}
        </p>
      )}

      <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_6px_24px_rgba(47,128,237,0.08)] sm:p-6">
        <h3 className="mb-4 text-lg font-bold text-slate-800">Danh sách khóa học ({courses.length})</h3>
        {courses.length === 0 ? (
          <p className="text-sm text-slate-500">Chưa có khóa học nào. Hãy tạo khóa học mới ở khung phía trên.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {courses.map((c) => (
              <li key={c.id} className="flex flex-wrap items-center justify-between gap-4 py-4">
                <div className="flex min-w-0 flex-1 items-center gap-3.5">
                  {c.cover ? (
                    <img
                      src={c.cover}
                      alt={c.title}
                      onError={(e) => handleYoutubeThumbFallback(e.currentTarget)}
                      className="h-14 w-24 shrink-0 rounded-lg border border-slate-200 bg-slate-100 object-cover"
                    />
                  ) : (
                    <div className="flex h-14 w-24 shrink-0 items-center justify-center rounded-lg bg-slate-800 px-2 text-center text-[11px] font-semibold text-white/80">
                      Chưa có ảnh bìa
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate font-bold text-slate-800">{c.title}</p>
                      <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                        c._fromDb ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {c._fromDb ? (c.hasStaticLessons ? 'Đã tùy chỉnh' : 'Khóa học đã tạo') : 'Tự gom từ video'}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                      {c.chapters.length} chương · {c.totalLessons} bài giảng · GV: {c.teacher}
                      {c.tags?.length ? ` · ${c.tags.join(', ')}` : ''}
                    </p>
                    {c.description && (
                      <p className="mt-1 line-clamp-1 text-xs text-slate-500">{c.description}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {onAddVideoToCourse && (
                    <button
                      type="button"
                      onClick={() => onAddVideoToCourse(c)}
                      className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-700"
                    >
                      + Đăng video
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(c);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Sửa
                  </button>
                  {(c._fromDb || (!c.hasStaticLessons && c.firebaseVideoIds.length > 0)) && (
                    <button
                      type="button"
                      onClick={() => handleDelete(c)}
                      className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      {c._fromDb && c.hasStaticLessons ? 'Khôi phục' : 'Xóa'}
                    </button>
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
