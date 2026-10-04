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
      <nav className="fixed top-0 left-0 right-0 z-50 w-full px-5 sm:px-8 py-4 flex flex-row justify-between items-center bg-white/80 backdrop-blur-md border-b border-black/8">
        <div 
          className="flex flex-row gap-3 items-center cursor-pointer hover:opacity-70 transition-opacity"
          onClick={() => onNavigate('home')}
        >
          <span className="text-[22px] sm:text-[26px] tracking-tight text-black font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
            MTS Education
          </span>
          <span className="text-[26px] sm:text-[30px] text-black/40 select-none">
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

        {/* Mobile Hamburger */}
        <button 
          className="lg:hidden flex flex-col gap-[5px] z-50 relative"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className={`w-6 h-[2px] bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <div className={`w-6 h-[2px] bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
          <div className={`w-6 h-[2px] bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </nav>

      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-white/98 backdrop-blur-md z-40 flex flex-col justify-center px-8 gap-5 transition-opacity duration-300 overflow-y-auto pt-20 pb-10 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        } lg:hidden`}
      >
        <button onClick={() => { setIsMenuOpen(false); onNavigate('math'); }} className={`text-[24px] font-medium text-black text-left ${subjectKey === 'math' ? 'underline underline-offset-2' : ''}`}>Toán Học</button>
        <button onClick={() => { setIsMenuOpen(false); onNavigate('physics'); }} className={`text-[24px] font-medium text-black text-left ${subjectKey === 'physics' ? 'underline underline-offset-2' : ''}`}>Vật Lý</button>
        <button onClick={() => { setIsMenuOpen(false); onNavigate('chemistry'); }} className={`text-[24px] font-medium text-black text-left ${subjectKey === 'chemistry' ? 'underline underline-offset-2' : ''}`}>Hóa Học</button>
        <button onClick={() => { setIsMenuOpen(false); onNavigate('informatics'); }} className={`text-[24px] font-medium text-black text-left ${subjectKey === 'informatics' ? 'underline underline-offset-2' : ''}`}>Tin Học</button>
        <button onClick={() => { setIsMenuOpen(false); onNavigate('hsa'); }} className={`text-[24px] font-medium text-black text-left ${subjectKey === 'hsa' ? 'underline underline-offset-2' : ''}`}>Đề thi HSA/TSA</button>
        <button onClick={() => { setIsMenuOpen(false); onNavigate('mock_exams'); }} className={`text-[24px] font-medium text-black text-left ${subjectKey === 'mock_exams' ? 'underline underline-offset-2' : ''}`}>Thi thử TNTHPT</button>
        <div className="w-full h-[1px] bg-black/10 my-2"></div>
        {isLoggedIn ? (
          <>
            <div className="text-[18px] font-medium text-black/60 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              {user?.displayName || user?.username}
            </div>
            <button 
              onClick={() => { setIsMenuOpen(false); handleLogout(); }}
              className="text-[18px] font-medium text-red-500 text-left"
            >
              Đăng xuất
            </button>
          </>
        ) : (
          <button onClick={() => { setIsMenuOpen(false); onNavigate('login'); }} className="text-[24px] font-medium text-black text-left">Đăng nhập</button>
        )}
      </div>

      {/* Main Content */}
      <main className="pt-[88px] pb-[60px] px-5 sm:px-8 md:px-10 max-w-[1400px] mx-auto">
        {/* Page Header */}
        <div className="py-6 border-b border-black/5 mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold">{data.title}</h1>
          <p className="text-gray-500 mt-1 text-lg">{data.description}</p>
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
          
        <div className="flex flex-col lg:flex-row gap-8 mt-4">
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
            {/* Search bar - centered, full width */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center bg-white rounded-full w-full max-w-2xl px-7 py-5 gap-5"
                style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.10)' }}>
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
