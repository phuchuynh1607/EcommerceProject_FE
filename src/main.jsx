import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./app/router";
import "./index.css";
import { Providers } from "./app/providers";
import { CartProvider } from "./app/cart_providers";

import { ProductProvider } from "./app/product_providers";
import { UserProvider } from "./app/user_providers";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Providers>
      <UserProvider>
        <ProductProvider>
          <CartProvider>
            <RouterProvider router={router} />
          </CartProvider>
        </ProductProvider>
      </UserProvider>
    </Providers>
  </React.StrictMode>,
);
