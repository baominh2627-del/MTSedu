<!doctype html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Kiểm Tra Tiến Độ 50 Phút - Môn Vật Lý 12</title>
    <link rel="stylesheet" href="style.css" />
    <!-- MathJax for rendering Physics Formulas -->
    <script>
      MathJax = {
        tex: {
          inlineMath: [
            ["$", "$"],
            ["\\(", "\\)"],
          ],
        },
        svg: { fontCache: "global" },
      };
    </script>
    <script
      id="MathJax-script"
      async
      src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
    ></script>
  </head>
  <body>
    <!-- Màn hình Đăng nhập -->
    <div id="login-screen" class="container">
      <div class="card login-card">
        <h1>Kiểm Tra Tiến Độ 45 Phút</h1>
        <h2>Môn Vật Lý 12 - Nhiệt Lượng Học</h2>
        <form id="login-form">
          <div class="form-group">
            <label for="student-name">Họ và tên học sinh</label>
            <input
              type="text"
              id="student-name"
              required
              placeholder="Nhập họ và tên..."
            />
          </div>
          <div class="form-group">
            <label for="student-class">Lớp</label>
            <input
              type="text"
              id="student-class"
              required
              placeholder="Ví dụ: 12A1"
            />
          </div>
          <div class="form-group">
            <label for="exam-time">Thời gian làm bài (phút)</label>
            <input type="number" id="exam-time" required value="45" min="1" />
          </div>
          <button type="submit" class="btn-primary">Bắt đầu làm bài</button>
        </form>
      </div>
    </div>

    <!-- Màn hình Làm bài thi -->
    <div id="exam-screen" class="hidden">
      <div id="timer-bar" class="sticky-timerbar">
        <div class="student-info">
          Thí sinh: <span id="display-name"></span> | Lớp:
          <span id="display-class"></span>
        </div>
        <div class="timer-info">
          Thời gian còn lại: <span id="countdown" class="mono-font">00:00</span>
        </div>
      </div>

      <div class="container" id="questions-container">
        <!-- Render câu hỏi bằng JavaScript -->
      </div>

      <div class="container submit-container">
        <button id="submit-btn" class="btn-primary">Nộp bài</button>
      </div>
    </div>

    <!-- Màn hình Kết quả -->
    <div id="result-screen" class="hidden container">
      <div class="card result-card">
        <h2>Kết Quả Bài Thi</h2>
        <div class="score-display mono-font">
          Điểm: <span id="final-score"></span>/10
        </div>
        <p>
          Số lần cảnh báo gian lận (rời tab): <span id="cheat-display">0</span>
        </p>
        <p>Kết quả đã được lưu lên hệ thống.</p>
        <button id="review-btn" class="btn-primary">Xem lại chi tiết</button>
      </div>
    </div>

    <!-- Load Module Scripts -->
    <script type="module" src="script.js"></script>
  </body>

</html>
:root {
  --paper-off: #fbfcfe;
  --ink: #1b3a6b;
  --green: #28a745;
  --red: #dc3545;
  --amber: #ffc107;
  --font-main: "Times New Roman", Times, serif;
  --font-mono: "Courier New", Courier, monospace;
}

- {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

body {
  background-color: var(--paper-off);
  /_ Giả lập giấy kẻ ô ly xanh nhạt _/
  background-image:
    linear-gradient(rgba(27, 58, 107, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(27, 58, 107, 0.08) 1px, transparent 1px);
  background-size: 20px 20px;
  font-family: var(--font-main);
  color: var(--ink);
  line-height: 1.6;
}

.mono-font {
  font-family: var(--font-mono);
  font-weight: bold;
}

.hidden {
  display: none !important;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

/_ Typography & Cards _/
.card {
  background: #ffffff;
  border-radius: 8px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(27, 58, 107, 0.1);
}

.login-card,
.result-card {
  margin-top: 50px;
  text-align: center;
}

/_ Forms _/
.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

input[type="text"],
input[type="number"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: var(--font-main);
  font-size: 16px;
  color: var(--ink);
}

.btn-primary {
  background-color: var(--ink);
  color: #fff;
  border: none;
  padding: 12px 30px;
  font-size: 18px;
  font-family: var(--font-main);
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-primary:hover {
  opacity: 0.9;
}

/_ Sticky Timerbar _/
.sticky-timerbar {
  position: sticky;
  top: 0;
  background-color: var(--ink);
  color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 15px 30px;
  font-size: 18px;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s;
}

/_ Hiệu ứng nhấp nháy cảnh báo < 5 phút _/
@keyframes pulse {
  0% {
    background-color: var(--ink);
  }
  50% {
    background-color: var(--red);
  }
  100% {
    background-color: var(--ink);
  }
}
.timer-warning {
  animation: pulse 1s infinite;
}

/_ Định dạng câu hỏi _/
.question-title {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 15px;
}

.options-list {
  list-style: none;
}

.option-item {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid transparent;
  transition: background 0.2s;
}

.option-item:hover {
  background: rgba(27, 58, 107, 0.05);
}

.option-item label {
  display: inline-block;
  cursor: pointer;
  font-weight: normal;
  margin-bottom: 0;
}

.tf-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px dashed rgba(27, 58, 107, 0.2);
}

.tf-controls label {
  margin-left: 10px;
  font-weight: normal;
  cursor: pointer;
}

/_ Auto-grading UI _/
.correct-ans {
  background-color: rgba(40, 167, 69, 0.15) !important;
  border: 1px solid var(--green) !important;
  color: var(--green);
}
.wrong-ans {
  background-color: rgba(220, 53, 69, 0.15) !important;
  border: 1px solid var(--red) !important;
  color: var(--red);
}

.explanation {
  margin-top: 15px;
  padding: 10px;
  background-color: #f8f9fa;
  border-left: 4px solid var(--ink);
  font-style: italic;
}

.submit-container {
  text-align: center;
  margin-bottom: 50px;
}
.score-display {
  font-size: 2.5rem;
  color: var(--green);
  margin: 15px 0;
}
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// TODO: ĐIỀN CONFIG FIREBASE CỦA BẠN VÀO ĐÂY
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, serverTimestamp };
import { examData } from "./data.js";
import { db, collection, addDoc, serverTimestamp } from "./firebase-config.js";

// DOM Elements
const loginScreen = document.getElementById("login-screen");
const examScreen = document.getElementById("exam-screen");
const resultScreen = document.getElementById("result-screen");
const loginForm = document.getElementById("login-form");
const timerBar = document.getElementById("timer-bar");
const countdownEl = document.getElementById("countdown");
const questionsContainer = document.getElementById("questions-container");
const submitBtn = document.getElementById("submit-btn");

// State Variables
let studentData = {};
let timerInterval;
let timeRemaining = 0;
let cheatCount = 0;
let isExamFinished = false;

// 1. INIT & BẮT ĐẦU LÀM BÀI
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  studentData = {
    name: document.getElementById("student-name").value.trim(),
    class: document.getElementById("student-class").value.trim(),
    time: parseInt(document.getElementById("exam-time").value) \* 60,
  };

  document.getElementById("display-name").innerText = studentData.name;
  document.getElementById("display-class").innerText = studentData.class;

  loginScreen.classList.add("hidden");
  examScreen.classList.remove("hidden");

  renderQuestions();
  startTimer(studentData.time);
  setupAntiCheat();
});

// 2. RENDER GIAO DIỆN CÂU HỎI
function renderQuestions() {
  questionsContainer.innerHTML = "";

  examData.forEach((q, index) => {
    const card = document.createElement("div");
    card.className = "card question-card";
    card.id = `card-${q.id}`;

    let contentHTML = `<div class="question-title">Câu ${index + 1}: ${q.question}</div>`;

    if (q.type === 1) {
      contentHTML += `<ul class="options-list">`;
      q.options.forEach((opt, optIdx) => {
        contentHTML += `
                    <li class="option-item" id="opt-${q.id}-${optIdx}">
                        <label>
                            <input type="radio" name="ans-${q.id}" value="${optIdx}">
                            ${opt}
                        </label>
                    </li>`;
      });
      contentHTML += `</ul>`;
    } else if (q.type === 2) {
      q.statements.forEach((stmt, stmtIdx) => {
        contentHTML += `
                    <div class="tf-row" id="row-${q.id}-${stmtIdx}">
                        <div class="tf-stmt">${stmt.text}</div>
                        <div class="tf-controls">
                            <label><input type="radio" name="tf-${q.id}-${stmtIdx}" value="true"> Đúng</label>
                            <label><input type="radio" name="tf-${q.id}-${stmtIdx}" value="false"> Sai</label>
                        </div>
                    </div>`;
      });
    } else if (q.type === 3) {
      contentHTML += `
                <div class="form-group" style="margin-top:15px;">
                    <input type="text" id="ans-${q.id}" placeholder="Nhập đáp án của bạn...">
                </div>`;
    }

    contentHTML += `<div class="explanation hidden" id="exp-${q.id}">${q.explanation}</div>`;
    card.innerHTML = contentHTML;
    questionsContainer.appendChild(card);
  });

  // Gọi lại MathJax để render công thức LaTeX cho các element mới
  if (window.MathJax) {
    MathJax.typesetPromise([questionsContainer]);
  }
}

// 3. ĐỒNG HỒ ĐẾM NGƯỢC
function startTimer(seconds) {
  timeRemaining = seconds;
  updateTimerDisplay();

  timerInterval = setInterval(() => {
    timeRemaining--;
    updateTimerDisplay();

    // Nhấp nháy cảnh báo khi thời gian < 5 phút (300 giây)
    if (timeRemaining <= 300) {
      timerBar.classList.add("timer-warning");
    }

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      finishExam();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const m = Math.floor(timeRemaining / 60)
    .toString()
    .padStart(2, "0");
  const s = (timeRemaining % 60).toString().padStart(2, "0");
  countdownEl.innerText = `${m}:${s}`;
}

// 4. ANTI-CHEAT (Visibility Change)
function setupAntiCheat() {
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && !isExamFinished) {
      cheatCount++;
      alert(
        `Cảnh báo gian lận! Bạn vừa thoát khỏi màn hình bài thi. (Vi phạm lần ${cheatCount})`,
      );
    }
  });
}

// 5. AUTO-GRADING & SUBMIT
submitBtn.addEventListener("click", finishExam);

async function finishExam() {
  if (isExamFinished) return;
  isExamFinished = true;
  clearInterval(timerInterval);
  timerBar.classList.remove("timer-warning");

  // Disable inputs
  document
    .querySelectorAll("input")
    .forEach((input) => (input.disabled = true));
  submitBtn.disabled = true;
  submitBtn.innerText = "Đang xử lý...";

  let totalPoints = 0;
  const maxScorePerQuestion = 10 / examData.length;
  const userAnswers = {};

  examData.forEach((q) => {
    let earned = 0;
    document.getElementById(`exp-${q.id}`).classList.remove("hidden");

    if (q.type === 1) {
      const selected = document.querySelector(
        `input[name="ans-${q.id}"]:checked`,
      );
      const selectedVal = selected ? parseInt(selected.value) : null;
      userAnswers[q.id] = selectedVal;

      // Mark correct answer
      document
        .getElementById(`opt-${q.id}-${q.correctAnswer}`)
        .classList.add("correct-ans");

      if (selectedVal === q.correctAnswer) {
        earned = maxScorePerQuestion;
      } else if (selectedVal !== null) {
        document
          .getElementById(`opt-${q.id}-${selectedVal}`)
          .classList.add("wrong-ans");
      }
    } else if (q.type === 2) {
      let correctCount = 0;
      const tfAnswers = [];
      q.statements.forEach((stmt, stmtIdx) => {
        const selected = document.querySelector(
          `input[name="tf-${q.id}-${stmtIdx}"]:checked`,
        );
        const selectedVal = selected ? selected.value === "true" : null;
        tfAnswers.push(selectedVal);

        const row = document.getElementById(`row-${q.id}-${stmtIdx}`);
        if (selectedVal === stmt.correct) {
          correctCount++;
          row.classList.add("correct-ans");
        } else {
          row.classList.add("wrong-ans");
        }
      });
      userAnswers[q.id] = tfAnswers;

      // Tính điểm bậc thang (Quy chuẩn của bộ GD: 4 ý=100%, 3 ý=50%, 2 ý=25%, <2 ý=0%)
      if (correctCount === 4) earned = maxScorePerQuestion;
      else if (correctCount === 3) earned = maxScorePerQuestion _ 0.5;
      else if (correctCount === 2) earned = maxScorePerQuestion _ 0.25;
    } else if (q.type === 3) {
      const inputEl = document.getElementById(`ans-${q.id}`);
      const inputVal = inputEl.value.trim().toLowerCase();
      userAnswers[q.id] = inputVal;

      if (inputVal === q.correctAnswer.toLowerCase()) {
        earned = maxScorePerQuestion;
        inputEl.classList.add("correct-ans");
      } else {
        inputEl.classList.add("wrong-ans");
      }
    }
    totalPoints += earned;
  });

  const finalScore = parseFloat(totalPoints.toFixed(2));

  // Lưu lên Firestore
  try {
    if (db) {
      await addDoc(collection(db, "exam_results"), {
        name: studentData.name,
        class: studentData.class,
        score: finalScore,
        cheatCount: cheatCount,
        answers: userAnswers,
        timestamp: serverTimestamp(),
      });
    }
  } catch (e) {
    console.error("Lỗi khi lưu dữ liệu lên Firebase: ", e);
  }

  // Hiển thị kết quả
  document.getElementById("final-score").innerText = finalScore;
  document.getElementById("cheat-display").innerText = cheatCount;

  examScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  // Nút xem lại chi tiết
  document.getElementById("review-btn").addEventListener("click", () => {
    resultScreen.classList.add("hidden");
    examScreen.classList.remove("hidden");
    submitBtn.style.display = "none"; // Ẩn nút nộp bài khi xem lại
  });
}
// Type 1: Trắc nghiệm 1 đáp án (Radio)
// Type 2: Đúng/Sai 4 mệnh đề
// Type 3: Trả lời ngắn (Text)

export const examData = [
  {
    id: "q1",
    type: 1,
    question:
      "Câu 7: Một động cơ nhiệt nhận từ nguồn nóng nhiệt lượng $Q_1$ và thải ra nguồn lạnh nhiệt lượng $Q_2$. Hiệu suất của động cơ được tính bởi công thức",
    options: [
      "A. $H = \\frac{Q_1}{Q_1+Q_2} . 100\\%$",
      "B. $H = \\frac{Q_2}{Q_1} . 100\\%$",
      "C. $H = \\frac{Q_1-Q_2}{Q_1} . 100\\%$",
      "D. $H = \\frac{Q_1-Q_2}{Q_2} . 100\\%$",
    ],
    correctAnswer: 2, // Index 2 tương ứng với C
    explanation:
      "Hiệu suất động cơ nhiệt: $H = \\frac{A}{Q_1} = \\frac{Q_1 - Q_2}{Q_1} \\times 100\\%$.",
  },
  {
    id: "q2",
    type: 1,
    question:
      "Câu 14 (Trích ảnh): Khi một chất lỏng đang sôi ở áp suất chuẩn, nếu ta tiếp tục cung cấp thêm nhiệt lượng thì:",
    options: [
      "A. Nhiệt độ của chất lỏng tiếp tục tăng lên.",
      "B. Nhiệt độ của chất lỏng không đổi.",
      "C. Nhiệt độ của chất lỏng giảm xuống do sự bay hơi mang theo nhiệt.",
      "D. Các phân tử chất lỏng sẽ chuyển động chậm lại.",
    ],
    correctAnswer: 1, // Index 1 tương ứng với B
    explanation:
      "Trong quá trình sôi, nhiệt lượng cung cấp chỉ dùng để chuyển thể từ lỏng sang khí nên nhiệt độ hệ được giữ nguyên không đổi.",
  },
  {
    id: "q3",
    type: 1,
    question:
      "Câu 16 (Trích ảnh): Bình nhiệt lượng kế có lớp không khí giữa hai thành bình. Tác dụng chính của lớp không khí là:",
    options: [
      "A. làm nhiệt độ của chất lỏng trong bình luôn tăng.",
      "B. hạn chế sự truyền nhiệt bằng dẫn nhiệt qua thành bình.",
      "C. làm nội năng của chất lỏng không đổi trong mọi điều kiện.",
      "D. ngăn hoàn toàn sự truyền năng lượng bằng bức xạ.",
    ],
    correctAnswer: 1, // Index 1 tương ứng với B
    explanation:
      "Không khí dẫn nhiệt kém, do đó lớp không khí giúp hạn chế sự hao phí nhiệt qua hiện tượng dẫn nhiệt truyền ra môi trường bên ngoài.",
  },
  {
    id: "q4",
    type: 2,
    question:
      "Nguyên lý 1 Nhiệt động lực học: Xét biểu thức $\\Delta U = A + Q$. Nhận định tính Đúng/Sai của các mệnh đề sau:",
    statements: [
      {
        text: "a) $\\Delta U$ là độ biến thiên nội năng của vật.",
        correct: true,
      },
      {
        text: "b) $Q > 0$ nghĩa là hệ truyền nhiệt cho môi trường.",
        correct: false,
      },
      {
        text: "c) $A > 0$ nghĩa là hệ nhận công từ môi trường.",
        correct: true,
      },
      { text: "d) Đối với hệ cô lập, $\\Delta U = 0$.", correct: true },
    ],
    explanation:
      "Q > 0 là hệ nhận nhiệt lượng (Mệnh đề b sai). Hệ cô lập không trao đổi nhiệt và công nên $\\Delta U = 0$.",
  },
  {
    id: "q5",
    type: 3,
    question:
      "Một hệ nhiệt động nhận nhiệt lượng $150\\text{ J}$ và thực hiện công $40\\text{ J}$ lên môi trường. Tính độ biến thiên nội năng của hệ (J).",
    correctAnswer: "110",
    explanation:
      "Hệ nhận nhiệt ($Q = +150\\text{ J}$), thực hiện công ($A = -40\\text{ J}$). Theo nguyên lý 1 NĐLH: $\\Delta U = A + Q = -40 + 150 = 110\\text{ J}$.",
  },
];
---> Viết cho tôi các file + câu nào có hình vẽ phức tạp thì để lại tôi tự cắt ảnh và chèn (chú thích cho tôi) + mặc định thời gian 50ph kiểm tra + hết giờ tự nộp bài + thông báo còn 30s + Có chức năng đánh dấu câu đê tí quay lại + có 1 bảng hiển thị trạng thái các câu đã làm - chưa làm - đánh dáu a + tự động chấm dựa vào đáp án và hiển thị đáp án sau khi nộp bài + Nâng cao: khi reset trang vẫn lưu kết quả của bài làm đang là dở (chi cần chưa nộp thì vẫn lưu )
