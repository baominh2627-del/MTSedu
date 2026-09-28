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
import LoginPage from "./LoginPage.jsx";
import MainframeHome from "./MainframeHome.jsx";
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
     TRANG CHỦ (Mainframe)
     ============================================================ */
  return <MainframeHome onNavigateToLogin={() => setCurrentPage("login")} />;
}

export default App;
