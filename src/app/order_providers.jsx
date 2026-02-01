import React, { useState, useCallback } from "react";
import { OrderContext } from "@/features/order/Context/orderContext";
import {
  fetchOrderHistory,
  checkoutAllApi,
  cancelOrderApi,
} from "@/features/order/api/order.api";

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Lấy lịch sử đơn hàng
  const getOrderHistory = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchOrderHistory();
      // Luôn đảm bảo orders là một mảng
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch orders failed", error);
      setOrders([]); // Nếu lỗi thì set về mảng rỗng thay vì để undefined
    } finally {
      setLoading(false);
    }
  }, []);

  // Xử lý đặt hàng (Checkout)
  const placeOrder = async () => {
    setLoading(true);
    try {
      const newOrder = await checkoutAllApi();
      // Sau khi đặt hàng thành công, cập nhật lại danh sách đơn hàng
      setOrders((prev) => [newOrder, ...prev]);
      return newOrder;
    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Hủy đơn hàng
  const cancelOrder = async (orderId) => {
    setLoading(true);
    try {
      await cancelOrderApi(orderId);
      // Cập nhật trạng thái 'cancelled' trực tiếp ở UI để tối ưu trải nghiệm
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: "cancelled" } : order,
        ),
      );
    } catch (error) {
      console.error("Lỗi khi hủy đơn hàng:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        refreshOrders: getOrderHistory,
        placeOrder,
        cancelOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
