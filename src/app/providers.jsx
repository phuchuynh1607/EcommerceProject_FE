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

  useEffect(() => {
    const initAuth = async () => {
      const token = tokenStorage.getAccessToken();
      if (token) {
        try {
          const userProfile = await fetchUserProfile();
          setUser(userProfile);
        } catch (error) {
          console.error("Auto login failed:", error);
          if (error.response?.status === 401) {
            tokenStorage.clearTokens();
          }
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
  const refreshUser = async () => {
    try {
      const userProfile = await fetchUserProfile(); // Gọi API lấy thông tin mới nhất
      setUser(userProfile); // Cập nhật lại state toàn cục
    } catch (error) {
      console.error("Refresh user failed", error);
    }
  };
  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, isLoading, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
