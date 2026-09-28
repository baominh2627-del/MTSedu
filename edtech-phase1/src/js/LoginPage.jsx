/**
 * ============================================================
 * LoginPage.jsx - Trang Đăng Nhập (Light Theme)
 * ============================================================
 * 
 * Mô tả: Component React cho trang đăng nhập với phong cách
 *         sáng, hiện đại, tương thích với trang chủ MainframeHome.
 *         Sử dụng cùng video background + mouse scrub effect.
 * 
 * Cấu trúc:
 *   - Video nền (giống trang chủ, scrub theo chuột)
 *   - Card đăng nhập nổi giữa màn hình
 *   - Branding + Form đăng nhập
 * 
 * Props:
 *   - onBack: Hàm callback khi người dùng nhấn "Quay lại"
 *             để chuyển về trang chủ
 * 
 * Sử dụng trong: App.jsx
 * ============================================================
 */

import { useState, useEffect, useRef } from "react";
import "../css/LoginPage.css";

function LoginPage({ onBack }) {
  /* ============================================================
     STATE QUẢN LÝ DỮ LIỆU FORM
     ============================================================ */

  // Lưu giá trị người dùng nhập vào ô "Email / Tên đăng nhập"
  const [username, setUsername] = useState("");

  // Lưu giá trị mật khẩu
  const [password, setPassword] = useState("");

  // Trạng thái checkbox "Ghi nhớ tài khoản"
  const [remember, setRemember] = useState(false);

  // Trạng thái hiển thị/ẩn mật khẩu
  const [showPassword, setShowPassword] = useState(false);

  /* ============================================================
     VIDEO BACKGROUND - Mouse Scrub Effect (giống trang chủ)
     ============================================================ */
  const videoRef = useRef(null);
  const prevXRef = useRef(0);
  const targetTimeRef = useRef(0);
  const isSeekingRef = useRef(false);

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

  /* ============================================================
     XỬ LÝ SỰ KIỆN KHI SUBMIT FORM
     ============================================================ */
  const handleSubmit = (e) => {
    // Ngăn trang reload khi nhấn nút submit
    e.preventDefault();

    // TODO: Kết nối với Firebase Authentication hoặc API backend tại đây
    console.log("=== THÔNG TIN ĐĂNG NHẬP ===");
    console.log("Tài khoản:", username);
    console.log("Mật khẩu:", password);
    console.log("Ghi nhớ:", remember);

    // Hiện thông báo tạm thời (sau này thay bằng logic xác thực thật)
    alert(`Đăng nhập thành công!\nTài khoản: ${username}`);
  };

  /* ============================================================
     RENDER GIAO DIỆN
     ============================================================ */
  return (
    <div className="login-page">
      {/* --- Video nền (giống trang chủ) --- */}
      <video
        ref={videoRef}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4"
        className="login-video-bg"
        muted
        playsInline
        preload="auto"
      />

      {/* --- Lớp phủ gradient sáng --- */}
      <div className="login-overlay" />

      {/* --- Nút quay lại trang chủ --- */}
      <button className="login-back-btn" onClick={onBack} type="button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
        Quay lại
      </button>

      {/* ======================================================
          THẺ ĐĂNG NHẬP - Light Theme Card
          ====================================================== */}
      <div className="login-card">

        {/* ===========================================
            KHU VỰC BRANDING
            =========================================== */}
        <div className="login-card__brand">
          {/* Logo icon */}
          <div className="login-card__logo-icon">🎓</div>
          {/* Tên hệ thống */}
          <h2 className="login-card__brand-title">MTS Education</h2>
        </div>

        {/* Đường kẻ trang trí */}
        <div className="login-card__divider" />

        {/* ===========================================
            TIÊU ĐỀ FORM
            =========================================== */}
        <h2 className="login-card__form-title">Đăng nhập</h2>
        <p className="login-card__form-subtitle">
          Chào mừng bạn quay trở lại!
        </p>

        {/* Form đăng nhập */}
        <form onSubmit={handleSubmit}>

          {/* --- Ô nhập Email / Tên đăng nhập --- */}
          <div className="login-input-group">
            <label className="login-input-group__label">
              Email hoặc Tên đăng nhập
            </label>
            <div className="login-input-wrapper">
              {/* Icon User (SVG inline) */}
              <svg className="login-input-wrapper__icon"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <input
                className="login-input-wrapper__field"
                type="text"
                placeholder="Nhập email hoặc tên tài khoản..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          {/* --- Ô nhập Mật khẩu --- */}
          <div className="login-input-group">
            <label className="login-input-group__label">
              Mật khẩu
            </label>
            <div className="login-input-wrapper">
              {/* Icon ổ khóa (SVG inline) */}
              <svg className="login-input-wrapper__icon"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                className="login-input-wrapper__field"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* Nút toggle hiện/ẩn mật khẩu */}
              <button
                type="button"
                className="login-input-wrapper__toggle"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* --- Ghi nhớ tài khoản & Quên mật khẩu --- */}
          <div className="login-form-actions">
            <label className="login-form-actions__remember">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Ghi nhớ tài khoản
            </label>
            <a href="#" className="login-form-actions__forgot">
              Quên mật khẩu?
            </a>
          </div>

          {/* --- Nút Đăng nhập --- */}
          <button type="submit" className="login-submit-btn">
            Đăng nhập
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="login-submit-btn__arrow">
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </button>
        </form>

        {/* ===========================================
            KHU VỰC ĐĂNG NHẬP MẠNG XÃ HỘI
            =========================================== */}
        <div className="login-social">
          {/* Đường kẻ ngăn cách với dòng chữ ở giữa */}
          <div className="login-social__divider">
            <span className="login-social__divider-text">
              Hoặc tiếp tục với
            </span>
          </div>

          {/* Các nút icon mạng xã hội */}
          <div className="login-social__icons">

            {/* Nút Google */}
            <button className="login-social__btn" type="button" title="Đăng nhập bằng Google">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A11.96 11.96 0 0 0 1 12c0 1.94.46 3.77 1.18 5.42l3.66-2.84z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </button>

            {/* Nút Facebook */}
            <button className="login-social__btn" type="button" title="Đăng nhập bằng Facebook">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>

            {/* Nút GitHub */}
            <button className="login-social__btn" type="button" title="Đăng nhập bằng GitHub">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </button>
          </div>
        </div>

        {/* --- Link đăng ký tài khoản mới --- */}
        <p className="login-signup-link">
          Chưa có tài khoản?{" "}
          <a href="#">Đăng ký ngay</a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
