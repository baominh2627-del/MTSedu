import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

const ExamOverlayContext = createContext(null);

function isOsFullscreen() {
  return !!(document.fullscreenElement || document.webkitFullscreenElement);
}

function enterOsFullscreen() {
  if (isOsFullscreen()) return;
  const el = document.documentElement;
  const req = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen;
  if (req) {
    Promise.resolve(req.call(el)).catch(() => {});
  }
}

function exitOsFullscreen() {
  if (!isOsFullscreen()) return;
  const exit = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
  if (exit) {
    Promise.resolve(exit.call(document)).catch(() => {});
  }
}

export function useExamOverlay() {
  const ctx = useContext(ExamOverlayContext);
  if (!ctx) {
    throw new Error('useExamOverlay must be used inside ExamOverlayProvider');
  }
  return ctx;
}

export function ExamOverlayProvider({ children }) {
  const [activeExam, setActiveExam] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(isOsFullscreen);
  const [promptReady, setPromptReady] = useState(false);

  const openExam = useCallback((url, title = 'Bài thi') => {
    let origin = window.location.origin;
    try {
      origin = new URL(url, window.location.origin).origin;
    } catch {}
    // Gọi ngay trong user click handler để bật chế độ toàn màn hình từ lúc vừa mở bài thi
    setPromptReady(false);
    enterOsFullscreen();
    setIsFullscreen(isOsFullscreen());
    setActiveExam({ url, title, origin, submitted: false });
  }, []);

  const closeExam = useCallback(() => {
    exitOsFullscreen();
    setActiveExam(null);
    setPromptReady(false);
  }, []);

  useEffect(() => {
    if (!activeExam) return undefined;
    const graceTimer = setTimeout(() => setPromptReady(true), 350);
    return () => clearTimeout(graceTimer);
  }, [activeExam?.url]);

  useEffect(() => {
    if (!activeExam) return undefined;

    const handleFullscreenChange = () => {
      const active = isOsFullscreen();
      setIsFullscreen(active);
      if (!active) setPromptReady(true);
    };

    const handleMessage = (event) => {
      if (!event?.data || typeof event.data !== 'object') return;
      if (activeExam.origin && event.origin && event.origin !== activeExam.origin) return;

      if (event.data.type === 'MTSEDU_EXAM_SUBMITTED') {
        // Chỉ thoát cơ chế toàn màn hình sau khi học sinh đã nộp bài xong
        setActiveExam((prev) => (prev ? { ...prev, submitted: true } : prev));
        exitOsFullscreen();
      } else if (event.data.type === 'MTSEDU_EXAM_CLOSE') {
        closeExam();
      } else if (event.data.type === 'MTSEDU_EXAM_REQUEST_FULLSCREEN') {
        if (!activeExam.submitted) enterOsFullscreen();
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    window.addEventListener('message', handleMessage);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      window.removeEventListener('message', handleMessage);
    };
  }, [activeExam, closeExam]);

  return (
    <ExamOverlayContext.Provider value={{ activeExam, openExam, closeExam }}>
      {children}
      {activeExam && (
        <div
          className="fixed inset-0 z-[9999] w-screen h-screen bg-white flex flex-col overflow-hidden"
          data-exam-submitted={activeExam.submitted ? 'true' : 'false'}
        >
          {!activeExam.submitted && !isFullscreen && promptReady && (
            <button
              type="button"
              onClick={enterOsFullscreen}
              className="fixed top-2.5 right-4 z-[10000] px-4 py-2 rounded-full bg-[#1e3a8a] hover:bg-[#172554] text-white text-xs sm:text-sm font-semibold shadow-lg transition cursor-pointer"
            >
              ⛶ Bật toàn màn hình để tiếp tục làm bài
            </button>
          )}

          {activeExam.submitted && (
            <button
              type="button"
              onClick={closeExam}
              className="fixed top-2.5 right-4 z-[10000] px-4 py-2 rounded-full bg-black/85 hover:bg-black text-white text-xs sm:text-sm font-semibold shadow-lg transition cursor-pointer"
            >
              ✕ Đóng bài thi
            </button>
          )}

          <iframe
            key={activeExam.url}
            src={activeExam.url}
            title={activeExam.title}
            allow="fullscreen"
            allowFullScreen
            className="w-full h-full flex-1 border-0 bg-white"
          />
        </div>
      )}
    </ExamOverlayContext.Provider>
  );
}
