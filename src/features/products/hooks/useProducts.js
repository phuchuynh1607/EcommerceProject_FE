import { useState, useEffect } from "react";
import { getProducts } from "../api/product.api";

export const useProducts = (filters) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { search, category } = filters;

  useEffect(() => {
    let isMounted = true;

    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProducts({ search, category });

        if (isMounted) {
          setProducts(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.response?.data?.detail || "Không thể tải sản phẩm");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchAll();

    return () => {
      isMounted = false;
    };
  }, [search, category]);

  return { products, loading, error };
};
