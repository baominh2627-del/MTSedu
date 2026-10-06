# Tổng hợp Code: Subject Module


## 1. edtech-phase1/src/js/SubjectPage.jsx
``jsx
import React, { useState } from 'react';
import { subjectsData } from '../data/subjectsData.js';
import { useAuth } from './AuthContext.jsx';

export default function SubjectPage({ onNavigate, subjectKey, onRequireLogin }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState('Tất cả');

  const data = subjectsData[subjectKey] || subjectsData['physics'];
  const mockTests = data.tests;

  const handleCategoryChange = (cat) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const displayedTests = mockTests.filter(test => {
    const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(test.tag);
    
    let matchesPrice = true;
    if (selectedPrice === 'Miễn phí') {
      matchesPrice = test.price.toLowerCase() === 'miễn phí';
    } else if (selectedPrice === 'Có phí') {
      matchesPrice = test.price.toLowerCase() !== 'miễn phí';
    }

    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Xử lý khi click vào bài thi: kiểm tra đăng nhập trước
  const handleTestClick = (test) => {
    if (!isLoggedIn) {
      // Chưa đăng nhập → yêu cầu đăng nhập
      onRequireLogin();
      return;
    }
    // Đã đăng nhập → chuyển sang bài thi TRONG CÙNG TAB (không mở tab mới)
    if (test.link) {
      // Truyền thông tin user qua URL params (vì localStorage bị cô lập theo domain)
      const url = new URL(test.link);
      url.searchParams.set('mtsedu_user', user.username || '');
      url.searchParams.set('mtsedu_name', user.displayName || user.username || '');
      url.searchParams.set('mtsedu_id', user.id || ('user_' + user.username));
      // Lưu URL trang chủ để quiz có thể quay lại
      url.searchParams.set('mtsedu_return', window.location.origin + window.location.pathname + '#' + subjectKey);
      window.location.href = url.toString();
    } else {
      alert('Bài thi này đang được cập nhật. Vui lòng quay lại sau!');
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="relative w-full min-h-screen mts-bg text-black font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-8 py-3 sm:py-4 flex flex-row justify-between items-center bg-white/80 backdrop-blur-md border-b border-black/8">
        <div 
          className="flex flex-row gap-2 items-center cursor-pointer hover:opacity-70 transition-opacity"
          onClick={() => onNavigate('home')}
        >
          <span className="text-[18px] sm:text-[22px] lg:text-[26px] tracking-tight text-black font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
            MTS Education
          </span>
          <span className="text-[22px] sm:text-[26px] lg:text-[30px] text-black/40 select-none">
            &#10033;
          </span>
        </div>

        <div className="hidden lg:flex flex-row gap-6 items-center">
          <button onClick={() => onNavigate('math')} className={`text-[18px] font-bold uppercase tracking-wider px-5 py-3 rounded-lg transition-all whitespace-nowrap ${subjectKey === 'math' ? 'text-black bg-black/8' : 'text-black/70 hover:text-black hover:bg-black/8'}`}>Toán Học</button>
          <button onClick={() => onNavigate('physics')} className={`text-[18px] font-bold uppercase tracking-wider px-5 py-3 rounded-lg transition-all whitespace-nowrap ${subjectKey === 'physics' ? 'text-black bg-black/8' : 'text-black/70 hover:text-black hover:bg-black/8'}`}>Vật Lý</button>
          <button onClick={() => onNavigate('chemistry')} className={`text-[18px] font-bold uppercase tracking-wider px-5 py-3 rounded-lg transition-all whitespace-nowrap ${subjectKey === 'chemistry' ? 'text-black bg-black/8' : 'text-black/70 hover:text-black hover:bg-black/8'}`}>Hóa Học</button>
          <button onClick={() => onNavigate('informatics')} className={`text-[18px] font-bold uppercase tracking-wider px-5 py-3 rounded-lg transition-all whitespace-nowrap ${subjectKey === 'informatics' ? 'text-black bg-black/8' : 'text-black/70 hover:text-black hover:bg-black/8'}`}>Tin Học</button>
          <button onClick={() => onNavigate('hsa')} className={`text-[18px] font-bold uppercase tracking-wider px-5 py-3 rounded-lg transition-all whitespace-nowrap ${subjectKey === 'hsa' ? 'text-black bg-black/8' : 'text-black/70 hover:text-black hover:bg-black/8'}`}>Đề thi HSA/TSA</button>
          <button onClick={() => onNavigate('mock_exams')} className={`text-[18px] font-bold uppercase tracking-wider px-5 py-3 rounded-lg transition-all whitespace-nowrap ${subjectKey === 'mock_exams' ? 'text-black bg-black/8' : 'text-black/70 hover:text-black hover:bg-black/8'}`}>Thi thử TNTHPT</button>
        </div>

        <div className="hidden lg:flex flex-row gap-4 items-center">
          {isLoggedIn ? (
            <>
              <span className="text-[17px] text-black/60 flex items-center gap-2">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                {user?.displayName || user?.username}
              </span>
              <button 
                onClick={handleLogout}
                className="text-[17px] font-bold text-red-500 uppercase tracking-wider px-5 py-3 rounded-lg hover:text-red-700 hover:bg-red-50 transition-all whitespace-nowrap"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <button onClick={() => onNavigate('login')} className="text-[18px] font-bold text-black/70 uppercase tracking-wider px-5 py-3 rounded-lg hover:text-black hover:bg-black/8 transition-all whitespace-nowrap">
              Đăng nhập
            </button>
          )}
        </div>

        {/* Mobile right: login + hamburger */}
        <div className="lg:hidden flex flex-row items-center gap-2">
          {!isLoggedIn && (
            <button onClick={() => onNavigate('login')} className="text-[13px] font-semibold text-black border border-black/15 px-3 py-1.5 rounded-full hover:bg-black/5 transition-colors whitespace-nowrap">
              Đăng nhập
            </button>
          )}
          {isLoggedIn && (
            <span className="text-[13px] text-black/60 font-medium truncate max-w-[80px]">
              {user?.displayName || user?.username}
            </span>
          )}
          <button 
            className="flex flex-col gap-[5px] z-50 relative p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className={`w-5 h-[2px] bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <div className={`w-5 h-[2px] bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <div className={`w-5 h-[2px] bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu (compact, not fullscreen) */}
      <div 
        className={`fixed top-[58px] left-3 right-3 bg-white/97 backdrop-blur-xl rounded-2xl shadow-2xl border border-black/8 z-40 flex flex-col gap-1 p-3 transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-3'
        } lg:hidden`}
      >
        <button onClick={() => { setIsMenuOpen(false); onNavigate('math'); }} className={`text-[15px] font-semibold px-4 py-2.5 rounded-xl hover:bg-black/6 transition-colors text-left ${subjectKey === 'math' ? 'text-black font-bold' : 'text-black/80'}`}>Toán Học</button>
        <button onClick={() => { setIsMenuOpen(false); onNavigate('physics'); }} className={`text-[15px] font-semibold px-4 py-2.5 rounded-xl hover:bg-black/6 transition-colors text-left ${subjectKey === 'physics' ? 'text-black font-bold' : 'text-black/80'}`}>Vật Lý</button>
        <button onClick={() => { setIsMenuOpen(false); onNavigate('chemistry'); }} className={`text-[15px] font-semibold px-4 py-2.5 rounded-xl hover:bg-black/6 transition-colors text-left ${subjectKey === 'chemistry' ? 'text-black font-bold' : 'text-black/80'}`}>Hóa Học</button>
        <button onClick={() => { setIsMenuOpen(false); onNavigate('informatics'); }} className={`text-[15px] font-semibold px-4 py-2.5 rounded-xl hover:bg-black/6 transition-colors text-left ${subjectKey === 'informatics' ? 'text-black font-bold' : 'text-black/80'}`}>Tin Học</button>
        <button onClick={() => { setIsMenuOpen(false); onNavigate('hsa'); }} className={`text-[15px] font-semibold px-4 py-2.5 rounded-xl hover:bg-black/6 transition-colors text-left ${subjectKey === 'hsa' ? 'text-black font-bold' : 'text-black/80'}`}>Đề thi HSA/TSA</button>
        <button onClick={() => { setIsMenuOpen(false); onNavigate('mock_exams'); }} className={`text-[15px] font-semibold px-4 py-2.5 rounded-xl hover:bg-black/6 transition-colors text-left ${subjectKey === 'mock_exams' ? 'text-black font-bold' : 'text-black/80'}`}>Thi thử TNTHPT</button>
        <div className="w-full h-[1px] bg-black/8 my-1"></div>
        {isLoggedIn ? (
          <button onClick={() => { setIsMenuOpen(false); handleLogout(); }} className="text-[15px] font-semibold text-red-500 px-4 py-2.5 rounded-xl hover:bg-red-50 transition-colors text-left">Đăng xuất</button>
        ) : (
          <button onClick={() => { setIsMenuOpen(false); onNavigate('login'); }} className="text-[15px] font-semibold text-white bg-black px-4 py-2.5 rounded-xl hover:bg-black/80 transition-colors text-center">Vào học ngay</button>
        )}
      </div>

      {/* Main Content */}
      <main className="pt-[72px] sm:pt-[80px] pb-[60px] px-5 sm:px-8 md:px-10 max-w-[1400px] mx-auto">
        
        {/* Page Header (Title) */}
        <div className="mb-10 pb-6 border-b border-black/5">
          <h1 className="text-4xl sm:text-5xl font-bold text-black tracking-tight">{data.title}</h1>
        </div>

        {/* Search bar - centered, full width, above everything */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center bg-white rounded-full w-full max-w-2xl px-7 py-5 gap-5"
            style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
            <span className="text-black/35 text-[32px] font-light leading-none select-none">+</span>
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="flex-1 bg-transparent outline-none border-none text-[20px] text-black placeholder-black/35 font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg className="w-7 h-7 text-black/45 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>

        {/* Thông báo chưa đăng nhập */}
        {!isLoggedIn && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3">
            <svg className="w-5 h-5 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p className="text-sm text-amber-700">
              Bạn cần <button onClick={onRequireLogin} className="font-semibold underline hover:no-underline">đăng nhập</button> để làm bài thi.
            </p>
          </div>
        )}
          
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - only filters now */}
          <aside className="w-full lg:w-[240px] shrink-0 flex flex-col gap-6">

            <div className="p-5 bg-white border border-black/10 rounded-lg shadow-sm">
              <h4 className="text-xl font-bold mb-4">Danh mục</h4>
              <ul className="flex flex-col gap-3 text-[16px]">
                {data.categories && data.categories.map((cat, idx) => (
                  <li key={idx}>
                    <label className="flex items-center gap-3 cursor-pointer hover:text-gray-600">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 accent-black" 
                        checked={selectedCategories.includes(cat)}
                        onChange={() => handleCategoryChange(cat)}
                      /> {cat}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 bg-white border border-black/10 rounded-lg shadow-sm">
              <h4 className="text-xl font-bold mb-4">Mức phí</h4>
              <ul className="flex flex-col gap-3 text-[16px]">
                <li><label className="flex items-center gap-3 cursor-pointer hover:text-gray-600"><input type="radio" name="price" className="w-4 h-4 accent-black" checked={selectedPrice === 'Tất cả'} onChange={() => setSelectedPrice('Tất cả')} /> Tất cả</label></li>
                <li><label className="flex items-center gap-3 cursor-pointer hover:text-gray-600"><input type="radio" name="price" className="w-4 h-4 accent-black" checked={selectedPrice === 'Miễn phí'} onChange={() => setSelectedPrice('Miễn phí')} /> Miễn phí</label></li>
                <li><label className="flex items-center gap-3 cursor-pointer hover:text-gray-600"><input type="radio" name="price" className="w-4 h-4 accent-black" checked={selectedPrice === 'Có phí'} onChange={() => setSelectedPrice('Có phí')} /> Có phí</label></li>
              </ul>
            </div>
          </aside>

          {/* Grid Content */}
          <div className="flex-1">

            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <p className="text-gray-600">Hiển thị {displayedTests.length} bài kiểm tra</p>
              <select className="px-4 py-2 bg-white border border-black/10 rounded-md focus:outline-none focus:border-black/30 cursor-pointer">
                <option>Mới nhất</option>
                <option>Phổ biến nhất</option>
                <option>Được làm nhiều nhất</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {displayedTests.map((test) => {
                return (
                  <div 
                    key={test.id} 
                    onClick={() => handleTestClick(test)}
                    className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-black/5 transition-all duration-300 flex flex-col cursor-pointer"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video overflow-hidden bg-gray-200">
                      <img 
                        src={test.thumbnail} 
                        alt={test.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 bg-black text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {test.tag}
                      </div>
                      {/* Lock icon nếu chưa đăng nhập */}
                      {!isLoggedIn && (
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3 shadow-lg">
                            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeWidth="2"></rect>
                              <path d="M7 11V7a5 5 0 0110 0v4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                          {test.questions} Câu
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                          {test.time} Phút
                        </span>
                      </div>
                      
                      <h5 className="font-bold text-[18px] leading-snug mb-4 line-clamp-2 hover:text-gray-600 transition-colors">
                        {test.title}
                      </h5>

                      <div className="mt-auto pt-4 border-t border-black/5 flex items-center justify-between">
                        <div className="font-semibold text-black">
                          {test.price === "Miễn phí" ? (
                            <span className="text-green-600 bg-green-50 px-2 py-1 rounded-md text-sm">{test.price}</span>
                          ) : (
                            <span>{test.price}</span>
                          )}
                        </div>
                        <div className="text-sm font-medium text-gray-600 flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                          </div>
                          {test.instructor}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {displayedTests.length > 0 ? (
              <div className="flex justify-center items-center gap-2 mt-10">
                <button className="w-10 h-10 rounded-md border border-black/10 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50" disabled>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <button className="w-10 h-10 rounded-md bg-black text-white flex items-center justify-center font-medium">1</button>
                <button className="w-10 h-10 rounded-md border border-black/10 flex items-center justify-center hover:bg-gray-50 transition-colors font-medium">2</button>
                <button className="w-10 h-10 rounded-md border border-black/10 flex items-center justify-center hover:bg-gray-50 transition-colors font-medium">3</button>
                <button className="w-10 h-10 rounded-md border border-black/10 flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
              </div>
            ) : (
              <div className="mt-10 text-center text-gray-500 py-10 border border-dashed border-gray-300 rounded-xl">
                Chưa có bài kiểm tra nào trong danh mục này.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
``


## 2. edtech-phase1/src/css/App.css
``css
@import "tailwindcss";

:root {
  --font-heading: 'HelveticaNowDisplay-Medium', 'Helvetica Neue', Arial, sans-serif;
  --font-body: 'HelveticaNowDisplayW01-Rg', 'Helvetica Neue', Arial, sans-serif;
}

/* Đặt lại lề mặc định */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-body);
  background-color: #fff;
  color: #000;
  width: 100%;
  height: 100vh;
}

/* ===== MTS Custom Background: Soft Blue Cloud ===== */
.mts-bg {
  position: relative;
  background-color: #f5f7fa;
}

/* Vệt mây xanh nhạt – blob chính ở giữa lệch trái */
.mts-bg::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  background:
    radial-gradient(ellipse 55% 45% at 42% 38%, rgba(173, 216, 238, 0.52) 0%, transparent 70%),
    radial-gradient(ellipse 38% 30% at 60% 50%, rgba(190, 225, 245, 0.35) 0%, transparent 65%),
    radial-gradient(ellipse 28% 22% at 28% 55%, rgba(200, 230, 248, 0.28) 0%, transparent 60%);
  filter: blur(28px);
}

/* Tất cả nội dung bên trong phải nằm trên z-index 1 */
.mts-bg > * {
  position: relative;
  z-index: 1;
}

``


## 3. edtech-phase1/src/data/subjectsData.js
``javascript
export const subjectsData = {
  physics: {
    title: "Vật Lý",
    description: "Tổng hợp các bài kiểm tra, đề thi môn Vật Lý",
    categories: ["Thi thử TNTHPT", "Đề thi HSA/TSA", "Lớp 12", "Lớp 11", "Lớp 10"],
    tests: [
      {
        id: "phys_0",
        title: "Bài Kiểm Tra Vật Lý Nhiệt - 12 - Lần 1 - Đề A50",
        tag: "Lớp 12",
        questions: 40,
        time: 45,
        price: "Miễn phí",
        thumbnail: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        instructor: "Thầy Hùng",
        link: "https://baominh2627-del.github.io/bai-ktra-vat-ly-nhiet-ly-12/"
      },
      {
        id: "phys_de2_chuong1",
        title: "Đề 2 - Kiểm Tra Vật Lý 12 - Chương 1",
        tag: "Lớp 12",
        questions: 28,
        time: 50,
        price: "Miễn phí",
        thumbnail: "/thumb_vatly12_chuong1_de2.jpg",
        instructor: "Thầy Hùng",
        link: "https://baominh2627-del.github.io/de-2-kiem-tra-vat-ly-12-chuong-1/"
      },
      {
        id: "phys_1",
        title: "Đề thi thử THPT Quốc Gia môn Lý - Sở GD Hà Nội 2024",
        tag: "Thi thử TNTHPT",
        questions: 40,
        time: 50,
        price: "Miễn phí",
        thumbnail: "https://images.unsplash.com/photo-1636466497217-26c8c60caa47?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        instructor: "Thầy Hùng"
      },
      {
        id: "phys_2",
        title: "Đề ôn tập Đánh Giá Năng Lực (HSA) - Vật Lý Cấu Trúc Mới",
        tag: "Đề thi HSA/TSA",
        questions: 50,
        time: 60,
        price: "49.000₫",
        thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        instructor: "Cô Mai"
      },
      {
        id: "phys_3",
        title: "Bài kiểm tra Dao Động Cơ - Vật Lý 12 Giữa Kì 1",
        tag: "Lớp 12",
        questions: 30,
        time: 45,
        price: "Miễn phí",
        thumbnail: "https://images.unsplash.com/photo-1610428584852-5a98bf49b015?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        instructor: "Thầy Hùng"
      },
      {
        id: "phys_4",
        title: "Trắc nghiệm Dòng Điện Xoay Chiều Nâng Cao",
        tag: "Lớp 12",
        questions: 40,
        time: 50,
        price: "29.000₫",
        thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        instructor: "Thầy Bình"
      },
      {
        id: "phys_5",
        title: "Tổng ôn Quang Hình Học - Lớp 11",
        tag: "Lớp 11",
        questions: 40,
        time: 45,
        price: "Miễn phí",
        thumbnail: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        instructor: "Cô Mai"
      },
      {
        id: "phys_6",
        title: "Đề thi VACT Vật Lý Cao Cấp",
        tag: "Đề thi VACT",
        questions: 50,
        time: 90,
        price: "99.000₫",
        thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        instructor: "Thầy Hùng"
      }
    ]
  },
  math: {
    title: "Toán Học",
    description: "Tổng hợp các bài kiểm tra, đề thi môn Toán Học",
    categories: ["Thi thử TNTHPT", "Đề thi HSA/TSA", "Lớp 12", "Lớp 11", "Lớp 10"],
    tests: [
      {
        id: "math_1",
        title: "Bài kiểm tra Hàm số và Đồ thị - Toán 12",
        tag: "Lớp 12",
        questions: 50,
        time: 90,
        price: "Miễn phí",
        thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        instructor: "Thầy Minh"
      },
      {
        id: "math_2",
        title: "Đề 1 Kiểm tra Lượng giác - Toán 11",
        tag: "Lớp 11",
        questions: 40,
        time: 45,
        price: "Miễn phí",
        thumbnail: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        instructor: "Thầy Minh",
        link: "https://baominh2627-del.github.io/de-1-ktra-luong-giac-toan-11/"
      }
    ]
  },
  chemistry: {
    title: "Hóa Học",
    description: "Tổng hợp các bài kiểm tra, đề thi môn Hóa Học",
    categories: ["Thi thử TNTHPT", "Đề thi HSA/TSA", "Lớp 12", "Lớp 11", "Lớp 10"],
    tests: [
      {
        id: "chem_1",
        title: "Kiểm tra Este - Lipit - Hóa 12",
        tag: "Lớp 12",
        questions: 40,
        time: 50,
        price: "Miễn phí",
        thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        instructor: "Cô Lan"
      }
    ]
  },
  informatics: {
    title: "Tin Học",
    description: "Tổng hợp các bài kiểm tra, đề thi môn Tin Học",
    categories: ["Thi thử TNTHPT", "Lớp 12", "Lớp 11", "Lớp 10", "Lập trình căn bản"],
    tests: [
      {
        id: "info_1",
        title: "Bài kiểm tra Python cơ bản",
        tag: "Lập trình căn bản",
        questions: 30,
        time: 45,
        price: "Miễn phí",
        thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        instructor: "Thầy Bình"
      }
    ]
  },
  hsa: {
    title: "Đề thi HSA/TSA",
    description: "Tổng hợp các đề Đánh Giá Năng Lực (HSA) và Đánh Giá Tư Duy (TSA)",
    categories: ["Đề thi HSA", "Đề thi TSA", "Toán", "Ngữ Văn", "Khoa học"],
    tests: [
      {
        id: "hsa_1",
        title: "Đề thi thử HSA - ĐHQGHN Lần 1 - 2024",
        tag: "Đề thi HSA",
        questions: 150,
        time: 195,
        price: "99.000₫",
        thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        instructor: "MTS Education"
      }
    ]
  },
  mock_exams: {
    title: "Thi thử TNTHPT",
    description: "Tổng hợp các đề thi thử Tốt nghiệp THPT Quốc Gia từ các trường và Sở GD&ĐT",
    categories: ["Toán Học", "Vật Lý", "Hóa Học", "Tiếng Anh", "Ngữ Văn"],
    tests: [
      {
        id: "mock_1",
        title: "Đề thi thử TNTHPT môn Toán - Sở GD Hà Nội",
        tag: "Toán Học",
        questions: 50,
        time: 90,
        price: "Miễn phí",
        thumbnail: "https://images.unsplash.com/photo-1636466497217-26c8c60caa47?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        instructor: "Thầy Minh"
      }
    ]
  }
};
``

