import React, { useState } from 'react';
import { subjectsData } from '../data/subjectsData.js';
import { useAuth } from './AuthContext.jsx';
import { getAvatar } from './avatarService.js';

export default function SubjectPage({ onNavigate, subjectKey, onRequireLogin }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();
  
  const uid = user ? (user.id || user.uid || ('user_' + user.username)) : null;
  const avatar = uid ? getAvatar(uid) : null;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState('Tất cả');
  const [sortOption, setSortOption] = useState('Mới nhất');

  const data = subjectsData[subjectKey] || subjectsData['physics'];
  const mockTests = data.tests;

  const handleCategoryChange = (cat) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const filteredTests = mockTests.filter(test => {
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

  // Áp dụng sắp xếp
  const displayedTests = [...filteredTests];
  if (sortOption === 'Phổ biến nhất') {
    displayedTests.sort((a, b) => b.questions - a.questions); // Mock logic (bài nhiều câu hỏi hơn)
  } else if (sortOption === 'Được làm nhiều nhất') {
    displayedTests.sort((a, b) => a.time - b.time); // Mock logic (bài thời gian làm nhanh hơn)
  }

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
      {/* Navbar - FIXED: Increased padding for better visual balance */}
      <nav className="fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-8 py-4 sm:py-5 lg:py-4 flex flex-row justify-between items-center bg-white/80 backdrop-blur-md border-b border-black/8">
        <div 
          className="flex flex-row gap-2 items-center cursor-pointer hover:opacity-70 transition-opacity"
          onClick={() => onNavigate('home')}
        >
          <span className="text-[20px] sm:text-[24px] lg:text-[26px] tracking-tight text-black font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
            MTS Education
          </span>
          <span className="text-[24px] sm:text-[28px] lg:text-[30px] text-black/40 select-none">
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
              <button onClick={() => onNavigate('profile')} title="Trang cá nhân" className="text-[17px] text-black/60 hover:text-black flex items-center gap-2 transition-colors cursor-pointer">
                {avatar ? (
                  <img src={avatar} alt="Avatar" className="w-6 h-6 rounded-full object-cover border border-gray-200" />
                ) : (
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                )}
                {user?.displayName || user?.username}
              </button>
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
            <button onClick={() => onNavigate('profile')} title="Trang cá nhân" className="flex items-center gap-1.5 text-[13px] text-black/60 hover:text-black font-medium cursor-pointer">
              {avatar && (
                <img src={avatar} alt="Avatar" className="w-5 h-5 rounded-full object-cover border border-gray-200" />
              )}
              <span className="truncate max-w-[80px]">{user?.displayName || user?.username}</span>
            </button>
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

      {/* Mobile Dropdown Menu (compact, not fullscreen) - FIXED: Adjusted for larger navbar */}
      <div 
        className={`fixed top-[68px] sm:top-[75px] left-3 right-3 bg-white/97 backdrop-blur-xl rounded-2xl shadow-2xl border border-black/8 z-40 flex flex-col gap-1 p-3 max-h-[calc(100vh-90px)] overflow-y-auto overscroll-contain transition-all duration-300 ${
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

      {/* Main Content - FIXED: Increased padding-top for mobile + extra margin for title */}
      <main className="pt-[88px] sm:pt-[100px] lg:pt-[104px] pb-[60px] px-5 sm:px-8 md:px-10 max-w-[1400px] mx-auto">
        
        {/* Page Header (Title) */}
        <div className="mb-8 sm:mb-10 pb-4 sm:pb-6 border-b border-black/5 mt-2 sm:mt-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black tracking-tight leading-tight">{data.title}</h1>
        </div>

        {/* Search bar - centered, full width, above everything */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <div className="flex items-center bg-white rounded-full w-full max-w-2xl px-5 sm:px-7 py-4 sm:py-5 gap-5"
            style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
            <span className="text-black/35 text-[28px] sm:text-[32px] font-light leading-none select-none">+</span>
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="flex-1 bg-transparent outline-none border-none text-[16px] sm:text-[20px] text-black placeholder-black/35 font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg className="w-6 sm:w-7 h-6 sm:h-7 text-black/45 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          
        {/* Main layout: Sidebar + Content Grid - FIXED: Proper flex layout */}
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-8">
          {/* Sidebar - FIXED: Added proper top margin for mobile spacing */}
          <aside className="w-full lg:w-[260px] shrink-0 flex flex-col gap-4 sm:gap-6 order-2 lg:order-1">

            <div className="p-5 bg-white border border-black/10 rounded-lg shadow-sm">
              <h4 className="text-lg sm:text-xl font-bold mb-4">Danh mục</h4>
              <ul className="flex flex-col gap-3 text-[15px] sm:text-[16px]">
                {data.categories && data.categories.map((cat, idx) => (
                  <li key={idx}>
                    <label className="flex items-center gap-3 cursor-pointer hover:text-gray-600 transition-colors">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 accent-black cursor-pointer" 
                        checked={selectedCategories.includes(cat)}
                        onChange={() => handleCategoryChange(cat)}
                      /> 
                      <span>{cat}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 bg-white border border-black/10 rounded-lg shadow-sm">
              <h4 className="text-lg sm:text-xl font-bold mb-4">Mức phí</h4>
              <ul className="flex flex-col gap-3 text-[15px] sm:text-[16px]">
                <li>
                  <label className="flex items-center gap-3 cursor-pointer hover:text-gray-600 transition-colors">
                    <input 
                      type="radio" 
                      name="price" 
                      className="w-4 h-4 accent-black cursor-pointer" 
                      checked={selectedPrice === 'Tất cả'} 
                      onChange={() => setSelectedPrice('Tất cả')} 
                    /> 
                    <span>Tất cả</span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center gap-3 cursor-pointer hover:text-gray-600 transition-colors">
                    <input 
                      type="radio" 
                      name="price" 
                      className="w-4 h-4 accent-black cursor-pointer" 
                      checked={selectedPrice === 'Miễn phí'} 
                      onChange={() => setSelectedPrice('Miễn phí')} 
                    /> 
                    <span>Miễn phí</span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center gap-3 cursor-pointer hover:text-gray-600 transition-colors">
                    <input 
                      type="radio" 
                      name="price" 
                      className="w-4 h-4 accent-black cursor-pointer" 
                      checked={selectedPrice === 'Có phí'} 
                      onChange={() => setSelectedPrice('Có phí')} 
                    /> 
                    <span>Có phí</span>
                  </label>
                </li>
              </ul>
            </div>
          </aside>

          {/* Grid Content - FIXED: order-1 for proper mobile layout */}
          <div className="flex-1 w-full order-1 lg:order-2">

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <p className="text-gray-600 text-sm sm:text-base">Hiển thị {displayedTests.length} bài kiểm tra</p>
              <select 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full sm:w-auto px-4 py-2 bg-white border border-black/10 rounded-md focus:outline-none focus:border-black/30 cursor-pointer text-sm sm:text-base"
              >
                <option value="Mới nhất">Mới nhất</option>
                <option value="Phổ biến nhất">Phổ biến nhất</option>
                <option value="Được làm nhiều nhất">Được làm nhiều nhất</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
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
                      <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                          {test.questions} Câu
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                          {test.time} Phút
                        </span>
                      </div>
                      
                      <h5 className="font-bold text-base sm:text-lg leading-snug mb-4 line-clamp-2 hover:text-gray-600 transition-colors">
                        {test.title}
                      </h5>

                      <div className="mt-auto pt-4 border-t border-black/5 flex items-center justify-between gap-2 flex-wrap">
                        <div className="font-semibold text-black text-sm sm:text-base">
                          {test.price === "Miễn phí" ? (
                            <span className="text-green-600 bg-green-50 px-2 py-1 rounded-md text-xs sm:text-sm">{test.price}</span>
                          ) : (
                            <span>{test.price}</span>
                          )}
                        </div>
                        <div className="text-xs sm:text-sm font-medium text-gray-600 flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                          </div>
                          <span className="truncate">{test.instructor}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {displayedTests.length > 0 ? (
              <div className="flex justify-center items-center gap-2 mt-8 sm:mt-10">
                <button className="w-10 h-10 rounded-md border border-black/10 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50" disabled>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <button className="w-10 h-10 rounded-md bg-black text-white flex items-center justify-center font-medium text-sm">1</button>
                <button className="w-10 h-10 rounded-md border border-black/10 flex items-center justify-center hover:bg-gray-50 transition-colors font-medium text-sm">2</button>
                <button className="w-10 h-10 rounded-md border border-black/10 flex items-center justify-center hover:bg-gray-50 transition-colors font-medium text-sm">3</button>
                <button className="w-10 h-10 rounded-md border border-black/10 flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
              </div>
            ) : (
              <div className="mt-8 sm:mt-10 text-center text-gray-500 py-10 border border-dashed border-gray-300 rounded-xl">
                Chưa có bài kiểm tra nào trong danh mục này.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
