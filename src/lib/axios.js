// src/lib/axios.js
import axios from "axios";
import { tokenStorage } from "./authToken";
import { refreshAccessToken } from "@/features/auth/api/auth.api";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000",
});
/* ======================
   HELPERS
====================== */
function isAccessTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

/* ======================
   REQUEST INTERCEPTOR
====================== */
instance.interceptors.request.use(
  (config) => {
    const accessToken = tokenStorage.getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

/* ======================
   RESPONSE INTERCEPTOR (Chỉ giữ lại bản này)
====================== */
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 1. Kiểm tra nếu không phải lỗi 401 hoặc đã retry thì dừng
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    const refreshToken = tokenStorage.getRefreshToken();

    // 2. Không có refreshToken hoặc lỗi 401 nhưng token vẫn còn hạn (lỗi quyền hạn thật sự)
    const accessToken = tokenStorage.getAccessToken();
    if (!refreshToken || (accessToken && !isAccessTokenExpired(accessToken))) {
      tokenStorage.clearTokens();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      console.log(" Đang làm mới token qua API...");

      // Sử dụng hàm refreshAccessToken bạn đã khai báo trong auth.api
      // Lưu ý: Hàm này dùng axios thuần nên không bị lặp vô tận
      const res = await refreshAccessToken(refreshToken);

      const { access_token, refresh_token: new_refresh_token } = res.data;

      // 3. Lưu token mới (Cập nhật cả hai nếu Backend trả về mới)
      tokenStorage.setTokens(access_token, new_refresh_token || refreshToken);

      // 4. Gắn token mới và thực hiện lại request cũ
      originalRequest.headers.Authorization = `Bearer ${access_token}`;
      return instance(originalRequest);
    } catch (refreshError) {
      console.error("❌ Refresh token thất bại:", refreshError);
      tokenStorage.clearTokens();
      // Chỉ redirect nếu ở môi trường trình duyệt
      if (typeof window !== "undefined") window.location.href = "/login";
      return Promise.reject(refreshError);
    }
  },
);
export default instance;
