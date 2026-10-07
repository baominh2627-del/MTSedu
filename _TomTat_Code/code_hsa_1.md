### index.html

`html
<!doctype html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ĐỀ THI ĐỊNH LƯỢNG HSA - ĐỀ SỐ 1</title>
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
    <!-- Màn hình chờ / hướng dẫn -->
    <div id="login-screen" class="container">
      <div class="exam-header-block" style="margin-bottom: 20px">
        <div class="exam-header-top" style="border-radius: 8px; border-bottom: 1px solid var(--border-color);">
          <div class="meta-text">BÀI THI ĐÁNH GIÁ NĂNG LỰC HSA · TOÁN HỌC VÀ XỬ LÝ SỐ LIỆU</div>
          <h1 class="exam-title">ĐỀ THI ĐỊNH LƯỢNG HSA - ĐỀ SỐ 1</h1>
          <div class="meta-sub">50 câu hỏi · Trắc nghiệm &amp; Điền đáp án — thang điểm 50</div>
          <hr class="dashed-line" />
        </div>
      </div>
      <div class="card form-card">
        <div class="exam-instructions" style="text-align: left;">
          <h3 style="margin-top: 0; color: var(--navy); font-size: 16px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; font-weight: bold;">📋 HƯỚNG DẪN &amp; QUY CHẾ THI</h3>
          <ul style="font-size: 14px; color: #334155; line-height: 1.8; padding-left: 20px; margin-bottom: 16px;">
            <li><strong>Tổng số câu hỏi:</strong> 50 câu (Bao gồm câu hỏi trắc nghiệm 4 lựa chọn và câu hỏi điền đáp án).</li>
            <li><strong>Thang điểm:</strong> Mỗi câu trả lời đúng được <strong>1 điểm</strong> (Tối đa 50 điểm).</li>
            <li><strong>Thời gian làm bài:</strong> 75 phút.</li>
            <li><span style="color: #d97706; font-weight: bold;">⚠️ Lưu ý (Với câu điền đáp án):</span> Dùng dấu chấm (<code>.</code>) để phân cách thập phân. VD: <code>1.25</code></li>
          </ul>
          <div style="background: #fef9c3; border: 1px solid #fde047; border-radius: 6px; padding: 10px 14px; font-size: 13px; color: #854d0e; margin-bottom: 16px;">
            ⚠️ <strong>Quy chế:</strong> Nếu bạn chuyển sang tab hoặc ứng dụng khác trong khi thi, hệ thống sẽ ghi nhận số lần vi phạm và báo cáo về giáo viên.
          </div>
          <button id="btn-start-exam" class="btn-primary" style="width: 100%; padding: 12px; font-size: 16px; font-weight: bold;">
            ✅ Tôi đã đọc hướng dẫn — Bắt đầu thi
          </button>
        </div>
      </div>
      <div class="page-footer">Toán và Xử lý số liệu · tự động chấm điểm theo đúng barem &amp; lưu kết quả</div>
    </div>

    <!-- Màn hình làm bài thi -->
    <div id="exam-screen" class="hidden container">
      <div id="board-container" class="board-card">
        <h3>Bảng Điều Hướng</h3>
        <div id="question-board" class="board-wrapper"></div>
      </div>
      <div class="exam-header-block">
        <div class="exam-header-top">
          <div class="meta-text">KIỂM TRA 75 PHÚT · Toán và Xử lý số liệu</div>
          <h1 class="exam-title">ĐỀ THI ĐỊNH LƯỢNG HSA - ĐỀ SỐ 1</h1>
          <div class="meta-sub">50 câu hỏi</div>
          <hr class="dashed-line" />
        </div>
        <div class="exam-info-bar sticky">
          <div class="student-info">
            Thí sinh: <strong id="display-name" style="color: white"></strong> ·
            Lớp <strong id="display-class" style="color: white"></strong>
          </div>
          <div class="progress-info"><span id="answered-count">0/50</span> câu đã làm</div>
          <div class="timer-pill">
            <span class="green-dot">●</span> <span id="countdown">75:00</span>
          </div>
          <div class="score-pill hidden" id="score-pill">
            <span class="green-dot">✓</span> Điểm: <span id="review-score">0</span>/50
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
        <div class="score-display mono-font">Điểm: <span id="final-score"></span>/50</div>
        <p>Số lần rời khỏi màn hình: <span id="cheat-display">0</span></p>
        <p id="firebase-status" style="font-size: 14px; margin-top: 8px; color: #666;">⏳ Đang kết nối hệ thống lưu...</p>
        <button id="review-btn" class="btn-primary">Xem lại bài làm</button>
      </div>
    </div>

    <script type="module" src="script.js"></script>
  </body>
</html>


`

### style.css

`css
:root {
  --bg-color: #f8fafc;
  --grid-color: #e2e8f0;
  --ink: #1e293b;
  --navy: #1e3a8a;
  --blue-text: #2563eb;
  --gray-text: #64748b;
  --border-color: #e2e8f0;
  --font-sans:
    system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-serif: "Times New Roman", Times, serif;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--bg-color);
  background-image:
    linear-gradient(var(--grid-color) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-color) 1px, transparent 1px);
  background-size: 25px 25px;
  font-family: var(--font-sans);
  color: var(--ink);
  line-height: 1.6;
}

.hidden {
  display: none !important;
}

.container {
  max-width: 900px;
  margin: 40px auto;
  padding: 0 20px;
}

/* BẢNG ĐIỀU HƯỚNG STICKY NHỎ */
#board-container {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 280px;
  max-height: 400px;
  background: #fff;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 500;
  overflow-y: auto;
}

#board-container h3 {
  font-size: 13px;
  font-weight: bold;
  color: var(--navy);
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.board-legend {
  font-size: 11px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 10px;
  padding: 8px;
  background: #f8fafc;
  border-radius: 6px;
}

.box {
  width: 18px;
  height: 18px;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: inline-block;
  background: #fff;
}

.box.done {
  background-color: #007bff;
  border-color: #007bff;
}

.box.flagged {
  background-color: #ffc107;
  border-color: #ffc107;
}

.box-label {
  font-size: 11px;
  color: var(--gray-text);
  line-height: 18px;
}

.board-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.q-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
}

.q-box {
  padding: 8px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 12px;
  background: #fff;
  transition: all 0.2s;
}

.q-box:hover {
  background: #f0f0f0;
  transform: scale(1.05);
}

.q-box.done {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.q-box.flagged {
  background-color: #ffc107;
  color: #333;
  border-color: #ffc107;
  font-weight: bold;
}

/* CARD CHUNG */
.card {
  background: #fff;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-color);
}

.login-card,
.result-card {
  text-align: center;
  max-width: 500px;
  margin: 80px auto;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  margin-bottom: 15px;
}

.btn-primary {
  background-color: var(--navy);
  color: #fff;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.2s;
}

.btn-primary:hover {
  background-color: #1e3a8a;
  transform: translateY(-2px);
}

.submit-container {
  text-align: center;
  margin: 40px 0 80px 0;
}

/* HEADER BÀI THI */
.exam-header-block {
  margin-bottom: 30px;
}

.exam-header-top {
  background: #fff;
  padding: 25px 30px;
  border: 1px solid var(--border-color);
  border-radius: 12px 12px 0 0;
  border-bottom: none;
}

.meta-text {
  font-family: var(--font-sans);
  font-size: 12px;
  color: var(--gray-text);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.exam-title {
  font-family: var(--font-serif);
  font-size: 28px;
  color: var(--navy);
  margin-bottom: 10px;
}

.meta-sub {
  font-size: 14px;
  color: var(--gray-text);
}

.dashed-line {
  border: none;
  border-top: 1px dashed #cbd5e1;
  margin-top: 20px;
  position: relative;
}

.dashed-line::after {
  content: "";
  position: absolute;
  right: -5px;
  top: -5px;
  width: 8px;
  height: 8px;
  border: 1px solid #cbd5e1;
  border-radius: 50%;
  background: #fff;
}

/* THANH THÔNG TIN & TIMER */
.exam-info-bar {
  background-color: var(--navy);
  color: #94a3b8;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 30px;
  border-radius: 0 0 12px 12px;
  font-size: 14px;
}

.exam-info-bar.sticky {
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.timer-pill {
  background-color: #334155;
  color: #fff;
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: bold;
  font-family: monospace;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.green-dot {
  color: #4ade80;
  font-size: 12px;
}

.timer-danger {
  background-color: #ef4444 !important;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

/* TIÊU ĐỀ PHẦN */
.section-header {
  margin: 40px 0 20px 0;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 10px;
}

.section-title {
  font-family: var(--font-serif);
  font-size: 22px;
  font-weight: bold;
  color: var(--navy);
  display: flex;
  align-items: center;
  gap: 10px;
}

.badge {
  font-family: var(--font-sans);
  background-color: #e0e7ff;
  color: var(--blue-text);
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 12px;
  font-weight: bold;
}

.section-subtitle {
  font-size: 14px;
  color: var(--gray-text);
  margin-top: 5px;
}

/* CÂU HỎI */
.question-card {
  background: #fff;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 20px 25px;
  margin-bottom: 15px;
}

.q-layout {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.q-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
}

.q-num-flag {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: nowrap;
}

.q-num {
  background: var(--navy);
  color: #fff;
  width: 60px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  font-weight: bold;
  font-size: 14px;
  flex-shrink: 0;
}

.btn-flag {
  margin-bottom: 10px;
  cursor: pointer;
  padding: 4px 8px;
  width: 70px;
  height: 30px;
  background: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn-flag:hover {
  border-color: #ffc107;
  color: #ffc107;
  background: #fffbf0;
}

.btn-flag.active {
  background: #ffc107;
  border-color: #ffc107;
  color: #333;
}

.q-content {
  flex: 1;
}

.q-text {
  font-size: 16px;
  margin-bottom: 15px;
  margin-top: 2px;
  line-height: 1.6;
}

.q-image {
  margin: 15px 0;
  display: flex;
  justify-content: center;
}

.q-image img {
  max-width: 100%;
  height: auto;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* ĐÁP ÁN TRẮC NGHIỆM */
.options-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.option-label {
  display: block;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 12px 15px;
  cursor: pointer;
  transition: 0.2s;
}

.option-label:hover {
  border-color: #93c5fd;
  background: #f8fafc;
}

.option-label input {
  display: none;
}

.option-label.selected {
  border-color: var(--blue-text);
  background: #eff6ff;
}

.opt-letter {
  color: var(--blue-text);
  font-weight: bold;
  margin-right: 10px;
  font-family: var(--font-serif);
}

/* ĐÚNG SAI */
.tf-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  margin-bottom: 10px;
}

.tf-controls {
  display: flex;
  gap: 15px;
  flex-shrink: 0;
}

.tf-controls label {
  cursor: pointer;
  font-size: 14px;
}

.short-ans-input {
  width: 100%;
  max-width: 300px;
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 14px;
}

/* CHẤM ĐIỂM */
.correct-ans {
  background-color: #dcfce7 !important;
  border-color: #22c55e !important;
}

.wrong-ans {
  background-color: #fee2e2 !important;
  border-color: #ef4444 !important;
}

.explanation {
  margin-top: 15px;
  padding: 15px;
  background: #f8fafc;
  border-left: 3px solid var(--navy);
  font-size: 14px;
  border-radius: 4px;
}

.image-placeholder {
  background: #f1f5f9;
  border: 2px dashed #cbd5e1;
  padding: 30px;
  text-align: center;
  color: #64748b;
  margin: 15px 0;
  border-radius: 8px;
}

.page-footer {
  text-align: center;
  font-size: 12px;
  color: var(--gray-text);
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
}

.form-note {
  font-size: 13px;
  color: var(--gray-text);
  margin-top: 15px;
  font-style: italic;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  #board-container {
    width: 240px;
    bottom: 20px;
    right: 20px;
  }

  .q-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .exam-title {
    font-size: 22px;
  }

  .container {
    margin: 20px auto;
  }
}

@media (max-width: 480px) {
  #board-container {
    width: 200px;
    bottom: 10px;
    right: 10px;
    max-height: 300px;
  }

  .q-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .q-num-flag {
    flex-direction: column;
    align-items: flex-start;
  }

  .exam-info-bar {
    flex-direction: column;
    gap: 10px;
    padding: 10px 15px;
  }

  .tf-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .tf-controls {
    width: 100%;
    justify-content: space-around;
  }
}
.score-pill {
  background-color: #16a34a;
  color: #fff;
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: bold;
  font-family: monospace;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.score-pill .green-dot {
  color: #fff;
}


#toast {
  position: fixed;
  top: 70px;
  left: 50%;
  transform: translateX(-50%) translateY(-20px);
  background: #b91c1c;
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s, transform 0.25s;
  z-index: 10000;
}
#toast.show {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

`

### script.js

`javascript
import { examData } from "./data.js";
import { db, ref, push, set, update, serverTimestamp } from "./firebase-config.js";
import { getMTSeduSession, showLoginRequired, insertBackButton } from "./mtsedu-auth.js";

const loginScreen = document.getElementById("login-screen");
const examScreen = document.getElementById("exam-screen");
const resultScreen = document.getElementById("result-screen");
const questionsContainer = document.getElementById("questions-container");
const questionBoard = document.getElementById("question-board");
const submitBtn = document.getElementById("submit-btn");

// ===== CHỈ THAY DÒNG NÀY =====
const MA_DE       = "HSA_DINHLUONG_DE1";
const DRAFT_KEY   = "examDraft_HSA_DINHLUONG_DE1";
const EXAM_MINUTES = 75;
const RETURN_HASH = "#math";
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
  const btnStart = document.getElementById("btn-start-exam");
  if (btnStart) {
    btnStart.addEventListener("click", () => {
      if (!session) {
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

  if (!session) return;
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

  const header = document.createElement("div");
  header.className = "section-header";
  header.innerHTML = `
    <div class="section-title">Phần thi: Toán học và Xử lí số liệu <span class="badge">50 điểm</span></div>
    <div class="section-subtitle">Mỗi câu đúng được 1 điểm. Gồm trắc nghiệm 4 lựa chọn và điền đáp án.</div>`;
  questionsContainer.appendChild(header);

  let qCounter = 1;

  examData.forEach((q) => {
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

    if (q.type === "mcq") {
      html += `<div class="options-list">`;
      q.options.forEach((opt, idx) => {
        html += `<label class="option-label" id="lbl-${q.id}-${idx}">
          <input type="radio" name="ans-${q.id}" value="${idx}">
          <span class="opt-letter">${["A","B","C","D"][idx]}.</span> ${opt}</label>`;
      });
      html += `</div>`;
    } else if (q.type === "fill") {
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
      } else if (e.target.type === "text") {
        const qid = name.replace("ans-", "");
        userAnswers[qid] = e.target.value;
      }
      updateBoard(); saveDraft();
    });
  });

  if (window.MathJax) MathJax.typesetPromise();
}

function renderBoard() {
  if (!questionBoard) return;
  const legend = document.createElement("div");
  legend.className = "board-legend";
  legend.innerHTML = `
    <span class="box"></span><span class="box-label">Chưa làm</span>
    <span class="box done"></span><span class="box-label">Đã làm</span>
    <span class="box flagged"></span><span class="box-label">Đánh dấu</span>`;
  questionBoard.appendChild(legend);

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
    if (q.type === "mcq" && userAnswers[q.id] !== undefined) answered = true;
    if (q.type === "fill" && userAnswers[q.id] && userAnswers[q.id].trim() !== "") answered = true;

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
    } else if (input.type === "text") {
      const qid = name.replace("ans-", "");
      input.value = userAnswers[qid] || "";
    }
  });
}

let warned30 = false;

function showToast(msg) {
  let t = document.getElementById("toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "toast";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 5000);
}

function startTimer() {
  const endAt = Date.now() + timeRemaining * 1000;
  timerInterval = setInterval(() => {
    timeRemaining = Math.max(0, Math.round((endAt - Date.now()) / 1000));
    saveDraft();
    const m = Math.floor(timeRemaining / 60).toString().padStart(2, "0");
    const s = (timeRemaining % 60).toString().padStart(2, "0");
    document.getElementById("countdown").innerText = `${m}:${s}`;
    if (timeRemaining <= 30 && !warned30) {
      warned30 = true;
      showToast("⚠️ Cảnh báo: Chỉ còn 30 giây!");
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

function parseNumber(str) {
  const t = String(str ?? "").trim().replace(/\s+/g, "").replace(",", ".");
  if (t === "") return NaN;
  const frac = t.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/);
  if (frac) return Number(frac[2]) === 0 ? NaN : Number(frac[1]) / Number(frac[2]);
  return /^-?\d+(?:\.\d+)?$/.test(t) ? Number(t) : NaN;
}

function isFillCorrect(userInput, correct) {
  const u = String(userInput ?? "").trim().toLowerCase().replace(/\s+/g, "");
  const c = String(correct).trim().toLowerCase().replace(/\s+/g, "");
  if (u === "") return false;
  if (u === c) return true;
  const un = parseNumber(u), cn = parseNumber(c);
  return !isNaN(un) && !isNaN(cn) && Math.abs(un - cn) < 1e-9;
}

function submitExam() {
  isFinished = true; clearInterval(timerInterval);
  document.querySelectorAll("input, .btn-flag").forEach((el) => (el.disabled = true));
  submitBtn.style.display = "none";
  const timerPill = document.querySelector(".timer-pill");
  if (timerPill) timerPill.classList.remove("timer-danger");

  let totalScore = 0;

  examData.forEach((q) => {
    document.getElementById(`exp-${q.id}`).classList.remove("hidden");

    if (q.type === "mcq") {
      const selected = userAnswers[q.id];
      document.getElementById(`lbl-${q.id}-${q.correctAnswer}`).classList.add("correct-ans");
      if (selected === q.correctAnswer) {
        totalScore += 1;
      } else if (selected !== undefined) {
        document.getElementById(`lbl-${q.id}-${selected}`).classList.add("wrong-ans");
      }
    } else if (q.type === "fill") {
      const input = document.querySelector(`input[name="ans-${q.id}"]`);
      if (isFillCorrect(userAnswers[q.id], q.correctAnswer)) {
        totalScore += 1;
        input.classList.add("correct-ans");
      } else {
        input.classList.add("wrong-ans");
      }
    }
  });

  const scorePill = document.getElementById("score-pill");
  document.querySelector(".timer-pill")?.classList.add("hidden");
  if (scorePill) {
    scorePill.classList.remove("hidden");
    document.getElementById("review-score").innerText = totalScore.toFixed(0);
  }

  saveExamResultToFirebase(totalScore, cheatCount);
  document.getElementById("final-score").innerText = totalScore.toFixed(0);
  document.getElementById("cheat-display").innerText = cheatCount;
  examScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  localStorage.removeItem(DRAFT_KEY);
}

async function saveExamResultToFirebase(tongDiem, soLanThoat) {
  const statusEl = document.getElementById("firebase-status");
  if (statusEl) statusEl.innerText = "⏳ Đang đồng bộ kết quả lên MTSedu...";
  try {
    const session = getMTSeduSession();
    const userId = session ? session.id : null;
    const resultData = {
      hoTen: studentName, lop: studentClass, maDe: MA_DE,
      tongDiem, soLanThoat,
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


`

### data.js

`javascript
export const examData = [
  {
    "id": "q1",
    "type": "mcq",
    "question": "Cho hàm số $y = \\begin{cases} x, \\text{khi } x \\geq 0 \\\\ -x, \\text{khi } x < 0 \\end{cases}$. Khẳng định nào dưới đây đúng?",
    "options": [
      "Hàm số không có đạo hàm tại $x = 0$",
      "$y'_{(0)} = 1$",
      "$y'_{(0)} = 0$",
      "$y'_{(0)} = -1$"
    ],
    "correctAnswer": 0,
    "explanation": "Hàm số $y = |x|$ không có đạo hàm tại $x=0$.",
    "image": null
  },
  {
    "id": "q2",
    "type": "mcq",
    "question": "Thời gian chạy 50m của 20 học sinh được ghi lại trong bảng dưới đây:\n\nSố trung bình cộng thời gian chạy của học sinh là:",
    "options": [
      "8,54.",
      "4.",
      "8,50.",
      "8,53."
    ],
    "correctAnswer": 3,
    "explanation": "Tính số trung bình cộng của mẫu số liệu ghép nhóm.",
    "image": "cau_2.png"
  },
  {
    "id": "q3",
    "type": "fill",
    "question": "Chu kì của hàm số $y = \\sin\\left(\\frac{2}{5}x\\right).\\cos\\left(\\frac{2}{5}x\\right)$ là $k\\pi$. Giá trị của k là",
    "correctAnswer": "5/2",
    "explanation": "$y = \\frac{1}{2} \\sin(\\frac{4}{5}x) \\Rightarrow T = \\frac{2\\pi}{4/5} = 2.5\\pi$",
    "image": null
  },
  {
    "id": "q4",
    "type": "mcq",
    "question": "Cho hàm số $y = f(x)$ có bảng biến thiên như sau:\n\nTổng số đường tiệm cận ngang và tiệm cận đứng của đồ thị hàm số đã cho là",
    "options": [
      "0.",
      "1.",
      "2.",
      "3."
    ],
    "correctAnswer": 2,
    "explanation": "Tiệm cận ngang $y=-2$, tiệm cận đứng $x=0$.",
    "image": "cau_4.png"
  },
  {
    "id": "q5",
    "type": "mcq",
    "question": "Tìm nguyên hàm $F(t) = \\int txdt$.",
    "options": [
      "$F(t) = x + t + C$",
      "$F(t) = \\frac{x^2 t}{2} + C$",
      "$F(t) = \\frac{xt^2}{2} + C$",
      "$F(t) = \\frac{(tx)^2}{2} + C$"
    ],
    "correctAnswer": 2,
    "explanation": "Biến là t, nên x là hằng số.",
    "image": null
  },
  {
    "id": "q6",
    "type": "fill",
    "question": "Tích tất cả giá trị của a để góc tạo bởi đường thẳng $\\begin{cases} x = 4+at \\\\ y = 7-2t \\end{cases} (t \\in \\mathbb{R})$ và đường thẳng $3x + 4y - 2 = 0$ bằng $45^\\circ$ là",
    "correctAnswer": "-4",
    "explanation": "Sử dụng công thức tính góc giữa hai vector chỉ phương.",
    "image": null
  },
  {
    "id": "q7",
    "type": "mcq",
    "question": "Một công ty xây dựng khảo sát khách hàng xem họ có nhu cầu mua nhà ở mức giá nào. Kết quả khảo sát được ghi lại ở bảng sau:\n\nMốt của mẫu số liệu ghép nhóm trên gần bằng giá trị nào sau đây?",
    "options": [
      "20,4.",
      "19,4.",
      "21,4.",
      "18,4."
    ],
    "correctAnswer": 1,
    "explanation": "Áp dụng công thức tính mốt cho khoảng [18; 22).",
    "image": "cau_7.png"
  },
  {
    "id": "q8",
    "type": "mcq",
    "question": "Trong mặt phẳng Oxy, điểm $M$ nằm trên đường tròn $(x+3)^2 + (y-4)^2 = 4$ sao cho độ dài đoạn thẳng OM là ngắn nhất. Hoành độ điểm $M$ là:",
    "options": [
      "$-\\frac{9}{5}$.",
      "$\\frac{12}{5}$.",
      "$-\\frac{21}{5}$.",
      "$\\frac{9}{5}$."
    ],
    "correctAnswer": 0,
    "explanation": "M là giao điểm của đường thẳng OI với đường tròn.",
    "image": null
  },
  {
    "id": "q9",
    "type": "mcq",
    "question": "Một học sinh dùng giác kế, đứng cách chân cột cờ 10m rồi chỉnh mặt trước cao bằng mắt của mình để xác định góc nâng (góc tạo bởi tia sáng đi thẳng từ đỉnh cột cờ) với mắt tạo với phương nằm ngang. Khi đó góc nâng đo được $31^\\circ$. Biết khoảng cách từ mặt sân đến mắt học sinh đó bằng 1,5m. Chiều cao cột cờ gần nhất với giá trị nào?",
    "options": [
      "6m.",
      "16,6m.",
      "7,5m.",
      "5,0m."
    ],
    "correctAnswer": 2,
    "explanation": "Chiều cao = $10 \\times \\tan(31^\\circ) + 1.5 \\approx 7.5m$.",
    "image": null
  },
  {
    "id": "q10",
    "type": "mcq",
    "question": "Tập nghiệm của bất phương trình $x^2 - x - 12 \\leq 0$ là?",
    "options": [
      "$[-3;4]$",
      "$(-3;4)$",
      "$(-\\infty;-3) \\cup (4;+\\infty)$",
      "$(-\\infty;-3] \\cup [4;+\\infty)$"
    ],
    "correctAnswer": 0,
    "explanation": "Phương trình có 2 nghiệm -3 và 4. Trong trái ngoài cùng.",
    "image": null
  },
  {
    "id": "q11",
    "type": "mcq",
    "question": "Một tổ chăm sóc khách hàng của một trung tâm điện tử gồm 12 nhân viên. Số cách phân công 3 nhân viên đi đến ba địa điểm khác nhau để chăm sóc khách hàng là",
    "options": [
      "1320.",
      "1230.",
      "220.",
      "1728."
    ],
    "correctAnswer": 0,
    "explanation": "Số chỉnh hợp chập 3 của 12: $A_{12}^3 = 1320$.",
    "image": null
  },
  {
    "id": "q12",
    "type": "mcq",
    "question": "Một hộp chứa 9 chiếc thẻ được đánh số từ 1 đến 9. Lấy ngẫu nhiên 3 chiếc thẻ từ hộp. Tính xác suất để tổng các số ghi trên 3 chiếc thẻ được lấy ra là một số lẻ.",
    "options": [
      "$\\frac{10}{21}$.",
      "$\\frac{11}{21}$.",
      "$\\frac{5}{21}$.",
      "$\\frac{4}{21}$."
    ],
    "correctAnswer": 0,
    "explanation": "Chọn 3 lẻ hoặc 1 lẻ 2 chẵn. Tổng số cách thỏa mãn là 40, không gian mẫu 84.",
    "image": null
  },
  {
    "id": "q13",
    "type": "mcq",
    "question": "$\\lim_{x \\to 1^+} \\frac{x+1}{x-1}$ bằng",
    "options": [
      "$+\\infty$.",
      "$-\\infty$.",
      "1.",
      "0"
    ],
    "correctAnswer": 0,
    "explanation": "Tử tiến tới 2, mẫu tiến tới 0 và lớn hơn 0.",
    "image": null
  },
  {
    "id": "q14",
    "type": "fill",
    "question": "Một viên đạn được bắn lên với tốc độ ban đầu v=196 m/s từ mặt đất theo phương thẳng đứng. Biết phương trình chuyển động của viên đạn là $y = v_0 t - 4,9t^2$ (m), trong đó t là khoảng thời gian tính bằng giây, trục Oy hướng lên theo phương thẳng đứng và gốc O là vị trí viên đạn được bắn lên. Bỏ qua sức cản của không khí. Hỏi tại thời điểm tốc độ của viên đạn bằng 0, viên đạn cách mặt đất bao nhiêu mét?",
    "correctAnswer": "1960",
    "explanation": "Vận tốc $v = y' = 196 - 9.8t = 0 \\Rightarrow t = 20$. Thế vào y được 1960.",
    "image": null
  },
  {
    "id": "q15",
    "type": "mcq",
    "question": "Cho hình chóp S.ABCD có đáy ABCD là hình vuông cạnh a, $SA \\perp (ABCD)$. Biết diện tích tam giác SBD bằng $a^2$. Khi đó SA bằng:",
    "options": [
      "$SA = \\frac{a\\sqrt{3}}{2}$",
      "$SA = \\frac{a\\sqrt{2}}{2}$",
      "$SA = \\frac{a\\sqrt{6}}{2}$",
      "$SA = \\frac{a}{2}$"
    ],
    "correctAnswer": 2,
    "explanation": "Đường cao SO của tam giác SBD tính được là $a\\sqrt{2}$. Dùng Pytago cho tam giác SAO.",
    "image": null
  },
  {
    "id": "q16",
    "type": "mcq",
    "question": "Mỗi ngày, bạn Chi đều đi bộ để rèn luyện sức khoẻ. Quãng đường đi bộ mỗi ngày (đơn vị: km) của bạn Chi được thống kê lại ở bảng sau:\n\nQuãng đường trung bình mà bạn Chi chạy được là?",
    "options": [
      "3,41.",
      "3,39.",
      "3,45.",
      "3,36."
    ],
    "correctAnswer": 1,
    "explanation": "Lấy giá trị đại diện của từng nhóm nhân với tần số rồi chia cho tổng số ngày.",
    "image": "cau_16.png"
  },
  {
    "id": "q17",
    "type": "mcq",
    "question": "Hai xạ thủ cùng bắn, mỗi người một viên đạn vào bia một cách độc lập với nhau. Xác suất bắn trúng bia của hai xạ thủ lần lượt là $\\frac{1}{3}$ và $\\frac{1}{4}$. Tính xác suất của biến cố có ít nhất một xạ thủ không bắn trúng bia.",
    "options": [
      "$\\frac{1}{3}$",
      "$\\frac{1}{6}$",
      "$\\frac{11}{12}$",
      "$\\frac{2}{3}$"
    ],
    "correctAnswer": 2,
    "explanation": "Biến cố đối là cả hai đều trúng. Xác suất = $1 - (1/3 \\times 1/4) = 11/12$.",
    "image": null
  },
  {
    "id": "q18",
    "type": "mcq",
    "question": "Trong không gian với hệ tọa độ Oxyz, cho hình vuông $ABCD, B(3;0;8), D(-5;-4;0)$. Biết đỉnh $A$ thuộc mặt phẳng (Oxy) và có tọa độ là những số nguyên, khi đó $|\\overrightarrow{CA} + \\overrightarrow{CB}|$ bằng:",
    "options": [
      "$6\\sqrt{10}$.",
      "$10\\sqrt{6}$.",
      "$10\\sqrt{5}$.",
      "$5\\sqrt{10}$."
    ],
    "correctAnswer": 0,
    "explanation": "Sử dụng tính chất hình vuông và tọa độ điểm trong không gian.",
    "image": null
  },
  {
    "id": "q19",
    "type": "mcq",
    "question": "Hàm số $f(x)$ có đạo hàm xác định trên $\\mathbb{R}$ thỏa mãn $y = f(x) + f(-x)$ đồng biến trên khoảng (1;5). Khi đó hàm số $y = f(x) + f(-x)$ nghịch biến trên khoảng nào?",
    "options": [
      "(-1;1).",
      "(1;2).",
      "(-3;-1).",
      "(-2;0)."
    ],
    "correctAnswer": 2,
    "explanation": "Hàm số đã cho là hàm chẵn, tính đối xứng.",
    "image": null
  },
  {
    "id": "q20",
    "type": "mcq",
    "question": "Khoảng cách giữa hai điểm cực trị của đồ thị hàm số $y = (x-2)^2(x+1)$ là",
    "options": [
      "$2\\sqrt{5}$.",
      "$5\\sqrt{2}$.",
      "4.",
      "2."
    ],
    "correctAnswer": 0,
    "explanation": "Các điểm cực trị là (0;4) và (2;0). Khoảng cách là $\\sqrt{20}$.",
    "image": null
  },
  {
    "id": "q21",
    "type": "mcq",
    "question": "Nhiệt độ ngoài trời ở một thành phố vào các thời điểm khác nhau trong ngày có thể được mô phỏng bởi công thức $h(t) = 29 + 3\\sin\\frac{\\pi}{12}(t-9)$ với $h$ tính bằng $^\\circ C$ và $t$ là thời gian trong ngày tính bằng giờ. Thời gian nhiệt độ cao nhất trong ngày là:",
    "options": [
      "13 giờ.",
      "15 giờ.",
      "12 giờ.",
      "14 giờ."
    ],
    "correctAnswer": 1,
    "explanation": "$\\sin = 1 \\Rightarrow t - 9 = 6 \\Rightarrow t = 15$.",
    "image": null
  },
  {
    "id": "q22",
    "type": "mcq",
    "question": "Cho hàm số $y = f(x)$ có bảng biến thiên như sau:\n\nSố nghiệm thực của phương trình $2f(x) - 11 = 0$ là",
    "options": [
      "2.",
      "3.",
      "4.",
      "0."
    ],
    "correctAnswer": 0,
    "explanation": "$f(x) = 5.5$. Dựa vào BBT cắt tại 2 điểm.",
    "image": "cau_22.png"
  },
  {
    "id": "q23",
    "type": "fill",
    "question": "Mặt sàn của một thang máy có dạng hình vuông ABCD cạnh 2m được lát gạch màu trắng và trang trí với một hình 4 cánh giống nhau màu sẫm. Khi đặt trong hệ tọa độ Oxy với $O$ là tâm hình vuông sao cho $A(1;1)$ như hình vẽ bên thì các đường cong OA có phương trình $y = x^2$ và $y = ax^3 + bx$. Tính giá trị ab biết rằng diện tích trang trí màu sẫm chiếm $\\frac{1}{3}$ diện tích mặt sàn.",
    "correctAnswer": "-2",
    "explanation": "Sử dụng tích phân tính diện tích giới hạn bởi 2 đường cong.",
    "image": "cau_23.png"
  },
  {
    "id": "q24",
    "type": "mcq",
    "question": "Cho hình chóp S.ABC có diện tích đáy bằng 9. Mặt phẳng (P) song song với (ABC) cắt đoạn SA tại $M$ sao cho $SM = 2MA$. Diện tích thiết diện của hình chóp S.ABC tạo bởi (P) bằng",
    "options": [
      "1.",
      "$\\frac{16}{9}$.",
      "$\\frac{4}{81}$.",
      "4."
    ],
    "correctAnswer": 3,
    "explanation": "Tỉ số diện tích bằng bình phương tỉ số đồng dạng $k=2/3$. $S = 9 \\times 4/9 = 4$.",
    "image": null
  },
  {
    "id": "q25",
    "type": "fill",
    "question": "Trong không gian với hệ tọa độ Oxyz, cho $\\vec{i}, \\vec{j}, \\vec{k}$ lần lượt là các vecto đơn vị nằm trên các trục tọa độ Ox, Oy, Oz và $\\vec{u}$ là một vecto tùy ý khác $\\vec{0}$. Tính $T = \\cos^2(\\vec{u}, \\vec{i}) + \\cos^2(\\vec{u}, \\vec{j}) + \\cos^2(\\vec{u}, \\vec{k})$?",
    "correctAnswer": "1",
    "explanation": "Tổng bình phương cosin chỉ hướng của một vector bất kỳ trong không gian luôn bằng 1.",
    "image": null
  },
  {
    "id": "q26",
    "type": "mcq",
    "question": "Cho hàm số $f(x)$ có đạo hàm trên $\\mathbb{R}$. Đồ thị của hàm số $y = f'(x)$ trên đoạn $[-2;2]$ là đường cong hình bên. Mệnh đề nào dưới đây đúng?",
    "options": [
      "$\\max_{[-2;2]} f(x) = f(2)$",
      "$\\min_{[-2;2]} f(x) = f(1)$",
      "$\\max_{[-2;2]} f(x) = f(1)$",
      "$\\max_{[-2;2]} f(x) = f(-2)$"
    ],
    "correctAnswer": 2,
    "explanation": "Từ đồ thị $f'(x)$, hàm số đạt cực đại tại $x=1$.",
    "image": "cau_26.png"
  },
  {
    "id": "q27",
    "type": "fill",
    "question": "Số giá trị nguyên của tham số $m \\in [-25;25]$ để hàm số $y = x^3 - 3x^2 + mx + 2$ có cực đại và cực tiểu?",
    "correctAnswer": "28",
    "explanation": "Yêu cầu $\\Delta' > 0 \\Rightarrow m < 3$. Có 28 giá trị nguyên thuộc đoạn [-25; 25].",
    "image": null
  },
  {
    "id": "q28",
    "type": "mcq",
    "question": "Nguyên hàm của hàm số $f(x) = 2^x + x$ là",
    "options": [
      "$2^x + x^2 + C$.",
      "$\\frac{2^x}{\\ln 2} + x^2 + C$.",
      "$2^x + \\frac{x^2}{2} + C$.",
      "$\\frac{2^x}{\\ln 2} + \\frac{x^2}{2} + C$."
    ],
    "correctAnswer": 3,
    "explanation": "Áp dụng công thức nguyên hàm cơ bản.",
    "image": null
  },
  {
    "id": "q29",
    "type": "fill",
    "question": "Một kiến trúc sư thiết kế một hội trường với 15 ghế ngồi ở hàng thứ nhất, 18 ghế ngồi ở hàng thứ hai, 21 ghế ngồi ở hàng thứ ba và cứ như vậy (số ghế ngồi ở hàng sau nhiều hơn 3 ghế so với số ghế ngồi ở hàng liền trước nó). Nếu muốn hội trường đó có số sức chứa ít nhất 870 ghế ngồi thì kiến trúc sư phải thiết kế tối thiểu bao nhiêu hàng ghế.",
    "correctAnswer": "20",
    "explanation": "Cấp số cộng có $u_1=15, d=3$. Giải bất phương trình $S_n \\geq 870$.",
    "image": null
  },
  {
    "id": "q30",
    "type": "fill",
    "question": "Cho phương trình $\\log_{\\frac{1}{2}}(2x - m) + \\log_2(3 - x) = 0$, $m$ là tham số. Hỏi có bao nhiêu giá trị nguyên dương của m để phương trình có nghiệm?",
    "correctAnswer": "5",
    "explanation": "Đưa về phương trình $2x - m = 3 - x$ và chặn điều kiện.",
    "image": null
  },
  {
    "id": "q31",
    "type": "mcq",
    "question": "Cho $\\int_0^{\\frac{\\pi}{2}} f(x) dx = 6$. Tính $I = \\int_0^{\\frac{\\pi}{2}} [3f(x) - 2\\sin x] dx$.",
    "options": [
      "$I = 20$.",
      "$I = 16$.",
      "$I = 8$.",
      "$I = 4$."
    ],
    "correctAnswer": 1,
    "explanation": "Tách tích phân và tính $\\int \\sin x dx$.",
    "image": null
  },
  {
    "id": "q32",
    "type": "fill",
    "question": "Người ta xây dựng một chân tháp bằng bê tông có dạng khối chóp cụt tứ giác đều (Hình bên dưới). Cạnh đáy dưới dài 5m, cạnh đáy trên dài 2m, cạnh bên dài 3m. Biết rằng chân tháp được làm bằng bê tông tươi với giá tiền là 1470000 đồng/m$^3$. Tính số tiền để mua bê tông tươi làm chân tháp theo đơn vị đồng.",
    "correctAnswer": "40538432",
    "explanation": "Tính thể tích chóp cụt đều rồi nhân với đơn giá.",
    "image": "cau_32.png"
  },
  {
    "id": "q33",
    "type": "mcq",
    "question": "Tìm $m$ để góc giữa hai vecto $\\vec{u} = (1; \\log_3 5; \\log_m 2), \\vec{v} = (3; \\log_5 3; 4)$ là góc nhọn.",
    "options": [
      "$m > \\frac{1}{2}, m \\neq 1$.",
      "$m > 1$.",
      "$0 < m < \\frac{1}{2}$.",
      "$m > 1$ hoặc $0 < m < \\frac{1}{2}$."
    ],
    "correctAnswer": 3,
    "explanation": "Tích vô hướng $> 0$.",
    "image": null
  },
  {
    "id": "q34",
    "type": "fill",
    "question": "Cho cấp số nhân $(u_n)$ thỏa mãn $2(u_3 + u_4 + u_5) = u_6 + u_7 + u_8$.\nTính $\\frac{u_8 + u_9 + u_{10}}{u_2 + u_3 + u_4}$",
    "correctAnswer": "4",
    "explanation": "Rút gọn tìm được $q^3 = 2$, tỉ số cần tính là $q^6 = 4$.",
    "image": null
  },
  {
    "id": "q35",
    "type": "mcq",
    "question": "Một công ty may mặc có hai hệ thống máy chạy độc lập với nhau. Xác suất để hệ thống máy thứ nhất hoạt động tốt là 95%, xác suất để hệ thống máy thứ hai hoạt động tốt là 85%. Công ty chỉ có thể hoàn thành đơn hàng đúng hạn nếu ít nhất một trong hai hệ thống máy hoạt động tốt. Xác suất để công ty hoàn thành đúng hạn là",
    "options": [
      "0,9925.",
      "0,9825.",
      "0,9725.",
      "0,9625."
    ],
    "correctAnswer": 0,
    "explanation": "Sử dụng biến cố đối $1 - P(\\text{cả 2 hỏng})$.",
    "image": null
  },
  {
    "id": "q36",
    "type": "mcq",
    "question": "Đợt xuất khẩu gạo của tỉnh B kéo dài trong 20 ngày. Người ta nhận thấy số lượng xuất khẩu gạo tính theo ngày thứ $t$ được xác định bởi công thức $S(t) = t^3 - 24t^2 + 144t + 2500$. Hỏi trong mấy ngày đó, ngày thứ mấy có số lượng xuất khẩu gạo cao nhất?",
    "options": [
      "1.",
      "12.",
      "20.",
      "4."
    ],
    "correctAnswer": 2,
    "explanation": "Tìm giá trị lớn nhất của hàm bậc 3.",
    "image": null
  },
  {
    "id": "q37",
    "type": "mcq",
    "question": "Trong không gian tọa độ Oxyz, cho hình hộp $ABCD.A'B'C'D'$ với các điểm $A(-1;1;2), B(-3;2;1), D(0;-1;2)$ và $A'(2;1;2)$. Tìm tọa độ đỉnh $C'$.",
    "options": [
      "$C'(1;0;1)$.",
      "$C'(-3;1;3)$.",
      "$C'(0;1;0)$.",
      "$C'(-1;3;1)$."
    ],
    "correctAnswer": 0,
    "explanation": "Sử dụng tính chất vector trong hình hộp.",
    "image": null
  },
  {
    "id": "q38",
    "type": "mcq",
    "question": "Trong không gian tọa độ Oxyz, cho ba vecto $\\vec{a} = (2;-1;3), \\vec{b} = (1;-3;2), \\vec{c} = (3;2;-4)$. Gọi $\\vec{x}$ là vecto thoả mãn: $\\begin{cases} \\vec{x}.\\vec{a} = -5 \\\\ \\vec{x}.\\vec{b} = -11 \\\\ \\vec{x}.\\vec{c} = 20 \\end{cases}$. Tọa độ của vecto $\\vec{x}$ là:",
    "options": [
      "(2;3;1).",
      "(2;3;-2).",
      "(3;2;-2).",
      "(1;3;2)."
    ],
    "correctAnswer": 1,
    "explanation": "Giải hệ phương trình 3 ẩn từ các tích vô hướng.",
    "image": null
  },
  {
    "id": "q39",
    "type": "mcq",
    "question": "Một quả bóng bầu dục có khoảng cách giữa 2 điểm xa nhất bằng 10 cm và cắt quả bóng bằng mặt phẳng trung trực của đoạn thẳng đó thì được đường tròn có diện tích bằng $16\\pi (\\text{cm}^2)$. Thể tích của quả bóng bằng (Tính gần đúng đến hai chữ số thập phân, đơn vị lít)",
    "options": [
      "0,15.",
      "0,34.",
      "0,32.",
      "1."
    ],
    "correctAnswer": 1,
    "explanation": "Mô hình hóa bằng ellipsoid tròn xoay và tính thể tích.",
    "image": null
  },
  {
    "id": "q40",
    "type": "fill",
    "question": "Cho hai mặt phẳng $(P): 2x - y + 2z - 3 = 0$ và $(Q): x + my + z - 1 = 0$. Tìm tham số $m$ để hai mặt phẳng $(P)$ và $(Q)$ vuông góc với nhau.",
    "correctAnswer": "4",
    "explanation": "Tích vô hướng hai vector pháp tuyến bằng 0.",
    "image": null
  },
  {
    "id": "q41",
    "type": "mcq",
    "question": "Cho tứ diện ABCD có độ dài các cạnh $AB = AC = AD = BC = BD = a$ và $CD = a\\sqrt{2}$. Tính góc giữa hai đường thẳng AD và BC.",
    "options": [
      "$90^\\circ$.",
      "$45^\\circ$.",
      "$30^\\circ$.",
      "$60^\\circ$."
    ],
    "correctAnswer": 3,
    "explanation": "Sử dụng định lý hàm số cosin hoặc vector.",
    "image": null
  },
  {
    "id": "q42",
    "type": "mcq",
    "question": "Trong không gian Oxyz, mặt phẳng $(P)$ đi qua điểm $N(3;-2;6)$ và vuông góc với trục Ox có phương trình là:",
    "options": [
      "$x = -3$",
      "$y = -2$",
      "$z = 6$",
      "$x = 3$"
    ],
    "correctAnswer": 3,
    "explanation": "Mặt phẳng nhận vector (1;0;0) làm pháp tuyến.",
    "image": null
  },
  {
    "id": "q43",
    "type": "mcq",
    "question": "Một bài trắc nghiệm có 10 câu hỏi, mỗi câu hỏi có 4 phương án lựa chọn trong đó có 1 đáp án đúng được 5 điểm và mỗi câu trả lời sai bị trừ đi 2 điểm. Một học sinh không học bài nên đánh hú họa mọi câu trả lời. Tìm xác suất để học sinh này nhận điểm dưới 1.",
    "options": [
      "0,7124",
      "0,5256",
      "0,7336",
      "0,783"
    ],
    "correctAnswer": 1,
    "explanation": "Thiết lập điểm và tính xác suất nhị thức.",
    "image": null
  },
  {
    "id": "q44",
    "type": "mcq",
    "question": "Cho hàm số $y = f(x)$ là một hàm đa thức có bảng xét dấu $f'(x)$ như sau:\n\nSố điểm cực trị của hàm số $g(x) = f(-2x^2+|x|)$.",
    "options": [
      "5.",
      "3.",
      "1.",
      "7."
    ],
    "correctAnswer": 0,
    "explanation": "Sử dụng đồ thị và hàm hợp.",
    "image": "cau_44.png"
  },
  {
    "id": "q45",
    "type": "mcq",
    "question": "Một ô tô đang chạy với vận tốc 10m/s thì người lái xe đạp phanh. Từ thời điểm đó, ô tô chuyển động chậm dần đều với vận tốc $v(t) = -2t + 10 (m/s)$, trong đó $t$ là khoảng thời gian tính bằng giây, kể từ lúc bắt đầu đạp phanh. Tính quãng đường ô tô đi chuyển được trong 8 giây cuối cùng.",
    "options": [
      "55 m.",
      "50 m.",
      "25 m.",
      "16 m."
    ],
    "correctAnswer": 0,
    "explanation": "Tính quãng đường bằng tích phân của vận tốc.",
    "image": null
  },
  {
    "id": "q46",
    "type": "mcq",
    "question": "Để theo dõi hành trình của một chiếc máy bay, ta có thể lập hệ tọa độ Oxyz có gốc O trùng với vị trí của trung tâm kiểm soát không lưu, mặt phẳng (Oxy) trùng với mặt đất với trục Ox hướng về phía tây, trục Oy hướng về phía nam và trục Oz hướng thẳng đứng lên trời. Sau khi cất cánh và đạt độ cao nhất định, chiếc máy bay duy trì hướng bay về phía nam với tốc độ không đổi là 890 km/h trong nửa giờ. Xác định tọa độ độ dịch chuyển của chiếc máy bay trong nửa giờ đó đối với hệ toạ độ đã chọn, biết rằng đơn vị đo trong không gian Oxyz được lấy theo km.",
    "options": [
      "(0;435;0).",
      "(455;0;0).",
      "(0;455;0).",
      "(435;0;0)."
    ],
    "correctAnswer": 2,
    "explanation": "Hướng Nam tương ứng với trục Oy dương.",
    "image": "cau_46.png"
  },
  {
    "id": "q47",
    "type": "fill",
    "question": "Trong một trò chơi điện tử, có 38 con cá đói. Một con cá gọi là no nếu nó ăn được 3 con cá khác (con này có thể no hoặc không no). Một con cá no không ăn thêm con cá nào khác. Trò chơi kết thúc khi không còn con cá nào đói. Hỏi sau khi kết thúc trò chơi thì có tối đa bao nhiêu con cá no?",
    "correctAnswer": "8",
    "explanation": "Lập mô hình chia hết cho 3 để tối đa số cá còn lại.",
    "image": null
  },
  {
    "id": "q48",
    "type": "mcq",
    "question": "Dựa vào thông tin dưới đây và trả lời các câu hỏi từ câu 48 - 50:\nSố lượng của một loại vi khuẩn X trong một phòng thí nghiệm được biểu diễn theo công thức $S(t) = A.e^{rt}$, trong đó A là số lượng vi khuẩn tại thời điểm chọn mốc thời gian, r là tỉ lệ tăng trưởng ($r > 0$), t là thời gian tăng trưởng (tính theo đơn vị là giờ). Lúc 6 giờ sáng, số lượng vi khuẩn X là 150 con. Sau 3 giờ, số lượng vi khuẩn X là 450 con.\n\nTỉ lệ tăng trưởng của vi khuẩn X gần nhất với kết quả nào sau đây?",
    "options": [
      "0,35.",
      "0,36.",
      "0,37.",
      "0,38."
    ],
    "correctAnswer": 2,
    "explanation": "Giải phương trình $e^{3r} = 3$.",
    "image": null
  },
  {
    "id": "q49",
    "type": "mcq",
    "question": "Dựa vào thông tin dưới đây và trả lời các câu hỏi từ câu 48 - 50:\nSố lượng của một loại vi khuẩn X trong một phòng thí nghiệm được biểu diễn theo công thức $S(t) = A.e^{rt}$, trong đó A là số lượng vi khuẩn tại thời điểm chọn mốc thời gian, r là tỉ lệ tăng trưởng ($r > 0$), t là thời gian tăng trưởng (tính theo đơn vị là giờ). Lúc 6 giờ sáng, số lượng vi khuẩn X là 150 con. Sau 3 giờ, số lượng vi khuẩn X là 450 con.\n\nThời điểm số lượng vi khuẩn X gấp 9 lần số lượng vi khuẩn ban đầu là:",
    "options": [
      "3 giờ.",
      "9 giờ.",
      "12 giờ.",
      "15 giờ."
    ],
    "correctAnswer": 2,
    "explanation": "Gấp 9 lần cần 6 tiếng kể từ 6h sáng, tức là 12h.",
    "image": null
  },
  {
    "id": "q50",
    "type": "mcq",
    "question": "Dựa vào thông tin dưới đây và trả lời các câu hỏi từ câu 48 - 50:\nSố lượng của một loại vi khuẩn X trong một phòng thí nghiệm được biểu diễn theo công thức $S(t) = A.e^{rt}$, trong đó A là số lượng vi khuẩn tại thời điểm chọn mốc thời gian, r là tỉ lệ tăng trưởng ($r > 0$), t là thời gian tăng trưởng (tính theo đơn vị là giờ). Lúc 6 giờ sáng, số lượng vi khuẩn X là 150 con. Sau 3 giờ, số lượng vi khuẩn X là 450 con.\n\nCùng thời điểm lúc 6 giờ, người ta đo được số lượng vi khuẩn Y là 300 con. Biết rằng số lượng vi khuẩn Y tăng 5% mỗi giờ. Hỏi vào lúc mấy giờ, số lượng vi khuẩn X bằng số lượng vi khuẩn Y.",
    "options": [
      "7 giờ.",
      "8 giờ.",
      "9 giờ.",
      "10 giờ."
    ],
    "correctAnswer": 1,
    "explanation": "Lập phương trình cân bằng và giải tìm t.",
    "image": null
  }
];

`

### firebase-config.js

`javascript
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


`

### mtsedu-auth.js

`javascript
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


`

