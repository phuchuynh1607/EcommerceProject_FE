import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Providers } from "./app/providers"; // File bạn đã tạo
import { CartProvider } from "./app/cart_providers";
import router from "./app/router"; // File router vừa tạo bên trên
import "./index.css";
import { ProductProvider } from "./app/product_providers";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Providers>
      <ProductProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </ProductProvider>
    </Providers>
  </React.StrictMode>,
);
