import { useState, useEffect, useCallback } from "react";
import { getCart } from "@/features/cart/api/cart.api"; // Dùng đúng tên hàm của bạn
import { useAuth } from "@/features/auth/hooks/useAuth";
import { CartContext } from "@/features/cart/Context/cartContext";
import { addToCartApi } from "@/features/cart/api/cart.api";

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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
