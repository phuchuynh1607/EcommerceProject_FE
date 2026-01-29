import { useContext } from "react";
import { ProductContext } from "../Context/ProductContext";

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProducts phải dùng trong ProductProvider");

  // Trả về dữ liệu từ Context, không tự khai báo useState nữa!
  return context;
};
