import React from "react";
import { Trash2, Plus, Minus } from "lucide-react";

const CartItem = ({ item, updateQuantity, removeItem }) => {
  // Dữ liệu từ CartResponse của bạn
  const { id, quantity, product } = item;

  return (
    <div className="flex items-center justify-between bg-white p-4 mb-4 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center gap-4 flex-1">
        {/* Giả sử bạn có trường image trong product, nếu không hãy dùng placeholder */}
        <div className="w-20 h-20 bg-gray-50 rounded-md overflow-hidden shrink-0 border">
          <img
            src="https://via.placeholder.com/150"
            alt={product.title}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-md font-semibold text-gray-800 truncate">
            {product.title}
          </h4>
          <p className="text-orange-600 font-bold">
            ${product.price.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Bộ tăng giảm số lượng dựa trên CartUpdateRequest */}
        <div className="flex items-center border rounded-md">
          <button
            onClick={() => updateQuantity(id, quantity - 1)}
            disabled={quantity <= 1}
            className="p-1 hover:bg-gray-100 disabled:opacity-30"
          >
            <Minus size={16} />
          </button>
          <span className="px-4 py-1 font-medium text-sm">{quantity}</span>
          <button
            onClick={() => updateQuantity(id, quantity + 1)}
            className="p-1 hover:bg-gray-100"
          >
            <Plus size={16} />
          </button>
        </div>

        <div className="text-right min-w-[80px]">
          <p className="font-bold text-gray-900">
            ${(product.price * quantity).toLocaleString()}
          </p>
        </div>

        <button
          onClick={() => removeItem(id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
