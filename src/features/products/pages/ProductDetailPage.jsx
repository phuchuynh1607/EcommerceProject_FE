import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductDetail } from "../hooks/useProductDetail";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Star, ShoppingCart, CreditCard } from "lucide-react"; // Dùng icon cho chuyên nghiệp

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, error } = useProductDetail(id);
  const { user } = useAuth();

  const handleAddToCart = () => {
    if (!user) {
      alert("Vui lòng đăng nhập để thực hiện chức năng này!");
      navigate("/login", { state: { from: window.location.pathname } });
      return;
    }

    if (product?.stock <= 0) {
      alert("Sản phẩm hiện đang hết hàng!");
      return;
    }

    alert(`Đã thêm ${product.title} vào giỏ hàng thành công!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-500 font-bold text-xl mb-4">
          {error || "Không tìm thấy sản phẩm"}
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          Quay lại trang chủ
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col md:flex-row">
          {/* Cột trái: Hình ảnh - Cập nhật product.image_url */}
          <div className="w-full md:w-2/5 p-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden border border-gray-100">
              <img
                src={
                  product.image_url ||
                  "https://via.placeholder.com/500x500?text=No+Image"
                }
                alt={product.title}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Cột phải: Thông tin chi tiết */}
          <div className="w-full md:w-3/5 p-8 flex flex-col">
            <h1 className="text-2xl font-medium text-gray-900 mb-2">
              {product.title}
            </h1>

            {/* Rating thật từ FastAPI */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 border-r pr-4">
                <span className="text-orange-600 font-bold underline underline-offset-4">
                  {product.rating || 0}
                </span>
                <div className="flex text-orange-400">
                  {/* Hiển thị 5 sao, tô màu dựa trên rating */}
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={
                        i < Math.floor(product.rating || 0)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  ))}
                </div>
              </div>
              <div className="border-r pr-4 text-gray-500">
                <span className="text-gray-900 font-medium">
                  {product.review_count || 0}
                </span>{" "}
                Đánh giá
              </div>
              <div className="text-gray-500 italic">
                Còn lại:{" "}
                <span className="text-gray-900 font-medium">
                  {product.stock}
                </span>{" "}
                sản phẩm
              </div>
            </div>

            {/* Giá tiền */}
            <div className="bg-gray-50 p-5 rounded-md mb-6">
              <span className="text-3xl font-bold text-orange-600">
                ₫{product.price?.toLocaleString("vi-VN")}
              </span>
            </div>

            {/* Mô tả */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-400 uppercase mb-3 tracking-wider">
                Mô tả sản phẩm
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-line bg-gray-50 p-4 rounded-lg">
                {product.description || "Không có mô tả cho sản phẩm này."}
              </p>
            </div>

            {/* Nút thao tác */}
            <div className="mt-auto flex flex-wrap gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 min-w-[200px] flex items-center justify-center gap-2 bg-orange-50 text-orange-600 border border-orange-600 py-3 rounded-sm font-medium hover:bg-orange-100 transition"
              >
                <ShoppingCart size={20} />
                Thêm Vào Giỏ Hàng
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 min-w-[200px] flex items-center justify-center gap-2 bg-orange-600 text-white py-3 rounded-sm font-medium hover:bg-orange-700 transition shadow-md"
              >
                <CreditCard size={20} />
                Mua Ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
