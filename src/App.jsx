import { useAuth } from "@/features/auth/hooks/useAuth";
import { Link } from "react-router-dom";

function App() {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Chào mừng đến với Website của tôi</h1>

      {user ? (
        // Nếu đã đăng nhập
        <div>
          <p>
            Xin chào, <strong>{user.username || "Người dùng"}</strong>!
          </p>
          <p>Email của bạn: {user.email}</p>
          <button
            onClick={logout}
            style={{ background: "red", color: "white" }}
          >
            Đăng xuất
          </button>
        </div>
      ) : (
        // Nếu chưa đăng nhập
        <div>
          <p>Bạn chưa đăng nhập. Vui lòng chọn:</p>
          <nav>
            <Link to="/login">Đăng nhập</Link> |{" "}
            <Link to="/register">Đăng ký tài khoản</Link>
          </nav>
        </div>
      )}
    </div>
  );
}

export default App;
