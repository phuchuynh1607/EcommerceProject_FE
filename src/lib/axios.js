// src/lib/axios.js
import axios from "axios";
import { tokenStorage } from "./authToken";
import { refreshAccessToken } from "@/features/auth/api/auth.api";

const instance = axios.create({
  baseURL: "http://localhost:8000",
});

// Request Interceptor: Luôn đính kèm Access Token mới nhất
instance.interceptors.request.use((config) => {
  const token = tokenStorage.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Xử lý khi Token hết hạn
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = tokenStorage.getRefreshToken();

      if (refreshToken) {
        try {
          // 1. Gọi API lấy token mới
          const res = await refreshAccessToken(refreshToken);
          const { access_token, refresh_token } = res.data;

          // 2. Lưu token mới vào máy
          tokenStorage.setTokens(access_token, refresh_token);

          // 3. Thử lại request cũ với token mới
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return instance(originalRequest);
        } catch (refreshError) {
          console.log(refreshError);
          // Nếu refresh token cũng hết hạn, xóa sạch và về login
          tokenStorage.clearTokens();
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
