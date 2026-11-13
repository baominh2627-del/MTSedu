import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from './AuthContext.jsx';
import { FEEDBACK_TYPES, formatFeedbackError, submitFeedback } from './feedbackService.js';

export default function FeedbackModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState(FEEDBACK_TYPES[0]);
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('idle'); // idle, submitting, success
  const [errorMsg, setErrorMsg] = useState('');
  const closeTimerRef = useRef(null);
  const { user } = useAuth();

  useEffect(() => () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  }, []);

  const closeModal = () => {
    if (status === 'submitting') return;
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsOpen(false);
    setStatus('idle');
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || status === 'submitting') return;

    setStatus('submitting');
    setErrorMsg('');

    try {
      await submitFeedback({
        type,
        content,
        user,
        page: window.location.hash || '#home',
      });
      setStatus('success');
      closeTimerRef.current = setTimeout(() => {
        setIsOpen(false);
        setStatus('idle');
        setContent('');
        setType(FEEDBACK_TYPES[0]);
        setErrorMsg('');
        closeTimerRef.current = null;
      }, 1800);
    } catch (err) {
      setStatus('idle');
      setErrorMsg(formatFeedbackError(err, 'Không gửi được phản hồi. Vui lòng thử lại.'));
    }
  };

  return (
    <>
      {/* Floating Button (Nút nổi ở góc phải dưới) */}
      <button 
        onClick={() => {
          setErrorMsg('');
          setIsOpen(true);
        }}
        className="fixed bottom-6 right-6 z-40 bg-blue-600 text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-blue-700 hover:shadow-[0_8px_20px_rgba(37,99,235,0.4)] transition-all hover:-translate-y-1 flex items-center justify-center group"
        title="Báo lỗi & Góp ý"
      >
        <svg className="w-6 h-6 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
        </svg>
      </button>

      {/* Modal Overlay (Cửa sổ form) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity">
          {/* Nhấn ra ngoài để đóng */}
          <div className="absolute inset-0" onClick={closeModal}></div>
          
          <div className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">Góp ý & Báo lỗi</h3>
              <button 
                onClick={closeModal} 
                disabled={status === 'submitting'}
                className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
              {status === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-gray-800">Cảm ơn bạn!</h4>
                  <p className="text-gray-500 mt-1">Ý kiến của bạn đã được ghi nhận để cải thiện hệ thống.</p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Loại vấn đề</label>
                    <select 
                      value={type} 
                      onChange={(e) => setType(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                    >
                      {FEEDBACK_TYPES.map((item) => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Mô tả chi tiết</label>
                    <textarea 
                      required
                      rows="4"
                      placeholder="VD: Ở đề Toán 12 chương 1, câu 5 phần đáp án bị lỗi hiển thị..."
                      value={content}
                      onChange={(e) => {
                        setContent(e.target.value);
                        if (errorMsg) setErrorMsg('');
                      }}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none resize-none"
                    ></textarea>
                  </div>
                  {errorMsg && (
                    <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                      {errorMsg}
                    </p>
                  )}
                  <button 
                    type="submit" 
                    disabled={status === 'submitting'}
                    className="mt-2 w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-colors disabled:opacity-70 flex justify-center items-center"
                  >
                    {status === 'submitting' ? (
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : 'Gửi phản hồi'}
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
