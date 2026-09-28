import React, { useState } from 'react';

export default function PhysicsPage({ onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Dữ liệu mẫu (mock data) cho các bài kiểm tra Vật Lý
  const mockTests = [
    {
      id: 0,
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
      id: 1,
      title: "Đề thi thử THPT Quốc Gia môn Lý - Sở GD Hà Nội 2024",
      tag: "Thi thử TNTHPT",
      questions: 40,
      time: 50,
      price: "Miễn phí",
      thumbnail: "https://images.unsplash.com/photo-1636466497217-26c8c60caa47?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      instructor: "Thầy Hùng"
    },
    {
      id: 2,
      title: "Đề ôn tập Đánh Giá Năng Lực (HSA) - Vật Lý Cấu Trúc Mới",
      tag: "Đề thi HSA/TSA",
      questions: 50,
      time: 60,
      price: "49.000₫",
      thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      instructor: "Cô Mai"
    },
    {
      id: 3,
      title: "Bài kiểm tra Dao Động Cơ - Vật Lý 12 Giữa Kì 1",
      tag: "Lớp 12",
      questions: 30,
      time: 45,
      price: "Miễn phí",
      thumbnail: "https://images.unsplash.com/photo-1610428584852-5a98bf49b015?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      instructor: "Thầy Hùng"
    },
    {
      id: 4,
      title: "Trắc nghiệm Dòng Điện Xoay Chiều Nâng Cao",
      tag: "Lớp 12",
      questions: 40,
      time: 50,
      price: "29.000₫",
      thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      instructor: "Thầy Bình"
    },
    {
      id: 5,
      title: "Tổng ôn Quang Hình Học - Lớp 11",
      tag: "Lớp 11",
      questions: 40,
      time: 45,
      price: "Miễn phí",
      thumbnail: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      instructor: "Cô Mai"
    },
    {
      id: 6,
      title: "Đề thi VACT Vật Lý Cao Cấp",
      tag: "Đề thi VACT",
      questions: 50,
      time: 90,
      price: "99.000₫",
      thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      instructor: "Thầy Hùng"
    }
  ];

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

        <div className="hidden lg:flex flex-row gap-6 text-[20px] text-black">
          <button onClick={() => onNavigate('home')} className="hover:opacity-60 transition-opacity">Trang chủ</button>
          <button className="font-semibold border-b-2 border-black pb-1">Vật Lý</button>
        </div>

        <div className="hidden lg:flex flex-row gap-6 items-center">
          <button onClick={() => onNavigate('login')} className="text-[20px] text-black hover:opacity-60 transition-opacity">
            Đăng nhập
          </button>
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
        <button onClick={() => onNavigate('home')} className="text-[24px] font-medium text-black text-left">Trang chủ</button>
        <button className="text-[24px] font-medium text-black text-left underline underline-offset-2">Vật Lý</button>
        <div className="w-full h-[1px] bg-black/10 my-2"></div>
        <button onClick={() => onNavigate('login')} className="text-[24px] font-medium text-black text-left">Đăng nhập</button>
      </div>

      {/* Main Content */}
      <main className="pt-[88px] pb-[60px] px-5 sm:px-8 md:px-10 max-w-[1400px] mx-auto">
        {/* Page Header */}
        <div className="py-6 border-b border-black/5 mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold">Vật Lý</h1>
          <p className="text-gray-500 mt-1 text-lg">Tổng hợp các bài kiểm tra, đề thi môn Vật Lý</p>
        </div>
          
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
                <li><label className="flex items-center gap-3 cursor-pointer hover:text-gray-600"><input type="checkbox" className="w-4 h-4 accent-black" /> Thi thử TNTHPT</label></li>
                <li><label className="flex items-center gap-3 cursor-pointer hover:text-gray-600"><input type="checkbox" className="w-4 h-4 accent-black" /> Đề thi HSA/TSA</label></li>
                <li><label className="flex items-center gap-3 cursor-pointer hover:text-gray-600"><input type="checkbox" className="w-4 h-4 accent-black" /> Lớp 12</label></li>
                <li><label className="flex items-center gap-3 cursor-pointer hover:text-gray-600"><input type="checkbox" className="w-4 h-4 accent-black" /> Lớp 11</label></li>
                <li><label className="flex items-center gap-3 cursor-pointer hover:text-gray-600"><input type="checkbox" className="w-4 h-4 accent-black" /> Lớp 10</label></li>
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
                const CardWrapper = test.link ? 'a' : 'div';
                const wrapperProps = test.link ? { href: test.link, target: "_blank", rel: "noopener noreferrer" } : {};
                
                return (
                  <CardWrapper 
                    key={test.id} 
                    {...wrapperProps}
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
                  </CardWrapper>
                );
              })}
            </div>

            {/* Pagination */}
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
          </div>

        </div>
      </main>
    </div>
  );
}
