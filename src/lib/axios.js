import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8000", // Đảm bảo khớp với địa chỉ FastAPI đang chạy
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosClient;
