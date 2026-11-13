# 📚 HƯỚNG DẪN TẠO BÀI THI WEB TỪ FILE PDF

Tài liệu này hướng dẫn quy trình 5 bước để chuyển đổi một file đề thi PDF thành bài thi trắc nghiệm online trên hệ thống MTS Education.

## 🚀 QUY TRÌNH 5 BƯỚC CƠ BẢN

### Bước 1: Trích xuất nội dung từ PDF
- Cắt các hình ảnh/đồ thị trong đề (nếu có) lưu thành các file như `cau1.png`, `cau5.png`...
- Đối với chữ và công thức: Bạn không cần ngồi gõ lại. Hãy đưa thẳng file PDF cho AI để tự động chuyển các công thức Toán/Lý/Hóa sang chuẩn LaTeX (ví dụ: `$x^2 + 1 = 0$`).

### Bước 2: Sử dụng `prompt_tao_bai_thi.md`
- Mở file `prompt_tao_bai_thi.md`.
- Điền các thông tin cơ bản: *Tên đề, Mã đề, Thời gian...*
- Dán nội dung câu hỏi (hoặc yêu cầu AI tự động điền vào dựa trên PDF).
- AI sẽ trả về cho bạn đầy đủ code của 5 file: `index.html`, `data.js`, `script.js`, `firebase-config.js`, `mtsedu-auth.js`.

### Bước 3: Tạo thư mục và Code
- Tạo một thư mục mới trên máy tính (VD: `bai-kiem-tra-moi`).
- Tạo và dán code 5 file AI vừa sinh ra vào thư mục đó.
- Copy file `style.css` từ các bài thi cũ (ví dụ: repo lượng giác) sang.
- Chép các hình ảnh (đã cắt ở Bước 1) vào thư mục và đảm bảo tên file ảnh khớp với cấu hình trong `data.js`.

### Bước 4: Đưa lên GitHub Pages (Tạo link web)
- Lên GitHub tạo một repository mới.
- Push toàn bộ thư mục code lên repo đó.
- Vào **Settings -> Pages** của repo, chọn Source là nhánh `main` để xuất bản.
- Đợi 1-2 phút, bạn sẽ có link bài thi độc lập (VD: `https://[username].github.io/[ten-repo]/`).

### Bước 5: Gắn vào hệ thống MTSedu chính
- Mở file source code của MTSedu: `edtech-phase1/src/data/subjectsData.js`.
- Thêm thông tin bài thi mới vào mảng `tests` của môn học tương ứng.
- Dán link GitHub Pages vừa lấy ở Bước 4 vào thuộc tính `link`.
- Lưu lại và push repo MTSedu lên GitHub (Vercel sẽ tự động deploy bản cập nhật trên trang chủ).

---

## 💡 MẸO LÀM SIÊU NHANH CÙNG AI (PRO TIP)

Bạn **không cần phải tự làm tay Bước 1 và Bước 2**. Cách tiết kiệm thời gian nhất là:

1. Tải file đề PDF lên khung chat với AI.
2. Yêu cầu bằng câu lệnh sau:
   > *"Hãy dựa vào cấu trúc của file `prompt_tao_bai_thi.md`, đọc nội dung đề từ file PDF đính kèm này, trích xuất toàn bộ câu hỏi (chuẩn hóa LaTeX) và tạo sẵn code 5 file bài thi cho tôi. Thông tin đề: [Tên đề], Mã đề [MÃ], thời gian [X] phút..."*
3. AI sẽ làm mọi thứ từ A-Z. Bạn chỉ việc lấy code AI sinh ra, dán vào thư mục (Bước 3) và đẩy lên GitHub (Bước 4)!
