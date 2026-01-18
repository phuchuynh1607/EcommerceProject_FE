import React from "react";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

const ProductListPage = () => {
  // Lấy dữ liệu thật từ Hook kết nối với FastAPI
  const { products, loading, error } = useProducts();

  // Hiển thị trạng thái đang tải
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 font-medium">
          Đang tải danh sách sản phẩm...
        </p>
      </div>
    );
  }

  // Hiển thị nếu có lỗi (ví dụ: mất kết nối server hoặc lỗi CORS)
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white shadow-md rounded-lg">
          <p className="text-red-500 font-bold mb-4">Lỗi: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="mb-6 relative flex items-center min-h-[40px] border-b border-gray-300 pb-4">
          <h2 className="absolute left-1/2 -translate-x-1/2 text-xl font-bold text-gray-800 uppercase tracking-tight whitespace-nowrap">
            Gợi ý dành cho bạn
          </h2>
          <span className="ml-auto text-sm text-gray-500 z-10">
            {products.length} Sản phẩm
          </span>
        </div>

        {/* Kiểm tra nếu không có sản phẩm nào trong DB */}
        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500">
              Hiện chưa có sản phẩm nào được đăng bán.
            </p>
          </div>
        ) : (
          /* Lưới sản phẩm - Tự động thay đổi số cột theo màn hình */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {products.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
