# Tóm tắt dự án MTS Education

## 1. Tổng quan dự án
MTS Education là một nền tảng giáo dục trực tuyến (EdTech) được xây dựng bằng **React**, **Vite**, và **Tailwind CSS**. Ứng dụng cung cấp giao diện hiển thị các bài kiểm tra, đề thi thử cho nhiều môn học (Toán, Lý, Hóa, Tin học, HSA/TSA...) và được tích hợp hệ thống xác thực người dùng thông qua **Firebase**.

## 2. Cấu trúc thư mục chính
Dự án được tổ chức theo cấu trúc tiêu chuẩn của một ứng dụng Vite + React:

```text
MTSedu/
├── edtech-phase1/
│   └── src/
│       ├── css/           # Các file CSS toàn cục và CSS riêng cho component
│       ├── data/          # Dữ liệu tĩnh (Mock data) của ứng dụng
│       └── js/            # Source code React (Components, Context, Logic)
├── public/                # Tài nguyên tĩnh (images, fonts...) được Vite phục vụ trực tiếp
├── dist/                  # Thư mục chứa code đã được build sẵn sàng cho production
├── _Database/             # (Tài liệu/Backup) Dữ liệu cơ sở dữ liệu
├── _TaiLieu_HuongDan/     # (Tài liệu) Hướng dẫn dự án
├── _Tao_Taikhoan/         # (Tài liệu) Dữ liệu tạo tài khoản
└── ... (Các file cấu hình ở root)
```

## 3. Chức năng các tệp tin quan trọng (Source Code)

### 3.1. Routing & Core (`edtech-phase1/src/js/`)
- `main.jsx`: Điểm vào (Entry point) của ứng dụng React, render component `<App />` vào DOM.
- `App.jsx`: Component gốc quản lý Routing (điều hướng) giữa các trang chính như `home`, `login`, `math`, `physics`, v.v.

### 3.2. Xác thực người dùng (Authentication)
- `firebase.js`: Chứa cấu hình kết nối Firebase (API keys) và khởi tạo các dịch vụ Firebase (Auth, Analytics).
- `AuthContext.jsx`: React Context quản lý trạng thái đăng nhập toàn cục (`user`, `isLoggedIn`, hàm `logout`), chia sẻ state này cho toàn bộ ứng dụng.
- `LoginPage.jsx`: Giao diện đăng nhập và đăng ký, xử lý logic xác thực với Firebase.

### 3.3. Giao diện (Pages & Components)
- `MainframeHome.jsx`: Trang chủ (Landing Page) của nền tảng. Chứa thanh Navbar tổng, hiệu ứng gõ chữ (Typewriter), các nút liên hệ (Facebook, Zalo, TikTok) và menu điều hướng dạng dropdown cho mobile.
- `SubjectPage.jsx`: Giao diện hiển thị chi tiết cho từng môn học (được tái sử dụng cho Toán, Lý, Hóa...). Bao gồm:
  - Thanh tìm kiếm (Search bar) trung tâm.
  - Bộ lọc bên trái (Theo danh mục, mức phí).
  - Lưới hiển thị các thẻ bài kiểm tra (Exam cards).

### 3.4. Dữ liệu & Styling
- `data/subjectsData.js`: Chứa dữ liệu cứng (metadata, danh sách bài kiểm tra) cho từng môn học để render linh hoạt vào `SubjectPage.jsx`.
- `css/App.css` & `css/LoginPage.css`: Chứa các custom CSS (như hình nền `mts-bg` với radial-gradient, các class không hỗ trợ sẵn bởi Tailwind).

### 3.5. Cấu hình dự án (Root files)
- `package.json` / `package-lock.json`: Quản lý các thư viện dependencies (React, Vite, Firebase, Tailwind...).
- `vite.config.js`: File cấu hình cho Vite bundler.
- `tailwind.config.js` / `postcss.config.js`: Cấu hình Tailwind CSS và PostCSS.
- `.env`: Chứa các biến môi trường (như Firebase API Keys) - được bảo mật và không đưa lên Git (`.gitignore`).
- `index.html`: File HTML gốc định nghĩa khung trang web, load các CDN fonts (Google Fonts) và nhúng file `main.jsx`.

## 4. Công nghệ sử dụng (Tech Stack)
- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Custom CSS
- **Backend/Auth**: Firebase Authentication
- **Hosting/Deploy**: Auto-deploy qua Vercel/GitHub Pages
