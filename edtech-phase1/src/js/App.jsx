import { CrtBackground } from "@designcodeio/threeui";
import "./App.css";

function App() {
  return (
    <CrtBackground>
      {/* Vùng chứa toàn bộ nội dung web để không bị dính sát lề */}
      <div className="container">
        {/* Phần đầu trang (Header) */}
        <header className="header">
          <h1>WEB GIA SƯ</h1>
          <nav>
            <button>Đăng nhập</button>
            <button className="btn-primary">Đăng ký làm Gia Sư</button>
          </nav>
        </header>

        {/* Phần nội dung chính (Main Content) */}
        <main>
          {/* Khu vực tìm kiếm */}
          <section className="hero-section">
            <h2>Tìm Gia Sư Chất Lượng Cao</h2>
            <p>Kết nối học sinh và gia sư giỏi trên toàn quốc</p>
            <div className="search-box">
              <input
                type="text"
                placeholder="Nhập môn học (Toán, Lý, Tiếng Anh...)"
              />
              <button>Tìm Kiếm</button>
            </div>
          </section>

          {/* Danh sách gia sư mẫu */}
          <section className="tutor-list">
            <h3>Gia Sư Nổi Bật</h3>
            <div className="grid-cards">
              {/* Khung thông tin gia sư 1 */}
              <div className="card">
                <h4>Nguyễn Văn A</h4>
                <p>
                  <strong>Môn dạy:</strong> Toán, Vật Lý
                </p>
                <p>
                  <strong>Khu vực:</strong> Sinh viên - Hà Nội
                </p>
                <button>Xem chi tiết</button>
              </div>

              {/* Khung thông tin gia sư 2 */}
              <div className="card">
                <h4>Trần Thị B</h4>
                <p>
                  <strong>Môn dạy:</strong> Tiếng Anh (IELTS)
                </p>
                <p>
                  <strong>Khu vực:</strong> Giáo viên - Online
                </p>
                <button>Xem chi tiết</button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </CrtBackground>
  );
}

export default App;
