import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Providers } from "./app/providers"; // File bạn đã tạo
import router from "./app/router"; // File router vừa tạo bên trên
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Providers bao bọc toàn bộ để cung cấp Context cho mọi trang */}
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </React.StrictMode>
);
