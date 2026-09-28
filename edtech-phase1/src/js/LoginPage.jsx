/**
 * ============================================================
 * LoginPage.jsx - Trang Đăng Nhập Glassmorphism
 * ============================================================
 * 
 * Mô tả: Component React cho trang đăng nhập với phong cách
 *         Glassmorphism (hiệu ứng kính mờ) trên nền Dark Mode.
 * 
 * Cấu trúc:
 *   - Cột trái: Branding (logo, tên hệ thống, mô tả)
 *   - Cột phải: Form đăng nhập (input có icon, nút submit, 
 *               đăng nhập mạng xã hội)
 * 
 * Props:
 *   - onBack: Hàm callback khi người dùng nhấn "Quay lại"
 *             để chuyển về trang chủ
 * 
 * Sử dụng trong: App.jsx
 * ============================================================
 */

import { useState } from "react";
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

  /* ============================================================
     XỬ LÝ SỰ KIỆN KHI SUBMIT FORM
     ============================================================ */
  const handleSubmit = (e) => {
    // Ngăn trang reload khi nhấn nút submit
    e.preventDefault();

    // TODO: Kết nối với Firebase Authentication hoặc API backend tại đây
    // Ví dụ: gọi firebase.auth().signInWithEmailAndPassword(username, password)
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
      {/* --- Các vòng tròn mờ trang trí nền --- */}
      <div className="login-page__bg-circle login-page__bg-circle--blue" />
      <div className="login-page__bg-circle login-page__bg-circle--purple" />

      {/* --- Nút quay lại trang chủ --- */}
      <button className="login-back-btn" onClick={onBack} type="button">
        {/* Icon mũi tên trái (SVG) */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
        Quay lại
      </button>

      {/* ======================================================
          THẺ KÍNH MỜ CHÍNH - Chia làm 2 cột
          ====================================================== */}
      <div className="login-card">

        {/* ===========================================
            CỘT TRÁI: Khu vực Branding / Hình ảnh
            =========================================== */}
        <div className="login-card__left">
          {/* Biểu tượng mũ tốt nghiệp (emoji) */}
          <div className="login-card__logo-icon">🎓</div>

          {/* Tên hệ thống */}
          <h2 className="login-card__brand-title">MTS Education</h2>

          {/* Đường kẻ trang trí */}
          <div className="login-card__brand-divider" />

          {/* Mô tả ngắn */}
          <p className="login-card__brand-desc">
            Nắm vững kiến thức, tự tin chinh phục mọi kỳ thi.
            Hệ thống kết nối gia sư chất lượng cao trên toàn quốc.
          </p>
        </div>

        {/* ===========================================
            CỘT PHẢI: Khu vực Form Đăng Nhập
            =========================================== */}
        <div className="login-card__right">
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
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
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
    </div>
  );
}

export default LoginPage;
