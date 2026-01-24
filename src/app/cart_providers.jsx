import { useState, useEffect, useCallback } from "react";
import { getCart } from "@/features/cart/api/cart.api"; // Dùng đúng tên hàm của bạn
import { useAuth } from "@/features/auth/hooks/useAuth";
import { CartContext } from "@/features/cart/Context/cartContext";
import {
  addToCartApi,
  updateCartQuantity as updateCartApi,
  deleteCartItem as deleteCartApi,
} from "@/features/cart/api/cart.api";

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Hàm này sẽ được gọi mỗi khi cần làm mới số lượng Badge
  const refreshCart = useCallback(async () => {
    if (user) {
      setLoading(true); // Bắt đầu load
      try {
        const data = await getCart();
        setCartItems(data);
      } catch (error) {
        console.error("Failed to fetch cart", error);
      } finally {
        setLoading(false); // Kết thúc load
      }
    }
  }, [user]);

  useEffect(() => {
    let isMounted = true;

    const updateCart = async () => {
      if (user) {
        await refreshCart();
      } else if (isMounted) {
        // Thay vì setCartItems([]), chúng ta bọc nó lại
        // để đảm bảo nó không chạy đồng bộ ngay lập tức
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
    setLoading(true); // 1. Báo cho cả App biết là đang xử lý
    try {
      // 2. Gọi API "vận chuyển" dữ liệu
      await addToCartApi({ product_id: productId, quantity });

      // 3. Sau khi server ok, bảo Provider đi lấy dữ liệu mới về (để Badge cập nhật)
      await refreshCart();

      // 4. Mở Modal thông báo cho người dùng
      setIsModalOpen(true);
    } catch (error) {
      alert("Lỗi thêm vào giỏ hàng!");
      console.log(error);
    } finally {
      setLoading(false); // 5. Kết thúc xử lý
    }
  };
  const updateCartQuantity = async (cartId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await updateCartApi(cartId, { quantity: newQuantity });
      // Cập nhật state cục bộ để UI mượt mà (Optimistic Update)
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === cartId ? { ...item, quantity: newQuantity } : item,
        ),
      );
    } catch (error) {
      console.error("Update failed:", error);
      refreshCart(); // Nếu lỗi thì lấy lại dữ liệu chuẩn từ server
    }
  };

  // 4. MỚI: Hàm xóa sản phẩm khỏi giỏ
  const deleteCartItem = async (cartId) => {
    try {
      await deleteCartApi(cartId);
      // Xóa ngay lập tức khỏi state để UI biến mất luôn
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
        uniqueItemCount: cartItems.length, // Tính số lượng hiển thị Badge
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
