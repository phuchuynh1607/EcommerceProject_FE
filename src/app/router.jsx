import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import App from "@/App";

// Bạn có thể tạo một trang Home tạm thời hoặc dùng App làm trang chủ
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Trang chủ của bạn
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />, // Nếu gõ sai đường dẫn thì về trang chủ
  },
]);

export default router;
