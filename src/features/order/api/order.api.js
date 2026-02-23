import axios from "@/lib/axios";
/**
 * Lấy lịch sử đơn hàng của người dùng hiện tại
 * @returns {Promise<Array>}
 */
export const fetchOrderHistory = async () => {
  const response = await axios.get("/orders/");
  return response.data;
};

/**
 * Thanh toán TOÀN BỘ giỏ hàng
 * @returns {Promise<Object>}
 */
export const checkoutAllApi = async () => {
  const response = await axios.post("/orders/checkout", {});
  return response.data;
};

/**
 * Hủy đơn hàng (Chỉ áp dụng khi trạng thái là 'pending')
 * @param {number} orderId
 * @returns {Promise<Object>}
 */
export const cancelOrderApi = async (orderId) => {
  const response = await axios.put(`/orders/${orderId}/cancel`);
  return response.data;
};
