import axiosClient from "@/lib/axios";
import axios from "axios";

export const registerUser = async (userData) => {
  try {
    const response = await axiosClient.post("/auth/", userData);
    return response.data;
  } catch (error) {
    console.error("Registration error:", error.response?.data || error.message);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const params = new URLSearchParams();

    params.append("username", credentials.username);
    params.append("password", credentials.password);

    const response = await axiosClient.post("/auth/token", params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

export const refreshAccessToken = async (refreshToken) => {
  return axios.post("http://127.0.0.1:8000/auth/refresh", null, {
    params: { refresh_token: refreshToken },
  });
};
export const fetchUserProfile = async () => {
  try {
    // AxiosClient sẽ tự gắn Bearer Token từ interceptor
    const response = await axiosClient.get("/users/");
    return response.data;
  } catch (error) {
    console.error(
      "Fetch user profile error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
