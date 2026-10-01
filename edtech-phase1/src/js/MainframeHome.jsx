import React, { useState, useEffect, useRef } from "react";

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
  const [showPills, setShowPills] = useState(false);
  const videoRef = useRef(null);
  const prevXRef = useRef(0);
  const targetTimeRef = useRef(0);
  const isSeekingRef = useRef(false);

  // Typewriter
  const { displayed, done } = useTypewriter(
    "Bạn không bắt buộc phải thành công ngay từ đầu. Mà là bắt đầu để sau đó thành công. Nhưng muốn thành công thì học tập và rèn luyện mỗi ngày là một việc không thể thiếu.",
  );

  // Show pill buttons after 400ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPills(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Video mouse scrubbing
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!videoRef.current || isNaN(videoRef.current.duration)) return;

      const currentX = e.clientX;
      if (prevXRef.current === 0) {
        prevXRef.current = currentX;
        return;
      }

      const delta = currentX - prevXRef.current;
      prevXRef.current = currentX;

      const sensitivity = 0.8;
      const duration = videoRef.current.duration;

      let newTarget =
        targetTimeRef.current +
        (delta / window.innerWidth) * sensitivity * duration;
      // Clamp between 0 and duration
      newTarget = Math.max(0, Math.min(newTarget, duration));
      targetTimeRef.current = newTarget;

      seekVideo();
    };

    const seekVideo = () => {
      if (!videoRef.current || isSeekingRef.current) return;
      isSeekingRef.current = true;
      videoRef.current.currentTime = targetTimeRef.current;
    };

    const handleSeeked = () => {
      isSeekingRef.current = false;
      if (
        videoRef.current &&
        Math.abs(videoRef.current.currentTime - targetTimeRef.current) > 0.05
      ) {
        seekVideo();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    const vRef = videoRef.current;
    if (vRef) {
      vRef.addEventListener("seeked", handleSeeked);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (vRef) {
        vRef.removeEventListener("seeked", handleSeeked);
      }
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@mainframe.co");
    alert("Email copied to clipboard!");
  };

  return (
    <div className="relative w-full min-h-screen text-black bg-white overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4"
        className="fixed inset-0 z-0 object-cover w-full h-full"
        style={{ objectPosition: "70% center" }}
        muted
        playsInline
        preload="auto"
      />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 w-full flex flex-row justify-between items-center bg-black/90 backdrop-blur-sm px-5 sm:px-8 py-3">
        {/* Logo */}
        <div className="flex flex-row gap-3 items-center">
          <span
            className="text-[18px] sm:text-[22px] tracking-tight text-white font-bold"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            MTS Education
          </span>
          <span className="text-[22px] sm:text-[26px] text-white/60 select-none">
            &#10033;
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex flex-row gap-6 items-center">
          <button onClick={() => onNavigate("math")} className="text-[16px] font-bold text-white/80 uppercase tracking-wider px-5 py-2.5 rounded-lg hover:text-white hover:bg-white/10 transition-all whitespace-nowrap">
            Toán Học
          </button>
          <button
            onClick={() => onNavigate("physics")}
            className="text-[16px] font-bold text-white/80 uppercase tracking-wider px-5 py-2.5 rounded-lg hover:text-white hover:bg-white/10 transition-all whitespace-nowrap"
          >
            Vật Lý
          </button>
          <button onClick={() => onNavigate("chemistry")} className="text-[16px] font-bold text-white/80 uppercase tracking-wider px-5 py-2.5 rounded-lg hover:text-white hover:bg-white/10 transition-all whitespace-nowrap">
            Hóa Học
          </button>
          <button onClick={() => onNavigate("informatics")} className="text-[16px] font-bold text-white/80 uppercase tracking-wider px-5 py-2.5 rounded-lg hover:text-white hover:bg-white/10 transition-all whitespace-nowrap">
            Tin Học
          </button>
          <button onClick={() => onNavigate("hsa")} className="text-[16px] font-bold text-white/80 uppercase tracking-wider px-5 py-2.5 rounded-lg hover:text-white hover:bg-white/10 transition-all whitespace-nowrap">
            Đề thi HSA/TSA
          </button>
          <button onClick={() => onNavigate("mock_exams")} className="text-[16px] font-bold text-white/80 uppercase tracking-wider px-5 py-2.5 rounded-lg hover:text-white hover:bg-white/10 transition-all whitespace-nowrap">
            Thi thử TNTHPT
          </button>
        </div>

        {/* Desktop CTA / Login */}
        <div className="hidden lg:flex flex-row gap-4 items-center">
          <button
            onClick={onNavigateToLogin}
            className="text-[16px] font-bold text-white/70 uppercase tracking-wider px-5 py-2.5 rounded-lg hover:text-white hover:bg-white/10 transition-all whitespace-nowrap"
          >
            Đăng nhập
          </button>
          <a
            href="#"
            className="text-[15px] font-bold text-black bg-white px-6 py-2.5 rounded-lg hover:bg-white/90 transition-colors shadow whitespace-nowrap"
          >
            Vào học ngay
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden flex flex-col gap-[5px] z-50 relative"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div
            className={`w-6 h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
          />
          <div
            className={`w-6 h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
          />
          <div
            className={`w-6 h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-white/98 backdrop-blur-md z-40 flex flex-col justify-center px-8 gap-5 transition-opacity duration-300 overflow-y-auto pt-20 pb-10 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } lg:hidden`}
      >
        <button
          onClick={() => {
            setIsMenuOpen(false);
            onNavigate("math");
          }}
          className="text-[18px] font-medium text-black border border-black/10 px-5 py-3 rounded-xl hover:bg-black hover:text-white transition-colors text-center"
        >
          Toán Học
        </button>
        <button
          onClick={() => {
            setIsMenuOpen(false);
            onNavigate("physics");
          }}
          className="text-[18px] font-medium text-black border border-black/10 px-5 py-3 rounded-xl hover:bg-black hover:text-white transition-colors text-center"
        >
          Vật Lý
        </button>
        <button
          onClick={() => {
            setIsMenuOpen(false);
            onNavigate("chemistry");
          }}
          className="text-[18px] font-medium text-black border border-black/10 px-5 py-3 rounded-xl hover:bg-black hover:text-white transition-colors text-center"
        >
          Hóa Học
        </button>
        <button
          onClick={() => {
            setIsMenuOpen(false);
            onNavigate("informatics");
          }}
          className="text-[18px] font-medium text-black border border-black/10 px-5 py-3 rounded-xl hover:bg-black hover:text-white transition-colors text-center"
        >
          Tin Học
        </button>
        <button
          onClick={() => {
            setIsMenuOpen(false);
            onNavigate("hsa");
          }}
          className="text-[18px] font-medium text-black border border-black/10 px-5 py-3 rounded-xl hover:bg-black hover:text-white transition-colors text-center"
        >
          Đề thi HSA/TSA
        </button>
        <button
          onClick={() => {
            setIsMenuOpen(false);
            onNavigate("mock_exams");
          }}
          className="text-[18px] font-medium text-black border border-black/10 px-5 py-3 rounded-xl hover:bg-black hover:text-white transition-colors text-center"
        >
          Thi thử TNTHPT
        </button>
        <div className="w-full h-[1px] bg-black/10 my-2"></div>
        <button
          onClick={onNavigateToLogin}
          className="text-[18px] font-medium text-black border border-black/10 px-5 py-3 rounded-xl hover:bg-gray-100 transition-colors text-center"
        >
          Đăng nhập
        </button>
        <a
          href="#"
          className="text-[18px] font-medium text-white bg-blue-600 px-5 py-3 rounded-xl shadow-sm hover:bg-blue-700 transition-colors text-center"
        >
          Vào học ngay
        </a>
      </div>

      {/* Hero Section */}
      <main className="h-screen w-full flex flex-col justify-end pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden">
        <div className="w-full max-w-xl md:max-w-[55%] lg:max-w-[50%] relative z-10">
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
            MTS Education
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

          {/* Contact Pills */}
          <div
            className="flex flex-wrap gap-y-2 gap-x-1"
            style={{
              opacity: showPills ? 1 : 0,
              transform: showPills ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
          >
            {/* Facebook */}
            <a
              href="https://www.facebook.com/share/19m2ktwAXb/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.4em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@tr.minh020627?_r=1&_t=ZS-9ACGg4F7fqW"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.4em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.82a8.18 8.18 0 004.78 1.52V6.9a4.85 4.85 0 01-1.01-.21z"/>
              </svg>
              TikTok
            </a>

            {/* Zalo */}
            <a
              href="https://zalo.me/0372336302"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.4em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 4.928a.42.42 0 01-.389.264h-.002a.42.42 0 01-.387-.261l-.87-2.143-2.07 4.783a.42.42 0 01-.386.261.42.42 0 01-.389-.264L9.13 10.834l-.667 1.52a.42.42 0 01-.385.254H6.453a.42.42 0 010-.84h1.378l.945-2.154a.42.42 0 01.772.006l1.962 4.802 2.073-4.79a.42.42 0 01.773.003l.868 2.138 1.743-4.36a.42.42 0 01.783.304l.002-.469z"/>
              </svg>
              Zalo
            </a>

            {/* Điện thoại */}
            <a
              href="tel:0372336302"
              className="inline-flex items-center gap-2 bg-transparent text-white border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.4em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-white hover:text-black transition-colors duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82 19.79 19.79 0 01.09 1.18 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/>
              </svg>
              0372 336 302
            </a>
          </div>
        </div>
      </main>

      {/* Blinking Cursor Keyframes (Tailwind doesn't have it by default, inline style animation is easier to add in CSS) */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `,
        }}
      />
    </div>
  );
}
