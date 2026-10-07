### data.js

`javascript
export const examData = [
  {
    "id": "q1",
    "type": "fill",
    "question": "Có bao nhiêu giá trị nguyên dương của $m$ để hàm số $y = \\frac{x^2 - 4x + m + 2 + 3\\sqrt{x^2 - 4x}}{\\sqrt{x^2 - 4x} + 2}$ nghịch biến trên khoảng $(-4; 0)$?\n(Nhập đáp án vào ô trống)",
    "correctAnswer": "4",
    "explanation": "Chi tiết giải...",
    "image": null
  },
  {
    "id": "q2",
    "type": "mcq",
    "question": "Đạo hàm của hàm số $y = \\tan x - \\cot x$ là",
    "options": [
      "$y' = \\frac{1}{\\cos^2 2x}$.",
      "$y' = \\frac{1}{\\sin^2 2x}$.",
      "$y' = \\frac{4}{\\cos^2 2x}$.",
      "$y' = \\frac{4}{\\sin^2 2x}$."
    ],
    "correctAnswer": 3,
    "explanation": "Chi tiết giải...",
    "image": null
  },
  {
    "id": "q3",
    "type": "mcq",
    "question": "Cho hình chóp S.ABC có đáy tam giác vuông tại $A$ có $AB=a, BC=a\\sqrt{5}$. Biết $SA=3a$ và $SA \\perp (ABC)$. Tính khoảng cách từ $A$ đến mặt phẳng $(SBC)$.",
    "options": [
      "$\\frac{6a}{7}$.",
      "$\\frac{\\sqrt{2}a}{2}$.",
      "$\\frac{3a}{7}$.",
      "$\\frac{\\sqrt{5}a}{5}$."
    ],
    "correctAnswer": 0,
    "explanation": "Chi tiết giải...",
    "image": null
  },
  {
    "id": "q4",
    "type": "fill",
    "question": "Trong không gian Oxyz, cho mặt phẳng $(P): 2x + 3y + z - 11 = 0$, mặt cầu $(S)$ có tâm $I(1; -2; 1)$ và tiếp xúc với mặt phẳng $(P)$ tại điểm $H(a; b; c)$. Tính $T = a + b + c$.",
    "correctAnswer": "6",
    "explanation": "Chi tiết giải...",
    "image": null
  },
  {
    "id": "q5",
    "type": "mcq",
    "question": "Cho hình chóp $S.ABC$ có SA vuông góc với đáy, mặt phẳng $(SAB)$ vuông góc với mặt phẳng $(SBC)$, góc giữa hai mặt phẳng $(SAC)$ và $(SBC)$ là $60^\\circ, SB=a\\sqrt{2}, BSC=45^\\circ$. Thể tích khối chóp $S.ABC$ theo $a$ là",
    "options": [
      "$V = \\frac{a^3\\sqrt{2}}{15}$.",
      "$V = 2\\sqrt{3}a^3$.",
      "$V = 2\\sqrt{2}a^3$.",
      "$V = \\frac{2a^3\\sqrt{3}}{15}$."
    ],
    "correctAnswer": 3,
    "explanation": "Chi tiết giải...",
    "image": null
  },
  {
    "id": "q6",
    "type": "mcq",
    "question": "Có tất cả bao nhiêu giá trị nguyên của $x$ để tồn tại duy nhất giá trị nguyên của $y$ sao cho thỏa mãn bất phương trình $e^{2y} + 4x^2y - y^2 + x > \\ln(x^2 - y)$?",
    "options": [
      "1.",
      "2.",
      "3.",
      "4."
    ],
    "correctAnswer": 0,
    "explanation": "Chi tiết giải...",
    "image": null
  },
  {
    "id": "q7",
    "type": "mcq",
    "question": "Tập nghiệm của bất phương trình $\\left(\\frac{e}{\\pi}\\right)^x > 1$ là",
    "options": [
      "$\\emptyset$.",
      "$(-\\infty; 0)$.",
      "$(0; +\\infty)$.",
      "$[0; +\\infty)$."
    ],
    "correctAnswer": 1,
    "explanation": "Chi tiết giải...",
    "image": null
  },
  {
    "id": "q8",
    "type": "fill",
    "question": "Cho hàm số $y = x^3 - 3x^2 - (m^2 - 2)x + m^2 (C_m)$. Biết rằng đồ thị hàm số cắt trục hoành tại ba điểm phân biệt $A, B, C$ ($x_A < x_B < x_C$) và có hai điểm cực trị M, N. Số các giá trị của tham số $m$ để $MN = AC$ là?",
    "correctAnswer": "2",
    "explanation": "Chi tiết giải...",
    "image": null
  },
  {
    "id": "q9",
    "type": "mcq",
    "question": "Cho hình chóp S.ABCD có đáy ABCD là hình vuông cạnh $a$, cạnh bên SA vuông góc với đáy và $SA = a\\sqrt{3}$. Khoảng cách từ $D$ đến mặt phẳng $(SBC)$ bằng",
    "options": [
      "$\\frac{2a\\sqrt{5}}{5}$.",
      "$a\\sqrt{3}$.",
      "$\\frac{a}{2}$.",
      "$\\frac{a\\sqrt{3}}{2}$."
    ],
    "correctAnswer": 3,
    "explanation": "Chi tiết giải...",
    "image": null
  },
  {
    "id": "q10",
    "type": "mcq",
    "question": "Ông Đức gửi ngân hàng số tiền 500.000.000 đồng loại kỳ hạn 6 tháng với lãi suất 5,6% trên một năm theo thể thức lãi kép (tức là nếu đến kỳ hạn người gửi không rút lãi ra thì tiền lãi được tính vào vốn của kỳ kế tiếp). Hỏi sau 3 năm 9 tháng ông Đức nhận được số tiền (làm tròn đến hàng nghìn) cả gốc lẫn lãi là bao nhiêu? Biết rằng ông Đức không rút cả gốc lẫn lãi trong các kỳ hạn trước đó và nếu rút trước kỳ hạn thì ngân hàng trả lãi suất theo loại không kỳ hạn 0,00027% trên một ngày. (Một tháng tính 30 ngày).",
    "options": [
      "606.627.000 đồng.",
      "623.613.000 đồng.",
      "606.775.000 đồng.",
      "611.764.000 đồng."
    ],
    "correctAnswer": 2,
    "explanation": "Chi tiết giải...",
    "image": null
  },
  {
    "id": "q11",
    "type": "mcq",
    "question": "Trong các nhị thức dưới đây, nhị thức nào chứa số hạng $C_n^k.(5x)^2 \\left( -6y^2 \\right)^7$ ($k \\le n; k, n \\in \\mathbb{N}$) ?",
    "options": [
      "$\\left(5x - 6y^2\\right)^{16}$.",
      "$\\left(5x - 6y^2\\right)^{11}$.",
      "$\\left(5x - 6y^2\\right)^{9}$.",
      "$\\left(5x - 6y^2\\right)^{18}$."
    ],
    "correctAnswer": 2,
    "explanation": "Chi tiết giải...",
    "image": null
  },
  {
    "id": "q12",
    "type": "fill",
    "question": "Cho hàm số $f(x) = -x^3 + 3x$ và $g(x) = |f(2 + \\sin x) + m|$ ($m$ là tham số thực). Gọi $S$ là tập các giá trị của tham số $m$ để $\\max g(x) + \\min g(x) = 50$. Tổng các phần tử của $S$ bằng?",
    "correctAnswer": "16",
    "explanation": "Chi tiết giải...",
    "image": null
  },
  {
    "id": "q13",
    "type": "mcq",
    "question": "Cho hình chóp S.ABCD có đáy là hình bình hành. Các điểm M, N, P lần lượt là trung điểm các cạnh SA, BC, CD. Gọi I, J lần lượt là giao điểm của NP với AB, AD. Kéo dài MI cắt SB tại $E$, kéo dài MJ cắt SD tại $F$. Gọi $k = \\frac{EF}{IJ}$, giá trị của $k$ là?",
    "options": [
      "$k = \\frac{2}{3}$",
      "$k = \\frac{1}{9}$",
      "$k = \\frac{1}{3}$",
      "$k = \\frac{2}{9}$"
    ],
    "correctAnswer": 3,
    "explanation": "Chi tiết giải...",
    "image": null
  },
  {
    "id": "q14",
    "type": "mcq",
    "question": "Cho hàm số $y = f(x)$ xác định trên $\\mathbb{R}$ và có đạo hàm $f'(x)$. Đồ thị hàm số $y = f'(x)$ được cho như hình bên dưới. Biết rằng $f(0) + f(1) - 2f(2) = f(4) - f(3)$. Giá trị nhỏ nhất của hàm số $y = f(x)$ trên đoạn $[0; 4]$ là?",
    "options": [
      "$f(4)$",
      "$f(3)$",
      "$f(2)$",
      "$f(1)$"
    ],
    "correctAnswer": 0,
    "explanation": "Chi tiết giải...",
    "image": "cau_14.png"
  },
  {
    "id": "q15",
    "type": "fill",
    "question": "Dãy số $\\begin{cases} u_1 = \\sqrt{2} \\\\ u_{n+1} = \\sqrt{u_n + 2} \\end{cases}$ bị chặn trên bởi $a$. Khi đó $a = ?$",
    "correctAnswer": "2",
    "explanation": "Chi tiết giải...",
    "image": null
  },
  {
    "id": "q16",
    "type": "mcq",
    "question": "Cho phương trình $4^{|x|} - (m + 1)2^{|x|} + m = 0$. Điều kiện của $m$ để phương trình có đúng 3 nghiệm phân biệt là:",
    "options": [
      "$m > 0, m \\ne 1$.",
      "$m \\ge 1$.",
      "$m > 1$.",
      "$m > 0$."
    ],
    "correctAnswer": 2,
    "explanation": "Chi tiết giải...",
    "image": null
  },
  {
    "id": "q17",
    "type": "fill",
    "question": "Gọi giá trị lớn nhất và giá trị nhỏ nhất của của hàm số $y = 3 - 2\\cos 2x - \\cos^2 2x$ lần lượt là M, m. Tính giá trị biểu thức $2024M + 2025m$.",
    "correctAnswer": "8096",
    "explanation": "Chi tiết giải...",
    "image": null
  },
  {
    "id": "q18",
    "type": "mcq",
    "question": "Trong môi trường nuôi cấy ổn định người ta nhận thấy rằng: cứ sau đúng 5 ngày số lượng loài của vi khuẩn A tăng lên gấp đôi, còn sau đúng 10 ngày số lượng loài của vi khuẩn B tăng lên gấp ba. Giả sử ban đầu có 50 con vi khuẩn A và 100 con vi khuẩn B, hỏi sau bao nhiêu ngày nuôi cấy trong môi trường đó thì số lượng vi khuẩn của cả hai loài bằng 20900 con, biết rằng tốc độ tăng trưởng của mỗi loài ở mọi thời điểm là như nhau?",
    "options": [
      "20 ngày.",
      "30 ngày.",
      "40 ngày.",
      "50 ngày."
    ],
    "correctAnswer": 2,
    "explanation": "Chi tiết giải...",
    "image": null
  },
  {
    "id": "q19",
    "type": "fill",
    "question": "Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình bình hành. Gọi $M$ là điểm thuộc cạnh $SD$ sao cho $SM = \\frac{2}{3}SD$. Mặt phẳng chứa $AM$ và song song với $BD$ cắt cạnh $SC$ tại $K$. Tính tỷ số $\\frac{SK}{SC}$.",
    "correctAnswer": "1/2",
    "explanation": "Chi tiết giải...",
    "image": null
  },
  {
    "id": "q20",
    "type": "fill",
    "question": "Một bình hoa dạng khối tròn xoay được tạo thành khi quay hình phẳng giới hạn bởi đồ thị hàm số $y = -\\sin x + 2$ và trục Ox (tham khảo hình vẽ bên dưới). Biết đáy bình hoa là hình tròn có bán kính bằng 2dm, miệng bình hoa là đường tròn bán kính bằng 1.5dm. Bỏ qua độ dày của bình hoa, tính thể tích của bình hoa. (kết quả làm tròn đến hàng đơn vị, đơn vị: dm³)",
    "correctAnswer": "103",
    "explanation": "Chi tiết giải...",
    "image": "cau_20.png"
  },
  {
    "id": "q21",
    "type": "fill",
    "question": "Trong không gian $Oxyz$, cho hai điểm $A(1;1;3), B(5;2;-1)$ và hai điểm $M, N$ thay đổi thuộc mặt phẳng $(Oxy)$ sao cho điểm $I(1;2;0)$ luôn là trung điểm của $MN$. Tính $T = 2x_M - 4x_N + 7y_M - y_N$ khi biểu thức $P = MA^2 + 2NB^2 + \\vec{MA}.\\vec{NB}$ đạt giá trị nhỏ nhất.",
    "correctAnswer": "-10",
    "explanation": "Chi tiết giải...",
    "image": null
  },
  {
    "id": "q22",
    "type": "mcq",
    "question": "Cho tam giác $ABC$ có $AB=7, AC=5, \\widehat{A}=60^\\circ$. Tính độ dài trung tuyến $AM$.",
    "options": [
      "$\\frac{\\sqrt{101}}{2}$",
      "$\\sqrt{39}$",
      "$\\frac{\\sqrt{109}}{2}$",
      "$\\sqrt{27}$"
    ],
    "correctAnswer": 2,
    "explanation": "Chi tiết giải...",
    "image": null
  },
  {
    "id": "q23",
    "type": "mcq",
    "question": "Cho các đường thẳng $d_1: x+2y-3=0, d_2: 3x-4y+1=0$ và $\\Delta: x+3y-10=0$. Phương trình đường thẳng $d$ đi qua giao điểm của hai đường thẳng $d_1, d_2$ và song song với đường thẳng $\\Delta$ là:",
    "options": [
      "$x+y-4=0$",
      "$x+3y+4=0$",
      "$x+y+4=0$",
      "$x+3y-4=0$"
    ],
    "correctAnswer": 3,
    "explanation": "Chi tiết giải...",
    "image": null
  },
  {
    "id": "q24",
    "type": "mcq",
    "question": "Cho hình chóp $S.ABCD$, đáy $ABCD$ là hình chữ nhật với $AB=3, BC=4$, tam giác $SAC$ nằm trong mặt phẳng vuông góc với đáy, $d(C; SA)=4$. Tính côsin của góc tạo bởi hai mặt phẳng $(SAB)$ và $(SAC)$.",
    "options": [
      "$\\frac{5\\sqrt{34}}{34}$",
      "$\\frac{3\\sqrt{17}}{17}$",
      "$\\frac{2\\sqrt{34}}{17}$",
      "$\\frac{3\\sqrt{34}}{34}$"
    ],
    "correctAnswer": 3,
    "explanation": "Chi tiết giải...",
    "image": null
  },
  {
    "id": "q25",
    "type": "fill",
    "question": "Bảng tần số ghép nhóm dưới đây thống kê số giờ học của các học sinh lớp 10A như sau: Biết thời gian học của học sinh học ít nhất là 4 giờ 20 phút, thời gian học của học sinh học nhiều nhất là 8 giờ 50 phút. Giả sử khoảng biến thiên của mẫu số liệu ghép nhóm bằng $\\frac{a}{b}$ lần khoảng biến thiên của mẫu số liệu gốc ($\\frac{a}{b}$ là phân số tối giản). Tính $a^3+b^3$.",
    "correctAnswer": "1729",
    "explanation": "Chi tiết giải...",
    "image": null
  },
  {
    "id": "q26",
    "type": "mcq",
    "question": "Dựa vào thông tin sau và trả lời các câu hỏi từ câu 26 - 28:\nỞ một thị xã, tỉ lệ mắc căn bệnh M là 22%. Chính quyền thị xã đó muốn biết danh sách những người bị mắc bệnh nên đã tổ chức xét nghiệm cho toàn bộ người dân. Tuy nhiên bộ “test” được sử dụng trong phương pháp xét nghiệm này có những sai sót nhất định:\nNếu một người không bị bệnh thì xác suất bộ “test” cho ra kết quả dương tính là 10%.\nNếu bộ “test” cho ra kết quả dương tính thì xác suất bị bệnh là 70%.\n\nCâu 26:\nNếu một người không bị bệnh thì xác suất bộ “test” cho ra kết quả chính xác là bao nhiêu?",
    "options": [
      "10%",
      "78%",
      "70%",
      "90%"
    ],
    "correctAnswer": 3,
    "explanation": "Chi tiết giải...",
    "image": null
  },
  {
    "id": "q27",
    "type": "mcq",
    "question": "Xác suất để bộ “test” cho ra kết quả dương tính khi xét nghiệm người bị bệnh là:",
    "options": [
      "70%",
      "82,73%",
      "84,35%",
      "80,18%"
    ],
    "correctAnswer": 1,
    "explanation": "Chi tiết giải...",
    "image": null
  },
  {
    "id": "q28",
    "type": "mcq",
    "question": "Xác suất chẩn đoán đúng của bộ “test” là:",
    "options": [
      "88,4%",
      "81,8%",
      "96,2%",
      "74%"
    ],
    "correctAnswer": 0,
    "explanation": "Chi tiết giải...",
    "image": null
  },
  {
    "id": "q29",
    "type": "mcq",
    "question": "Cho các hàm số $f(x)$ và $F(x)$ liên tục trên $\\mathbb{R}$ thỏa $F'(x)=f(x), \\forall x \\in \\mathbb{R}$. Tính $\\int\\limits_{0}^{1}f(x)dx$ biết $F(0)=2, F(1)=6$.",
    "options": [
      "$\\int\\limits_{0}^{1}f(x)dx = -4$",
      "$\\int\\limits_{0}^{1}f(x)dx = 8$",
      "$\\int\\limits_{0}^{1}f(x)dx = -8$",
      "$\\int\\limits_{0}^{1}f(x)dx = 4$"
    ],
    "correctAnswer": 3,
    "explanation": "Chi tiết giải...",
    "image": null
  },
  {
    "id": "q30",
    "type": "fill",
    "question": "Tính giới hạn $\\lim\\limits_{x \\to -\\infty} \\frac{\\sqrt{x^2+2x}+3x}{\\sqrt{4x^2+1}-x+2}$.",
    "correctAnswer": "-2/3",
    "explanation": "Chi tiết giải...",
    "image": null
  },
  {
    "id": "q31",
    "type": "mcq",
    "question": "Cho hàm số $f(x)$ có đạo hàm và liên tục trên $\\mathbb{R}$ và bảng xét dấu đạo hàm như sau:\n\nKhẳng định nào sau đây về số cực trị của hàm số $g(x) = f(x^2+1)+x^2-x^3+x^4$ là đúng?",
    "options": [
      "Có hai cực đại và chỉ có một cực tiểu.",
      "Có hai cực tiểu và chỉ có một cực đại.",
      "Có đúng một cực tiểu và không có cực đại.",
      "Có đúng một cực đại và không có cực tiểu."
    ],
    "correctAnswer": 2,
    "explanation": "Chi tiết giải...",
    "image": "cau_31.png"
  },
  {
    "id": "q32",
    "type": "mcq",
    "question": "Cho hàm số $f(x) = ax^3+bx^2+cx+d \\ (a,b,c,d \\in \\mathbb{R})$. Đồ thị của hàm số $y=f(x)$ như hình vẽ bên. Số nghiệm thực của phương trình $3f(x)+4=0$ là?",
    "options": [
      "3",
      "0",
      "2",
      "1"
    ],
    "correctAnswer": 0,
    "explanation": "Chi tiết giải...",
    "image": "cau_32.png"
  },
  {
    "id": "q33",
    "type": "mcq",
    "question": "Cho hàm số $f(x)$ có đạo hàm trên $\\mathbb{R}$ và $e^{2x+1}$ là một nguyên hàm của hàm số $e^x . f'(x)$ trên $\\mathbb{R}$ và $f(0)=1$. Khi đó $f(1)$ bằng:",
    "options": [
      "$\\frac{e^3-e+2}{2}$",
      "$e^2-e+1$",
      "$2e^2-2e+1$",
      "$2e-1$"
    ],
    "correctAnswer": 2,
    "explanation": "Chi tiết giải...",
    "image": null
  },
  {
    "id": "q34",
    "type": "mcq",
    "question": "Trong không gian Oxyz, cho điểm $A(1;1;1)$, mặt phẳng $(P): x+y+z-3=0$ và đường thẳng $d: \\frac{x-2}{1} = \\frac{y}{2} = \\frac{z}{-1}$. Xét đường thẳng $\\Delta$ qua A, nằm trong (P) và cách đường thẳng d một khoảng cách lớn nhất. Đường thẳng $\\Delta$ đi qua điểm nào dưới đây?",
    "options": [
      "$M(2;1;0)$",
      "$N(1;-1;3)$",
      "$P(-3;3;3)$",
      "$Q(1;2;4)$"
    ],
    "correctAnswer": 1,
    "explanation": "Chi tiết giải...",
    "image": null
  },
  {
    "id": "q35",
    "type": "mcq",
    "question": "Cho hàm số $f(x) = ax^4+bx^2+c$ có đồ thị như hình vẽ. Biết rằng $f(x)$ đạt cực trị tại các điểm $x_1; x_2; x_3$ thỏa mãn $x_3 = x_1+2$ và $f(x_1) + f(x_3) + \\frac{2}{3}f(x_2)=0$. Gọi $S_1, S_2, S_3, S_4$ là diện tích các hình phẳng trong hình vẽ bên. Tỉ số $\\frac{S_1+S_2}{S_3+S_4}$ gần nhất với kết quả nào dưới đây?",
    "options": [
      "0,8",
      "0,6",
      "0,7",
      "0,9"
    ],
    "correctAnswer": 1,
    "explanation": "Chi tiết giải...",
    "image": "cau_35.png"
  },
  {
    "id": "q36",
    "type": "mcq",
    "question": "Cho ba điểm $A(1;2;-1), B(2;-1;3), C(-3;5;1)$. Tìm tọa độ điểm D sao cho ABCD là hình bình hành?",
    "options": [
      "$D=(-4;8;-3)$.",
      "$D=(-2;8;-3)$.",
      "$D=(-2;2;5)$.",
      "$D=(-4;8;-5)$."
    ],
    "correctAnswer": 0,
    "explanation": "Chi tiết giải...",
    "image": null
  },
  {
    "id": "q37",
    "type": "mcq",
    "question": "Cho hàm số $y=f(x)$ có bảng biến thiên như hình vẽ:\n\nHàm số đã cho nghịch biến trên khoảng nào dưới đây?",
    "options": [
      "$(-\\infty;1)$",
      "$(1;3)$",
      "$(1;+\\infty)$",
      "$(-\\infty;2)$"
    ],
    "correctAnswer": 1,
    "explanation": "Chi tiết giải...",
    "image": "cau_37.png"
  },
  {
    "id": "q38",
    "type": "mcq",
    "question": "Trong không gian Oxyz, cho hai điểm $A(1;-2;-3), B(-1;4;1)$ và đường thẳng $d: \\frac{x+2}{1} = \\frac{y-2}{-1} = \\frac{z+3}{2}$. Phương trình đường thẳng $\\Delta$ đi qua trung điểm của đoạn AB và song song với đường thẳng d là?",
    "options": [
      "$\\Delta: \\frac{x}{1} = \\frac{y-2}{-1} = \\frac{z+2}{2}$.",
      "$\\Delta: \\frac{x}{1} = \\frac{y-1}{-1} = \\frac{z+1}{2}$.",
      "$\\Delta: \\frac{x-1}{1} = \\frac{y-1}{-1} = \\frac{z+1}{2}$.",
      "$\\Delta: \\frac{x}{1} = \\frac{y-1}{1} = \\frac{z+1}{2}$."
    ],
    "correctAnswer": 1,
    "explanation": "Chi tiết giải...",
    "image": null
  },
  {
    "id": "q39",
    "type": "fill",
    "question": "Một hộp chứa 11 quả cầu gồm 5 quả cầu màu xanh và 6 quả cầu màu đỏ. Chọn ngẫu nhiên đồng thời 2 quả cầu từ hộp đó. Xác suất để 2 quả cầu chọn ra khác màu bằng",
    "correctAnswer": "6/11",
    "explanation": "Chi tiết giải...",
    "image": null
  },
  {
    "id": "q40",
    "type": "mcq",
    "question": "Cho hình hộp $ABCD.A'B'C'D'$ có $\\overrightarrow{AB}=\\vec{a}, \\overrightarrow{AC}=\\vec{b}, \\overrightarrow{AA'}=\\vec{c}$. Gọi I là trung điểm $B'C'$, K là giao điểm $A'I, B'D'$. Hãy biểu diễn vecto $\\overrightarrow{AI}$ theo các vecto $\\vec{a}, \\vec{b}, \\vec{c}$?",
    "options": [
      "$\\overrightarrow{AI} = \\frac{1}{2}\\vec{a} + \\frac{1}{2}\\vec{b} + \\vec{c}$",
      "$\\overrightarrow{AI} = -\\frac{1}{2}\\vec{a} + \\frac{3}{2}\\vec{b} + \\vec{c}$",
      "$\\overrightarrow{AI} = \\frac{3}{2}\\vec{a} + \\frac{1}{2}\\vec{b} - \\vec{c}$",
      "$\\overrightarrow{AI} = \\frac{1}{2}\\vec{a} - \\frac{1}{2}\\vec{b} - \\vec{c}$"
    ],
    "correctAnswer": 0,
    "explanation": "Chi tiết giải...",
    "image": null
  },
  {
    "id": "q41",
    "type": "mcq",
    "question": "Cho tứ diện $ABCD$. Gọi $M$, $N$, $P$, $Q$ là các điểm thỏa mãn: $\\overrightarrow{MA} = -2\\overrightarrow{MB}$, $\\overrightarrow{NB} = -2\\overrightarrow{NC}$, $\\overrightarrow{PC} = -2\\overrightarrow{PD}$, $\\overrightarrow{QD} = -2\\overrightarrow{QA}$. Hãy phân tích vecto $\\overrightarrow{MP}$ theo ba vecto $\\overrightarrow{AB}, \\overrightarrow{AC}, \\overrightarrow{AD}$?",
    "options": [
      "$\\overrightarrow{MP} = \\frac{1}{3}\\overrightarrow{AB} + \\frac{1}{3}\\overrightarrow{AC} + \\frac{1}{3}\\overrightarrow{AD}$",
      "$\\overrightarrow{MP} = \\frac{2}{3}\\overrightarrow{AB} + \\frac{1}{3}\\overrightarrow{AC} - \\frac{2}{3}\\overrightarrow{AD}$",
      "$\\overrightarrow{MP} = \\frac{2}{3}\\overrightarrow{AB} - \\frac{1}{3}\\overrightarrow{AC} + \\frac{2}{3}\\overrightarrow{AD}$",
      "$\\overrightarrow{MP} = \\frac{-2}{3}\\overrightarrow{AB} + \\frac{1}{3}\\overrightarrow{AC} + \\frac{2}{3}\\overrightarrow{AD}$"
    ],
    "correctAnswer": 3,
    "explanation": "Chi tiết giải sẽ được cập nhật sau.",
    "image": null
  },
  {
    "id": "q42",
    "type": "mcq",
    "question": "Có 50 phiếu thi Toán 12, mỗi phiếu chỉ có 1 câu hỏi, trong đó có 15 câu lý thuyết gồm 8 câu khó, 7 câu dễ và 35 câu hỏi bài tập gồm 20 câu dễ và 15 câu khó. Lấy ngẫu nhiên 1 phiếu. Tìm xác suất rút được câu lý thuyết khó",
    "options": [
      "$P = \\frac{4}{25}$",
      "$P = \\frac{8}{15}$",
      "$P = \\frac{8}{25}$",
      "$P = \\frac{3}{25}$"
    ],
    "correctAnswer": 1,
    "explanation": "Chi tiết giải sẽ được cập nhật sau.",
    "image": null
  },
  {
    "id": "q43",
    "type": "mcq",
    "question": "Cối xay gió Đôn Kihote (từ tác phẩm của nhà văn Cervantes) có phần trên là cối xay gió có dạng hình nón, chiều cao của hình nón là $40\\text{ cm}$ và thể tích của nó là $18000\\text{cm}^3$. Tính bán kính của đáy hình tròn. Làm tròn đến kết quả chữ số thập phân thứ hai. Biết rằng công thức tính thể tích hình nón là $V = \\frac{1}{3}\\pi R^2h$, trong đó $R$ là bán kính đường tròn đáy, $h$ là đường nối từ đỉnh nón đến tâm đường tròn đáy.",
    "options": [
      "$R = 22,32\\text{cm}$",
      "$R = 19,72\\text{cm}$",
      "$R = 20,72\\text{cm}$",
      "$R = 18,75\\text{cm}$"
    ],
    "correctAnswer": 2,
    "explanation": "Chi tiết giải sẽ được cập nhật sau.",
    "image": null
  },
  {
    "id": "q44",
    "type": "mcq",
    "question": "Cho hàm số $y = f(x)$ xác định và liên tục trên $\\mathbb{R}$ và có bảng biến thiên như hình vẽ:\n\nHàm số $y = f(2x + 1)$ đồng biến trên khoảng nào dưới đây?",
    "options": [
      "$(-1; 1)$",
      "$(-2; 0)$",
      "$(-3; -2)$",
      "$\\left( \\frac{1}{2}; 4 \\right)$"
    ],
    "correctAnswer": 2,
    "explanation": "Chi tiết giải sẽ được cập nhật sau.",
    "image": "cau_44.png"
  },
  {
    "id": "q45",
    "type": "mcq",
    "question": "Số đường tiệm cận của đồ thị hàm số $y = \\frac{1 + \\sqrt{x + 4}}{x^2 + 5x}$ là:",
    "options": [
      "$1$",
      "$2$",
      "$4$",
      "$3$"
    ],
    "correctAnswer": 1,
    "explanation": "Chi tiết giải sẽ được cập nhật sau.",
    "image": null
  },
  {
    "id": "q46",
    "type": "mcq",
    "question": "Trong không gian với hệ tọa độ $Oxyz$, gọi $(S)$ là mặt cầu đi qua hai điểm $A(-1; -2; 4)$, $B(2; 1; 2)$ và có tâm thuộc trục $Oz$. Bán kính của mặt cầu $(S)$ là?",
    "options": [
      "$\\sqrt{6}$",
      "$\\sqrt{5}$",
      "$6$",
      "$5$"
    ],
    "correctAnswer": 0,
    "explanation": "Chi tiết giải sẽ được cập nhật sau.",
    "image": null
  },
  {
    "id": "q47",
    "type": "mcq",
    "question": "Cho hàm số $y = f(x)$ có bảng biến thiên như hình vẽ bên dưới.\n\nSố nghiệm thực phân biệt của phương trình $f[f(x) + 1] + 2 = 0$ là:",
    "options": [
      "$5$",
      "$4$",
      "$3$",
      "$7$"
    ],
    "correctAnswer": 1,
    "explanation": "Chi tiết giải sẽ được cập nhật sau.",
    "image": "cau_47.png"
  },
  {
    "id": "q48",
    "type": "fill",
    "question": "Cho hàm số $y = x^3 - 3x$ có đồ thị $(C)$. Gọi $S$ là tập hợp tất cả các giá trị thực của $k$ để đường thẳng $d: y = k(x + 1) + 2$ cắt đồ thị hàm số $(C)$ tại ba điểm phân biệt $M$, $N$, $P$ sao cho các tiếp tuyến của $(C)$ tại $N$ và $P$ vuông góc với nhau. Biết điểm $M(-1; 2)$, tính tích tất cả các phần tử của tập $S$?",
    "correctAnswer": "1/9",
    "explanation": "Chi tiết giải sẽ được cập nhật sau.",
    "image": null
  },
  {
    "id": "q49",
    "type": "fill",
    "question": "Có tất cả bao nhiêu giá trị nguyên của $m$ để hàm số $y = x^8 + (m - 2)x^5 - (m^2 - 4)x^4 + 1$ đạt cực tiểu tại $x = 0$.",
    "correctAnswer": "4",
    "explanation": "Chi tiết giải sẽ được cập nhật sau.",
    "image": null
  },
  {
    "id": "q50",
    "type": "fill",
    "question": "Một con châu chấu nhảy từ gốc tọa độ $O(0; 0)$ đến điểm $A(9; 0)$ dọc theo trục $Ox$ của hệ trục tọa độ $Oxy$. Con châu chấu có bao nhiêu cách nhảy để đến điểm $A$ biết mỗi lần nó có thể nhảy 1 bước hoặc 2 bước (1 bước có độ dài 1 đơn vị).",
    "correctAnswer": "55",
    "explanation": "Chi tiết giải sẽ được cập nhật sau.",
    "image": null
  }
];

`

