import React, { useState } from 'react';
import { subjectsData } from '../data/subjectsData.js';
import { useAuth } from './AuthContext.jsx';

export default function SubjectPage({ onNavigate, subjectKey, onRequireLogin }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();
  
  const data = subjectsData[subjectKey] || subjectsData['physics'];
  const mockTests = data.tests;

  // Xử lý khi click vào bài thi: kiểm tra đăng nhập trước
  const handleTestClick = (test) => {
    if (!isLoggedIn) {
      // Chưa đăng nhập → yêu cầu đăng nhập
      onRequireLogin();
      return;
    }
    // Đã đăng nhập → mở link bài thi (nếu có)
    if (test.link) {
      window.open(test.link, '_blank', 'noopener,noreferrer');
    } else {
      alert('Bài thi này đang được cập nhật. Vui lòng quay lại sau!');
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="relative w-full min-h-screen bg-[#f9fafb] text-black font-sans">
      {/* Navbar (Same minimal style as MainframeHome) */}
      <nav className="fixed top-0 left-0 right-0 z-50 w-full px-5 sm:px-8 py-4 sm:py-5 flex flex-row justify-between items-center bg-white/90 backdrop-blur-md border-b border-black/5">
        <div 
          className="flex flex-row gap-3 items-center cursor-pointer hover:opacity-70 transition-opacity"
          onClick={() => onNavigate('home')}
        >
          <span className="text-[21px] sm:text-[26px] tracking-tight text-black" style={{ fontFamily: 'var(--font-heading)' }}>
            MTS Education
          </span>
          <span className="text-[25px] sm:text-[30px] text-black select-none tracking-[-0.02em]">
            &#10033;
          </span>
        </div>

        <div className="hidden lg:flex flex-row gap-6 text-[18px] text-black">
          <button onClick={() => onNavigate('math')} className={`hover:opacity-60 transition-opacity ${subjectKey === 'math' ? 'font-semibold border-b-2 border-black pb-1' : ''}`}>Toán Học</button>
          <button onClick={() => onNavigate('physics')} className={`hover:opacity-60 transition-opacity ${subjectKey === 'physics' ? 'font-semibold border-b-2 border-black pb-1' : ''}`}>Vật Lý</button>
          <button onClick={() => onNavigate('chemistry')} className={`hover:opacity-60 transition-opacity ${subjectKey === 'chemistry' ? 'font-semibold border-b-2 border-black pb-1' : ''}`}>Hóa Học</button>
          <button onClick={() => onNavigate('informatics')} className={`hover:opacity-60 transition-opacity ${subjectKey === 'informatics' ? 'font-semibold border-b-2 border-black pb-1' : ''}`}>Tin Học</button>
          <button onClick={() => onNavigate('hsa')} className={`hover:opacity-60 transition-opacity ${subjectKey === 'hsa' ? 'font-semibold border-b-2 border-black pb-1' : ''}`}>Đề thi HSA/TSA</button>
          <button onClick={() => onNavigate('mock_exams')} className={`hover:opacity-60 transition-opacity ${subjectKey === 'mock_exams' ? 'font-semibold border-b-2 border-black pb-1' : ''}`}>Thi thử TNTHPT</button>
        </div>

        <div className="hidden lg:flex flex-row gap-4 items-center">
          {isLoggedIn ? (
            <>
              <span className="text-[15px] text-black/60 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                {user?.displayName || user?.username}
              </span>
              <button 
                onClick={handleLogout}
                className="text-[15px] text-red-500 hover:text-red-700 transition-colors font-medium px-3 py-1.5 rounded-lg hover:bg-red-50"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <button onClick={() => onNavigate('login')} className="text-[20px] text-black hover:opacity-60 transition-opacity">
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
          {/* Sidebar */}
          <aside className="w-full lg:w-[280px] shrink-0 flex flex-col gap-6">
            <div className="p-5 bg-white border border-black/10 rounded-lg shadow-sm">
              <h4 className="text-xl font-bold mb-4">Tìm kiếm</h4>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Tìm bài kiểm tra..." 
                  className="w-full px-4 py-3 bg-gray-50 border border-black/10 rounded-md focus:outline-none focus:border-black/30 transition-colors"
                />
                <svg className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>

            <div className="p-5 bg-white border border-black/10 rounded-lg shadow-sm">
              <h4 className="text-xl font-bold mb-4">Danh mục</h4>
              <ul className="flex flex-col gap-3 text-[16px]">
                {data.categories && data.categories.map((cat, idx) => (
                  <li key={idx}>
                    <label className="flex items-center gap-3 cursor-pointer hover:text-gray-600">
                      <input type="checkbox" className="w-4 h-4 accent-black" /> {cat}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 bg-white border border-black/10 rounded-lg shadow-sm">
              <h4 className="text-xl font-bold mb-4">Mức phí</h4>
              <ul className="flex flex-col gap-3 text-[16px]">
                <li><label className="flex items-center gap-3 cursor-pointer hover:text-gray-600"><input type="radio" name="price" className="w-4 h-4 accent-black" defaultChecked /> Tất cả</label></li>
                <li><label className="flex items-center gap-3 cursor-pointer hover:text-gray-600"><input type="radio" name="price" className="w-4 h-4 accent-black" /> Miễn phí</label></li>
                <li><label className="flex items-center gap-3 cursor-pointer hover:text-gray-600"><input type="radio" name="price" className="w-4 h-4 accent-black" /> Có phí</label></li>
              </ul>
            </div>
          </aside>

          {/* Grid Content */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <p className="text-gray-600">Hiển thị {mockTests.length} bài kiểm tra</p>
              <select className="px-4 py-2 bg-white border border-black/10 rounded-md focus:outline-none focus:border-black/30 cursor-pointer">
                <option>Mới nhất</option>
                <option>Phổ biến nhất</option>
                <option>Được làm nhiều nhất</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockTests.map((test) => {
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
            {mockTests.length > 0 ? (
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
