// ===== DỮ LIỆU VIDEO BÀI GIẢNG =====
// Thêm video mới: copy 1 khối mẫu bên dưới vào mảng `videos`.
//
// Trường bắt buộc:
//   id       : mã duy nhất, không dấu, không cách (vd: "toan12_hamso_01")
//   title    : tên video
//   tags     : mảng nhãn để lọc, chọn trong: "Toán","Lý","Hóa","Tin","Lớp 10","Lớp 11","Lớp 12","HSA","TSA"
//   source   : "youtube" | "drive" | "local"
//   cover    : ảnh bìa (BẮT BUỘC). Đường dẫn dạng "/video-covers/ten-anh.jpg" (đặt file trong thư mục public/video-covers/)
//              hoặc link ảnh https://...
//   và tuỳ theo source:
//     youtube -> youtubeId: "dQw4w9WgXcQ"  (phần sau v= của link YouTube)
//     drive   -> driveId  : "1AbCdEf..."   (phần giữa /d/ và /view trong link Google Drive; file phải để chế độ "Bất kỳ ai có liên kết")
//     local   -> file     : "/videos/ten-video.mp4" (đặt file trong thư mục public/videos/)
// Trường tuỳ chọn: teacher, duration ("45 phút"), description
//
// Ví dụ:
// {
//   id: "toan12_hamso_01",
//   title: "Toán 12 - Khảo sát hàm số - Bài 1",
//   tags: ["Toán", "Lớp 12"],
//   source: "youtube",
//   youtubeId: "dQw4w9WgXcQ",
//   cover: "/video-covers/toan12_hamso_01.jpg",
//   teacher: "Thầy Minh",
//   duration: "45 phút",
// },

export const videoFilters = [
  { group: "Môn học", items: ["Toán", "Lý", "Hóa", "Tin"] },
  { group: "Lớp", items: ["Lớp 10", "Lớp 11", "Lớp 12"] },
  { group: "Kỳ thi", items: ["HSA", "TSA"] },
];

export const videos = [];
