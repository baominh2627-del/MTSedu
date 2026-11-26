import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext.jsx";
import { useUserAvatar } from "./avatarService.js";

// --- Custom Hook ---
function useTypewriter(text, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let timeout;
    let interval;

    timeout = setTimeout(() => {
      let currentIndex = 0;
      interval = setInterval(() => {
        if (currentIndex < text.length) {
          currentIndex++;
          setDisplayed(text.slice(0, currentIndex));
        } else {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

// --- Component ---
export default function MainframeHome({ onNavigateToLogin, onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();
  
  const uid = user ? (user.id || user.uid || ('user_' + user.username)) : null;
  const avatar = useUserAvatar(uid);

  // Typewriter
  const { displayed, done } = useTypewriter(
    "Bạn không bắt buộc phải thành công ngay từ đầu. Mà là bắt đầu để sau đó thành công. Nhưng muốn thành công thì học tập và rèn luyện mỗi ngày là một việc không thể thiếu.",
  );

  return (
    <div className="relative w-full min-h-screen text-black mts-bg overflow-hidden">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 w-full flex flex-row justify-between items-center bg-white/80 backdrop-blur-md border-b border-black/8 px-4 lg:px-5 xl:px-8 py-3 sm:py-4">
        {/* Logo */}
        <div className="flex flex-row gap-1.5 xl:gap-2 items-center shrink-0 whitespace-nowrap">
          <span
            className="text-[18px] sm:text-[20px] xl:text-[23px] 2xl:text-[25px] tracking-tight text-black font-bold whitespace-nowrap"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            BM Education
          </span>
          <span className="text-[20px] sm:text-[22px] xl:text-[26px] 2xl:text-[28px] text-black/40 select-none">
            &#10033;
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex flex-row gap-0.5 xl:gap-1.5 2xl:gap-2.5 items-center">
          <button onClick={() => onNavigate("math")} className="text-[11px] xl:text-[12.5px] 2xl:text-[14px] font-bold text-black/70 uppercase tracking-wide xl:tracking-wider px-1.5 xl:px-2.5 2xl:px-3 py-2 rounded-lg hover:text-black hover:bg-black/8 transition-all whitespace-nowrap">
            Toán Học
          </button>
          <button
            onClick={() => onNavigate("physics")}
            className="text-[11px] xl:text-[12.5px] 2xl:text-[14px] font-bold text-black/70 uppercase tracking-wide xl:tracking-wider px-1.5 xl:px-2.5 2xl:px-3 py-2 rounded-lg hover:text-black hover:bg-black/8 transition-all whitespace-nowrap"
          >
            Vật Lý
          </button>
          <button onClick={() => onNavigate("chemistry")} className="text-[11px] xl:text-[12.5px] 2xl:text-[14px] font-bold text-black/70 uppercase tracking-wide xl:tracking-wider px-1.5 xl:px-2.5 2xl:px-3 py-2 rounded-lg hover:text-black hover:bg-black/8 transition-all whitespace-nowrap">
            Hóa Học
          </button>
          <button onClick={() => onNavigate("informatics")} className="text-[11px] xl:text-[12.5px] 2xl:text-[14px] font-bold text-black/70 uppercase tracking-wide xl:tracking-wider px-1.5 xl:px-2.5 2xl:px-3 py-2 rounded-lg hover:text-black hover:bg-black/8 transition-all whitespace-nowrap">
            Tin Học
          </button>
          <button onClick={() => onNavigate("hsa")} className="text-[11px] xl:text-[12.5px] 2xl:text-[14px] font-bold text-black/70 uppercase tracking-wide xl:tracking-wider px-1.5 xl:px-2.5 2xl:px-3 py-2 rounded-lg hover:text-black hover:bg-black/8 transition-all whitespace-nowrap">
            Đề thi HSA
          </button>
          <button onClick={() => onNavigate("tsa")} className="text-[11px] xl:text-[12.5px] 2xl:text-[14px] font-bold text-black/70 uppercase tracking-wide xl:tracking-wider px-1.5 xl:px-2.5 2xl:px-3 py-2 rounded-lg hover:text-black hover:bg-black/8 transition-all whitespace-nowrap">
            Đề thi TSA
          </button>
          <button onClick={() => onNavigate("vact")} className="text-[11px] xl:text-[12.5px] 2xl:text-[14px] font-bold text-black/70 uppercase tracking-wide xl:tracking-wider px-1.5 xl:px-2.5 2xl:px-3 py-2 rounded-lg hover:text-black hover:bg-black/8 transition-all whitespace-nowrap">
            Đề thi V-ACT
          </button>
          <button onClick={() => onNavigate("mock_exams")} className="text-[11px] xl:text-[12.5px] 2xl:text-[14px] font-bold text-black/70 uppercase tracking-wide xl:tracking-wider px-1.5 xl:px-2.5 2xl:px-3 py-2 rounded-lg hover:text-black hover:bg-black/8 transition-all whitespace-nowrap">
            Thi thử TNTHPT
          </button>
          <button onClick={() => onNavigate("videos")} className="text-[11px] xl:text-[12.5px] 2xl:text-[14px] font-bold text-black/70 uppercase tracking-wide xl:tracking-wider px-1.5 xl:px-2.5 2xl:px-3 py-2 rounded-lg hover:text-black hover:bg-black/8 transition-all whitespace-nowrap">
            Video bài giảng
          </button>
        </div>

        {/* Desktop CTA / Login */}
        <div className="hidden lg:flex flex-row gap-3 items-center shrink-0">
          {isLoggedIn ? (
            <>
              <button onClick={() => onNavigate('profile')} title="Trang cá nhân" className="text-[14px] xl:text-[15px] 2xl:text-[16px] text-black/60 hover:text-black flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap">
                {avatar ? (
                  <img src={avatar} alt="Avatar" className="w-6 h-6 rounded-full object-cover border border-gray-200 shrink-0" />
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="shrink-0"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                )}
                <span className="truncate max-w-[140px] xl:max-w-[180px]">{user?.displayName || user?.username}</span>
              </button>
            </>
          ) : (
            <button
              onClick={onNavigateToLogin}
              className="text-[11px] xl:text-[12.5px] 2xl:text-[14px] font-bold text-black/70 uppercase tracking-wide xl:tracking-wider px-1.5 xl:px-2.5 2xl:px-3 py-2 rounded-lg hover:text-black hover:bg-black/8 transition-all whitespace-nowrap"
            >
              Đăng nhập
            </button>
          )}
        </div>

        {/* Mobile right: login button + hamburger */}
        <div className="lg:hidden flex flex-row items-center gap-2">
          {!isLoggedIn && (
            <button
              onClick={onNavigateToLogin}
              className="text-[13px] font-semibold text-black border border-black/15 px-3 py-1.5 rounded-full hover:bg-black/5 transition-colors whitespace-nowrap"
            >
              Đăng nhập
            </button>
          )}
          {isLoggedIn && (
            <button onClick={() => onNavigate('profile')} title="Trang cá nhân" className="flex items-center gap-1.5 text-[13px] text-black/60 hover:text-black font-medium cursor-pointer">
              {avatar && (
                <img src={avatar} alt="Avatar" className="w-5 h-5 rounded-full object-cover border border-gray-200" />
              )}
              <span className="truncate max-w-[80px]">{user?.displayName || user?.username}</span>
            </button>
          )}
          <button
            className="flex flex-col gap-[5px] z-50 relative p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className={`w-5 h-[2px] bg-black transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <div className={`w-5 h-[2px] bg-black transition-all duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`} />
            <div className={`w-5 h-[2px] bg-black transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      <div
        className={`fixed top-[58px] left-3 right-3 bg-white/97 backdrop-blur-xl rounded-2xl shadow-2xl border border-black/8 z-40 flex flex-col gap-1 p-3 transition-all duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-3"
        } lg:hidden`}
      >
        <button onClick={() => { setIsMenuOpen(false); onNavigate("math"); }} className="text-[15px] font-semibold text-black/80 px-4 py-2.5 rounded-xl hover:bg-black/6 transition-colors text-left">Toán Học</button>
        <button onClick={() => { setIsMenuOpen(false); onNavigate("physics"); }} className="text-[15px] font-semibold text-black/80 px-4 py-2.5 rounded-xl hover:bg-black/6 transition-colors text-left">Vật Lý</button>
        <button onClick={() => { setIsMenuOpen(false); onNavigate("chemistry"); }} className="text-[15px] font-semibold text-black/80 px-4 py-2.5 rounded-xl hover:bg-black/6 transition-colors text-left">Hóa Học</button>
        <button onClick={() => { setIsMenuOpen(false); onNavigate("informatics"); }} className="text-[15px] font-semibold text-black/80 px-4 py-2.5 rounded-xl hover:bg-black/6 transition-colors text-left">Tin Học</button>
        <button onClick={() => { setIsMenuOpen(false); onNavigate("hsa"); }} className="text-[15px] font-semibold text-black/80 px-4 py-2.5 rounded-xl hover:bg-black/6 transition-colors text-left">Đề thi HSA</button>
        <button onClick={() => { setIsMenuOpen(false); onNavigate("tsa"); }} className="text-[15px] font-semibold text-black/80 px-4 py-2.5 rounded-xl hover:bg-black/6 transition-colors text-left">Đề thi TSA</button>
        <button onClick={() => { setIsMenuOpen(false); onNavigate("vact"); }} className="text-[15px] font-semibold text-black/80 px-4 py-2.5 rounded-xl hover:bg-black/6 transition-colors text-left">Đề thi V-ACT</button>
        <button onClick={() => { setIsMenuOpen(false); onNavigate("mock_exams"); }} className="text-[15px] font-semibold text-black/80 px-4 py-2.5 rounded-xl hover:bg-black/6 transition-colors text-left">Thi thử TNTHPT</button>
        <button onClick={() => { setIsMenuOpen(false); onNavigate("videos"); }} className="text-[15px] font-semibold text-black/80 px-4 py-2.5 rounded-xl hover:bg-black/6 transition-colors text-left">Video bài giảng</button>
        <div className="w-full h-[1px] bg-black/8 my-1"></div>
        {/* If user is not logged in, we could show a CTA, otherwise nothing or just spacing */}
        {!isLoggedIn && (
          <button
            type="button"
            onClick={() => { setIsMenuOpen(false); onNavigateToLogin(); }}
            className="text-[15px] font-semibold text-white bg-black px-4 py-2.5 rounded-xl hover:bg-black/80 transition-colors text-center"
          >
            Vào học ngay
          </button>
        )}
      </div>

      {/* Nút Vào học ngay tách khỏi navbar để không bị tràn/cắt khi chưa đăng nhập */}
      {!isLoggedIn && (
        <div className="hidden lg:flex absolute top-[74px] xl:top-[82px] right-4 lg:right-5 xl:right-8 z-30">
          <button
            type="button"
            onClick={onNavigateToLogin}
            className="text-[14px] xl:text-[15px] font-bold text-white bg-black px-5 py-2.5 rounded-lg hover:bg-black/80 transition-colors shadow whitespace-nowrap cursor-pointer"
          >
            Vào học ngay
          </button>
        </div>
      )}

      {/* Hero Section */}
      <main className="min-h-screen w-full flex flex-col md:flex-row items-center justify-center px-5 sm:px-8 md:px-10 overflow-hidden gap-4 md:gap-0 pb-8 md:pb-0"
        style={{ paddingTop: 'clamp(72px, 14vw, 120px)' }}>
        {/* Left: Text content */}
        <div className="w-full md:w-1/2 relative z-10">
          {/* Blurred Intro Label */}
          <div
            className="pointer-events-none select-none mb-5 sm:mb-6 font-bold"
            style={{
              fontSize: "clamp(18px, 3.5vw, 26px)",
              lineHeight: 1.3,
              filter: "blur(4px)",
              color: "rgba(0,0,0,0.4)",
            }}
          >
            BM Education
          </div>

          {/* Typewriter Text */}
          <p
            className="mb-6 sm:mb-8 font-bold text-black min-h-[54px]"
            style={{
              fontSize: "clamp(18px, 3vw, 26px)",
              lineHeight: 1.45,
              fontFamily: "'Lora', serif",
              fontStyle: "italic",
              textShadow: "0 2px 12px rgba(0,0,0,0.08)",
            }}
          >
            {displayed}
            {!done && (
              <span
                className="inline-block w-[3px] bg-blue-600 align-middle ml-[3px] rounded"
                style={{
                  height: "1.1em",
                  animation: "blink 1s step-end infinite",
                }}
              ></span>
            )}
          </p>
        </div>

        {/* Right: Decorative SVG with color animation — shown on all screens */}
        <div className="flex w-full md:w-1/2 items-center justify-center relative z-10">
          <div className="net-ve-wrapper" style={{ width: "min(280px, 70vw)", height: "min(280px, 70vw)" }}>
            <img
              src="/net_ve.svg"
              alt="Decorative illustration"
              className="net-ve-img w-full h-full object-contain"
            />
          </div>
        </div>
      </main>

      {/* Animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes colorShift {
          0%   { filter: hue-rotate(0deg)   saturate(1.2) brightness(1); }
          25%  { filter: hue-rotate(60deg)  saturate(1.4) brightness(1.05); }
          50%  { filter: hue-rotate(180deg) saturate(1.3) brightness(1); }
          75%  { filter: hue-rotate(270deg) saturate(1.5) brightness(1.05); }
          100% { filter: hue-rotate(360deg) saturate(1.2) brightness(1); }
        }
        @keyframes floatUp {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-18px) rotate(2deg); }
        }
        .net-ve-img {
          animation: colorShift 8s ease-in-out infinite, floatUp 6s ease-in-out infinite;
        }
      `,
        }}
      />
    </div>
  );
}
