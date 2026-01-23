import React, { useState, useEffect } from "react";
import { AuthContext } from "@/features/auth/Context/AuthContext";
import {
  loginUser,
  fetchUserProfile,
  registerUser,
} from "@/features/auth/api/auth.api";
import { tokenStorage } from "@/lib/authToken";

export const Providers = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Kiểm tra trạng thái đăng nhập khi khởi chạy ứng dụng
  useEffect(() => {
    const initAuth = async () => {
      const token = tokenStorage.getAccessToken();
      if (token) {
        try {
          // Nếu có token, lấy profile để gán vào user
          const userProfile = await fetchUserProfile(token);
          setUser(userProfile);
        } catch (error) {
          console.error("Auto login failed:", error);
          tokenStorage.clearTokens(); // Token lởm thì xóa luôn
        }
      }
      setIsLoading(false);
    };
    initAuth();
  }, []);

  // Hàm Login sử dụng logic từ API và TokenStorage
  const login = async (username, password) => {
    const data = await loginUser({ username, password });
    if (data?.access_token) {
      tokenStorage.setTokens(data.access_token, data.refresh_token);
      const userProfile = await fetchUserProfile(data.access_token);
      setUser(userProfile);
      return data; // Trả về để trang LoginPage tự chuyển hướng (navigate)
    }
  };

  const register = async (userData) => {
    return await registerUser(userData);
  };

  const logout = () => {
    tokenStorage.clearTokens();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
