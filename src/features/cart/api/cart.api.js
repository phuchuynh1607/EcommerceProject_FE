import axios from "@/lib/axios";

// Lấy toàn bộ giỏ hàng của người dùng hiện tại
export const getCart = async () => {
  try {
    const response = await axios.get("/carts/");
    return response.data;
  } catch (error) {
    console.error("Get Cart Failed!", error.response?.data || error.message);
    throw error;
  }
};

// Thêm sản phẩm vào giỏ hàng
// cartRequest gồm { product_id: int, quantity: int }
export const addToCartApi = async (cartRequest) => {
  try {
    const response = await axios.post("/carts/cart", cartRequest);
    return response.data;
  } catch (error) {
    console.error("Add to Cart Failed!", error.response?.data || error.message);
    throw error;
  }
};

// Cập nhật số lượng sản phẩm trong giỏ
export const updateCartQuantity = async (cart_id, quantity) => {
  try {
    const response = await axios.put(`/carts/quantity/${cart_id}`, {
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Update Quantity Failed!",
      error.response?.data || error.message,
    );
    throw error;
  }
};

// Xóa sản phẩm khỏi giỏ hàng
export const deleteCartItem = async (cartId) => {
  try {
    await axios.delete(`/carts/delete/${cartId}`);
  } catch (error) {
    console.error("Delete Item Failed!", error.response?.data || error.message);
    throw error;
  }
};
