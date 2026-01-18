import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const [formData, setFormData] = useState(() => {
    const savedUser = localStorage.getItem("rememberedUser");
    const savedPassword = localStorage.getItem("rememberedUserPassword");
    return {
      username: savedUser || "",
      password: savedPassword || "",
    };
  });
  const [error, setError] = useState(null);

  const { login } = useAuth();
  const [rememberMe, setRememberMe] = useState(() => {
    return !!localStorage.getItem("rememberedUser");
  });
  const navigate = useNavigate();

  // Hàm xử lý khi người dùng tích/bỏ tích
  const handleRememberChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(formData.username, formData.password);
      if (rememberMe) {
        // Lưu tên đăng nhập để lần sau tự điền
        localStorage.setItem("rememberedUser", formData.username);
        localStorage.setItem("rememberedUserPassword", formData.password);
      } else {
        // Nếu không tích thì xóa đi cho bảo mật
        localStorage.removeItem("rememberedUser");
        localStorage.removeItem("rememberedUserPassword");
      }

      navigate("/");
    } catch (err) {
      setError(
        "Authentication failed. Please verify your account information.",
      );
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen  flex flex-col justify-center py-12 sm:px-6 lg:px-8  bg-indigo-700">
      <div className="w-full max-w-md m-auto bg-indigo-100 rounded-2xl p-5 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <header>
            <h2 class="mt-6 text-center text-3xl font-extrabold text-grey-100 mb-2">
              Sign In to your account
            </h2>
            <img
              className="w-20 mx-auto mb-5"
              src="https://img.icons8.com/fluent/344/shopping-bag.png"
              alt="shopping-bag"
            />
          </header>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit} autoComplete="off">
          <div>
            <label className="block mb-2 text-indigo-500" htmlFor="username">
              Username
            </label>
            <input
              className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-600 outline-none focus:bg-gray-300"
              type="text"
              name="username"
              value={formData.username}
              autoComplete="one-time-code"
              onChange={handleChange}
              required
            ></input>
          </div>
          <div>
            <label className="block mb-2 text-indigo-500" htmlFor="password">
              Password
            </label>
            <input
              className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-600 outline-none focus:bg-gray-300"
              type="password"
              name="password"
              value={formData.password}
              autoComplete="new-password"
              onChange={handleChange}
              required
            ></input>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={handleRememberChange}
                className="h-4 w-4 text-indigo-500 accent-indigo-700 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-indigo-500"
              >
                Remember me
              </label>
            </div>
            <a
              className="text-indigo-700 hover:text-indigo-500 text-sm "
              href="#"
            >
              Forgot your Password?
            </a>
          </div>
          <div className="flex justify-center w-full mt-6">
            <button
              type="submit"
              className="w-2/3 bg-indigo-700 hover:text-indigo-500 text-white font-extrabold py-3 px-6 rounded-xl shadow-lg transform transition hover:scale-105 active:scale-95 duration-200 disabled:opacity-50"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-6 mb-4">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-gray-100 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div>
              <a
                href="#"
                className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <img
                  className="h-5 w-5"
                  src="https://www.svgrepo.com/show/512120/facebook-176.svg"
                  alt=""
                />
              </a>
            </div>
            <div>
              <a
                href="#"
                class="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <img
                  class="h-5 w-5"
                  src="https://www.svgrepo.com/show/513008/twitter-154.svg"
                  alt=""
                />
              </a>
            </div>
            <div>
              <a
                href="#"
                class="w-full flex  items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-200"
              >
                <img
                  className="h-6 w-6 "
                  src="https://www.svgrepo.com/show/506498/google.svg"
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
        <footer className="pt-2 text-center justify-center ">
          <Link
            className="text-indigo-700 hover:text-indigo-500 text-sm "
            to="/register"
          >
            👉Create New Account👈
          </Link>

          <div className="pt-8 border-t border-indigo-200  gap-1 text-[10px] text-indigo-400">
            <span>Designed by Agency</span>. <span>Icon by</span>{" "}
            <a
              href="https://icons8.com"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-indigo-600"
            >
              Icons8
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LoginPage;
