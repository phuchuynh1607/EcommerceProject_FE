import { useEffect } from "react";
import { useProducts } from "./useProducts";

export const useProductDetail = (id) => {
  const { productMap, fetchProductById, loading, error } = useProducts();

  const product = productMap[id] || null;

  useEffect(() => {
    if (id && !product) {
      fetchProductById(id).catch((err) =>
        console.error("Detail load failed", err),
      );
    }
  }, [id, product, fetchProductById]);

  return { product, loading, error };
};
