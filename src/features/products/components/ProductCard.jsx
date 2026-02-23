import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col h-full border border-indigo-500"
    >
      <div className="aspect-square w-full overflow-hidden bg-gray-50">
        <img
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-3 flex flex-col flex-grow">
        <h3 className="text-sm text-gray-800 line-clamp-2 h-10 mb-2 leading-tight">
          {product.title}
        </h3>

        <div className="flex items-baseline mb-2">
          <span className="text-orange-600 text-lg font-semibold">
            ${product.price?.toLocaleString("en-US")}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center bg-gray-100 px-1.5 py-0.5 rounded text-[10px] font-medium text-gray-600">
            <span className="mr-0.5">{product.rate || 0}</span>
            <Star size={10} className="fill-orange-400 text-orange-400" />
          </div>

          <span className="text-[10px] text-gray-400">
            Stock: {product.stock}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
