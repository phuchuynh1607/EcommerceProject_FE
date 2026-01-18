import { useState, useEffect } from "react";
import { getProductById } from "../api/product.api";

export const useProductDetail = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Nếu không có id (ví dụ đang chuyển trang) thì không thực hiện
    if (!id) return;

    const fetchDetail = async () => {
      try {
        setLoading(true);
        // Gọi API thật từ FastAPI
        const data = await getProductById(id);
        setProduct(data);
        setError(null);
      } catch (err) {
        // Xử lý lỗi từ Backend (ví dụ: 404 Not Found)
        const message =
          err.response?.data?.detail || "Không thể lấy thông tin sản phẩm";
        setError(message);
        console.error("Product Detail Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]); // Chạy lại mỗi khi ID trên URL thay đổi

  return { product, loading, error };
};
