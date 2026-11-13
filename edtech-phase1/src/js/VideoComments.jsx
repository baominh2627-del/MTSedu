import React, { useEffect, useMemo, useState } from 'react';
import { getUid } from './activityService.js';
import { useAvatarsMap, useUserAvatar } from './avatarService.js';
import { addVideoComment, deleteVideoComment, subscribeVideoComments } from './videoService.js';

function formatCommentTime(ts) {
  if (!ts) return '';
  const diffSec = Math.max(0, Math.floor((Date.now() - ts) / 1000));
  if (diffSec < 60) return 'Vừa xong';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin} phút trước`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr} giờ trước`;
  const d = new Date(ts);
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(d.getHours())}:${pad(d.getMinutes())} · ${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
}

function AuthorAvatar({ name, avatarUrl, isAdmin, small = false }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [avatarUrl]);

  const sizeCls = small ? 'w-7 h-7' : 'w-8 h-8';
  if (avatarUrl && !failed) {
    return (
      <img
        src={avatarUrl}
        alt={name || 'Avatar'}
        onError={() => setFailed(true)}
        className={`${sizeCls} rounded-full object-cover border border-black/10 bg-gray-100 shrink-0`}
      />
    );
  }

  const parts = (name || 'H').trim().split(/\s+/);
  const initial = (parts[parts.length - 1]?.[0] || 'H').toUpperCase();
  const colorCls = isAdmin ? 'bg-black text-white' : 'bg-gray-200 text-gray-800';
  return (
    <div className={`${sizeCls} rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${colorCls}`}>
      {initial}
    </div>
  );
}

export default function VideoComments({ videoId, videoTitle, user, isLoggedIn, onRequireLogin }) {
  const uid = getUid(user);
  const isAdmin = user?.role === 'admin';
  const myAvatar = useUserAvatar(uid);

  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [replyTarget, setReplyTarget] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const authorUids = useMemo(() => comments.map((c) => c.uid).filter(Boolean), [comments]);
  const avatarsMap = useAvatarsMap(authorUids);

  useEffect(() => {
    setComments([]);
    setText('');
    setReplyTarget(null);
    setError('');
    if (!videoId) return undefined;
    return subscribeVideoComments(
      videoId,
      (list) => setComments(list),
      () => setError('Không tải được bình luận. Kiểm tra kết nối hoặc quyền đọc/ghi Firebase (videoComments).'),
    );
  }, [videoId]);

  const { topLevel, repliesByParent } = useMemo(() => {
    const idSet = new Set(comments.map((c) => c.id));
    const replyMap = new Map();
    const roots = [];

    for (const item of comments) {
      if (item.replyToId && idSet.has(item.replyToId)) {
        if (!replyMap.has(item.replyToId)) replyMap.set(item.replyToId, []);
        replyMap.get(item.replyToId).push(item);
      } else {
        roots.push(item);
      }
    }
    roots.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    return { topLevel: roots, repliesByParent: replyMap };
  }, [comments]);

  const submit = async (e) => {
    if (e) e.preventDefault();
    if (!isLoggedIn) { onRequireLogin?.(); return; }
    if (!text.trim() || busy) return;
    setBusy(true);
    setError('');
    try {
      await addVideoComment(videoId, user, text, replyTarget);
      setText('');
      setReplyTarget(null);
    } catch (err) {
      setError(err.message || 'Không gửi được bình luận.');
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm('Xóa bình luận này?')) return;
    try {
      await deleteVideoComment(videoId, commentId);
    } catch (err) {
      setError(err.message || 'Không xóa được bình luận.');
    }
  };

  const renderComment = (item, isReply = false) => {
    const isAuthorAdmin = item.role === 'admin';
    const canDelete = isAdmin || (uid && item.uid === uid);
    const replies = !isReply ? (repliesByParent.get(item.id) || []) : [];

    const avatarUrl = avatarsMap[item.uid] || (item.uid === uid ? myAvatar : null);

    return (
      <div key={item.id} className={isReply ? 'flex items-start gap-2.5' : 'py-4 first:pt-1 last:pb-1 flex items-start gap-3'}>
        <AuthorAvatar name={item.authorName} avatarUrl={avatarUrl} isAdmin={isAuthorAdmin} small={isReply} />
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-bold text-black">{item.authorName || 'Học sinh'}</span>
            {isAuthorAdmin && (
              <span className="px-2 py-0.5 rounded-full bg-black text-white text-[10px] font-semibold uppercase tracking-wide">
                Giáo viên
              </span>
            )}
            <span className="text-xs text-gray-400">{formatCommentTime(item.createdAt)}</span>
          </div>

          <p className="mt-1 text-sm text-gray-800 whitespace-pre-wrap break-words leading-relaxed">
            {item.replyToName && (
              <span className="font-semibold text-gray-600 mr-1.5">@{item.replyToName}</span>
            )}
            {item.text}
          </p>

          <div className="mt-1.5 flex items-center gap-3 text-xs">
            <button
              type="button"
              onClick={() => {
                if (!isLoggedIn) { onRequireLogin?.(); return; }
                const target = isReply ? (comments.find((x) => x.id === item.replyToId) || item) : item;
                setReplyTarget({ id: target.id, authorName: item.authorName });
              }}
              className="font-semibold text-gray-500 hover:text-black transition-colors cursor-pointer"
            >
              Trả lời
            </button>
            {canDelete && (
              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                className="font-medium text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
              >
                Xóa
              </button>
            )}
          </div>

          {replies.length > 0 && (
            <div className="mt-3 pl-3.5 sm:pl-4 border-l-2 border-black/10 space-y-3">
              {replies.map((rep) => renderComment(rep, true))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="bg-white border border-black/10 rounded-xl shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-black/8 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h3 className="text-base sm:text-lg font-bold text-black">Bình luận bài giảng</h3>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-black/5 text-gray-700">
            {comments.length}
          </span>
        </div>
        <span className="text-xs text-gray-500 truncate max-w-full sm:max-w-[280px]" title={videoTitle}>
          Công khai · {videoTitle}
        </span>
      </div>

      <div className="p-5 space-y-5">
        <form onSubmit={submit} className="space-y-2.5">
          {replyTarget && (
            <div className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-black/5 border border-black/10 text-xs text-gray-700">
              <span>
                Đang trả lời <strong className="text-black">@{replyTarget.authorName}</strong>
              </span>
              <button
                type="button"
                onClick={() => setReplyTarget(null)}
                className="font-semibold text-gray-500 hover:text-black cursor-pointer"
              >
                Hủy
              </button>
            </div>
          )}

          <div className="flex items-start gap-3">
            <div className="mt-0.5 shrink-0">
              <AuthorAvatar name={user?.displayName || user?.username} avatarUrl={myAvatar} isAdmin={isAdmin} />
            </div>
            <div className="flex-1 min-w-0 space-y-2">
              <textarea
                rows="2"
                maxLength={1500}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') submit();
                }}
                placeholder={isLoggedIn ? 'Đặt câu hỏi hoặc chia sẻ thảo luận về video này...' : 'Đăng nhập để viết bình luận công khai...'}
                className="w-full rounded-xl border border-black/15 bg-gray-50/70 focus:bg-white p-3 text-sm text-black placeholder-gray-400 outline-none focus:border-black/40 transition"
              />
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs text-gray-400 hidden sm:inline">Mọi học viên xem bài giảng này đều thấy bình luận của bạn (Ctrl + Enter để gửi)</span>
                <button
                  type="submit"
                  disabled={busy || (isLoggedIn && !text.trim())}
                  className="ml-auto px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-black hover:bg-black/80 text-white disabled:opacity-40 transition cursor-pointer"
                >
                  {busy ? 'Đang gửi...' : isLoggedIn ? 'Gửi bình luận' : 'Đăng nhập để bình luận'}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
          )}
        </form>

        <div className="border-t border-black/8 pt-2">
          {topLevel.length === 0 ? (
            <p className="text-sm text-gray-500 py-5 text-center">
              Chưa có bình luận nào cho video này. Hãy đặt câu hỏi đầu tiên nhé!
            </p>
          ) : (
            <div className="divide-y divide-black/6">
              {topLevel.map((item) => renderComment(item, false))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
