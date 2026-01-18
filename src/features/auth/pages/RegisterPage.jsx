import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; //

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    role: "user",
    password: "",
    confirmPassword: "",
  });
  // Hàm này trả về số lượng ô vuông cần tô màu
  const getStrengthConfig = (password) => {
    if (!password) return { color: "bg-gray-300", text: "" };
    if (password.length < 6)
      return { color: "bg-red-500", text: "Weak Password" };
    if (password.length < 10)
      return { color: "bg-yellow-500", text: "Medium Password" };
    return { color: "bg-green-500", text: "Strong Password" };
  };

  const strengthConfig = getStrengthConfig(formData.password);

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

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match. Please check again."); // Thông báo lỗi
      return;
    }
    setIsSubmitting(true);
    try {
      // Gọi hàm register đã định nghĩa trong Providers
      await register(formData);

      // Đăng ký xong thường sẽ chuyển về trang Login để người dùng đăng nhập lại
      alert("Sign Up Successfully! Please Login");
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.detail || "Failed to SignUp. Please try again!",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen  flex flex-col justify-center py-12 sm:px-6 lg:px-8  bg-indigo-700">
      <div className="w-full max-w-md m-auto bg-indigo-100 rounded-2xl p-5 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <header>
            <h2 class="mt-6 text-center text-3xl font-extrabold text-grey-100 mb-2">
              Create an Account
            </h2>
            <img
              className="w-20 mx-auto mb-3"
              src="https://img.icons8.com/fluent/344/shopping-bag.png"
              alt="shopping-bag"
            />
          </header>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit} autoComplete="off">
          <p className="text-center">
            <Link
              to="/login"
              className="inline-block p-1 mb-3 text-indigo-700 font-medium hover:text-indigo-500 outline-none transition duration-200"
            >
              Already have an account?
            </Link>
          </p>
          <div>
            <label className="block mb-1 text-indigo-500" htmlFor="email">
              Email
            </label>
            <input
              className="w-full p-1 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Enter your email here"
              onChange={handleChange}
              required
            ></input>
          </div>
          <div className="flex  mb-1 text-indigo-500 gap-3">
            <input
              className="w-full p-1 mb-1 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              type="text"
              name="first_name"
              placeholder="First Name"
              autoComplete="given-name"
              onChange={handleChange}
              required
            />
            <input
              className="w-full p-1 mb-1 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              type="text"
              name="last_name"
              placeholder="Last Name"
              autoComplete="family-name"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label
              className="block mb-1 text-indigo-500"
              htmlFor="phone_number"
            >
              Phone Number
            </label>
            <input
              className="w-full p-1 mb-2 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              type="text"
              name="phone_number"
              autoComplete="tel"
              onChange={handleChange}
              required
            ></input>
          </div>
          <div>
            <label className="block mb-1 text-indigo-500" htmlFor="username">
              Username
            </label>
            <input
              className="w-full p-1 mb-2 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              type="text"
              name="username"
              placeholder="Choose a username"
              autoComplete="username"
              onChange={handleChange}
              required
            ></input>
          </div>
          <div>
            <label className="block mb-1 text-indigo-500" htmlFor="password">
              Password
            </label>
            <input
              className="w-full p-1 mb-2 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              type="password"
              name="password"
              placeholder="Create a strong password"
              autoComplete="new-password"
              onChange={handleChange}
              required
            ></input>
            {formData.password && (
              <div className="flex items-center gap-2 mt-1 mb-4">
                {/* Ô vuông nhỏ duy nhất */}
                <div
                  className={`w-3 h-3 rounded-sm transition-colors duration-300 ${strengthConfig.color}`}
                ></div>

                {/* Dòng chữ thông báo */}
                <span
                  className={`text-xs font-medium ${strengthConfig.color.replace(
                    "bg-",
                    "text-",
                  )}`}
                >
                  {strengthConfig.text}
                </span>
              </div>
            )}
          </div>
          <div>
            <label
              className="block mb-1 text-indigo-500"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              className="w-full p-1 mb-2 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              type="password"
              name="confirmPassword"
              autoComplete="new-password"
              onChange={handleChange}
              required
            ></input>
            <p className="text-[12px] text-indigo-400 mt-1">
              ⚠️ You will use this username and password to log in later. ⚠️
            </p>
          </div>

          <div className="flex justify-center w-full mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-2/3 bg-indigo-700 hover:text-indigo-500 text-white font-extrabold py-3 px-6 rounded-xl shadow-lg transform transition hover:scale-105 active:scale-95 duration-200 disabled:opacity-50"
            >
              {isSubmitting ? "Processing..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
