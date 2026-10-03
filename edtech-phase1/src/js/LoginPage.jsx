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
 *   - onLoginSuccess: Hàm callback khi đăng nhập thành công
 * 
 * Sử dụng trong: App.jsx
 * ============================================================
 */

import { useState, useEffect, useRef } from "react";
import { useAuth } from "./AuthContext.jsx";
import "../css/LoginPage.css";

function LoginPage({ onBack, onLoginSuccess }) {
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

  // Thông báo lỗi/thành công
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auth context
  const { login } = useAuth();

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
  const handleSubmit = async (e) => {
    // Ngăn trang reload khi nhấn nút submit
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const result = await login(username, password);
      if (result.success) {
        // Đăng nhập thành công → callback
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      } else {
        setError(result.error || "Tên đăng nhập hoặc mật khẩu không đúng.");
      }
    } catch (err) {
      setError("Có lỗi xảy ra. Vui lòng thử lại sau.");
      console.error("Login error:", err);
    } finally {
      setIsSubmitting(false);
    }
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

        {/* Thông báo lỗi */}
        {error && (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '13px',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {/* Form đăng nhập */}
        <form onSubmit={handleSubmit}>

          {/* --- Ô nhập Email / Tên đăng nhập --- */}
          <div className="login-input-group">
            <label className="login-input-group__label">
              Tên đăng nhập
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
                placeholder="Nhập tên tài khoản..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
          </div>

          {/* --- Nút Đăng nhập --- */}
          <button 
            type="submit" 
            className="login-submit-btn"
            disabled={isSubmitting}
            style={isSubmitting ? { opacity: 0.7, cursor: 'not-allowed' } : {}}
          >
            {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
            {!isSubmitting && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="login-submit-btn__arrow">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </form>

        {/* --- Thông tin liên hệ --- */}
        <p className="login-signup-link">
          Tài khoản được cung cấp bởi giáo viên.{" "}
          <a href="https://zalo.me/0372336302" target="_blank" rel="noopener noreferrer">Liên hệ</a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
