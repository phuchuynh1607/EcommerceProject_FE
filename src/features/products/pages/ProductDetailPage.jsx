import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductDetail } from "../hooks/useProductDetail";
import { Star, ShoppingCart } from "lucide-react";
import AddToCartModal from "../../cart/components/AddToCartModal";
import { useCart } from "../../cart/hooks/useCart";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading: productLoading, error } = useProductDetail(id);
  const [quantity, setQuantity] = useState(1);
  const {
    addToCart,
    isModalOpen,
    setIsModalOpen,
    loading: cartLoading,
  } = useCart();

  const handleAddToCart = async () => {
    addToCart(product.id, quantity);
  };
  const handleIncrement = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    } else {
      alert("Reached maximum stock available!");
    }
  };
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    } else {
      alert("Quantity cannot be negative numbers!");
    }
  };
  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (isNaN(value) || value < 1) {
      setQuantity(1);
    } else {
      setQuantity(value);
    }
  };

  if (productLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-500 font-bold text-xl mb-4">
          {error || "Can't find product!"}
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          Back to HomePage
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col md:flex-row">
          <div className="w-full md:w-2/5 p-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden border border-gray-100">
              <img
                src={
                  product.image ||
                  "https://via.placeholder.com/500x500?text=No+Image"
                }
                alt={product.title}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          <div className="w-full md:w-3/5 p-8 flex flex-col">
            <h1 className="text-3xl font-bold  text-gray-900 mb-2">
              {product.title}
            </h1>

            <div className="flex items-center gap-1 mb-6">
              <div className="flex items-center gap-1  pr-2">
                <div className="flex text-orange-400">
                  {/* Hiển thị 5 sao, tô màu dựa trên rating */}
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={30}
                      fill={
                        i < Math.floor(product.rate || 0)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  ))}
                </div>
              </div>
              <span className="text-orange-600 font-bold text-2xl pr-1">
                {product.rate || 0}
              </span>
              <div className=" pr-4 text-gray-500 text-2xl">
                <span className=" ">({product.count || 0}</span> reviews)
              </div>
            </div>

            <div className="bg-gray-50 p-5 rounded-md mb-6">
              <span className="text-3xl font-bold ">
                ${product.price?.toLocaleString("en-US")}
              </span>
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-400 uppercase mb-3 tracking-wider">
                Description
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line bg-gray-50 p-4 rounded-lg">
                {product.description || "Không có mô tả cho sản phẩm này."}
              </p>
            </div>
            <div className="mb-6 flex justify-between items-center">
              <div class="flex flex-col">
                <label
                  for="quantity"
                  class="block text-sm font-medium text-gray-700 mb-1"
                >
                  Quantity:
                </label>
                <div class="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={handleDecrement}
                    class="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    -
                  </button>

                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    value={quantity}
                    onChange={handleInputChange}
                    class="no-spinner w-16 text-center rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
                  />

                  <button
                    type="button"
                    onClick={handleIncrement}
                    class="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-gray-500 italic">
                Stock:{" "}
                <span className="text-gray-900 font-medium">
                  {product.stock}
                </span>{" "}
                products
              </div>
            </div>

            {/* Nút thao tác */}
            <div className="mt-auto flex flex-wrap gap-4">
              <button
                onClick={handleAddToCart}
                disabled={cartLoading} // Vô hiệu hóa khi đang xử lý request
                className={`flex-1 min-w-[200px] flex items-center justify-center gap-2 py-3 rounded-sm font-medium transition
                  ${
                    cartLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-500 text-indigo-50 hover:bg-indigo-700"
                  }`}
              >
                {cartLoading ? (
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    Add to Cart
                  </>
                )}
              </button>
              <AddToCartModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
