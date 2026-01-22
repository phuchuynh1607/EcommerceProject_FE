import { useState, useEffect } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getCart, addToCartApi } from "../api/cart.api";

export const useCart = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const uniqueItemCount = cartItems.length;

  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        try {
          const data = await getCart();
          setCartItems(data);
        } catch (error) {
          console.error("Failed to fetch cart", error);
        }
      } else {
        setCartItems([]);
      }
    };
    fetchCart();
  }, [user]);

  const addToCart = async (productId, quantity) => {
    if (!user) return;

    setLoading(true);
    try {
      const cartRequest = {
        product_id: productId,
        quantity: quantity,
      };

      await addToCartApi(cartRequest);

      const updatedCart = await getCart();
      setCartItems(updatedCart);

      setIsModalOpen(true);

      setTimeout(() => setIsModalOpen(false), 2000);
    } catch (error) {
      const errorMsg = error.response?.data?.detail || "Could not add to cart";
      alert(errorMsg);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return {
    uniqueItemCount,
    cartItems,
    addToCart,
    loading,
    totalItems,
    isModalOpen,
    setIsModalOpen,
  };
};
