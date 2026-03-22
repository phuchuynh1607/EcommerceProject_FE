import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import InputField from "@/components/ui/InputField";
import { loginSchema } from "@/lib/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomButton from "@/components/ui/CustomButton";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: localStorage.getItem("rememberedUser") || "",
      password: localStorage.getItem("rememberedUserPassword") || "",
      rememberMe: !!localStorage.getItem("rememberedUser"),
    },
  });
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    setError(null);
    try {
      await login(data.username, data.password);

      // Xử lý Remember Me
      if (data.rememberMe) {
        localStorage.setItem("rememberedUser", data.username);
        localStorage.setItem("rememberedUserPassword", data.password);
      } else {
        localStorage.removeItem("rememberedUser");
        localStorage.removeItem("rememberedUserPassword");
      }

      alert(`Login successful! Welcome ${data.username}`);
      navigate("/");
    } catch (err) {
      const backendDetail = err.response?.data?.detail;
      setError(
        Array.isArray(backendDetail)
          ? backendDetail[0].msg
          : typeof backendDetail === "string"
            ? backendDetail
            : "Authentication failed",
      );
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

        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div>
            <label className="block mb-2 text-indigo-500" htmlFor="username">
              Username
            </label>
            <InputField
              {...register("username")}
              placeholder="Enter your username"
              error={errors.username?.message}
              autoComplete="one-time-code"
              required
            ></InputField>
          </div>
          <div>
            <label className="block mb-2 text-indigo-500" htmlFor="password">
              Password
            </label>
            <InputField
              type="password"
              {...register("password")}
              placeholder="Enter your password"
              error={errors.password?.message}
              autoComplete="new-password"
              required
            ></InputField>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                {...register("rememberMe")}
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
            <CustomButton
              type="submit"
              isLoading={isSubmitting}
              className="w-2/3"
              variant="login_register"
            >
              Login
            </CustomButton>
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
