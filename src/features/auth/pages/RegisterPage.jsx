import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; //

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    phone_number: "",
    role: "user", // Giá trị mặc định theo Backend của bạn
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth(); // Lấy hàm register từ Providers
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Gọi hàm register đã định nghĩa trong Providers
      await register(formData);

      // Đăng ký xong thường sẽ chuyển về trang Login để người dùng đăng nhập lại
      alert("Sign Up Successfully! Please Login");
      navigate("/login");
    } catch (err) {
      // Hiển thị lỗi từ Backend (ví dụ: Username đã tồn tại)
      setError(
        err.response?.data?.detail || "Failed to SignUp. Please try again!"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : "Sign Up"}
        </button>
      </form>

      <p>
        <Link id="login-link" to="/login">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
