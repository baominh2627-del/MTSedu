# 📋 PROMPT TẠO ĐỀ THI ĐỊNH LƯỢNG HSA (ĐÁNH GIÁ NĂNG LỰC) — HỆ THỐNG MTS EDUCATION

Quy trình tạo bài thi mới được chia thành **2 Giai Đoạn**:
- **Giai Đoạn 1 — dùng Gemini Pro** (có thể đọc file PDF): Trích xuất nội dung đề, tạo file `data.js`.
- **Giai Đoạn 2 — dùng Claude** (viết code nhanh hơn): Nhận file `data.js` đã có, tạo 4 file còn lại.

---

## ⚡ GIAI ĐOẠN 1 — GEMINI PRO (ĐỌC PDF → TẠO `data.js`)

> **Dùng khi:** Bạn có file đề thi dạng PDF (VD: Phần thi Toán học và Xử lí số liệu). Upload file PDF lên Gemini Pro rồi gửi kèm prompt dưới đây.

### PROMPT GIAI ĐOẠN 1 (GỬI CHO GEMINI PRO)

````text
Tôi vừa upload một file PDF đề thi Đánh Giá Năng Lực (HSA) - Phần Định Lượng lên. Hãy đọc toàn bộ nội dung đề trong file đó.

## THÔNG TIN BÀI THI
- Tên đề: [VD: ĐỀ THI ĐỊNH LƯỢNG HSA - ĐỀ SỐ 1]
- Môn học: [VD: Toán và Xử lý số liệu]
- Mã đề (không dấu, không cách, dùng cho Firebase): [VD: HSA_DINHLUONG_DE1]

## CẤU TRÚC ĐỀ THI
- Tổng cộng: 50 câu (từ câu 1 đến câu 50).
- Mỗi câu đúng: 1 điểm (Tổng 50 điểm).
- Có 2 loại câu hỏi đan xen: Trắc nghiệm 4 đáp án (A, B, C, D) VÀ Điền đáp án.

---

## YÊU CẦU

Hãy đọc đề trong file PDF và tạo CHỈ MỘT file duy nhất là `data.js` theo đúng cấu trúc mẫu dưới đây.

**Lưu ý quan trọng khi trích xuất:**
- Mọi công thức Toán/Lý/Hóa phải được chuyển sang chuẩn LaTeX, bọc trong `$...$` (inline) hoặc `$$...$$` (block).
- Phân loại `type`: 
  - Nếu câu hỏi có 4 đáp án A, B, C, D -> dùng `type: "mcq"` và `correctAnswer` là số nguyên (0=A, 1=B, 2=C, 3=D).
  - Nếu câu hỏi có ô "Đáp án: _______" -> dùng `type: "fill"` và `correctAnswer` là chuỗi số, VD: `"15"`.
- Phần `explanation` (lời giải) phải viết đầy đủ, rõ ràng, kể cả công thức LaTeX.
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
- **Chỉ số nhiều ký tự**: phải có ngoặc nhọn — `v_{max}` ✅, `v_max` ❌; `\omega^2` ✅.

## CẤU TRÚC FILE `data.js` CẦN TẠO

```js
export const examData = [
  // Ví dụ câu trắc nghiệm
  {
    id: "q1",
    type: "mcq",
    question: "[ĐỀ BÀI — dùng LaTeX $...$ cho công thức]",
    options: ["[A]", "[B]", "[C]", "[D]"],
    correctAnswer: 0, // 0=A | 1=B | 2=C | 3=D
    explanation: "[HƯỚNG DẪN GIẢI ĐẦY ĐỦ]",
    image: null
  },
  // Ví dụ câu điền đáp án
  {
    id: "q3",
    type: "fill",
    question: "[ĐỀ BÀI]",
    correctAnswer: "15", // chuỗi số
    explanation: "[HƯỚNG DẪN GIẢI ĐẦY ĐỦ]",
    image: null
  },
  // ... Trích xuất đầy đủ 50 câu theo thứ tự từ 1 đến 50
];
```

---

## ⛔ SAU KHI VIẾT XONG `data.js`, HÃY DỪNG LẠI

Đừng tạo thêm bất kỳ file nào khác (index.html, script.js, ...).
Hãy kết thúc bằng dòng thông báo sau:
> ✅ **Đã hoàn thành `data.js`!** Hãy kiểm tra lại nội dung câu hỏi, đáp án và lời giải. Khi nào bạn xác nhận xong, hãy chuyển sang bước tiếp theo để tạo các file còn lại.
````

---

## ⚡ GIAI ĐOẠN 2 — CLAUDE (NHẬN `data.js` → TẠO 4 FILE CÒN LẠI)

### PROMPT GIAI ĐOẠN 2 (GỬI CHO CLAUDE)

````text
Tôi đang xây dựng hệ thống bài thi online cho MTS Education. Tôi đã có sẵn file `data.js` (dán bên dưới / đính kèm). Bây giờ hãy tạo cho tôi 4 file còn lại để hoàn thiện bài thi HSA Phần Định Lượng.

## THÔNG TIN BÀI THI
- Tên đề: [VD: ĐỀ THI ĐỊNH LƯỢNG HSA - ĐỀ SỐ 1]
- Môn học: [VD: Toán và Xử lý số liệu]
- Mô tả ngắn trên header: [VD: BÀI THI ĐÁNH GIÁ NĂNG LỰC HSA · TOÁN HỌC VÀ XỬ LÝ SỐ LIỆU]
- Thời gian làm bài: 75 phút
- Mã đề (dùng cho Firebase, không dấu, không cách): [VD: HSA_DINHLUONG_DE1]
- Hash trang MTSedu để quay về: [VD: #math]
- Cấu trúc: 50 câu (trắc nghiệm và điền đáp án đan xen). Mỗi câu 1 điểm, tổng 50 điểm.

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
          <div class="meta-text">[MÔ TẢ HEADER]</div>
          <h1 class="exam-title">[TÊN ĐỀ]</h1>
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
      <div class="page-footer">[MÔN HỌC] · tự động chấm điểm theo đúng barem &amp; lưu kết quả</div>
    </div>

    <!-- Màn hình làm bài thi -->
    <div id="exam-screen" class="hidden container">
      <div id="board-container" class="board-card">
        <h3>Bảng Điều Hướng</h3>
        <div id="question-board" class="board-wrapper"></div>
      </div>
      <div class="exam-header-block">
        <div class="exam-header-top">
          <div class="meta-text">KIỂM TRA 75 PHÚT · [MÔN HỌC]</div>
          <h1 class="exam-title">[TÊN ĐỀ]</h1>
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
```

---

## FILE 2: firebase-config.js
*(Copy y chang như trong hệ thống)*

---

## FILE 3: mtsedu-auth.js
*(Copy y chang như trong hệ thống)*

---

## FILE 4: script.js
Dùng template dành riêng cho HSA này:

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

// ===== CHỈ THAY DÒNG NÀY =====
const MA_DE       = "[MÃ ĐỀ]";                       // mã đề Firebase (không dấu, không cách)
const DRAFT_KEY   = "examDraft_[MÃ ĐỀ]";             // key localStorage
const EXAM_MINUTES = 75;                             // thời gian làm bài (phút)
const RETURN_HASH = "[HASH VD: #math]";              // hash trang MTSedu
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
      const correct = q.correctAnswer.toLowerCase();
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
```
````
