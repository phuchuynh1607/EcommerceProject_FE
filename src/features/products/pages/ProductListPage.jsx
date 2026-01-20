import React from "react";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";
import { useNavigate } from "react-router-dom";

const ProductListPage = () => {
  // Lấy dữ liệu thật từ Hook kết nối với FastAPI
  const { products, loading, error } = useProducts();
  const navigate = useNavigate();
  const handleLoginRedirect = () => {
    navigate("/login");
  };

  // Hiển thị trạng thái đang tải
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 font-medium">Loading...</p>
      </div>
    );
  }

  // Hiển thị nếu có lỗi (ví dụ: mất kết nối server hoặc lỗi CORS)
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white shadow-md rounded-lg">
          <p className="text-red-500 font-bold mb-4">Error: {error}</p>
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
        <div className="mb-4 bg-indigo-700 shadow-sm border-b-2 border-indigo-500 rounded-lg">
          <div className="flex justify-center items-center py-4">
            <h2 className="text-xl font-bold text-white uppercase tracking-widest">
              Recommended for you
            </h2>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500">
              Oops! Our shelves are empty for now. Please check back later!
            </p>
          </div>
        ) : (
          /* Lưới sản phẩm - Tự động thay đổi số cột theo màn hình */
          <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {products.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        )}

        <div className="mt-12 flex justify-center">
          <button
            onClick={handleLoginRedirect}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-bold shadow-lg transition-all transform hover:scale-105"
          >
            Login to see more
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
