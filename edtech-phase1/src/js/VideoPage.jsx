import React, { useState, useEffect, useRef } from 'react';
import { videos, videoFilters } from '../data/videosData.js';
import { useAuth } from './AuthContext.jsx';
import { subscribeVideos } from './videoService.js';
import { startVideoTracking } from './activityService.js';
import { getAvatar } from './avatarService.js';

const NAV = [
  ['math', 'Toán Học'], ['physics', 'Vật Lý'], ['chemistry', 'Hóa Học'], ['informatics', 'Tin Học'],
  ['hsa', 'Đề thi HSA'], ['tsa', 'Đề thi TSA'], ['vact', 'Đề thi V-ACT'], ['mock_exams', 'Thi thử TNTHPT'],
  ['videos', 'Video bài giảng'],
];

const SOURCE_LABEL = { youtube: 'YouTube', drive: 'Google Drive', local: 'Tải lên' };

function VideoPlayer({ video, trackerRef }) {
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
    <video className="w-full h-full bg-black" src={video.file} poster={video.cover} controls autoPlay controlsList="nodownload"
      onPlay={() => trackerRef.current?.setPlaying(true)}
      onPause={() => trackerRef.current?.setPlaying(false)}
      onEnded={() => trackerRef.current?.setPlaying(false)} />
  );
}

export default function VideoPage({ onNavigate, onRequireLogin }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isLoggedIn } = useAuth();
  const uid = user ? (user.id || user.uid || ('user_' + user.username)) : null;
  const avatar = uid ? getAvatar(uid) : null;

  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState([]);
  const [sortOption, setSortOption] = useState('Mới nhất');
  const [playing, setPlaying] = useState(null);
  const [dbVideos, setDbVideos] = useState([]);
  const trackerRef = useRef(null);

  useEffect(() => subscribeVideos(setDbVideos), []);
  const allVideos = [...dbVideos, ...videos];

  // Tính thời gian xem video của học sinh đang đăng nhập
  useEffect(() => {
    if (!playing || !user) return undefined;
    const t = startVideoTracking(user, playing, playing.source !== 'local');
    trackerRef.current = t;
    return () => { t.stop(); trackerRef.current = null; };
  }, [playing]); // eslint-disable-line

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setPlaying(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const toggle = (t) => setSelected((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  // Mỗi nhóm lọc (Môn / Lớp / Kỳ thi): chọn nhiều trong nhóm = HOẶC, giữa các nhóm = VÀ
  const filtered = allVideos.filter((v) => {
    if (!v.title.toLowerCase().includes(search.toLowerCase())) return false;
    return videoFilters.every((g) => {
      const picked = g.items.filter((i) => selected.includes(i));
      return picked.length === 0 || picked.some((i) => (v.tags || []).includes(i));
    });
  });

  const displayedVideos = [...filtered];
  if (sortOption === 'Cũ nhất') {
    displayedVideos.reverse();
  } else if (sortOption === 'Tên A-Z') {
    displayedVideos.sort((a, b) => a.title.localeCompare(b.title, 'vi'));
  }

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
          : `text-[11px] xl:text-[12.5px] 2xl:text-[14px] font-bold uppercase tracking-wide xl:tracking-wider px-1.5 xl:px-2.5 2xl:px-3 py-2 rounded-lg transition-all whitespace-nowrap ${key === 'videos' ? 'text-black bg-black/8' : 'text-black/70 hover:text-black hover:bg-black/8'}`
      }
    >
      {label}
    </button>
  );

  return (
    <div className="relative w-full min-h-screen mts-bg text-black font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 w-full px-4 lg:px-5 xl:px-8 py-3 sm:py-4 flex flex-row justify-between items-center bg-white/80 backdrop-blur-md border-b border-black/8">
        <div className="flex flex-row gap-1.5 xl:gap-2 items-center cursor-pointer hover:opacity-70 transition-opacity shrink-0 whitespace-nowrap" onClick={() => onNavigate('home')}>
          <span className="text-[18px] sm:text-[20px] xl:text-[23px] 2xl:text-[25px] tracking-tight text-black font-bold whitespace-nowrap" style={{ fontFamily: 'var(--font-heading)' }}>MTS Education</span>
          <span className="text-[20px] sm:text-[22px] xl:text-[26px] 2xl:text-[28px] text-black/40 select-none">&#10033;</span>
        </div>

        <div className="hidden lg:flex flex-row gap-0.5 xl:gap-1.5 2xl:gap-2.5 items-center">
          {NAV.map(([k, l]) => navBtn(k, l, false))}
        </div>

        <div className="hidden lg:flex flex-row gap-3 items-center shrink-0">
          {isLoggedIn ? (
            <button onClick={() => onNavigate('profile')} title="Trang cá nhân" className="text-[14px] xl:text-[15px] 2xl:text-[16px] text-black/60 hover:text-black flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap">
              {avatar ? (
                <img src={avatar} alt="Avatar" className="w-6 h-6 rounded-full object-cover border border-gray-200 shrink-0" />
              ) : (
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" className="shrink-0"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              )}
              <span className="truncate max-w-[140px] xl:max-w-[180px]">{user?.displayName || user?.username}</span>
            </button>
          ) : (
            <button onClick={() => onNavigate('login')} className="text-[11px] xl:text-[12.5px] 2xl:text-[14px] font-bold text-black/70 uppercase tracking-wide xl:tracking-wider px-1.5 xl:px-2.5 2xl:px-3 py-2 rounded-lg hover:text-black hover:bg-black/8 transition-all whitespace-nowrap">Đăng nhập</button>
          )}
        </div>

        <div className="lg:hidden flex flex-row items-center gap-2">
          {!isLoggedIn && (
            <button onClick={() => onNavigate('login')} className="text-[13px] font-semibold text-black border border-black/15 px-3 py-1.5 rounded-full hover:bg-black/5 transition-colors whitespace-nowrap">Đăng nhập</button>
          )}
          {isLoggedIn && (
            <button onClick={() => onNavigate('profile')} title="Trang cá nhân" className="flex items-center gap-1.5 text-[13px] text-black/60 hover:text-black font-medium cursor-pointer">
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
        <div className="w-full h-[1px] bg-black/8 my-1"></div>
        {!isLoggedIn && (
          <button onClick={() => { setIsMenuOpen(false); onNavigate('login'); }} className="text-[15px] font-semibold text-white bg-black px-4 py-2.5 rounded-xl hover:bg-black/80 transition-colors text-center">Vào học ngay</button>
        )}
      </div>

      <main className="pt-[88px] sm:pt-[100px] lg:pt-[104px] pb-[60px] px-5 sm:px-8 md:px-10 max-w-[1400px] mx-auto">
        {/* Page Header (Title) */}
        <div className="mb-8 sm:mb-10 pb-4 sm:pb-6 border-b border-black/5 mt-2 sm:mt-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black tracking-tight leading-tight">Video bài giảng</h1>
        </div>

        {/* Search bar - giống SubjectPage */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <div className="flex items-center bg-white rounded-full w-full max-w-2xl px-5 sm:px-7 py-4 sm:py-5 gap-5"
            style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
            <span className="text-black/35 text-[28px] sm:text-[32px] font-light leading-none select-none">+</span>
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="flex-1 bg-transparent outline-none border-none text-[16px] sm:text-[20px] text-black placeholder-black/35 font-medium"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <svg className="w-6 sm:w-7 h-6 sm:h-7 text-black/45 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>

        {/* Thông báo chưa đăng nhập */}
        {!isLoggedIn && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3">
            <svg className="w-5 h-5 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p className="text-sm text-amber-700">
              Bạn cần <button onClick={onRequireLogin} className="font-semibold underline hover:no-underline">đăng nhập</button> để xem video bài giảng.
            </p>
          </div>
        )}

        {/* Main layout: Sidebar + Content Grid */}
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-8">
          <aside className="w-full lg:w-[260px] shrink-0 flex flex-col gap-4 sm:gap-6 order-2 lg:order-1">
            {videoFilters.map((g) => (
              <div key={g.group} className="p-5 bg-white border border-black/10 rounded-lg shadow-sm">
                <h4 className="text-lg sm:text-xl font-bold mb-4">{g.group}</h4>
                <ul className="flex flex-col gap-3 text-[15px] sm:text-[16px]">
                  {g.items.map((it) => (
                    <li key={it}>
                      <label className="flex items-center gap-3 cursor-pointer hover:text-gray-600 transition-colors">
                        <input
                          type="checkbox"
                          className="w-4 h-4 accent-black cursor-pointer"
                          checked={selected.includes(it)}
                          onChange={() => toggle(it)}
                        />
                        <span>{it}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </aside>

          <div className="flex-1 w-full order-1 lg:order-2">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <p className="text-gray-600 text-sm sm:text-base">Hiển thị {displayedVideos.length} video</p>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full sm:w-auto px-4 py-2 bg-white border border-black/10 rounded-md focus:outline-none focus:border-black/30 cursor-pointer text-sm sm:text-base"
              >
                <option value="Mới nhất">Mới nhất</option>
                <option value="Cũ nhất">Cũ nhất</option>
                <option value="Tên A-Z">Tên A-Z</option>
              </select>
            </div>

            {displayedVideos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {displayedVideos.map((v) => (
                  <div
                    key={v.id}
                    onClick={() => openVideo(v)}
                    className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-black/5 transition-all duration-300 flex flex-col cursor-pointer"
                  >
                    <div className="relative aspect-video overflow-hidden bg-gray-200">
                      <img
                        src={v.cover}
                        alt={v.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 bg-black text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {SOURCE_LABEL[v.source] || v.source}
                      </div>
                      {!isLoggedIn ? (
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3 shadow-lg">
                            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeWidth="2"></rect>
                              <path d="M7 11V7a5 5 0 0110 0v4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                          </div>
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
                          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg opacity-90 group-hover:scale-110 transition-transform">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="#111"><path d="M8 5v14l11-7z" /></svg>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-500 mb-3">
                        {v.duration && (
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            {v.duration}
                          </span>
                        )}
                        {(v.tags || []).length > 0 && (
                          <span className="truncate">{(v.tags || []).join(' · ')}</span>
                        )}
                      </div>

                      <h5 className="font-bold text-base sm:text-lg leading-snug mb-4 line-clamp-2 hover:text-gray-600 transition-colors">
                        {v.title}
                      </h5>

                      <div className="mt-auto pt-4 border-t border-black/5 flex items-center justify-between gap-2 flex-wrap">
                        <div className="font-semibold text-black text-sm sm:text-base">
                          <span className="text-green-600 bg-green-50 px-2 py-1 rounded-md text-xs sm:text-sm">Bài giảng</span>
                        </div>
                        <div className="text-xs sm:text-sm font-medium text-gray-600 flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                          </div>
                          <span className="truncate">{v.teacher || 'Bảo Minh'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-8 sm:mt-10 text-center text-gray-500 py-10 border border-dashed border-gray-300 rounded-xl">
                {allVideos.length === 0 ? 'Chưa có video nào trong danh mục này.' : 'Không tìm thấy video phù hợp.'}
              </div>
            )}
          </div>
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
              <VideoPlayer video={playing} trackerRef={trackerRef} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
