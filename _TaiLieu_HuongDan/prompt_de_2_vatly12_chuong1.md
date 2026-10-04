# 📋 PROMPT TẠO ĐỀ THI MỚI — HỆ THỐNG MTS EDUCATION

Dùng prompt này mỗi khi muốn tạo một bài thi mới tương tự `de-1-ktra-luong-giac-toan-11`.

---

## CÁCH DÙNG

Copy toàn bộ phần **PROMPT** bên dưới, điền vào các ô `[...]`, rồi gửi cho AI.

---

## PROMPT

````
Tạo cho tôi một bài thi trắc nghiệm HTML/JS theo đúng chuẩn hệ thống MTS Education với các thông tin sau:

## THÔNG TIN BÀI THI
- Tên đề: [ĐỀ 2 - KIỂM TRA CHƯƠNG 1: VẬT LÝ NHIỆT (3/10)]
- Môn học: [VẬT LÝ 12]
- Mô tả ngắn trên header: [ĐỀ 2 - KIỂM TRA CHƯƠNG 1: VẬT LÝ NHIỆT · NĂM HỌC 2026-2027]
- Thời gian làm bài: [VD: 50] phút 
- Mã đề (dùng cho Firebase, không dấu, không cách): [VD: VATLY-12-DE-2-CHUONG-1]
- Trang MTSedu quay về khi bấm "← Trang chủ": [VD: https://mtsedu.vercel.app/#math]

## CẤU TRÚC ĐỀ THI
- Phần I — Trắc nghiệm khách quan: [VD: 12] câu × 0.25đ = [VD: 3.0đ]
- Phần II — Trắc nghiệm đúng sai: [VD: 4] câu × (4 ý a,b,c,d) = [VD: 4.0đ]
  - Thang điểm Phần II: 4 đúng = 1đ | 3 đúng = 0.5đ | 2 đúng = 0.25đ | ≤1 = 0đ
- Phần III — Trả lời ngắn: [VD: 6] câu × 0.5đ = [VD: 3.0đ]
- Tổng: 10 điểm

## NỘI DUNG CÂU HỎI
[Paste toàn bộ câu hỏi tại đây. Với mỗi câu ghi rõ:
- Có những câu có hình ảnh thì chú thích để tôi chèn hình ảnh sau còn lại những phần text của câu thì vẫn viết như bình thường 
PHẦN I (trắc nghiệm 4 đáp án):
Câu 1: [đề bài, hỗ trợ LaTeX $...$]
A. [đáp án A]  B. [đáp án B]  C. [đáp án C]  D. [đáp án D]
Đáp án đúng: [A/B/C/D]
Giải: [hướng dẫn giải ngắn]

PHẦN II (đúng/sai 4 ý):
Câu 1: [đề bài]
a) [mệnh đề] → [Đúng/Sai]
b) [mệnh đề] → [Đúng/Sai]
c) [mệnh đề] → [Đúng/Sai]
d) [mệnh đề] → [Đúng/Sai]
Giải: [hướng dẫn]

PHẦN III (trả lời ngắn):
- 1 số câu dùng chung đề và có hình ảnh thì hãy chú thích phần chèn hình ảnh vào cho tôi còn những phần còn lại của các câu vẫn viết text theo latex
Câu 1: [đề bài]
Đáp án: [số hoặc biểu thức đơn giản, VD: 1/2 hoặc 0.5]
Giải: [hướng dẫn]
]

---

Yêu cầu tạo ra 5 file sau đây, viết đầy đủ code hoàn chỉnh:

## FILE 1: index.html

```html
<!doctype html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>[TÊN ĐỀ]</title>
    <link rel="stylesheet" href="style.css" />
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
    <!-- Màn hình chờ đăng nhập (sẽ bị thay bởi JS nếu đã login) -->
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
        <form id="login-form">
          <div class="form-group">
            <label for="student-name">Họ và tên: </label>
            <input type="text" id="student-name" placeholder="Nguyễn Văn A" required />
          </div>
          <div class="form-group">
            <label for="student-class">Lớp/Nhóm: </label>
            <input type="text" id="student-class" placeholder="11A1" required />
          </div>
          <div class="form-group">
            <label for="exam-time">Thời gian làm bài (phút)</label>
            <input type="number" id="exam-time" value="[THỜI GIAN PHÚT]" />
          </div>
          <button type="submit" class="btn-primary" style="margin-top: 10px">Bắt đầu làm bài</button>
          <p class="form-note">Khi hết giờ, bài làm sẽ tự động được nộp. Kết quả và đáp án sẽ hiển thị ngay sau khi nộp bài.</p>
        </form>
      </div>
      <div class="page-footer">[TÊN MÔN] · tự động chấm điểm theo đúng barem & lưu kết quả</div>
    </div>

    <!-- Màn hình làm bài thi -->
    <div id="exam-screen" class="hidden container">
      <div id="board-container" class="board-card">
        <h3>Bảng Điều Hướng</h3>
        <div id="question-board" class="q-grid"></div>
      </div>
      <div class="exam-header-block">
        <div class="exam-header-top">
          <div class="meta-text">KIỂM TRA [THỜI GIAN] PHÚT · MÔN [MÔN VIẾT HOA]</div>
          <h1 class="exam-title">[TÊN ĐỀ]</h1>
          <div class="meta-sub">[SỐ CÂU MÔ TẢ]</div>
          <hr class="dashed-line" />
        </div>
        <div class="exam-info-bar sticky">
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

    <script type="module" src="script.js"></script>
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

## FILE 4: data.js
Tạo với ĐÚNG cấu trúc dưới đây, điền toàn bộ câu hỏi vào:

```js
export const examData = [

  // ======== PHẦN 1: TRẮC NGHIỆM ========
  // id: string duy nhất | part: 1 | correctAnswer: 0=A,1=B,2=C,3=D
  {
    id: "p1_1",
    part: 1,
    question: "[ĐỀ BÀI — LaTeX dùng $...$ hoặc \\\\( \\\\)]",
    options: ["[A]", "[B]", "[C]", "[D]"],
    correctAnswer: 0,
    explanation: "[GIẢI THÍCH]",
    image: null  // hoặc "ten-anh.png" nếu có hình
  },
  // ... câu 2 → hết Phần I

  // ======== PHẦN 2: ĐÚNG/SAI ========
  // statements[i].correct: true hoặc false (boolean, không phải string)
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
    explanation: "[GIẢI THÍCH]"
  },
  // ... câu 2 → hết Phần II

  // ======== PHẦN 3: TRẢ LỜI NGẮN ========
  // correctAnswer: string số, chấp nhận cả dấu chấm và dấu phẩy
  {
    id: "p3_1",
    part: 3,
    question: "[ĐỀ BÀI]",
    correctAnswer: "0.5",  // script tự so sánh với cả "0,5"
    explanation: "[GIẢI THÍCH]",
    image: null
  },
  // ... câu 2 → hết Phần III
];
```

---

## FILE 5: script.js
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
const MA_DE       = "TOAN11_DE2";                    // mã đề Firebase (không dấu, không cách)
const DRAFT_KEY   = "examDraft_TOAN11_DE2";          // key localStorage (thêm mã đề vào sau)
const EXAM_MINUTES = 90;                              // thời gian làm bài (phút)
const RETURN_HASH = "#math";                         // hash trang MTSedu (vd: #math, #physics)
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
  if (!session) {
    const loginCard = loginScreen.querySelector(".form-card") || loginScreen.querySelector(".card");
    if (loginCard) showLoginRequired(loginCard, RETURN_HASH);
    return;
  }
  studentName = session.displayName || session.username;
  studentClass = session.username;
  insertBackButton();

  const draft = JSON.parse(localStorage.getItem(DRAFT_KEY));
  if (draft && !draft.isFinished && draft.studentName === studentName) {
    loadDraftAndContinue(draft);
  } else {
    startExamDirectly();
  }
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
    1: { title: "Phần I — Trắc nghiệm khách quan", score: "3.0 điểm", sub: "Mỗi câu đúng được 0.25 điểm. Chọn một đáp án duy nhất." },
    2: { title: "Phần II — Trắc nghiệm đúng sai", score: "4.0 điểm", sub: "Trong mỗi ý a, b, c, d, chọn đúng hoặc sai." },
    3: { title: "Phần III — Trắc nghiệm trả lời ngắn", score: "3.0 điểm", sub: "Mỗi câu 0.5 điểm. Nhập đáp án (chỉ ghi số hoặc kết quả cuối cùng)." },
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
        const [, qid, idx] = name.split("-");
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
  questionBoard.innerHTML = `<div class="board-legend">
    <span class="box"></span><span class="box-label">Chưa làm</span>
    <span class="box done"></span><span class="box-label">Đã làm</span>
    <span class="box flagged"></span><span class="box-label">Đánh dấu</span></div>`;
  examData.forEach((q, index) => {
    const box = document.createElement("button");
    box.className = "q-box"; box.id = `box-${q.id}`; box.innerText = index + 1; box.type = "button";
    box.addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById(`q-card-${q.id}`).scrollIntoView({ behavior: "smooth", block: "center" });
    });
    questionBoard.appendChild(box);
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
    const qid = name.split("-")[1];
    if (input.type === "radio" && name.startsWith("ans-")) {
      if (userAnswers[qid] == input.value) { input.checked = true; input.closest(".option-label").classList.add("selected"); }
    } else if (input.type === "radio" && name.startsWith("tf-")) {
      const idx = name.split("-")[2];
      if (userAnswers[qid] && userAnswers[qid][idx] === input.value) input.checked = true;
    } else if (input.type === "text") {
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

  examData.forEach((q) => {
    document.getElementById(`exp-${q.id}`).classList.remove("hidden");
    if (q.part === 1) {
      const selected = userAnswers[q.id];
      document.getElementById(`lbl-${q.id}-${q.correctAnswer}`).classList.add("correct-ans");
      if (selected === q.correctAnswer) { totalScore += 0.25; diemPhan1 += 0.25; }
      else if (selected !== undefined) document.getElementById(`lbl-${q.id}-${selected}`).classList.add("wrong-ans");
    } else if (q.part === 2) {
      let cCount = 0;
      q.statements.forEach((stmt, idx) => {
        const row = document.getElementById(`row-${q.id}-${idx}`);
        const ans = userAnswers[q.id] ? userAnswers[q.id][idx] : null;
        if (ans === stmt.correct.toString()) { cCount++; row.classList.add("correct-ans"); }
        else if (ans !== null) row.classList.add("wrong-ans");
      });
      if (cCount === 4) { totalScore += 1.0; diemPhan2 += 1.0; }
      else if (cCount === 3) { totalScore += 0.5; diemPhan2 += 0.5; }
      else if (cCount === 2) { totalScore += 0.25; diemPhan2 += 0.25; }
    } else if (q.part === 3) {
      const input = document.querySelector(`input[name="ans-${q.id}"]`);
      const userVal = (userAnswers[q.id] || "").trim().toLowerCase();
      const correct = q.correctAnswer.toLowerCase();
      if (userVal === correct || userVal === correct.replace(".", ",")) {
        totalScore += 0.5; diemPhan3 += 0.5; input.classList.add("correct-ans");
      } else { input.classList.add("wrong-ans"); }
    }
  });

  const scorePill = document.getElementById("score-pill");
  document.querySelector(".timer-pill")?.classList.add("hidden");
  if (scorePill) { scorePill.classList.remove("hidden"); document.getElementById("review-score").innerText = totalScore.toFixed(2); }

  saveExamResultToFirebase(diemPhan1, diemPhan2, diemPhan3, totalScore, cheatCount);
  document.getElementById("final-score").innerText = totalScore.toFixed(2);
  document.getElementById("cheat-display").innerText = cheatCount;
  examScreen.classList.add("hidden"); resultScreen.classList.remove("hidden");
  localStorage.removeItem(DRAFT_KEY);
}

async function saveExamResultToFirebase(diemPhan1, diemPhan2, diemPhan3, tongDiem, soLanThoat) {
  const statusEl = document.getElementById("firebase-status");
  if (statusEl) statusEl.innerText = "⏳ Đang đồng bộ kết quả lên MTSedu...";
  try {
    const session = getMTSeduSession();
    const userId = session ? session.id : null;
    const resultData = {
      hoTen: studentName, lop: studentClass, maDe: MA_DE,
      diemPhan1, diemPhan2, diemPhan3, tongDiem, soLanThoat,
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

---

⚠️ SAU KHI TẠO XONG:
1. Copy file style.css từ thư mục de-1-ktra-luong-giac-toan-11 vào (không thay đổi)
2. Tạo GitHub repo mới, push code lên
3. Bật GitHub Pages (Settings → Pages → branch main)
4. Thêm link GitHub Pages vào subjectsData.js trong MTSedu (field `link`)
5. Commit & push MTSedu → Vercel tự deploy
````

---

## GHI CHÚ TUỲ CHỈNH
- Có file đáp án tôi gửi kèo để từ đó làm phần đáp án và hướng dẫn sau khi xem đáp án của học sinh 

| Muốn thay đổi | Sửa ở đâu |
|---|---|
| Điểm mỗi câu Phần I (VD: 0.2 thay 0.25) | `submitExam()`: sửa `+= 0.25` |
| Số ý Phần II (VD: 3 ý thay 4 ý) | `updateBoard()`: sửa `=== 4`, `submitExam()`: sửa `cCount === 4,3,2` |
| Thang điểm Phần II | `submitExam()`: sửa block `if (cCount === 4)...` |
| Điểm mỗi câu Phần III | `submitExam()`: sửa `+= 0.5` |
| Thêm hình vào câu hỏi | `data.js`: `image: "anh.png"` (đặt ảnh cùng thư mục) |
| Đề chỉ có Phần I + III | Bỏ data Phần II trong `data.js`, bỏ `partTitles[2]` trong `renderExam()` |
| Cảnh báo còn X giây | `startTimer()`: sửa `timeRemaining === 30` |
