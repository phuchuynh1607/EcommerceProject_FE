import React from "react";
import { Trash2, Plus, Minus } from "lucide-react";

const CartItem = ({ item, updateQuantity, removeItem }) => {
  // Dữ liệu từ CartResponse: id (cart_id), quantity, product (image, title, price)
  const { id, quantity, product } = item;

  // Logic cắt chữ: Nếu dài hơn 30 ký tự thì cắt và thêm dấu ...
  const displayTitle =
    product.title.length > 30
      ? `${product.title.substring(0, 30)}...`
      : product.title;

  // Hàm xử lý thay đổi số lượng an toàn
  const handleUpdate = (e, newQty) => {
    e.preventDefault(); // Chặn reload trang
    if (newQty < 1) return;
    updateQuantity(id, Number(newQty)); // Ép kiểu Number để tránh lỗi 422
  };

  return (
    <div className="flex items-center justify-between bg-white p-4 mb-4 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
      <div className="flex items-center gap-4 flex-1">
        {/* KHUNG ẢNH */}
        <div className="w-20 h-20 bg-white rounded-lg overflow-hidden shrink-0 border border-gray-50 p-1 flex items-center justify-center">
          <img
            src={product.image} // Hãy đảm bảo tên trường này (image/image_url) khớp với Backend
            alt={product.title}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h4
            className="text-sm font-semibold text-gray-800 leading-snug mb-1"
            title={product.title}
          >
            {displayTitle}
          </h4>
          <p className="text-orange-600 font-bold">
            ${product.price.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* BỘ ĐIỀU KHIỂN SỐ LƯỢNG */}
        <div className="flex items-center bg-gray-50 border rounded-lg p-0.5">
          <button
            type="button" // Ngăn reload trang
            onClick={(e) => handleUpdate(e, quantity - 1)}
            disabled={quantity <= 1}
            className="p-1.5 hover:bg-white hover:shadow-sm rounded-md disabled:opacity-30 transition-all text-gray-600"
          >
            <Minus size={14} />
          </button>

          <span className="px-3 font-bold text-gray-700 min-w-[32px] text-center text-sm">
            {quantity}
          </span>

          <button
            type="button" // Ngăn reload trang
            onClick={(e) => handleUpdate(e, quantity + 1)}
            className="p-1.5 hover:bg-white hover:shadow-sm rounded-md transition-all text-gray-600"
          >
            <Plus size={14} />
          </button>
        </div>

        {/* THÀNH TIỀN */}
        <div className="text-right min-w-[90px]">
          <p className="font-extrabold text-indigo-700">
            ${(product.price * quantity).toLocaleString()}
          </p>
        </div>

        {/* NÚT XÓA */}
        <button
          type="button" // Ngăn reload trang
          onClick={(e) => {
            e.preventDefault();
            removeItem(id);
          }}
          className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all rounded-full"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
