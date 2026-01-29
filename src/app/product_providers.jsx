import React, { useState, useCallback, useEffect } from "react";
import {
  getProducts,
  getProductById,
} from "@/features/products/api/product.api";
import { ProductContext } from "@/features/products/Context/ProductContext";
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productMap, setProductMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ search: "", category: "" });

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts(filters);
      setProducts(data);

      setProductMap((prev) => {
        const newMap = { ...prev };
        data.forEach((p) => {
          newMap[p.id] = p;
        });
        return newMap;
      });
    } catch (err) {
      setError(err.message || "Không thể tải danh sách sản phẩm");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const fetchProductById = useCallback(async (id) => {
    setLoading(true);
    try {
      const data = await getProductById(id);

      // Cập nhật sản phẩm đơn lẻ vào Map
      setProductMap((prev) => ({
        ...prev,
        [id]: data,
      }));

      return data;
    } catch (err) {
      const msg =
        err.response?.data?.detail || "Không thể lấy chi tiết sản phẩm";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <ProductContext.Provider
      value={{
        products, // Dùng cho trang danh sách
        productMap, // Dùng cho trang chi tiết & giỏ hàng
        loading,
        error,
        filters,
        setFilters,
        refreshProducts: fetchProducts,
        fetchProductById,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
