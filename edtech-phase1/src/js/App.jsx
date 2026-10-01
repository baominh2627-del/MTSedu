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

import { useState, useEffect, useCallback } from "react";
import LoginPage from "./LoginPage.jsx";
import MainframeHome from "./MainframeHome.jsx";
import SubjectPage from "./SubjectPage.jsx";
import "../css/App.css";

// Đọc trang hiện tại từ URL hash (ví dụ: #math -> "math")
function getPageFromHash() {
  const hash = window.location.hash.replace("#", "").trim();
  return hash || "home";
}

function App() {
  const [currentPage, setCurrentPage] = useState(getPageFromHash);

  // Khi user nhấn nút quay lại trình duyệt hoặc hash thay đổi
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getPageFromHash());
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Hàm navigate cập nhật cả hash URL và state
  const navigateTo = useCallback((page) => {
    if (page === "home") {
      // Xóa hash khi về trang chủ
      window.history.pushState(null, "", window.location.pathname);
    } else {
      window.location.hash = page;
    }
    setCurrentPage(page);
  }, []);

  if (currentPage === "login") {
    return (
      <LoginPage
        onBack={() => navigateTo("home")}
      />
    );
  }

  // Handle all subjects dynamically
  const subjects = ["physics", "math", "chemistry", "informatics", "hsa", "mock_exams"];
  if (subjects.includes(currentPage)) {
    return (
      <SubjectPage 
        onNavigate={navigateTo} 
        subjectKey={currentPage}
      />
    );
  }

  return (
    <MainframeHome 
      onNavigateToLogin={() => navigateTo("login")} 
      onNavigate={navigateTo}
    />
  );
}

export default App;
