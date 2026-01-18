import axios from "@/lib/axios";

// Lấy danh sách tất cả sản phẩm
export const getProducts = async () => {
  try {
    const response = await axios.get("/products/");
    return response.data;
  } catch (error) {
    console.error(
      "Get Products Failed!",
      error.response?.data || error.message,
    );
    throw error;
  }
};

// Lấy chi tiết một sản phẩm theo ID
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`/products/product/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Can't Find This Product!",
      error.response?.data || error.message,
    );
    throw error;
  }
};

/** * Gửi đánh giá sao cho sản phẩm
 * Yêu cầu: Đăng nhập + Đã mua hàng (completed)
 */
export const rateProduct = async (id, star, token) => {
  try {
    // Lưu ý: Backend dùng Body(..., ge=1, le=5) cho int,
    // nên ta gửi trực tiếp biến 'star' làm data
    const response = await axios.put(`/products/product/${id}/rating`, star, {
      headers: {
        Authorization: `Bearer ${token}`, // Truyền token để Backend check user_id
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Rating Failed!", error.response?.data || error.message);
    throw error; // Ném lỗi để Component hiển thị (ví dụ: lỗi 403 chưa mua hàng)
  }
};
