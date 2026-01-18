import { useState, useEffect } from "react";
import { getProducts } from "../api/product.api";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const data = await getProducts(); // Gọi API thật
        setProducts(data);
      } catch (err) {
        console.error("Lỗi lấy sản phẩm:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  return { products, loading };
};
