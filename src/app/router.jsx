import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "@/App";

// Auth Features
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";

// Products Features
import ProductListPage from "@/features/products/pages/ProductListPage";
import ProductDetailPage from "@/features/products/pages/ProductDetailPage";
//Cart Features
import ShoppingCart from "@/features/cart/pages/ShoppingCart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, // Đây là trang mặc định khi vào "/"
        element: <ProductListPage />,
      },
      {
        path: "product/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "/cart",
        element: <ShoppingCart />,
      },
    ],
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
    element: <Navigate to="/" replace />,
  },
]);

export default router;
