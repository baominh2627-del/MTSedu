/**
 * ============================================================
 * App.jsx - Component Gốc của ứng dụng WEB GIA SƯ
 * ============================================================
 * 
 * Mô tả: Quản lý việc chuyển đổi giữa 2 trang:
 *   - Trang chủ (HomePage): Giao diện chính với danh sách gia sư
 *   - Trang đăng nhập (LoginPage): Giao diện Glassmorphism
 * 
 * Cơ chế: Sử dụng state "currentPage" để quyết định hiển thị
 *          trang nào. Khi nhấn "Đăng nhập" -> chuyển sang LoginPage.
 *          Khi nhấn "Quay lại" trong LoginPage -> quay về HomePage.
 * 
 * Lưu ý: Sau này khi tích hợp React Router, bạn có thể thay thế
 *         cơ chế state này bằng <Route path="/login"> để có URL thật.
 * ============================================================
 */

import { useState } from "react";
import { CrtBackground } from "@designcodeio/threeui";
import LoginPage from "./LoginPage.jsx";
import "../css/App.css";

function App() {
  /* ============================================================
     STATE ĐIỀU HƯỚNG TRANG
     - "home"  : Hiển thị trang chủ
     - "login" : Hiển thị trang đăng nhập
     ============================================================ */
  const [currentPage, setCurrentPage] = useState("home");

  /* ============================================================
     TRANG ĐĂNG NHẬP
     Khi state = "login", render component LoginPage
     ============================================================ */
  if (currentPage === "login") {
    return (
      <LoginPage
        // Truyền hàm callback để LoginPage có thể quay về trang chủ
        onBack={() => setCurrentPage("home")}
      />
    );
  }

  /* ============================================================
     TRANG CHỦ (Mặc định)
     Giữ nguyên giao diện retro CRT ban đầu
     ============================================================ */
  return (
    <CrtBackground>
      {/* Vùng chứa toàn bộ nội dung web để không bị dính sát lề */}
      <div className="container">
        {/* =============================================
            PHẦN ĐẦU TRANG (Header)
            ============================================= */}
        <header className="header">
          <h1>WEB GIA SƯ</h1>
          <nav>
            {/* Nút Đăng nhập: chuyển sang trang LoginPage */}
            <button onClick={() => setCurrentPage("login")}>
              Đăng nhập
            </button>
            <button className="btn-primary">Đăng ký làm Gia Sư</button>
          </nav>
        </header>

        {/* =============================================
            PHẦN NỘI DUNG CHÍNH (Main Content)
            ============================================= */}
        <main>
          {/* Khu vực tìm kiếm */}
          <section className="hero-section">
            <h2>Tìm Gia Sư Chất Lượng Cao</h2>
            <p>Kết nối học sinh và gia sư giỏi trên toàn quốc</p>
            <div className="search-box">
              <input
                type="text"
                placeholder="Nhập môn học (Toán, Lý, Tiếng Anh...)"
              />
              <button>Tìm Kiếm</button>
            </div>
          </section>

          {/* Danh sách gia sư mẫu */}
          <section className="tutor-list">
            <h3>Gia Sư Nổi Bật</h3>
            <div className="grid-cards">
              {/* Khung thông tin gia sư 1 */}
              <div className="card">
                <h4>Nguyễn Văn A</h4>
                <p>
                  <strong>Môn dạy:</strong> Toán, Vật Lý
                </p>
                <p>
                  <strong>Khu vực:</strong> Sinh viên - Hà Nội
                </p>
                <button>Xem chi tiết</button>
              </div>

              {/* Khung thông tin gia sư 2 */}
              <div className="card">
                <h4>Trần Thị B</h4>
                <p>
                  <strong>Môn dạy:</strong> Tiếng Anh (IELTS)
                </p>
                <p>
                  <strong>Khu vực:</strong> Giáo viên - Online
                </p>
                <button>Xem chi tiết</button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </CrtBackground>
  );
}

export default App;
