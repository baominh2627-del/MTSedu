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
import SubjectPage from "./SubjectPage.jsx";
import "../css/App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  if (currentPage === "login") {
    return (
      <LoginPage
        onBack={() => setCurrentPage("home")}
      />
    );
  }

  // Handle all subjects dynamically
  const subjects = ["physics", "math", "chemistry", "informatics", "hsa", "mock_exams"];
  if (subjects.includes(currentPage)) {
    return (
      <SubjectPage 
        onNavigate={(page) => setCurrentPage(page)} 
        subjectKey={currentPage}
      />
    );
  }

  return (
    <MainframeHome 
      onNavigateToLogin={() => setCurrentPage("login")} 
      onNavigate={(page) => setCurrentPage(page)}
    />
  );
}

export default App;
