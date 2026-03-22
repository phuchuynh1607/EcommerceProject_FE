import { useState, useEffect, useCallback } from "react";
import { getCart } from "@/services/cart/cart.service";
import { useAuth } from "@/context/AuthContext";
import { CartContext } from "@/context/cartContext";
import {
  addToCartApi,
  updateCartQuantity as updateCartApi,
  deleteCartItem as deleteCartApi,
} from "@/services/cart/cart.service";

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const refreshCart = useCallback(async () => {
    if (user) {
      setLoading(true);
      try {
        const data = await getCart();
        setCartItems(data);
      } catch (error) {
        console.error("Failed to fetch cart", error);
      } finally {
        setLoading(false);
      }
    }
  }, [user]);

  useEffect(() => {
    let isMounted = true;

    const updateCart = async () => {
      if (user) {
        await refreshCart();
      } else if (isMounted) {
        setCartItems([]);
      }
    };

    updateCart();

    return () => {
      isMounted = false;
    };
  }, [user, refreshCart]);
  const addToCart = async (productId, quantity) => {
    if (!user) return;
    setLoading(true);
    try {
      await addToCartApi({ product_id: productId, quantity });
      await refreshCart();

      setIsModalOpen(true);
    } catch (error) {
      alert("Error while trying to add item to cart!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const updateCartQuantity = async (cartId, newQuantity) => {
    if (newQuantity < 1) return;

    const previousItems = [...cartItems];
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === cartId ? { ...item, quantity: newQuantity } : item,
      ),
    );
    try {
      await updateCartApi(cartId, newQuantity);
    } catch (error) {
      console.error("Update failed:", error);
      setCartItems(previousItems);
      alert("Can't update your cart. Please try again!");
    }
  };

  const deleteCartItem = async (cartId) => {
    try {
      await deleteCartApi(cartId);
      setCartItems((prev) => prev.filter((item) => item.id !== cartId));
    } catch (error) {
      alert("Delete failed!");
      console.log(error);
      refreshCart();
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        uniqueItemCount: cartItems.length,
        refreshCart,
        loading,
        setLoading,
        addToCart,
        isModalOpen,
        setIsModalOpen,
        updateCartQuantity,
        deleteCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
