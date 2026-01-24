import React from "react";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";

const ProductGrid = ({ products }) => {
  const navigate = useNavigate();
  const handleLoginRedirect = () => {
    navigate("/login");
  };
  const { user } = useAuth();
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

        {!user && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={handleLoginRedirect}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-bold shadow-lg transition-all transform hover:scale-105"
            >
              Login to see more
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
