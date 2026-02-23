import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import InputField from "@/components/ui/InputField";
import { registerSchema } from "@/lib/RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
const RegisterPage = () => {
  const { register: registerAuth } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "user",
      email: "",
    },
  });
  const passwordValue = watch("password", "");
  const getStrengthConfig = (password) => {
    if (!password) return { color: "bg-gray-300", text: "" };
    if (password.length < 6)
      return { color: "bg-red-500", text: "Weak Password" };
    if (password.length < 10)
      return { color: "bg-yellow-500", text: "Medium Password" };
    return { color: "bg-green-500", text: "Strong Password" };
  };

  const strengthConfig = getStrengthConfig(passwordValue);

  const onSubmit = async (data) => {
    setError(null);
    try {
      await registerAuth(data);
      alert("Sign Up Successfully! Please Login");
      navigate("/login");
    } catch (err) {
      const rawError = err.response?.data?.detail;
      if (Array.isArray(rawError)) {
        setError(rawError[0].msg);
      } else if (typeof rawError === "string") {
        setError(rawError);
      } else {
        setError("Something went wrong. Please try again later!");
      }
    }
  };

  return (
    <div className="min-h-screen  flex flex-col justify-center py-12 sm:px-6 lg:px-8  bg-indigo-700">
      <div className="w-full max-w-md m-auto bg-indigo-100 rounded-2xl p-5 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <header>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-grey-100 mb-2">
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

        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
            <InputField
              type="email"
              autoComplete="email"
              placeholder="Enter your email here"
              {...register("email")}
              error={errors.email?.message}
              required
            ></InputField>
          </div>
          <div className="flex  mb-1 text-indigo-500 gap-3">
            <InputField
              autoComplete="given-name"
              placeholder="First Name"
              {...register("first_name")}
              error={errors.first_name?.message}
              required
            />
            <InputField
              {...register("last_name")}
              placeholder="Last Name"
              error={errors.last_name?.message}
              autoComplete="family-name"
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
            <InputField
              {...register("phone_number")}
              error={errors.phone_number?.message}
              autoComplete="tel"
              required
            ></InputField>
          </div>
          <div>
            <label className="block mb-1 text-indigo-500" htmlFor="username">
              Username
            </label>
            <InputField
              {...register("username")}
              placeholder="Choose a username"
              error={errors.username?.message}
              autoComplete="username"
              required
            ></InputField>
          </div>
          <div>
            <label className="block mb-1 text-indigo-500" htmlFor="password">
              Password
            </label>
            <InputField
              {...register("password")}
              type="password"
              placeholder="Create a password"
              error={errors.password?.message}
              autoComplete="new-password"
              required
            ></InputField>
            {passwordValue && (
              <div className="flex items-center gap-2 mt-1 mb-4">
                <div
                  className={`w-3 h-3 rounded-sm transition-colors duration-300 ${strengthConfig.color}`}
                ></div>
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
            <InputField
              {...register("confirmPassword")}
              type="password"
              error={errors.confirmPassword?.message}
              autoComplete="new-password"
              required
            ></InputField>
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
