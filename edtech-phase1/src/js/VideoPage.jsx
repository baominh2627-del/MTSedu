import React, { useState, useEffect } from 'react';
import { videos, videoFilters } from '../data/videosData.js';
import { useAuth } from './AuthContext.jsx';
import { getAvatar } from './avatarService.js';

const NAV = [
  ['math', 'Toán Học'], ['physics', 'Vật Lý'], ['chemistry', 'Hóa Học'], ['informatics', 'Tin Học'],
  ['hsa', 'Đề thi HSA'], ['tsa', 'Đề thi TSA'], ['vact', 'Đề thi V-ACT'], ['mock_exams', 'Thi thử TNTHPT'],
  ['videos', 'Video bài giảng'],
];

const SOURCE_LABEL = { youtube: 'YouTube', drive: 'Google Drive', local: 'Tải lên' };

function VideoPlayer({ video }) {
  if (video.source === 'youtube') {
    return (
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
        title={video.title}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
      />
    );
  }
  if (video.source === 'drive') {
    return (
      <iframe
        className="w-full h-full"
        src={`https://drive.google.com/file/d/${video.driveId}/preview`}
        title={video.title}
        allow="autoplay; fullscreen"
        allowFullScreen
      />
    );
  }
  return (
    <video className="w-full h-full bg-black" src={video.file} poster={video.cover} controls autoPlay controlsList="nodownload" />
  );
}

export default function VideoPage({ onNavigate, onRequireLogin }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isLoggedIn } = useAuth();
  const uid = user ? (user.id || user.uid || ('user_' + user.username)) : null;
  const avatar = uid ? getAvatar(uid) : null;

  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState([]);
  const [playing, setPlaying] = useState(null);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setPlaying(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const toggle = (t) => setSelected((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  // Mỗi nhóm lọc (Môn / Lớp / Kỳ thi): chọn nhiều trong nhóm = HOẶC, giữa các nhóm = VÀ
  const filtered = videos.filter((v) => {
    if (!v.title.toLowerCase().includes(search.toLowerCase())) return false;
    return videoFilters.every((g) => {
      const picked = g.items.filter((i) => selected.includes(i));
      return picked.length === 0 || picked.some((i) => (v.tags || []).includes(i));
    });
  });

  const openVideo = (v) => {
    if (!isLoggedIn) { onRequireLogin(); return; }
    setPlaying(v);
  };

  const navBtn = (key, label, mobile) => (
    <button
      key={key}
      onClick={() => { setIsMenuOpen(false); onNavigate(key); }}
      className={
        mobile
          ? `text-[15px] font-semibold px-4 py-2.5 rounded-xl hover:bg-black/6 transition-colors text-left ${key === 'videos' ? 'text-black font-bold' : 'text-black/80'}`
          : `text-[14px] xl:text-[15px] font-bold uppercase tracking-wider px-2 xl:px-3 py-2 rounded-lg transition-all whitespace-nowrap ${key === 'videos' ? 'text-black bg-black/8' : 'text-black/70 hover:text-black hover:bg-black/8'}`
      }
    >
      {label}
    </button>
  );

  return (
    <div className="relative w-full min-h-screen mts-bg text-black font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-8 py-4 sm:py-5 lg:py-4 flex flex-row justify-between items-center bg-white/80 backdrop-blur-md border-b border-black/8">
        <div className="flex flex-row gap-2 items-center cursor-pointer hover:opacity-70 transition-opacity" onClick={() => onNavigate('home')}>
          <span className="text-[20px] sm:text-[24px] lg:text-[26px] tracking-tight text-black font-bold" style={{ fontFamily: 'var(--font-heading)' }}>MTS Education</span>
          <span className="text-[24px] sm:text-[28px] lg:text-[30px] text-black/40 select-none">&#10033;</span>
        </div>

        <div className="hidden lg:flex flex-row gap-1 xl:gap-3 items-center">
          {NAV.map(([k, l]) => navBtn(k, l, false))}
        </div>

        <div className="hidden lg:flex flex-row gap-4 items-center">
          {isLoggedIn ? (
            <button onClick={() => onNavigate('profile')} title="Trang cá nhân" className="text-[17px] text-black/60 hover:text-black flex items-center gap-2 transition-colors cursor-pointer">
              {avatar ? <img src={avatar} alt="Avatar" className="w-6 h-6 rounded-full object-cover border border-gray-200" /> : null}
              {user?.displayName || user?.username}
            </button>
          ) : (
            <button onClick={() => onNavigate('login')} className="text-[14px] xl:text-[15px] font-bold text-black/70 uppercase tracking-wider px-2 xl:px-3 py-2 rounded-lg hover:text-black hover:bg-black/8 transition-all whitespace-nowrap">Đăng nhập</button>
          )}
        </div>

        <div className="lg:hidden flex flex-row items-center gap-2">
          {!isLoggedIn && (
            <button onClick={() => onNavigate('login')} className="text-[13px] font-semibold text-black border border-black/15 px-3 py-1.5 rounded-full hover:bg-black/5 transition-colors whitespace-nowrap">Đăng nhập</button>
          )}
          {isLoggedIn && (
            <button onClick={() => onNavigate('profile')} className="flex items-center gap-1.5 text-[13px] text-black/60 hover:text-black font-medium cursor-pointer">
              {avatar && <img src={avatar} alt="Avatar" className="w-5 h-5 rounded-full object-cover border border-gray-200" />}
              <span className="truncate max-w-[80px]">{user?.displayName || user?.username}</span>
            </button>
          )}
          <button className="flex flex-col gap-[5px] z-50 relative p-1" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className={`w-5 h-[2px] bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <div className={`w-5 h-[2px] bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <div className={`w-5 h-[2px] bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </nav>

      <div className={`fixed top-[68px] sm:top-[75px] left-3 right-3 bg-white/97 backdrop-blur-xl rounded-2xl shadow-2xl border border-black/8 z-40 flex flex-col gap-1 p-3 max-h-[calc(100vh-90px)] overflow-y-auto overscroll-contain transition-all duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-3'} lg:hidden`}>
        {NAV.map(([k, l]) => navBtn(k, l, true))}
      </div>

      <main className="pt-[88px] sm:pt-[100px] lg:pt-[104px] pb-[60px] px-5 sm:px-8 md:px-10 max-w-[1400px] mx-auto">
        <div className="mb-8 sm:mb-10 pb-4 sm:pb-6 border-b border-black/5 mt-2 sm:mt-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black tracking-tight leading-tight">Video bài giảng</h1>
        </div>

        <div className="max-w-[600px] mx-auto mb-10">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm video..."
            className="w-full px-6 py-4 rounded-full bg-white shadow-md border border-black/5 outline-none text-[16px]"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-[220px] shrink-0 flex flex-col gap-4">
            {videoFilters.map((g) => (
              <div key={g.group} className="bg-white rounded-xl border border-black/10 p-4">
                <h3 className="font-bold text-[16px] mb-3">{g.group}</h3>
                <div className="flex flex-col gap-2">
                  {g.items.map((it) => (
                    <label key={it} className="flex items-center gap-2 text-[14px] text-black/70 cursor-pointer">
                      <input type="checkbox" checked={selected.includes(it)} onChange={() => toggle(it)} />
                      {it}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </aside>

          <section className="flex-1 min-w-0">
            <p className="text-[13px] text-black/50 mb-4">Hiển thị {filtered.length} video</p>
            {filtered.length === 0 ? (
              <div className="bg-white rounded-xl border border-black/10 p-10 text-center text-black/50">
                {videos.length === 0 ? 'Chưa có video nào. Video bài giảng sẽ sớm được cập nhật!' : 'Không tìm thấy video phù hợp.'}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((v) => (
                  <div key={v.id} onClick={() => openVideo(v)} className="bg-white rounded-xl border border-black/10 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow group">
                    <div className="relative aspect-video bg-gray-100">
                      <img src={v.cover} alt={v.title} className="w-full h-full object-cover" loading="lazy" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/25 transition-colors">
                        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg opacity-90 group-hover:scale-110 transition-transform">
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="#111"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                      </div>
                      <span className="absolute top-3 left-3 bg-black text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">{SOURCE_LABEL[v.source]}</span>
                      {v.duration && <span className="absolute bottom-3 right-3 bg-black/75 text-white text-[11px] px-2 py-0.5 rounded">{v.duration}</span>}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-[15px] leading-snug mb-2">{v.title}</h3>
                      <div className="flex flex-wrap gap-1.5 mb-1">
                        {(v.tags || []).map((t) => <span key={t} className="text-[11px] bg-black/5 text-black/70 px-2 py-0.5 rounded-full">{t}</span>)}
                      </div>
                      {v.teacher && <p className="text-[12px] text-black/50 mt-2">{v.teacher}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {playing && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4" onClick={() => setPlaying(null)}>
          <div className="w-full max-w-[1000px]" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-3 text-white">
              <h2 className="font-bold text-[16px] sm:text-[18px] pr-4">{playing.title}</h2>
              <button onClick={() => setPlaying(null)} className="text-[28px] leading-none px-2 hover:opacity-70">&times;</button>
            </div>
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-black">
              <VideoPlayer video={playing} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
