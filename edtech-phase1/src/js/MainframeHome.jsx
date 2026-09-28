import React, { useState, useEffect, useRef } from 'react';

// --- Custom Hook ---
function useTypewriter(text, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState('');
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
export default function MainframeHome({ onNavigateToLogin }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPills, setShowPills] = useState(false);
  const videoRef = useRef(null);
  const prevXRef = useRef(0);
  const targetTimeRef = useRef(0);
  const isSeekingRef = useRef(false);

  // Typewriter
  const { displayed, done } = useTypewriter(
    "Bạn không bắt buộc phải thành công ngay từ đầu. Mà là bắt đầu để sau đó thành công. Nhưng muốn thành công thì học tập và rèn luyện mỗi ngày là một việc không thể thiếu."
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
      
      let newTarget = targetTimeRef.current + (delta / window.innerWidth) * sensitivity * duration;
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
      if (videoRef.current && Math.abs(videoRef.current.currentTime - targetTimeRef.current) > 0.05) {
        seekVideo();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    const vRef = videoRef.current;
    if (vRef) {
      vRef.addEventListener('seeked', handleSeeked);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (vRef) {
        vRef.removeEventListener('seeked', handleSeeked);
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
        style={{ objectPosition: '70% center' }}
        muted
        playsInline
        preload="auto"
      />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 w-full px-5 sm:px-8 py-4 sm:py-5 flex flex-row justify-between items-center bg-transparent">
        {/* Logo */}
        <div className="flex flex-row gap-3 items-center">
          <span className="text-[21px] sm:text-[26px] tracking-tight text-black" style={{ fontFamily: 'var(--font-heading)' }}>
            MTS Education
          </span>
          <span className="text-[25px] sm:text-[30px] text-black select-none tracking-[-0.02em]">
            &#10033;
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex flex-row gap-6 text-[23px] text-black">
          <a href="#" className="hover:opacity-60 transition-opacity">Toán</a>
          <a href="#" className="hover:opacity-60 transition-opacity">Lý</a>
          <a href="#" className="hover:opacity-60 transition-opacity">Hóa</a>
          <a href="#" className="hover:opacity-60 transition-opacity">Tin</a>
          <a href="#" className="hover:opacity-60 transition-opacity">Đề thi HSA/TSA/VACT</a>
          <a href="#" className="hover:opacity-60 transition-opacity">Thi thử TNTHPT</a>
        </div>

        {/* Desktop CTA / Login */}
        <div className="hidden lg:flex flex-row gap-6 items-center">
          <button onClick={onNavigateToLogin} className="text-[23px] text-black hover:opacity-60 transition-opacity">
            Đăng nhập
          </button>
          <a href="#" className="text-[23px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity">
            Vào học ngay
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button 
          className="lg:hidden flex flex-col gap-[5px] z-50 relative"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className={`w-6 h-[2px] bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <div className={`w-6 h-[2px] bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
          <div className={`w-6 h-[2px] bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </nav>

      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-white/98 backdrop-blur-md z-40 flex flex-col justify-center px-8 gap-5 transition-opacity duration-300 overflow-y-auto pt-20 pb-10 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        } lg:hidden`}
      >
        <a href="#" className="text-[24px] font-medium text-black">Toán</a>
        <a href="#" className="text-[24px] font-medium text-black">Lý</a>
        <a href="#" className="text-[24px] font-medium text-black">Hóa</a>
        <a href="#" className="text-[24px] font-medium text-black">Tin</a>
        <a href="#" className="text-[24px] font-medium text-black">Đề thi HSA/TSA/VACT</a>
        <a href="#" className="text-[24px] font-medium text-black">Thi thử TNTHPT</a>
        <div className="w-full h-[1px] bg-black/10 my-2"></div>
        <button onClick={onNavigateToLogin} className="text-[24px] font-medium text-black text-left">Đăng nhập</button>
        <a href="#" className="text-[24px] font-medium text-black underline underline-offset-2">Vào học ngay</a>
      </div>

      {/* Hero Section */}
      <main className="h-screen w-full flex flex-col justify-end pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden">
        <div className="max-w-xl relative z-10">
          
          {/* Blurred Intro Label */}
          <div 
            className="pointer-events-none select-none mb-5 sm:mb-6 text-black font-normal"
            style={{ 
              fontSize: 'clamp(18px, 4vw, 26px)', 
              lineHeight: 1.3, 
              filter: 'blur(4px)' 
            }}
          >
            Hey there, meet A.R.I.A,<br />
            Mainframe's Adaptive Response Interface Agent
          </div>

          {/* Typewriter Text */}
          <p 
            className="text-black mb-5 sm:mb-6 font-normal min-h-[54px]"
            style={{ 
              fontSize: 'clamp(18px, 4vw, 26px)', 
              lineHeight: 1.35,
              fontFamily: "'Lora', serif",
              fontStyle: 'italic'
            }}
          >
            {displayed}
            {!done && (
              <span className="inline-block w-[2px] bg-black align-middle ml-[2px]" style={{ height: '1.1em', animation: 'blink 1s step-end infinite' }}></span>
            )}
          </p>

          {/* Action Pills */}
          <div 
            className="flex flex-wrap gap-y-1"
            style={{
              opacity: showPills ? 1 : 0,
              transform: showPills ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.4s ease, transform 0.4s ease'
            }}
          >
            {['Pitch us an idea', 'Come work here', 'Send a brief hello', 'See how we operate'].map((label) => (
              <button 
                key={label}
                className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200"
              >
                {label}
              </button>
            ))}

            <button 
              onClick={handleCopyEmail}
              className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-transparent text-white border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-white hover:text-black transition-colors duration-200"
            >
              <span>Reach us: <span className="underline underline-offset-1">hello@mainframe.co</span></span>
              {/* Copy Icon (two overlapping rectangles) */}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
          </div>

        </div>
      </main>

      {/* Blinking Cursor Keyframes (Tailwind doesn't have it by default, inline style animation is easier to add in CSS) */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}} />
    </div>
  );
}
