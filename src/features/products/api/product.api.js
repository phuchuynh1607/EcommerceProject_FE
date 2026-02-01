import axios from "@/lib/axios";

// Lấy danh sách tất cả sản phẩm
export const getProducts = async (filters = {}) => {
  const params = new URLSearchParams();

  if (filters.search) params.append("search", filters.search);
  if (filters.category) params.append("category", filters.category);

  const response = await axios.get(`/products/?${params.toString()}`);
  return response.data;
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
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Rating Failed!", error.response?.data || error.message);
    throw error;
  }
};
