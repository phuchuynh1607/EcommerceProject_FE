import axios from "axios";
import { tokenStorage } from "../lib/authToken";
import { refreshAccessToken } from "@/services/auth/auth.service";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
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
   RESPONSE INTERCEPTOR 
====================== */
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    const refreshToken = tokenStorage.getRefreshToken();
    const accessToken = tokenStorage.getAccessToken();

    if (!refreshToken || (accessToken && !isAccessTokenExpired(accessToken))) {
      tokenStorage.clearTokens();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      console.log(" Refreshing API...");

      const res = await refreshAccessToken(refreshToken);

      const { access_token, refresh_token: new_refresh_token } = res.data;

      tokenStorage.setTokens(access_token, new_refresh_token || refreshToken);

      originalRequest.headers.Authorization = `Bearer ${access_token}`;
      return instance(originalRequest);
    } catch (refreshError) {
      console.error("Refresh token failed:", refreshError);
      tokenStorage.clearTokens();

      if (typeof window !== "undefined") window.location.href = "/login";
      return Promise.reject(refreshError);
    }
  },
);
export default instance;
