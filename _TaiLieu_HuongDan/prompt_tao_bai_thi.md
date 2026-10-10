# 📋 PROMPT TẠO ĐỀ THI MỚI — HỆ THỐNG MTS EDUCATION

Quy trình tạo bài thi mới được chia thành **2 Giai Đoạn**:
- **Giai Đoạn 1 — dùng Gemini Pro** (có thể đọc file PDF): Trích xuất nội dung đề, tạo file `data.js`.
- **Giai Đoạn 2 — dùng Claude** (viết code nhanh hơn): Nhận file `data.js` đã có, tạo 4 file còn lại.

---

## ⚡ GIAI ĐOẠN 1 — GEMINI PRO (ĐỌC PDF → TẠO `data.js`)

> **Dùng khi:** Bạn có file đề thi dạng PDF. Upload file PDF lên Gemini Pro rồi gửi kèm prompt dưới đây.

### CÁCH DÙNG

1. Mở **Gemini Pro** (hoặc Gemini Advanced).
2. **Upload file PDF** đề thi lên.
3. **Copy toàn bộ prompt bên dưới**, điền thông tin vào các ô `[...]`, rồi gửi.
4. Gemini sẽ đọc đề và **chỉ tạo duy nhất file `data.js`**, sau đó **dừng lại và chờ**.
5. Khi bạn đã kiểm tra `data.js` xong, hãy sang **Giai Đoạn 2**.

---

### PROMPT GIAI ĐOẠN 1 (GỬI CHO GEMINI PRO)

````
Tôi vừa upload một file PDF đề thi lên. Hãy đọc toàn bộ nội dung đề trong file đó.

## THÔNG TIN BÀI THI
- Tên đề: [VD: ĐỀ 2 - LƯỢNG GIÁC - TOÁN 11]
- Môn học: [VD: Toán 11]
- Mã đề (không dấu, không cách, dùng cho Firebase): [VD: TOAN11_DE2]

## CẤU TRÚC ĐỀ THI (điền để AI biết cách phân loại)
- Phần I — Trắc nghiệm khách quan: [VD: 12] câu × 0.25đ
- Phần II — Trắc nghiệm đúng sai: [VD: 4] câu × 4 ý (a, b, c, d)
- Phần III — Trả lời ngắn: [VD: 6] câu × 0.5đ

---

## YÊU CẦU

**🚨 YÊU CẦU TỐI QUAN TRỌNG VỀ NỘI DUNG:**
- Phải trích xuất **ĐẦY ĐỦ, NGUYÊN VĂN TẤT CẢ CÁC CHỮ** xuất hiện trong đề bài (PDF), tuyệt đối **KHÔNG ĐƯỢC THIẾU CHỮ NÀO**, không được tóm tắt hay tự ý cắt xén đề.
- Với các câu có chứa hình ảnh/đồ thị (VD: "Câu ..."): Phải ghi lại **ĐẦY ĐỦ TẤT CẢ PHẦN CHỮ** (phần văn bản không thuộc ảnh) của câu hỏi đó, không được bỏ sót. Chỉ thay thế vị trí hình ảnh bằng thuộc tính `image: "cau_X.png"`.

Hãy đọc đề trong file PDF và tạo CHỈ MỘT file duy nhất là `data.js` theo đúng cấu trúc mẫu dưới đây.

**Lưu ý quan trọng khi trích xuất:**
- Mọi công thức Toán/Lý/Hóa phải được chuyển sang chuẩn LaTeX, bọc trong `$...$` (inline) hoặc `$$...$$` (block). Ví dụ: `$\sin^2 x + \cos^2 x = 1$`.
- Phần `explanation` (lời giải) phải viết đầy đủ, rõ ràng, kể cả công thức LaTeX, những chỗ nào có hình ảnh như câu [.....] thì chú thích chèn hình ảnh vào đó để lát tôi chèn
- Với Phần I: `correctAnswer` là số nguyên 0=A, 1=B, 2=C, 3=D.
- Với Phần II: `correct` trong mỗi statement phải là `true` hoặc `false` (boolean, không phải string).
- Với Phần III: `correctAnswer` là chuỗi số, VD: `"0.5"` (hệ thống chấm sẽ chấp nhận cả "0,5"); có những phần có 2 câu cùng 1 đáp án thì viết đề bài chung giống như trong đề và viết các đề riêng của từng câu như trong đề 
- Nếu câu có hình ảnh/đồ thị, để `image: "cau_X.png"` và nhắc tôi cần cắt ảnh đó từ PDF.

**⚠️ QUY TẮC LATEX BẮT BUỘC — tránh lỗi render MathJax:**
- **KHÔNG** dùng ký tự Unicode trong công thức — phải dùng LaTeX:
  | Sai ❌ | Đúng ✅ |
  |---|---|
  | `×` | `\times` |
  | `²`, `³` | `^2`, `^3` |
  | `μ`, `Ω`, `π` | `\mu`, `\Omega`, `\pi` |
  | `→` | `\rightarrow` hoặc `\to` |
  | `≤`, `≥`, `≠` | `\leq`, `\geq`, `\neq` |
- **Không bỏ backslash**: viết `\frac{}{}`, `\sqrt{}`, `\vec{}`, `\overrightarrow{}` — không viết tắt.
- **Dấu nhân**: dùng `\cdot` hoặc `\times`, không dùng `*` hay ký tự unicode `×`.
- **Phân số phức tạp**: dùng `\frac{tử}{mẫu}`, không viết `a/b` bên trong `$...$` cho biểu thức dài.
- **Chỉ số nhiều ký tự**: phải có ngoặc nhọn — `v_{max}` ✅, `v_max` ❌; `\omega^2` ✅.
- **Đơn vị trong công thức**: đặt trong `\text{}`, VD: `$v = 5\ \text{m/s}$`.
- **Ví dụ LaTeX đúng chuẩn cho Vật lý 12:**
  - Phương trình dao động: `$x = A\cos(\omega t + \varphi)$`
  - Tần số góc: `$\omega = 2\pi f$`
  - Vận tốc cực đại: `$v_{max} = A\omega$`
  - Gia tốc: `$a = -\omega^2 x$`
  - Năng lượng: `$W = \frac{1}{2}kA^2$`
  - Li độ có đơn vị: `$x = 5\cos\!\left(10\pi t + \frac{\pi}{3}\right)\ \text{cm}$`
  - Chu kỳ con lắc lò xo: `$T = 2\pi\sqrt{\frac{m}{k}}$`

## CẤU TRÚC FILE `data.js` CẦN TẠO

```js
export const examData = [

  // ======== PHẦN 1: TRẮC NGHIỆM KHÁCH QUAN ========
  {
    id: "p1_1",
    part: 1,
    question: "[ĐỀ BÀI — dùng LaTeX $...$ cho công thức]",
    options: ["[A]", "[B]", "[C]", "[D]"],
    correctAnswer: 0, // 0=A | 1=B | 2=C | 3=D
    explanation: "[HƯỚNG DẪN GIẢI ĐẦY ĐỦ]",
    image: null // hoặc "cau_1.png" nếu câu có hình
  },
  // ... tất cả câu Phần I

  // ======== PHẦN 2: TRẮC NGHIỆM ĐÚNG/SAI ========
  {
    id: "p2_1",
    part: 2,
    question: "[ĐỀ BÀI]",
    statements: [
      { text: "[Mệnh đề a)]", correct: true },
      { text: "[Mệnh đề b)]", correct: false },
      { text: "[Mệnh đề c)]", correct: true },
      { text: "[Mệnh đề d)]", correct: false }
    ],
    explanation: "[HƯỚNG DẪN GIẢI ĐẦY ĐỦ]"
  },
  // ... tất cả câu Phần II

  // ======== PHẦN 3: TRẢ LỜI NGẮN ========
  {
    id: "p3_1",
    part: 3,
    question: "[ĐỀ BÀI]",
    correctAnswer: "0.5", // chuỗi số, VD: "2" hoặc "1.5"
    explanation: "[HƯỚNG DẪN GIẢI ĐẦY ĐỦ]",
    image: null
  },
  // ... tất cả câu Phần III

];
```

---

## ⛔ SAU KHI VIẾT XONG `data.js`, HÃY DỪNG LẠI

Đừng tạo thêm bất kỳ file nào khác (index.html, script.js, ...).
Hãy kết thúc bằng dòng thông báo sau:

> ✅ **Đã hoàn thành `data.js`!** Hãy kiểm tra lại nội dung câu hỏi, đáp án và lời giải. Khi nào bạn xác nhận xong, hãy chuyển sang bước tiếp theo để tạo các file còn lại.
````

---
---

## ⚡ GIAI ĐOẠN 2 — CLAUDE (NHẬN `data.js` → TẠO 4 FILE CÒN LẠI)

> **Dùng khi:** Bạn đã có file `data.js` hoàn chỉnh từ Giai Đoạn 1 (hoặc tự viết tay). Mở Claude và gửi prompt dưới đây.

### CÁCH DÙNG

1. Mở **Claude**.
2. **Paste toàn bộ nội dung file `data.js`** vào (hoặc upload file lên).
3. **Copy toàn bộ prompt bên dưới**, điền thông tin vào các ô `[...]`, rồi gửi.
4. Claude sẽ tạo đầy đủ 4 file còn lại: `index.html`, `firebase-config.js`, `mtsedu-auth.js`, `script.js`.

---

### PROMPT GIAI ĐOẠN 2 (GỬI CHO CLAUDE)

````
Tôi đang xây dựng hệ thống bài thi online cho MTS Education. Tôi đã có sẵn file `data.js` (dán bên dưới / đính kèm). Bây giờ hãy tạo cho tôi 4 file còn lại để hoàn thiện bài thi.

## THÔNG TIN BÀI THI
- Tên đề: [VD: ĐỀ 2 - LƯỢNG GIÁC - TOÁN 11]
- Môn học: [VD: Toán 11]
- Mô tả ngắn trên header: [VD: ĐỀ ÔN TẬP CHƯƠNG LƯỢNG GIÁC · NĂM HỌC 2024-2025]
- Thời gian làm bài: [VD: 90] phút
- Mã đề (dùng cho Firebase, không dấu, không cách): [VD: TOAN11_DE2]
- Hash trang MTSedu để quay về: [VD: #math hoặc #physics]

## CẤU TRÚC ĐỀ THI (để điền vào header và tính điểm đúng)
- Phần I: [VD: 12] câu × 0.25đ = [VD: 3.0đ]
- Phần II: [VD: 4] câu (thang: 4 đúng=1đ | 3 đúng=0.5đ | 2 đúng=0.25đ | ≤1=0đ) = [VD: 4.0đ]
- Phần III: [VD: 6] câu × 0.5đ = [VD: 3.0đ]
- Tổng: 10 điểm

---

## FILE `data.js` (đã có sẵn — KHÔNG tạo lại file này)

[PASTE NỘI DUNG data.js Ở ĐÂY]

---

## YÊU CẦU

Hãy tạo đầy đủ 4 file sau, viết code hoàn chỉnh, không bỏ sót:

---

## FILE 1: index.html

```html
<!doctype html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>[TÊN ĐỀ]</title>
    <link rel="stylesheet" href="style.css?v=3" />
    <script>
      MathJax = {
        tex: { inlineMath: [["$", "$"], ["\\(", "\\)"]] },
        svg: { fontCache: "global" },
      };
    </script>
    <script id="MathJax-script" async
      src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
    </script>
  </head>
  <body>
    <!-- Màn hình chờ đăng nhập -->
    <div id="login-screen" class="container">
      <div class="exam-header-block" style="margin-bottom: 20px">
        <div class="exam-header-top" style="border-radius: 8px; border-bottom: 1px solid var(--border-color);">
          <div class="meta-text">[MÔ TẢ HEADER]</div>
          <h1 class="exam-title">[TÊN ĐỀ]</h1>
          <div class="meta-sub">[VD: 12 câu trắc nghiệm · 4 câu đúng/sai · 6 câu trả lời ngắn — thang điểm 10]</div>
          <hr class="dashed-line" />
        </div>
      </div>
      <div class="card form-card">
        <div class="exam-instructions" style="text-align: left;">
          <h3 style="margin-top: 0; color: var(--navy); font-size: 16px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; font-weight: bold;">📋 HƯỚNG DẪN &amp; QUY CHẾ THI</h3>
          <ul style="font-size: 14px; color: #334155; line-height: 1.8; padding-left: 20px; margin-bottom: 16px;">
            <li><strong>Phần I ([ĐIỂM P1]):</strong> [SỐ CÂU P1] câu trắc nghiệm 4 đáp án. Đúng mỗi câu được <strong>[ĐIỂM/CÂU P1]đ</strong>.</li>
            <li><strong>Phần II ([ĐIỂM P2]):</strong> [SỐ CÂU P2] câu đúng/sai. Điểm mỗi câu:<br/>
              Đúng 1 ý: <strong>0.1đ</strong> | Đúng 2 ý: <strong>0.25đ</strong> | Đúng 3 ý: <strong>0.5đ</strong> | Đúng 4 ý: <strong>1.0đ</strong>
            </li>
            <li><strong>Phần III ([ĐIỂM P3]):</strong> [SỐ CÂU P3] câu trả lời ngắn. Đúng mỗi câu <strong>[ĐIỂM/CÂU P3]đ</strong>.<br/>
              <span style="color: #d97706; font-weight: bold;">⚠️ Lưu ý:</span> Dùng dấu chấm (<code>.</code>) thay vì dấu phẩy (<code>,</code>). VD: <code>1.25</code>
            </li>
          </ul>
          <div style="background: #fef9c3; border: 1px solid #fde047; border-radius: 6px; padding: 10px 14px; font-size: 13px; color: #854d0e; margin-bottom: 16px;">
            ⚠️ <strong>Quy chế:</strong> Nếu bạn chuyển sang tab hoặc ứng dụng khác trong khi thi, hệ thống sẽ ghi nhận số lần vi phạm và báo cáo về giáo viên.
          </div>
          <button id="btn-start-exam" class="btn-primary" style="width: 100%; padding: 12px; font-size: 16px; font-weight: bold;">
            ✅ Tôi đã đọc hướng dẫn — Bắt đầu thi
          </button>
        </div>
      </div>
      <div class="page-footer">[TÊN MÔN] · tự động chấm điểm theo đúng barem &amp; lưu kết quả</div>
    </div>

    <!-- Màn hình làm bài thi -->
    <div id="exam-screen" class="hidden container">
      <div class="exam-header-block">
        <div class="exam-header-top">
          <div class="meta-text">KIỂM TRA [THỜI GIAN] PHÚT · MÔN [MÔN VIẾT HOA]</div>
          <h1 class="exam-title">[TÊN ĐỀ]</h1>
          <div class="meta-sub">[SỐ CÂU MÔ TẢ]</div>
          <hr class="dashed-line" />
        </div>
      </div>
      <!-- THANH GHIM TRÊN CÙNG: đồng hồ + bảng điều hướng luôn hiện khi cuộn -->
      <div class="top-sticky">
        <div class="exam-info-bar">
          <div class="student-info">
            Thí sinh: <strong id="display-name" style="color: white"></strong> ·
            Lớp <strong id="display-class" style="color: white"></strong>
          </div>
          <div class="progress-info"><span id="answered-count">0/[TỔNG SỐ CÂU]</span> câu đã làm</div>
          <div class="timer-pill">
            <span class="green-dot">●</span> <span id="countdown">[PHÚT]:00</span>
          </div>
          <div class="score-pill hidden" id="score-pill">
            <span class="green-dot">✓</span> Điểm: <span id="review-score">0</span>/10
          </div>
        </div>
        <div id="board-container" class="board-card">
          <h3>Bảng Điều Hướng</h3>
          <!-- board-wrapper chứa legend + q-grid riêng biệt (legend không làm lệch các ô số) -->
          <div id="question-board" class="board-wrapper"></div>
          <button id="board-expand" type="button" title="Mở rộng bảng câu hỏi" aria-expanded="false">▼</button>
        </div>
      </div>
      <div id="questions-container"></div>
      <div class="submit-container">
        <button id="submit-btn" class="btn-primary">Nộp bài kiểm tra</button>
      </div>
    </div>

    <!-- Màn hình kết quả -->
    <div id="result-screen" class="hidden container">
      <div class="card result-card">
        <h2 style="font-family: var(--font-serif)">Kết Quả Bài Thi</h2>
        <div class="score-display mono-font">Điểm: <span id="final-score"></span>/10</div>
        <p>Số lần rời khỏi màn hình: <span id="cheat-display">0</span></p>
        <p id="firebase-status" style="font-size: 14px; margin-top: 8px; color: #666;">⏳ Đang kết nối hệ thống lưu...</p>
        <button id="review-btn" class="btn-primary">Xem lại bài làm</button>
      </div>
    </div>

    <script>
      // Mở rộng / thu gọn bảng điều hướng (thanh ghim trên cùng)
      document.addEventListener("click", function (e) {
        var board = document.getElementById("board-container");
        if (!board) return;
        var btn = e.target.closest("#board-expand");
        if (btn) {
          var on = board.classList.toggle("expanded");
          btn.setAttribute("aria-expanded", on);
          btn.textContent = on ? "▲" : "▼";
        } else if (e.target.closest(".q-box") && board.classList.contains("expanded")) {
          board.classList.remove("expanded");
          var b2 = document.getElementById("board-expand");
          b2.setAttribute("aria-expanded", "false");
          b2.textContent = "▼";
        }
      });
    </script>
    <script type="module" src="script.js?v=3"></script>
  </body>
</html>
```

---

## FILE 2: firebase-config.js
Copy y chang, KHÔNG thay đổi gì:

```js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getDatabase, ref, push, set, update, serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyC8AT2g3vS54-Qco3uU36xYsXN04trj0Yw",
  authDomain: "mtsedu-85ea3.firebaseapp.com",
  databaseURL: "https://mtsedu-85ea3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mtsedu-85ea3",
  storageBucket: "mtsedu-85ea3.firebasestorage.app",
  messagingSenderId: "73617729802",
  appId: "1:73617729802:web:e7fa3c3c3b9ded7522f2f3",
  measurementId: "G-JHQC9DSKY5"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export { db, ref, push, set, update, serverTimestamp };
```

---

## FILE 3: mtsedu-auth.js
Copy y chang, KHÔNG thay đổi gì:

```js
const SESSION_KEY = 'mtsedu_session';

export function getMTSeduSession() {
  const params = new URLSearchParams(window.location.search);
  const urlUsername = params.get('mtsedu_user');
  const urlName = params.get('mtsedu_name');
  const urlId = params.get('mtsedu_id');
  const returnUrl = params.get('mtsedu_return');

  if (urlUsername) {
    const session = {
      username: urlUsername,
      displayName: urlName || urlUsername,
      id: urlId || ('user_' + urlUsername),
      returnUrl: returnUrl || 'https://mtsedu.vercel.app'
    };
    try { localStorage.setItem(SESSION_KEY, JSON.stringify(session)); } catch {}
    return session;
  }

  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const user = JSON.parse(raw);
    return (user && user.username) ? user : null;
  } catch { return null; }
}

export function getReturnUrl() {
  const session = getMTSeduSession();
  return (session && session.returnUrl) ? session.returnUrl : 'https://mtsedu.vercel.app';
}

export function isLoggedIn() { return getMTSeduSession() !== null; }

export function getStudentName() {
  const s = getMTSeduSession();
  return s ? (s.displayName || s.username) : '';
}

export function clearSession() {
  try { localStorage.removeItem(SESSION_KEY); } catch {}
}

export function showLoginRequired(container, returnHash = '') {
  const mtseduUrl = 'https://mtsedu.vercel.app/' + returnHash;
  container.innerHTML = `
    <div style="max-width:480px;margin:0 auto;padding:36px;background:white;border-radius:16px;
      box-shadow:0 4px 24px rgba(0,0,0,0.08);text-align:center;
      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
      <div style="font-size:48px;margin-bottom:16px;">🔒</div>
      <h2 style="font-size:22px;font-weight:700;margin:0 0 8px;color:#111;">Vui lòng đăng nhập</h2>
      <p style="color:#666;font-size:15px;margin:0 0 28px;line-height:1.6;">
        Bạn cần đăng nhập vào hệ thống <strong>MTS Education</strong> để làm bài thi này.
      </p>
      <a href="${mtseduUrl}" style="display:inline-block;background:#000;color:#fff;
        text-decoration:none;padding:14px 32px;border-radius:10px;font-size:15px;font-weight:600;">
        Đăng nhập tại MTS Education →
      </a>
      <p style="margin-top:20px;font-size:13px;color:#999;">Tài khoản được cung cấp bởi giáo viên</p>
    </div>
  `;
}

export function insertBackButton() {
  const session = getMTSeduSession();
  const returnUrl = (session && session.returnUrl) ? session.returnUrl : 'https://mtsedu.vercel.app';
  const btn = document.createElement('div');
  btn.id = 'mtsedu-back-btn';
  btn.innerHTML = `
    <a href="${returnUrl}" style="display:inline-flex;align-items:center;gap:8px;
      position:fixed;top:14px;left:14px;z-index:9999;background:rgba(0,0,0,0.85);
      color:white;text-decoration:none;padding:9px 18px;border-radius:50px;
      font-size:14px;font-weight:600;font-family:-apple-system,sans-serif;
      backdrop-filter:blur(8px);box-shadow:0 2px 12px rgba(0,0,0,0.3);"
      onmouseover="this.style.background='rgba(0,0,0,1)'"
      onmouseout="this.style.background='rgba(0,0,0,0.85)'">
      ← Trang chủ
    </a>
  `;
  document.body.appendChild(btn);
}
```

---

## FILE 4: script.js
Dùng ĐÚNG template này, chỉ thay 4 hằng số ở đầu file:

```js
import { examData } from "./data.js";
import { db, ref, push, set, update, serverTimestamp } from "./firebase-config.js";
import { getMTSeduSession, showLoginRequired, insertBackButton } from "./mtsedu-auth.js";

const loginScreen = document.getElementById("login-screen");
const examScreen = document.getElementById("exam-screen");
const resultScreen = document.getElementById("result-screen");
const questionsContainer = document.getElementById("questions-container");
const questionBoard = document.getElementById("question-board");
const submitBtn = document.getElementById("submit-btn");

// ===== CHỈ THAY 4 DÒNG NÀY =====
const MA_DE       = "[MÃ ĐỀ]";                       // mã đề Firebase (không dấu, không cách)
const DRAFT_KEY   = "examDraft_[MÃ ĐỀ]";             // key localStorage (thêm mã đề vào sau)
const EXAM_MINUTES = [THỜI GIAN PHÚT];                 // thời gian làm bài (phút)
const RETURN_HASH = "[HASH VD: #physics]";           // hash trang MTSedu (vd: #math, #physics)
// ================================

let timeRemaining = EXAM_MINUTES * 60;
let timerInterval;
let userAnswers = {};
let flaggedQuestions = {};
let isFinished = false;
let cheatCount = 0;
let studentName = "";
let studentClass = "";

window.addEventListener("DOMContentLoaded", () => {
  const session = getMTSeduSession();

  // Luôn gắn listener trước — đảm bảo btn-start-exam tồn tại
  const btnStart = document.getElementById("btn-start-exam");
  if (btnStart) {
    btnStart.addEventListener("click", () => {
      if (!session) {
        // Nếu chưa đăng nhập, hiện yêu cầu login thay vì vào bài
        const loginCard = loginScreen.querySelector(".form-card") || loginScreen.querySelector(".card");
        if (loginCard) showLoginRequired(loginCard, RETURN_HASH);
        return;
      }
      const draft = JSON.parse(localStorage.getItem(DRAFT_KEY));
      if (draft && !draft.isFinished && draft.studentName === studentName) {
        loadDraftAndContinue(draft);
      } else {
        startExamDirectly();
      }
    });
  }

  if (!session) {
    // Chưa đăng nhập: giữ trang hướng dẫn, không redirect
    return;
  }
  studentName = session.displayName || session.username;
  studentClass = session.username;
  insertBackButton();
});

function startExamDirectly() {
  userAnswers = {}; flaggedQuestions = {}; cheatCount = 0; isFinished = false;
  localStorage.removeItem(DRAFT_KEY);
  timeRemaining = EXAM_MINUTES * 60;
  document.getElementById("display-name").innerText = studentName;
  document.getElementById("display-class").innerText = studentClass;
  loginScreen.classList.add("hidden");
  examScreen.classList.remove("hidden");
  renderExam(); restoreDOMState(); renderBoard(); startTimer(); setupAntiCheat();
}

function loadDraftAndContinue(draft) {
  studentName = draft.studentName || studentName;
  studentClass = draft.studentClass || studentClass;
  timeRemaining = draft.timeRemaining;
  userAnswers = draft.userAnswers || {};
  flaggedQuestions = draft.flaggedQuestions || {};
  cheatCount = draft.cheatCount || 0;
  document.getElementById("display-name").innerText = studentName;
  document.getElementById("display-class").innerText = studentClass;
  loginScreen.classList.add("hidden");
  examScreen.classList.remove("hidden");
  renderExam(); restoreDOMState(); renderBoard(); startTimer(); setupAntiCheat();
}

function renderExam() {
  questionsContainer.innerHTML = "";
  let currentPart = 0, qCounter = 1;
  const partTitles = {
    1: { title: "Phần I — Trắc nghiệm khách quan", score: "[ĐIỂM P1] điểm", sub: "Mỗi câu đúng được [ĐIỂM/CÂU P1] điểm. Chọn một đáp án duy nhất." },
    2: { title: "Phần II — Trắc nghiệm đúng sai", score: "[ĐIỂM P2] điểm", sub: "Trong mỗi ý a, b, c, d, chọn đúng hoặc sai." },
    3: { title: "Phần III — Trắc nghiệm trả lời ngắn", score: "[ĐIỂM P3] điểm", sub: "Mỗi câu [ĐIỂM/CÂU P3] điểm. Nhập đáp án (chỉ ghi số hoặc kết quả cuối cùng)." },
  };

  examData.forEach((q) => {
    if (q.part !== currentPart) {
      currentPart = q.part;
      const header = document.createElement("div");
      header.className = "section-header";
      header.innerHTML = `
        <div class="section-title">${partTitles[currentPart].title} <span class="badge">${partTitles[currentPart].score}</span></div>
        <div class="section-subtitle">${partTitles[currentPart].sub}</div>`;
      questionsContainer.appendChild(header);
      qCounter = 1;
    }
    const card = document.createElement("div");
    card.className = "question-card";
    card.id = `q-card-${q.id}`;

    let html = `<div class="q-layout"><div class="q-header"><div class="q-num-flag">
      <div class="q-num">Câu ${qCounter}</div>
      <button class="btn-flag ${flaggedQuestions[q.id] ? "active" : ""}" data-id="${q.id}" title="Đánh dấu">
        ${flaggedQuestions[q.id] ? "★" : "☆"}</button>
    </div></div><div class="q-content">
    <div class="q-text">${q.question}</div>
    ${q.image ? `<div class="q-image"><img src="${q.image}" alt="Hình câu ${qCounter}"></div>` : ""}`;

    if (q.part === 1) {
      html += `<div class="options-list">`;
      q.options.forEach((opt, idx) => {
        html += `<label class="option-label" id="lbl-${q.id}-${idx}">
          <input type="radio" name="ans-${q.id}" value="${idx}">
          <span class="opt-letter">${["A","B","C","D"][idx]}.</span> ${opt}</label>`;
      });
      html += `</div>`;
    } else if (q.part === 2) {
      q.statements.forEach((stmt, idx) => {
        html += `<div class="tf-row" id="row-${q.id}-${idx}">
          <div><strong>${["a","b","c","d"][idx]})</strong> ${stmt.text}</div>
          <div class="tf-controls">
            <label><input type="radio" name="tf-${q.id}-${idx}" value="true"> Đúng</label>
            <label><input type="radio" name="tf-${q.id}-${idx}" value="false"> Sai</label>
          </div></div>`;
      });
    } else if (q.part === 3) {
      html += `<input type="text" class="short-ans-input" name="ans-${q.id}" placeholder="Nhập đáp án...">`;
    }

    html += `<div class="explanation hidden" id="exp-${q.id}"><strong>Hướng dẫn giải:</strong> ${q.explanation}</div></div></div>`;
    card.innerHTML = html;
    questionsContainer.appendChild(card);
    qCounter++;
  });

  document.querySelectorAll(".btn-flag").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const qid = e.target.closest(".btn-flag").getAttribute("data-id");
      flaggedQuestions[qid] = !flaggedQuestions[qid];
      e.target.closest(".btn-flag").classList.toggle("active");
      e.target.closest(".btn-flag").innerText = flaggedQuestions[qid] ? "★" : "☆";
      updateBoard(); saveDraft();
    });
  });

  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", (e) => {
      const name = e.target.name;
      if (name.startsWith("ans-") && e.target.type === "radio") {
        const qid = name.replace("ans-", "");
        document.querySelectorAll(`input[name="${name}"]`).forEach((r) =>
          r.closest(".option-label").classList.remove("selected"));
        e.target.closest(".option-label").classList.add("selected");
        userAnswers[qid] = parseInt(e.target.value);
      } else if (name.startsWith("tf-")) {
        const parts = name.split("-");
        const qid = parts[1];
        const idx = parts[2];
        if (!userAnswers[qid]) userAnswers[qid] = {};
        userAnswers[qid][idx] = e.target.value;
      } else if (e.target.type === "text") {
        userAnswers[name.replace("ans-", "")] = e.target.value;
      }
      updateBoard(); saveDraft();
    });
  });

  if (window.MathJax) MathJax.typesetPromise();
}

function renderBoard() {
  if (!questionBoard) return;
  // Legend riêng — không nằm trong q-grid để không làm lệch các ô số
  const legend = document.createElement("div");
  legend.className = "board-legend";
  legend.innerHTML = `
    <span class="box"></span><span class="box-label">Chưa làm</span>
    <span class="box done"></span><span class="box-label">Đã làm</span>
    <span class="box flagged"></span><span class="box-label">Đánh dấu</span>`;
  questionBoard.appendChild(legend);

  // Grid chứa các ô số câu
  const grid = document.createElement("div");
  grid.className = "q-grid";
  grid.id = "q-grid-inner";
  questionBoard.appendChild(grid);

  examData.forEach((q, index) => {
    const box = document.createElement("button");
    box.className = "q-box"; box.id = `box-${q.id}`; box.innerText = index + 1; box.type = "button";
    box.addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById(`q-card-${q.id}`).scrollIntoView({ behavior: "smooth", block: "center" });
    });
    grid.appendChild(box);
  });
  updateBoard();
}

function updateBoard() {
  let answeredCount = 0;
  examData.forEach((q) => {
    let answered = false;
    if (q.part === 1 && userAnswers[q.id] !== undefined) answered = true;
    if (q.part === 2 && userAnswers[q.id] && Object.keys(userAnswers[q.id]).length === 4) answered = true;
    if (q.part === 3 && userAnswers[q.id] && userAnswers[q.id].trim() !== "") answered = true;
    if (answered) answeredCount++;
    if (questionBoard) {
      const box = document.getElementById(`box-${q.id}`);
      if (box) {
        box.className = "q-box";
        if (flaggedQuestions[q.id]) box.classList.add("flagged");
        else if (answered) box.classList.add("done");
      }
    }
  });
  const countEl = document.getElementById("answered-count");
  if (countEl) countEl.innerText = `${answeredCount}/${examData.length}`;
}

function saveDraft() {
  localStorage.setItem(DRAFT_KEY, JSON.stringify({
    studentName, studentClass, timeRemaining,
    userAnswers, flaggedQuestions, cheatCount, isFinished,
    lastSaved: new Date().toISOString(),
  }));
}

function restoreDOMState() {
  document.querySelectorAll("input").forEach((input) => {
    const name = input.name;
    if (!name) return;
    if (input.type === "radio" && name.startsWith("ans-")) {
      const qid = name.replace("ans-", "");
      if (userAnswers[qid] == input.value) {
        input.checked = true;
        input.closest(".option-label").classList.add("selected");
      }
    } else if (input.type === "radio" && name.startsWith("tf-")) {
      const parts = name.split("-");
      const qid = parts[1];
      const idx = parts[2];
      if (userAnswers[qid] && userAnswers[qid][idx] === input.value) input.checked = true;
    } else if (input.type === "text") {
      const qid = name.replace("ans-", "");
      input.value = userAnswers[qid] || "";
    }
  });
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeRemaining--; saveDraft();
    const m = Math.floor(timeRemaining / 60).toString().padStart(2, "0");
    const s = (timeRemaining % 60).toString().padStart(2, "0");
    document.getElementById("countdown").innerText = `${m}:${s}`;
    if (timeRemaining === 30) {
      alert("⚠️ Cảnh báo: Chỉ còn 30 giây!");
      document.querySelector(".timer-pill").classList.add("timer-danger");
    }
    if (timeRemaining <= 0) { clearInterval(timerInterval); submitExam(); }
  }, 1000);
}

function setupAntiCheat() {
  window.addEventListener("beforeunload", (e) => {
    if (!isFinished) { e.preventDefault(); e.returnValue = "Bạn chưa nộp bài!"; }
  });
  window.addEventListener("pagehide", () => { if (!isFinished) saveDraft(); });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && !isFinished) { cheatCount++; saveDraft(); }
  });
}

submitBtn.addEventListener("click", () => {
  if (confirm("Bạn có chắc muốn nộp bài?")) submitExam();
});

function submitExam() {
  isFinished = true; clearInterval(timerInterval);
  document.querySelectorAll("input, .btn-flag").forEach((el) => (el.disabled = true));
  submitBtn.style.display = "none";
  const timerPill = document.querySelector(".timer-pill");
  if (timerPill) timerPill.classList.remove("timer-danger");

  let totalScore = 0, diemPhan1 = 0, diemPhan2 = 0, diemPhan3 = 0;
  let correctness = {}; // Lưu trạng thái đúng sai chi tiết

  examData.forEach((q) => {
    document.getElementById(`exp-${q.id}`).classList.remove("hidden");
    if (q.part === 1) {
      const selected = userAnswers[q.id];
      document.getElementById(`lbl-${q.id}-${q.correctAnswer}`).classList.add("correct-ans");
      if (selected === q.correctAnswer) { totalScore += [ĐIỂM/CÂU P1]; diemPhan1 += [ĐIỂM/CÂU P1]; correctness[q.id] = true; }
      else { 
        correctness[q.id] = false; 
        if (selected !== undefined) document.getElementById(`lbl-${q.id}-${selected}`).classList.add("wrong-ans"); 
      }
    } else if (q.part === 2) {
      let cCount = 0;
      correctness[q.id] = {};
      q.statements.forEach((stmt, idx) => {
        const row = document.getElementById(`row-${q.id}-${idx}`);
        const ans = userAnswers[q.id] ? userAnswers[q.id][idx] : null;
        if (ans === stmt.correct.toString()) { cCount++; row.classList.add("correct-ans"); correctness[q.id][idx] = true; }
        else { correctness[q.id][idx] = false; if (ans !== null) row.classList.add("wrong-ans"); }
      });
      if (cCount === 4) { totalScore += 1.0; diemPhan2 += 1.0; }
      else if (cCount === 3) { totalScore += 0.5; diemPhan2 += 0.5; }
      else if (cCount === 2) { totalScore += 0.25; diemPhan2 += 0.25; }
      else if (cCount === 1) { totalScore += 0.1; diemPhan2 += 0.1; }
    } else if (q.part === 3) {
      const input = document.querySelector(`input[name="ans-${q.id}"]`);
      const userVal = (userAnswers[q.id] || "").trim().toLowerCase();
      const correct = q.correctAnswer.toLowerCase();
      if (userVal === correct || userVal === correct.replace(".", ",")) {
        totalScore += [ĐIỂM/CÂU P3]; diemPhan3 += [ĐIỂM/CÂU P3]; input.classList.add("correct-ans"); correctness[q.id] = true;
      } else { input.classList.add("wrong-ans"); correctness[q.id] = false; }
    }
  });

  const scorePill = document.getElementById("score-pill");
  document.querySelector(".timer-pill")?.classList.add("hidden");
  if (scorePill) { scorePill.classList.remove("hidden"); document.getElementById("review-score").innerText = totalScore.toFixed(2); }

  saveExamResultToFirebase(diemPhan1, diemPhan2, diemPhan3, totalScore, cheatCount, correctness);
  document.getElementById("final-score").innerText = totalScore.toFixed(2);
  document.getElementById("cheat-display").innerText = cheatCount;
  examScreen.classList.add("hidden"); resultScreen.classList.remove("hidden");
  localStorage.removeItem(DRAFT_KEY);
}

async function saveExamResultToFirebase(diemPhan1, diemPhan2, diemPhan3, tongDiem, soLanThoat, correctness) {
  const statusEl = document.getElementById("firebase-status");
  if (statusEl) statusEl.innerText = "⏳ Đang đồng bộ kết quả lên MTSedu...";
  try {
    const session = getMTSeduSession();
    const userId = session ? session.id : null;
    const resultData = {
      hoTen: studentName, lop: studentClass, maDe: MA_DE,
      diemPhan1, diemPhan2, diemPhan3, tongDiem, soLanThoat,
      chiTietDapAn: userAnswers,
      chiTietDungSai: correctness,
      cauDanhDau: flaggedQuestions,
      userId: userId || "unknown",
      thoiGianNop: new Date().toISOString(),
      serverTimestamp: serverTimestamp(),
    };
    const updates = {};
    const newResultId = push(ref(db, `testResults/${MA_DE}`)).key;
    updates[`testResults/${MA_DE}/${newResultId}`] = resultData;
    if (userId) updates[`users/${userId}/results/${newResultId}`] = resultData;
    await update(ref(db), updates);
    if (statusEl) { statusEl.style.color = "green"; statusEl.innerText = "✅ Kết quả đã được đồng bộ thành công!"; }
  } catch (error) {
    if (statusEl) { statusEl.style.color = "red"; statusEl.innerText = "❌ Lỗi: " + error.message; }
  }
}

document.getElementById("review-btn").addEventListener("click", () => {
  resultScreen.classList.add("hidden");
  examScreen.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});
```
````

---

## ⚠️ SAU KHI TẠO XONG (cả 2 giai đoạn):
1. Copy file `style.css` **bản mới** từ thư mục `de-5-hsa-dinh-luong-vnes` vào (không thay đổi). Bản này đã có thanh ghim trên cùng (đồng hồ + bảng điều hướng luôn hiện khi cuộn). **Không dùng style.css cũ** của `de-1-ktra-luong-giac-toan-11` vì bảng điều hướng cũ nằm cố định góc dưới phải, che nội dung trên điện thoại.
2. Tạo GitHub repo mới, push code lên.
3. Bật GitHub Pages (Settings → Pages → branch main).
4. Thêm link GitHub Pages vào `subjectsData.js` trong MTSedu (field `link`).
5. Commit & push MTSedu → Vercel tự deploy.

---

## 📝 GHI CHÚ TUỲ CHỈNH

| Muốn thay đổi | Sửa ở đâu |
|---|---|
| Điểm mỗi câu Phần I (VD: 0.2 thay 0.25) | `script.js` → `submitExam()`: sửa `+= 0.25` |
| Số ý Phần II (VD: 3 ý thay 4 ý) | `script.js` → `updateBoard()`: sửa `=== 4`, `submitExam()`: sửa block `cCount` |
| Thang điểm Phần II (mặc định: 1ý=0.1đ, 2ý=0.25đ, 3ý=0.5đ, 4ý=1.0đ) | `script.js` → `submitExam()`: sửa block `if (cCount === 4)...` |
| Điểm mỗi câu Phần III | `script.js` → `submitExam()`: sửa `+= 0.5` hoặc `+= 0.25` |
| Thêm hình vào câu hỏi | `data.js`: `image: "anh.png"` (đặt ảnh cùng thư mục) |
| Đề chỉ có Phần I + III | Bỏ data Phần II trong `data.js`, bỏ `partTitles[2]` trong `renderExam()` |
| Cảnh báo còn X giây | `script.js` → `startTimer()`: sửa `timeRemaining === 30` |
| Sửa nội dung hướng dẫn & quy chế thi | `index.html` → phần `exam-instructions` trong `#login-screen` |
| Bỏ mức điểm 0.1 khi đúng 1 ý Phần II | `script.js` → `submitExam()`: xóa dòng `else if (cCount === 1)...` |
