### index.html
``html
<!doctype html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Äá»€ THI Äá»ŠNH LÆ¯á»¢NG HSA - Äá»€ Sá» 1</title>
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
    <!-- MÃ n hÃ¬nh chá» / hÆ°á»›ng dáº«n -->
    <div id="login-screen" class="container">
      <div class="exam-header-block" style="margin-bottom: 20px">
        <div class="exam-header-top" style="border-radius: 8px; border-bottom: 1px solid var(--border-color);">
          <div class="meta-text">BÃ€I THI ÄÃNH GIÃ NÄ‚NG Lá»°C HSA Â· TOÃN Há»ŒC VÃ€ Xá»¬ LÃ Sá» LIá»†U</div>
          <h1 class="exam-title">Äá»€ THI Äá»ŠNH LÆ¯á»¢NG HSA - Äá»€ Sá» 1</h1>
          <div class="meta-sub">50 cÃ¢u há»i Â· Tráº¯c nghiá»‡m &amp; Äiá»n Ä‘Ã¡p Ã¡n â€” thang Ä‘iá»ƒm 50</div>
          <hr class="dashed-line" />
        </div>
      </div>
      <div class="card form-card">
        <div class="exam-instructions" style="text-align: left;">
          <h3 style="margin-top: 0; color: var(--navy); font-size: 16px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; font-weight: bold;">ðŸ“‹ HÆ¯á»šNG DáºªN &amp; QUY CHáº¾ THI</h3>
          <ul style="font-size: 14px; color: #334155; line-height: 1.8; padding-left: 20px; margin-bottom: 16px;">
            <li><strong>Tá»•ng sá»‘ cÃ¢u há»i:</strong> 50 cÃ¢u (Bao gá»“m cÃ¢u há»i tráº¯c nghiá»‡m 4 lá»±a chá»n vÃ  cÃ¢u há»i Ä‘iá»n Ä‘Ã¡p Ã¡n).</li>
            <li><strong>Thang Ä‘iá»ƒm:</strong> Má»—i cÃ¢u tráº£ lá»i Ä‘Ãºng Ä‘Æ°á»£c <strong>1 Ä‘iá»ƒm</strong> (Tá»‘i Ä‘a 50 Ä‘iá»ƒm).</li>
            <li><strong>Thá»i gian lÃ m bÃ i:</strong> 75 phÃºt.</li>
            <li><span style="color: #d97706; font-weight: bold;">âš ï¸ LÆ°u Ã½ (Vá»›i cÃ¢u Ä‘iá»n Ä‘Ã¡p Ã¡n):</span> DÃ¹ng dáº¥u cháº¥m (<code>.</code>) Ä‘á»ƒ phÃ¢n cÃ¡ch tháº­p phÃ¢n. VD: <code>1.25</code></li>
          </ul>
          <div style="background: #fef9c3; border: 1px solid #fde047; border-radius: 6px; padding: 10px 14px; font-size: 13px; color: #854d0e; margin-bottom: 16px;">
            âš ï¸ <strong>Quy cháº¿:</strong> Náº¿u báº¡n chuyá»ƒn sang tab hoáº·c á»©ng dá»¥ng khÃ¡c trong khi thi, há»‡ thá»‘ng sáº½ ghi nháº­n sá»‘ láº§n vi pháº¡m vÃ  bÃ¡o cÃ¡o vá» giÃ¡o viÃªn.
          </div>
          <button id="btn-start-exam" class="btn-primary" style="width: 100%; padding: 12px; font-size: 16px; font-weight: bold;">
            âœ… TÃ´i Ä‘Ã£ Ä‘á»c hÆ°á»›ng dáº«n â€” Báº¯t Ä‘áº§u thi
          </button>
        </div>
      </div>
      <div class="page-footer">ToÃ¡n vÃ  Xá»­ lÃ½ sá»‘ liá»‡u Â· tá»± Ä‘á»™ng cháº¥m Ä‘iá»ƒm theo Ä‘Ãºng barem &amp; lÆ°u káº¿t quáº£</div>
    </div>

    <!-- MÃ n hÃ¬nh lÃ m bÃ i thi -->
    <div id="exam-screen" class="hidden container">
      <div id="board-container" class="board-card">
        <h3>Báº£ng Äiá»u HÆ°á»›ng</h3>
        <div id="question-board" class="board-wrapper"></div>
      </div>
      <div class="exam-header-block">
        <div class="exam-header-top">
          <div class="meta-text">KIá»‚M TRA 75 PHÃšT Â· ToÃ¡n vÃ  Xá»­ lÃ½ sá»‘ liá»‡u</div>
          <h1 class="exam-title">Äá»€ THI Äá»ŠNH LÆ¯á»¢NG HSA - Äá»€ Sá» 1</h1>
          <div class="meta-sub">50 cÃ¢u há»i</div>
          <hr class="dashed-line" />
        </div>
        <div class="exam-info-bar sticky">
          <div class="student-info">
            ThÃ­ sinh: <strong id="display-name" style="color: white"></strong> Â·
            Lá»›p <strong id="display-class" style="color: white"></strong>
          </div>
          <div class="progress-info"><span id="answered-count">0/50</span> cÃ¢u Ä‘Ã£ lÃ m</div>
          <div class="timer-pill">
            <span class="green-dot">â—</span> <span id="countdown">75:00</span>
          </div>
          <div class="score-pill hidden" id="score-pill">
            <span class="green-dot">âœ“</span> Äiá»ƒm: <span id="review-score">0</span>/50
          </div>
        </div>
      </div>
      <div id="questions-container"></div>
      <div class="submit-container">
        <button id="submit-btn" class="btn-primary">Ná»™p bÃ i kiá»ƒm tra</button>
      </div>
    </div>

    <!-- MÃ n hÃ¬nh káº¿t quáº£ -->
    <div id="result-screen" class="hidden container">
      <div class="card result-card">
        <h2 style="font-family: var(--font-serif)">Káº¿t Quáº£ BÃ i Thi</h2>
        <div class="score-display mono-font">Äiá»ƒm: <span id="final-score"></span>/50</div>
        <p>Sá»‘ láº§n rá»i khá»i mÃ n hÃ¬nh: <span id="cheat-display">0</span></p>
        <p id="firebase-status" style="font-size: 14px; margin-top: 8px; color: #666;">â³ Äang káº¿t ná»‘i há»‡ thá»‘ng lÆ°u...</p>
        <button id="review-btn" class="btn-primary">Xem láº¡i bÃ i lÃ m</button>
      </div>
    </div>

    <script type="module" src="script.js"></script>
  </body>
</html>

``

### style.css
``css
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

/* Báº¢NG ÄIá»€U HÆ¯á»šNG STICKY NHá»Ž */
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

/* HEADER BÃ€I THI */
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

/* THANH THÃ”NG TIN & TIMER */
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

/* TIÃŠU Äá»€ PHáº¦N */
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

/* CÃ‚U Há»ŽI */
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

/* ÄÃP ÃN TRáº®C NGHIá»†M */
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

/* ÄÃšNG SAI */
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

/* CHáº¤M ÄIá»‚M */
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

``

### script.js
``javascript
import { examData } from "./data.js";
import { db, ref, push, set, update, serverTimestamp } from "./firebase-config.js";
import { getMTSeduSession, showLoginRequired, insertBackButton } from "./mtsedu-auth.js";

const loginScreen = document.getElementById("login-screen");
const examScreen = document.getElementById("exam-screen");
const resultScreen = document.getElementById("result-screen");
const questionsContainer = document.getElementById("questions-container");
const questionBoard = document.getElementById("question-board");
const submitBtn = document.getElementById("submit-btn");

// ===== CHá»ˆ THAY DÃ’NG NÃ€Y =====
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
    <div class="section-title">Pháº§n thi: ToÃ¡n há»c vÃ  Xá»­ lÃ­ sá»‘ liá»‡u <span class="badge">50 Ä‘iá»ƒm</span></div>
    <div class="section-subtitle">Má»—i cÃ¢u Ä‘Ãºng Ä‘Æ°á»£c 1 Ä‘iá»ƒm. Gá»“m tráº¯c nghiá»‡m 4 lá»±a chá»n vÃ  Ä‘iá»n Ä‘Ã¡p Ã¡n.</div>`;
  questionsContainer.appendChild(header);

  let qCounter = 1;

  examData.forEach((q) => {
    const card = document.createElement("div");
    card.className = "question-card";
    card.id = `q-card-${q.id}`;

    let html = `<div class="q-layout"><div class="q-header"><div class="q-num-flag">
      <div class="q-num">CÃ¢u ${qCounter}</div>
      <button class="btn-flag ${flaggedQuestions[q.id] ? "active" : ""}" data-id="${q.id}" title="ÄÃ¡nh dáº¥u">
        ${flaggedQuestions[q.id] ? "â˜…" : "â˜†"}</button>
    </div></div><div class="q-content">
    <div class="q-text">${q.question}</div>
    ${q.image ? `<div class="q-image"><img src="${q.image}" alt="HÃ¬nh cÃ¢u ${qCounter}"></div>` : ""}`;

    if (q.type === "mcq") {
      html += `<div class="options-list">`;
      q.options.forEach((opt, idx) => {
        html += `<label class="option-label" id="lbl-${q.id}-${idx}">
          <input type="radio" name="ans-${q.id}" value="${idx}">
          <span class="opt-letter">${["A","B","C","D"][idx]}.</span> ${opt}</label>`;
      });
      html += `</div>`;
    } else if (q.type === "fill") {
      html += `<input type="text" class="short-ans-input" name="ans-${q.id}" placeholder="Nháº­p Ä‘Ã¡p Ã¡n...">`;
    }

    html += `<div class="explanation hidden" id="exp-${q.id}"><strong>HÆ°á»›ng dáº«n giáº£i:</strong> ${q.explanation}</div></div></div>`;
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
      e.target.closest(".btn-flag").innerText = flaggedQuestions[qid] ? "â˜…" : "â˜†";
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
    <span class="box"></span><span class="box-label">ChÆ°a lÃ m</span>
    <span class="box done"></span><span class="box-label">ÄÃ£ lÃ m</span>
    <span class="box flagged"></span><span class="box-label">ÄÃ¡nh dáº¥u</span>`;
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

function startTimer() {
  timerInterval = setInterval(() => {
    timeRemaining--; saveDraft();
    const m = Math.floor(timeRemaining / 60).toString().padStart(2, "0");
    const s = (timeRemaining % 60).toString().padStart(2, "0");
    document.getElementById("countdown").innerText = `${m}:${s}`;
    if (timeRemaining === 30) {
      alert("âš ï¸ Cáº£nh bÃ¡o: Chá»‰ cÃ²n 30 giÃ¢y!");
      document.querySelector(".timer-pill").classList.add("timer-danger");
    }
    if (timeRemaining <= 0) { clearInterval(timerInterval); submitExam(); }
  }, 1000);
}

function setupAntiCheat() {
  window.addEventListener("beforeunload", (e) => {
    if (!isFinished) { e.preventDefault(); e.returnValue = "Báº¡n chÆ°a ná»™p bÃ i!"; }
  });
  window.addEventListener("pagehide", () => { if (!isFinished) saveDraft(); });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && !isFinished) { cheatCount++; saveDraft(); }
  });
}

submitBtn.addEventListener("click", () => {
  if (confirm("Báº¡n cÃ³ cháº¯c muá»‘n ná»™p bÃ i?")) submitExam();
});

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
      const userVal = (userAnswers[q.id] || "").trim().toLowerCase();
      const correct = String(q.correctAnswer).toLowerCase();
      if (userVal === correct || userVal === correct.replace(".", ",")) {
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
  if (statusEl) statusEl.innerText = "â³ Äang Ä‘á»“ng bá»™ káº¿t quáº£ lÃªn MTSedu...";
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
    if (statusEl) { statusEl.style.color = "green"; statusEl.innerText = "âœ… Káº¿t quáº£ Ä‘Ã£ Ä‘Æ°á»£c Ä‘á»“ng bá»™ thÃ nh cÃ´ng!"; }
  } catch (error) {
    if (statusEl) { statusEl.style.color = "red"; statusEl.innerText = "âŒ Lá»—i: " + error.message; }
  }
}

document.getElementById("review-btn").addEventListener("click", () => {
  resultScreen.classList.add("hidden");
  examScreen.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

``

### data.js
``javascript
export const examData = [
  { id: 'q1', type: 'mcq', question: 'Cho hÃ m sá»‘ $y = \\begin{cases} x, \\text{khi } x \\geq 0 \\\\ -x, \\text{khi } x < 0 \\end{cases}$. Kháº³ng Ä‘á»‹nh nÃ o dÆ°á»›i Ä‘Ã¢y Ä‘Ãºng?', options: ['HÃ m sá»‘ khÃ´ng cÃ³ Ä‘áº¡o hÃ m táº¡i $x = 0$', '$y''_{(0)} = 1$', '$y''_{(0)} = 0$', '$y''_{(0)} = -1$'], correctAnswer: 0, explanation: 'HÃ m sá»‘ $y = |x|$ khÃ´ng cÃ³ Ä‘áº¡o hÃ m táº¡i $x=0$.', image: null },
  { id: 'q2', type: 'mcq', question: 'Thá»i gian cháº¡y 50m cá»§a 20 há»c sinh...', options: ['8,54', '4', '8,50', '8,53'], correctAnswer: 3, explanation: 'TÃ­nh sá»‘ trung bÃ¬nh cá»™ng cá»§a máº«u sá»‘ liá»‡u ghÃ©p nhÃ³m.', image: null },
  { id: 'q3', type: 'fill', question: 'Chu kÃ¬ cá»§a hÃ m sá»‘ $y = \\sin(\\frac{2}{5}x) \\cdot \\cos(\\frac{2}{5}x)$ lÃ  $k\\pi$. GiÃ¡ trá»‹ cá»§a k lÃ ', correctAnswer: '2.5', explanation: '$y = \\frac{1}{2} \\sin(\\frac{4}{5}x) \\Rightarrow T = \\frac{2\\pi}{4/5} = 2.5\\pi$', image: null },
  { id: 'q4', type: 'mcq', question: 'Cho hÃ m sá»‘ $y = f(x)$ cÃ³ báº£ng biáº¿n thiÃªn... Tá»•ng sá»‘ Ä‘Æ°á»ng tiá»‡m cáº­n ngang vÃ  Ä‘á»©ng lÃ ', options: ['0', '1', '2', '3'], correctAnswer: 2, explanation: 'Tiá»‡m cáº­n ngang $y=-2$, tiá»‡m cáº­n Ä‘á»©ng $x=0$.', image: 'cau_4.png' },
  { id: 'q5', type: 'mcq', question: 'TÃ¬m nguyÃªn hÃ m $F(t) = \\int t x dt$.', options: ['$F(t) = x + t + C$', '$F(t) = \\frac{x^2 t}{2} + C$', '$F(t) = \\frac{x t^2}{2} + C$', '$F(t) = \\frac{(tx)^2}{2} + C$'], correctAnswer: 2, explanation: 'Biáº¿n lÃ  t, nÃªn x lÃ  háº±ng sá»‘.', image: null },
  { id: 'q6', type: 'fill', question: 'TÃ­ch táº¥t cáº£ giÃ¡ trá»‹ cá»§a a Ä‘á»ƒ gÃ³c táº¡o bá»Ÿi hai Ä‘Æ°á»ng tháº³ng báº±ng $45^\\circ$ lÃ ', correctAnswer: '-4', explanation: 'Sá»­ dá»¥ng cÃ´ng thá»©c tÃ­nh gÃ³c giá»¯a hai vector chá»‰ phÆ°Æ¡ng.', image: null },
  { id: 'q7', type: 'mcq', question: 'Má»‘t cá»§a máº«u sá»‘ liá»‡u ghÃ©p nhÃ³m trÃªn gáº§n báº±ng giÃ¡ trá»‹ nÃ o sau Ä‘Ã¢y?', options: ['20,4', '19,4', '21,4', '18,4'], correctAnswer: 1, explanation: 'Ãp dá»¥ng cÃ´ng thá»©c tÃ­nh má»‘t cho khoáº£ng [18; 22).', image: null },
  { id: 'q8', type: 'mcq', question: 'Äiá»ƒm M náº±m trÃªn Ä‘Æ°á»ng trÃ²n ... sao cho OM ngáº¯n nháº¥t. HoÃ nh Ä‘á»™ Ä‘iá»ƒm M lÃ :', options: ['$-9/5$', '12/5', '$-21/5$', '9/5'], correctAnswer: 0, explanation: 'M lÃ  giao Ä‘iá»ƒm cá»§a Ä‘Æ°á»ng tháº³ng OI vá»›i Ä‘Æ°á»ng trÃ²n.', image: null },
  { id: 'q9', type: 'mcq', question: 'Chiá»u cao cá»™t cá» gáº§n nháº¥t vá»›i giÃ¡ trá»‹ nÃ o?', options: ['6m', '16,6m', '7,5m', '5,0m'], correctAnswer: 2, explanation: 'Chiá»u cao = $10 \\times \\tan(31^\\circ) + 1.5 \\approx 7.5m$.', image: null },
  { id: 'q10', type: 'mcq', question: 'Táº­p nghiá»‡m cá»§a báº¥t phÆ°Æ¡ng trÃ¬nh $x^2 - x - 12 \\leq 0$ lÃ ?', options: ['[-3; 4]', '(-3; 4)', '$(-\\infty; -3) \\cup (4; +\\infty)$', '$(-\\infty; -3] \\cup [4; +\\infty)$'], correctAnswer: 0, explanation: 'PhÆ°Æ¡ng trÃ¬nh cÃ³ 2 nghiá»‡m -3 vÃ  4. Trong trÃ¡i ngoÃ i cÃ¹ng.', image: null },
  { id: 'q11', type: 'mcq', question: 'Sá»‘ cÃ¡ch phÃ¢n cÃ´ng 3 nhÃ¢n viÃªn Ä‘i Ä‘áº¿n ba Ä‘á»‹a Ä‘iá»ƒm khÃ¡c nhau lÃ ', options: ['1320', '1230', '220', '1728'], correctAnswer: 0, explanation: 'Sá»‘ chá»‰nh há»£p cháº­p 3 cá»§a 12: $A_{12}^3 = 1320$.', image: null },
  { id: 'q12', type: 'mcq', question: 'XÃ¡c suáº¥t Ä‘á»ƒ tá»•ng cÃ¡c sá»‘ ghi trÃªn 3 chiáº¿c tháº» lÃ  sá»‘ láº».', options: ['10/21', '11/21', '5/21', '4/21'], correctAnswer: 0, explanation: 'Chá»n 3 láº» hoáº·c 1 láº» 2 cháºµn. Tá»•ng sá»‘ cÃ¡ch thá»a mÃ£n lÃ  40, khÃ´ng gian máº«u 84.', image: null },
  { id: 'q13', type: 'mcq', question: '$\\lim_{x \\to 1^+} \\frac{x+1}{x-1}$ báº±ng', options: ['$+\\infty$', '$-\\infty$', '1', '0'], correctAnswer: 0, explanation: 'Tá»­ tiáº¿n tá»›i 2, máº«u tiáº¿n tá»›i 0 vÃ  lá»›n hÆ¡n 0.', image: null },
  { id: 'q14', type: 'fill', question: 'Táº¡i thá»i Ä‘iá»ƒm tá»‘c Ä‘á»™ viÃªn Ä‘áº¡n báº±ng 0, Ä‘áº¡n cÃ¡ch máº·t Ä‘áº¥t bao nhiÃªu mÃ©t?', correctAnswer: '1960', explanation: 'Váº­n tá»‘c $v = y'' = 196 - 9.8t = 0 \\Rightarrow t = 20$. Tháº¿ vÃ o y Ä‘Æ°á»£c 1960.', image: null },
  { id: 'q15', type: 'mcq', question: 'Biáº¿t diá»‡n tÃ­ch tam giÃ¡c SBD báº±ng $a^2$. Khi Ä‘Ã³ SA báº±ng:', options: ['$a\\sqrt{3}/2$', '$a\\sqrt{2}/2$', '$a\\sqrt{6}/2$', '$a/2$'], correctAnswer: 2, explanation: 'ÄÆ°á»ng cao SO cá»§a tam giÃ¡c SBD tÃ­nh Ä‘Æ°á»£c lÃ  $a\\sqrt{2}$. DÃ¹ng Pytago cho tam giÃ¡c SAO.', image: null },
  { id: 'q16', type: 'mcq', question: 'QuÃ£ng Ä‘Æ°á»ng trung bÃ¬nh mÃ  báº¡n Chi cháº¡y Ä‘Æ°á»£c lÃ ?', options: ['3,41', '3,39', '3,45', '3,36'], correctAnswer: 1, explanation: 'Láº¥y giÃ¡ trá»‹ Ä‘áº¡i diá»‡n cá»§a tá»«ng nhÃ³m nhÃ¢n vá»›i táº§n sá»‘ rá»“i chia cho tá»•ng sá»‘ ngÃ y.', image: null },
  { id: 'q17', type: 'mcq', question: 'TÃ­nh xÃ¡c suáº¥t cá»§a biáº¿n cá»‘ cÃ³ Ã­t nháº¥t má»™t xáº¡ thá»§ khÃ´ng báº¯n trÃºng bia.', options: ['1/3', '1/6', '11/12', '2/3'], correctAnswer: 2, explanation: 'Biáº¿n cá»‘ Ä‘á»‘i lÃ  cáº£ hai Ä‘á»u trÃºng. XÃ¡c suáº¥t = $1 - (1/3 \\times 1/4) = 11/12$.', image: null },
  { id: 'q18', type: 'mcq', question: 'Khi Ä‘Ã³ $|\\vec{CA} + \\vec{CB}|$ báº±ng:', options: ['$6\\sqrt{10}$', '$10\\sqrt{6}$', '$10\\sqrt{5}$', '$5\\sqrt{10}$'], correctAnswer: 0, explanation: 'Sá»­ dá»¥ng tÃ­nh cháº¥t hÃ¬nh vuÃ´ng vÃ  tá»a Ä‘á»™ Ä‘iá»ƒm trong khÃ´ng gian.', image: null },
  { id: 'q19', type: 'mcq', question: 'Khi Ä‘Ã³ hÃ m sá»‘ $y = f(x) + f(-x)$ nghá»‹ch biáº¿n trÃªn khoáº£ng nÃ o?', options: ['(-1; 1)', '(1; 2)', '(-3; -1)', '(-2; 0)'], correctAnswer: 2, explanation: 'HÃ m sá»‘ Ä‘Ã£ cho lÃ  hÃ m cháºµn, tÃ­nh Ä‘á»‘i xá»©ng.', image: null },
  { id: 'q20', type: 'mcq', question: 'Khoáº£ng cÃ¡ch giá»¯a hai Ä‘iá»ƒm cá»±c trá»‹ cá»§a Ä‘á»“ thá»‹ hÃ m sá»‘ $y=(x-2)^2(x+1)$ lÃ ', options: ['$2\\sqrt{5}$', '$5\\sqrt{2}$', '4', '2'], correctAnswer: 0, explanation: 'CÃ¡c Ä‘iá»ƒm cá»±c trá»‹ lÃ  (0;4) vÃ  (2;0). Khoáº£ng cÃ¡ch lÃ  $\\sqrt{20}$.', image: null },
  { id: 'q21', type: 'mcq', question: 'Thá»i gian nhiá»‡t Ä‘á»™ cao nháº¥t trong ngÃ y lÃ :', options: ['13 giá»', '15 giá»', '12 giá»', '14 giá»'], correctAnswer: 1, explanation: '$\\sin = 1 \\Rightarrow t - 9 = 6 \\Rightarrow t = 15$.', image: null },
  { id: 'q22', type: 'mcq', question: 'Sá»‘ nghiá»‡m thá»±c cá»§a phÆ°Æ¡ng trÃ¬nh $2f(x) - 11 = 0$ lÃ ', options: ['2', '3', '4', '0'], correctAnswer: 0, explanation: '$f(x) = 5.5$. Dá»±a vÃ o BBT cáº¯t táº¡i 2 Ä‘iá»ƒm.', image: 'cau_22.png' },
  { id: 'q23', type: 'fill', question: 'TÃ­nh giÃ¡ trá»‹ ab biáº¿t diá»‡n tÃ­ch trang trÃ­...', correctAnswer: '-10/9', explanation: 'Sá»­ dá»¥ng tÃ­ch phÃ¢n tÃ­nh diá»‡n tÃ­ch giá»›i háº¡n bá»Ÿi 2 Ä‘Æ°á»ng cong.', image: 'cau_23.png' },
  { id: 'q24', type: 'mcq', question: 'Diá»‡n tÃ­ch thiáº¿t diá»‡n cá»§a hÃ¬nh chÃ³p S.ABC táº¡o bá»Ÿi (P) báº±ng', options: ['1', '16/9', '4/81', '4'], correctAnswer: 3, explanation: 'Tá»‰ sá»‘ diá»‡n tÃ­ch báº±ng bÃ¬nh phÆ°Æ¡ng tá»‰ sá»‘ Ä‘á»“ng dáº¡ng $k=2/3$. $S = 9 \\times 4/9 = 4$.', image: null },
  { id: 'q25', type: 'fill', question: 'TÃ­nh $T = \\cos^2(\\vec{u}, \\vec{i}) + \\cos^2(\\vec{u}, \\vec{j}) + \\cos^2(\\vec{u}, \\vec{k})$', correctAnswer: '1', explanation: 'Tá»•ng bÃ¬nh phÆ°Æ¡ng cosin chá»‰ hÆ°á»›ng cá»§a má»™t vector báº¥t ká»³ trong khÃ´ng gian luÃ´n báº±ng 1.', image: null },
  { id: 'q26', type: 'mcq', question: 'Má»‡nh Ä‘á» nÃ o dÆ°á»›i Ä‘Ã¢y Ä‘Ãºng?', options: ['$\\max f(x) = f(2)$', '$\\min f(x) = f(1)$', '$\\max f(x) = f(1)$', '$\\max f(x) = f(-2)$'], correctAnswer: 2, explanation: 'Tá»« Ä‘á»“ thá»‹ $f''(x)$, hÃ m sá»‘ Ä‘áº¡t cá»±c Ä‘áº¡i táº¡i $x=1$.', image: 'cau_26.png' },
  { id: 'q27', type: 'fill', question: 'Sá»‘ giÃ¡ trá»‹ nguyÃªn cá»§a m Ä‘á»ƒ hÃ m sá»‘ cÃ³ cá»±c Ä‘áº¡i vÃ  cá»±c tiá»ƒu?', correctAnswer: '28', explanation: 'YÃªu cáº§u $\\Delta'' > 0 \\Rightarrow m < 3$. CÃ³ 28 giÃ¡ trá»‹ nguyÃªn thuá»™c Ä‘oáº¡n [-25; 25].', image: null },
  { id: 'q28', type: 'mcq', question: 'NguyÃªn hÃ m cá»§a hÃ m sá»‘ $f(x) = 2^x + x$ lÃ ', options: ['$2^x + x^2 + C$', '$\\frac{2^x}{\\ln 2} + x^2 + C$', '$2^x + \\frac{x^2}{2} + C$', '$\\frac{2^x}{\\ln 2} + \\frac{x^2}{2} + C$'], correctAnswer: 3, explanation: 'Ãp dá»¥ng cÃ´ng thá»©c nguyÃªn hÃ m cÆ¡ báº£n.', image: null },
  { id: 'q29', type: 'fill', question: 'Kiáº¿n trÃºc sÆ° pháº£i thiáº¿t káº¿ tá»‘i thiá»ƒu bao nhiÃªu hÃ ng gháº¿?', correctAnswer: '20', explanation: 'Cáº¥p sá»‘ cá»™ng cÃ³ $u_1=15, d=3$. Giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh $S_n \\geq 870$.', image: null },
  { id: 'q30', type: 'fill', question: 'Há»i cÃ³ bao nhiÃªu giÃ¡ trá»‹ nguyÃªn dÆ°Æ¡ng cá»§a m Ä‘á»ƒ pt cÃ³ nghiá»‡m?', correctAnswer: '5', explanation: 'ÄÆ°a vá» phÆ°Æ¡ng trÃ¬nh $2x - m = 3 - x$ vÃ  cháº·n Ä‘iá»u kiá»‡n.', image: null },
  { id: 'q31', type: 'mcq', question: 'TÃ­nh $I = \\int [3f(x) - 2\\sin x] dx$', options: ['20', '16', '8', '4'], correctAnswer: 1, explanation: 'TÃ¡ch tÃ­ch phÃ¢n vÃ  tÃ­nh $\\int \\sin x dx$.', image: null },
  { id: 'q32', type: 'fill', question: 'TÃ­nh sá»‘ tiá»n Ä‘á»ƒ mua bÃª tÃ´ng tÆ°Æ¡i...', correctAnswer: '40538431', explanation: 'TÃ­nh thá»ƒ tÃ­ch chÃ³p cá»¥t Ä‘á»u rá»“i nhÃ¢n vá»›i Ä‘Æ¡n giÃ¡.', image: 'cau_32.png' },
  { id: 'q33', type: 'mcq', question: 'TÃ¬m m Ä‘á»ƒ gÃ³c giá»¯a hai vector lÃ  gÃ³c nhá»n.', options: ['$m > 1/2$', '$m > 1$', '$0 < m < 1/2$', '$m > 1$ hoáº·c $0 < m < 1/2$'], correctAnswer: 3, explanation: 'TÃ­ch vÃ´ hÆ°á»›ng $> 0$.', image: null },
  { id: 'q34', type: 'fill', question: 'TÃ­nh tá»‰ sá»‘ cáº¥p sá»‘ nhÃ¢n...', correctAnswer: '4', explanation: 'RÃºt gá»n tÃ¬m Ä‘Æ°á»£c $q^3 = 2$, tá»‰ sá»‘ cáº§n tÃ­nh lÃ  $q^6 = 4$.', image: null },
  { id: 'q35', type: 'mcq', question: 'XÃ¡c suáº¥t Ä‘á»ƒ cÃ´ng ty hoÃ n thÃ nh Ä‘Ãºng háº¡n lÃ ', options: ['0.9925', '0.9825', '0.9725', '0.9625'], correctAnswer: 0, explanation: 'Sá»­ dá»¥ng biáº¿n cá»‘ Ä‘á»‘i $1 - P(\\text{cáº£ 2 há»ng})$.', image: null },
  { id: 'q36', type: 'mcq', question: 'NgÃ y thá»© máº¥y cÃ³ sá»‘ lÆ°á»£ng xuáº¥t kháº©u cao nháº¥t?', options: ['1', '12', '20', '4'], correctAnswer: 1, explanation: 'TÃ¬m giÃ¡ trá»‹ lá»›n nháº¥t cá»§a hÃ m báº­c 3.', image: null },
  { id: 'q37', type: 'mcq', question: 'TÃ¬m tá»a Ä‘á»™ Ä‘á»‰nh C''', options: ['$C''(1;0;1)$', '$C''(-3;1;3)$', '$C''(0;1;0)$', '$C''(-1;3;1)$'], correctAnswer: 0, explanation: 'Sá»­ dá»¥ng tÃ­nh cháº¥t vector trong hÃ¬nh há»™p.', image: null },
  { id: 'q38', type: 'mcq', question: 'Tá»a Ä‘á»™ cá»§a vector x lÃ :', options: ['(2;3;1)', '(2;3;-2)', '(3;2;-2)', '(1;3;2)'], correctAnswer: 1, explanation: 'Giáº£i há»‡ phÆ°Æ¡ng trÃ¬nh 3 áº©n tá»« cÃ¡c tÃ­ch vÃ´ hÆ°á»›ng.', image: null },
  { id: 'q39', type: 'mcq', question: 'Thá»ƒ tÃ­ch cá»§a quáº£ bÃ³ng xáº¥p xá»‰ báº±ng:', options: ['0.15', '0.34', '0.32', '1'], correctAnswer: 1, explanation: 'MÃ´ hÃ¬nh hÃ³a báº±ng ellipsoid trÃ²n xoay vÃ  tÃ­nh thá»ƒ tÃ­ch.', image: null },
  { id: 'q40', type: 'fill', question: 'TÃ¬m tham sá»‘ m Ä‘á»ƒ hai máº·t pháº³ng vuÃ´ng gÃ³c', correctAnswer: '4', explanation: 'TÃ­ch vÃ´ hÆ°á»›ng hai vector phÃ¡p tuyáº¿n báº±ng 0.', image: null },
  { id: 'q41', type: 'mcq', question: 'TÃ­nh gÃ³c giá»¯a hai Ä‘Æ°á»ng tháº³ng AD vÃ  BC.', options: ['90', '45', '30', '60'], correctAnswer: 1, explanation: 'Sá»­ dá»¥ng Ä‘á»‹nh lÃ½ hÃ m sá»‘ cosin hoáº·c vector.', image: null },
  { id: 'q42', type: 'mcq', question: 'Máº·t pháº³ng (P) vuÃ´ng gÃ³c vá»›i Ox cÃ³ phÆ°Æ¡ng trÃ¬nh lÃ :', options: ['x=-3', 'y=-2', 'z=6', 'x=3'], correctAnswer: 3, explanation: 'Máº·t pháº³ng nháº­n vector (1;0;0) lÃ m phÃ¡p tuyáº¿n.', image: null },
  { id: 'q43', type: 'mcq', question: 'TÃ¬m xÃ¡c suáº¥t Ä‘á»ƒ há»c sinh nháº­n Ä‘iá»ƒm dÆ°á»›i 1.', options: ['0.7124', '0.5256', '0.7336', '0.783'], correctAnswer: 1, explanation: 'Thiáº¿t láº­p Ä‘iá»ƒm vÃ  tÃ­nh xÃ¡c suáº¥t nhá»‹ thá»©c.', image: null },
  { id: 'q44', type: 'mcq', question: 'Sá»‘ Ä‘iá»ƒm cá»±c trá»‹ cá»§a hÃ m sá»‘ $g(x) = f(-2x^2+|x|)$.', options: ['5', '3', '1', '7'], correctAnswer: 0, explanation: 'Sá»­ dá»¥ng Ä‘á»“ thá»‹ vÃ  hÃ m há»£p.', image: 'cau_44.png' },
  { id: 'q45', type: 'mcq', question: 'TÃ­nh quÃ£ng Ä‘Æ°á»ng Ã´ tÃ´ di chuyá»ƒn Ä‘Æ°á»£c trong 8 giÃ¢y cuá»‘i.', options: ['55m', '50m', '25m', '16m'], correctAnswer: 0, explanation: 'TÃ­nh quÃ£ng Ä‘Æ°á»ng báº±ng tÃ­ch phÃ¢n cá»§a váº­n tá»‘c.', image: null },
  { id: 'q46', type: 'mcq', question: 'XÃ¡c Ä‘á»‹nh tá»a Ä‘á»™ Ä‘á»™ dá»‹ch chuyá»ƒn...', options: ['(0;435;0)', '(455;0;0)', '(0;455;0)', '(435;0;0)'], correctAnswer: 2, explanation: 'HÆ°á»›ng Nam tÆ°Æ¡ng á»©ng vá»›i trá»¥c Oy dÆ°Æ¡ng.', image: 'cau_46.png' },
  { id: 'q47', type: 'fill', question: 'Khi káº¿t thÃºc cÃ³ tá»‘i Ä‘a bao nhiÃªu con cÃ¡?', correctAnswer: '11', explanation: 'Láº­p mÃ´ hÃ¬nh chia háº¿t cho 3 Ä‘á»ƒ tá»‘i Ä‘a sá»‘ cÃ¡ cÃ²n láº¡i.', image: null },
  { id: 'q48', type: 'mcq', question: 'Tá»‰ lá»‡ tÄƒng trÆ°á»Ÿng gáº§n nháº¥t vá»›i káº¿t quáº£ nÃ o?', options: ['0.35', '0.36', '0.37', '0.38'], correctAnswer: 2, explanation: 'Giáº£i phÆ°Æ¡ng trÃ¬nh $e^{3r} = 3$.', image: null },
  { id: 'q49', type: 'mcq', question: 'Thá»i Ä‘iá»ƒm sá»‘ lÆ°á»£ng X gáº¥p 9 láº§n ban Ä‘áº§u:', options: ['3 giá»', '9 giá»', '12 giá»', '15 giá»'], correctAnswer: 2, explanation: 'Gáº¥p 9 láº§n cáº§n 6 tiáº¿ng ká»ƒ tá»« 6h sÃ¡ng, tá»©c lÃ  12h.', image: null },
  { id: 'q50', type: 'mcq', question: 'Há»i vÃ o lÃºc máº¥y giá» sá»‘ lÆ°á»£ng vi khuáº©n báº±ng nhau?', options: ['7 giá»', '8 giá»', '9 giá»', '10 giá»'], correctAnswer: 1, explanation: 'Láº­p phÆ°Æ¡ng trÃ¬nh cÃ¢n báº±ng vÃ  giáº£i tÃ¬m t.', image: null }
];

``

### firebase-config.js
``javascript
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

``

### mtsedu-auth.js
``javascript
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
      <div style="font-size:48px;margin-bottom:16px;">ðŸ”’</div>
      <h2 style="font-size:22px;font-weight:700;margin:0 0 8px;color:#111;">Vui lÃ²ng Ä‘Äƒng nháº­p</h2>
      <p style="color:#666;font-size:15px;margin:0 0 28px;line-height:1.6;">
        Báº¡n cáº§n Ä‘Äƒng nháº­p vÃ o há»‡ thá»‘ng <strong>MTS Education</strong> Ä‘á»ƒ lÃ m bÃ i thi nÃ y.
      </p>
      <a href="${mtseduUrl}" style="display:inline-block;background:#000;color:#fff;
        text-decoration:none;padding:14px 32px;border-radius:10px;font-size:15px;font-weight:600;">
        ÄÄƒng nháº­p táº¡i MTS Education â†’
      </a>
      <p style="margin-top:20px;font-size:13px;color:#999;">TÃ i khoáº£n Ä‘Æ°á»£c cung cáº¥p bá»Ÿi giÃ¡o viÃªn</p>
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
      â† Trang chá»§
    </a>
  `;
  document.body.appendChild(btn);
}

``


