/**
 * ============================================================
 * App.jsx - Component Gốc của ứng dụng WEB GIA SƯ
 * ============================================================
 * 
 * Mô tả: Quản lý việc chuyển đổi giữa 2 trang:
 *   - Trang chủ (HomePage): Giao diện chính với danh sách gia sư
 *   - Trang đăng nhập (LoginPage): Giao diện Glassmorphism
 * 
 * Cơ chế: Sử dụng hash-based routing để giữ nguyên trang khi F5.
 *         Khi nhấn "Đăng nhập" -> chuyển sang LoginPage.
 *         Khi nhấn "Quay lại" trong LoginPage -> quay về HomePage.
 * 
 * Authentication: Sử dụng AuthContext + Firebase Realtime Database.
 *         User phải đăng nhập để làm bài thi.
 * ============================================================
 */

import { useState, useEffect, useCallback } from "react";
import { AuthProvider } from "./AuthContext.jsx";
import LoginPage from "./LoginPage.jsx";
import MainframeHome from "./MainframeHome.jsx";
import SubjectPage from "./SubjectPage.jsx";
import ProfilePage from "./ProfilePage.jsx";
import FeedbackModal from "./FeedbackModal.jsx";
import "../css/App.css";

// Đọc trang hiện tại từ URL hash (ví dụ: #math -> "math")
function getPageFromHash() {
  const hash = window.location.hash.replace("#", "").trim();
  return hash || "home";
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState(getPageFromHash);
  // Lưu trang trước đó để quay lại sau khi đăng nhập
  const [returnPage, setReturnPage] = useState(null);

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

  // Hàm chuyển đến login và lưu trang hiện tại để quay lại sau
  const navigateToLoginWithReturn = useCallback((fromPage) => {
    setReturnPage(fromPage || currentPage);
    navigateTo("login");
  }, [currentPage, navigateTo]);

  // Callback khi đăng nhập thành công
  const handleLoginSuccess = useCallback(() => {
    if (returnPage && returnPage !== "login") {
      navigateTo(returnPage);
      setReturnPage(null);
    } else {
      navigateTo("home");
    }
  }, [returnPage, navigateTo]);

  if (currentPage === "login") {
    return (
      <LoginPage
        onBack={() => {
          if (returnPage && returnPage !== "login") {
            navigateTo(returnPage);
            setReturnPage(null);
          } else {
            navigateTo("home");
          }
        }}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  // Handle all subjects dynamically
  const subjects = ["physics", "math", "chemistry", "informatics", "hsa", "tsa", "vact", "mock_exams"];
  if (subjects.includes(currentPage)) {
    return (
      <SubjectPage 
        onNavigate={navigateTo} 
        subjectKey={currentPage}
        onRequireLogin={() => navigateToLoginWithReturn(currentPage)}
      />
    );
  }

  if (currentPage === "profile") {
    return <ProfilePage onNavigate={navigateTo} />;
  }

  return (
    <MainframeHome 
      onNavigateToLogin={() => navigateTo("login")} 
      onNavigate={navigateTo}
    />
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
      <FeedbackModal />
    </AuthProvider>
  );
}

export default App;
