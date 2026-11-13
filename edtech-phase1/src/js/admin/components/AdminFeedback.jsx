import { useMemo, useState } from 'react';
import { getAvatar } from '../../avatarService.js';
import {
  FEEDBACK_STATUS,
  FEEDBACK_TYPES,
  deleteFeedback,
  formatFeedbackError,
  markFeedbacksResolved,
  normalizeFeedbacks,
  setFeedbackStatus,
} from '../../feedbackService.js';
import UserAvatar from '../../UserAvatar.jsx';

const TYPE_STYLES = {
  'Lỗi đáp án/câu hỏi sai': 'border-rose-200 bg-rose-50 text-rose-700',
  'Lỗi giao diện/form/kỹ thuật': 'border-amber-200 bg-amber-50 text-amber-700',
  'Góp ý thêm tính năng': 'border-blue-200 bg-blue-50 text-blue-700',
  'Vấn đề khác': 'border-slate-200 bg-slate-100 text-slate-700',
};

const PAGE_LABELS = {
  '#home': 'Trang chủ',
  '#math': 'Toán học',
  '#physics': 'Vật lý',
  '#chemistry': 'Hóa học',
  '#informatics': 'Tin học',
  '#hsa': 'Đề thi HSA',
  '#tsa': 'Đề thi TSA',
  '#vact': 'Đề thi V-ACT',
  '#mock_exams': 'Thi thử TNTHPT',
  '#videos': 'Video bài giảng',
  '#profile': 'Trang cá nhân',
  '#login': 'Đăng nhập',
};

function formatTime(ts) {
  if (!ts) return '—';
  return new Date(ts).toLocaleString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function formatPageLabel(page) {
  if (!page) return 'Trang chủ';
  const normalized = page.startsWith('#') ? page : `#${page}`;
  return PAGE_LABELS[normalized] ? `${PAGE_LABELS[normalized]} (${normalized})` : normalized;
}

/** Tab quản trị đọc nhanh, lọc và xử lý góp ý / báo lỗi từ người dùng. */
export default function AdminFeedback({ rootData }) {
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [busyId, setBusyId] = useState(null);
  const [bulkBusy, setBulkBusy] = useState(false);
  const [actionError, setActionError] = useState('');

  const allFeedbacks = useMemo(() => normalizeFeedbacks(rootData?.feedbacks), [rootData]);

  const counts = useMemo(() => {
    let unread = 0;
    let resolved = 0;
    for (const item of allFeedbacks) {
      if (item.status === FEEDBACK_STATUS.RESOLVED) resolved += 1;
      else unread += 1;
    }
    return { all: allFeedbacks.length, unread, resolved };
  }, [allFeedbacks]);

  const typeOptions = useMemo(() => {
    const known = new Set(FEEDBACK_TYPES);
    for (const item of allFeedbacks) {
      if (item.type) known.add(item.type);
    }
    return [...known];
  }, [allFeedbacks]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allFeedbacks.filter((item) => {
      if (statusFilter !== 'all' && item.status !== statusFilter) return false;
      if (typeFilter !== 'all' && item.type !== typeFilter) return false;
      if (!q) return true;
      const haystack = `${item.content} ${item.authorName} ${item.username} ${item.type} ${formatPageLabel(item.page)}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [allFeedbacks, statusFilter, typeFilter, search]);

  async function handleToggleStatus(item) {
    setBusyId(item.id);
    setActionError('');
    try {
      const next = item.status === FEEDBACK_STATUS.RESOLVED ? FEEDBACK_STATUS.UNREAD : FEEDBACK_STATUS.RESOLVED;
      await setFeedbackStatus(item.id, next);
    } catch (err) {
      setActionError(formatFeedbackError(err, 'Không cập nhật được trạng thái góp ý.'));
    } finally {
      setBusyId(null);
    }
  }

  async function handleMarkAllResolved() {
    const unreadIds = allFeedbacks
      .filter((item) => item.status !== FEEDBACK_STATUS.RESOLVED)
      .map((item) => item.id);
    if (unreadIds.length === 0) return;

    setBulkBusy(true);
    setActionError('');
    try {
      await markFeedbacksResolved(unreadIds);
    } catch (err) {
      setActionError(formatFeedbackError(err, 'Không đánh dấu được tất cả góp ý.'));
    } finally {
      setBulkBusy(false);
    }
  }

  async function handleDelete(item) {
    if (!window.confirm(`Xóa góp ý của “${item.authorName}”? Thao tác này không thể hoàn tác.`)) return;
    setBusyId(item.id);
    setActionError('');
    try {
      await deleteFeedback(item.id);
    } catch (err) {
      setActionError(formatFeedbackError(err, 'Không xóa được góp ý.'));
    } finally {
      setBusyId(null);
    }
  }

  if (!rootData) {
    return (
      <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_6px_24px_rgba(47,128,237,0.08)] sm:p-6">
        <p className="text-sm text-slate-500">Đang tải dữ liệu…</p>
      </div>
    );
  }

  const statusTabs = [
    ['all', `Tất cả (${counts.all})`],
    [FEEDBACK_STATUS.UNREAD, `Chưa xử lý (${counts.unread})`],
    [FEEDBACK_STATUS.RESOLVED, `Đã xử lý (${counts.resolved})`],
  ];

  return (
    <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_6px_24px_rgba(47,128,237,0.08)] sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-800">💬 Góp ý & Báo lỗi ({counts.all})</h3>
          <p className="mt-0.5 text-sm text-slate-500">
            Đọc nhanh ý kiến học sinh gửi từ nút Góp ý & Báo lỗi.
          </p>
        </div>
        {counts.unread > 0 && (
          <button
            type="button"
            disabled={bulkBusy}
            onClick={handleMarkAllResolved}
            className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100 disabled:opacity-60"
          >
            {bulkBusy ? 'Đang xử lý…' : `✓ Đánh dấu tất cả đã xử lý (${counts.unread})`}
          </button>
        )}
      </div>

      {/* Bộ lọc nhanh */}
      <div className="mt-4 flex flex-col gap-3 border-b border-slate-100 pb-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {statusTabs.map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setStatusFilter(key)}
              className={`rounded-xl border px-3.5 py-2 text-xs font-semibold transition sm:text-sm ${
                statusFilter === key
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-blue-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            aria-label="Lọc theo loại vấn đề"
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-400"
          >
            <option value="all">Tất cả loại vấn đề</option>
            {typeOptions.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm nội dung, người gửi, trang…"
            aria-label="Tìm kiếm góp ý"
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-800 outline-none focus:border-blue-400 sm:w-64"
          />
        </div>
      </div>

      {actionError && (
        <p role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {actionError}
        </p>
      )}

      {filtered.length === 0 ? (
        <p className="py-8 text-center text-sm text-slate-500">
          {allFeedbacks.length === 0
            ? 'Chưa có góp ý hay báo lỗi nào được gửi.'
            : 'Không có góp ý nào khớp với bộ lọc hiện tại.'}
        </p>
      ) : (
        <ul className="mt-4 flex flex-col gap-3">
          {filtered.map((item) => {
            const isResolved = item.status === FEEDBACK_STATUS.RESOLVED;
            const avatarUrl = (item.uid && (rootData.users?.[item.uid]?.avatar || getAvatar(item.uid))) || null;
            const typeBadge = TYPE_STYLES[item.type] || TYPE_STYLES['Vấn đề khác'];
            const isBusy = busyId === item.id;

            return (
              <li
                key={item.id}
                className={`rounded-2xl border p-4 transition ${
                  isResolved
                    ? 'border-slate-200 bg-white'
                    : 'border-blue-200 bg-blue-50/40'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <UserAvatar
                      name={item.authorName}
                      avatarUrl={avatarUrl}
                      sizeClass="w-9 h-9"
                      fallbackClass={isResolved ? 'bg-slate-200 text-slate-700' : 'bg-blue-100 text-blue-700'}
                    />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-slate-800">{item.authorName}</span>
                        <span className="text-xs text-slate-500">
                          {item.username ? `@${item.username}` : 'Chưa đăng nhập'}
                        </span>
                        <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${typeBadge}`}>
                          {item.type}
                        </span>
                        {!isResolved ? (
                          <span className="rounded-full bg-blue-600 px-2 py-0.5 text-[11px] font-bold text-white">
                            Mới
                          </span>
                        ) : (
                          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                            Đã xử lý
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-slate-500">
                        {formatTime(item.createdAt)} · Tại: <span className="font-medium text-slate-600">{formatPageLabel(item.page)}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      disabled={isBusy}
                      onClick={() => handleToggleStatus(item)}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition disabled:opacity-50 ${
                        isResolved
                          ? 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                          : 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                      }`}
                    >
                      {isResolved ? '↩ Mở lại' : '✓ Đã xử lý'}
                    </button>
                    <button
                      type="button"
                      disabled={isBusy}
                      onClick={() => handleDelete(item)}
                      className="rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                    >
                      Xóa
                    </button>
                  </div>
                </div>

                <p className="mt-3 whitespace-pre-wrap break-words rounded-xl bg-white/80 px-3.5 py-2.5 text-sm leading-relaxed text-slate-800 border border-slate-100">
                  {item.content}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
