import React from "react";
import { useOrder } from "../hooks/useOrder";

const OrderCard = ({ order }) => {
  const { cancelOrder, loading } = useOrder();

  // Status color definitions
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    shipped: "bg-blue-100 text-blue-700 border-blue-200",
    completed: "bg-green-100 text-green-700 border-green-200",
    cancelled: "bg-red-100 text-red-700 border-red-200",
  };

  const handleCancel = async () => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      try {
        await cancelOrder(order.id);
        alert("Order cancelled successfully!");
      } catch (err) {
        alert(err.response?.data?.detail || "Could not cancel the order.");
      }
    }
  };

  return (
    <div className="bg-white border border-indigo-500 rounded-lg shadow-sm overflow-hidden mb-6">
      {/* Card Header: ID and Status */}
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-indigo-600">
        <div>
          <p className="text-md text-gray-100 uppercase font-bold">Order ID</p>
          <p className="text-md font-bold text-gray-100">#{order.id}</p>
        </div>
        <div
          className={`px-3 py-2 rounded-full text-xs font-bold border ${statusStyles[order.status]}`}
        >
          {order.status.toUpperCase()}
        </div>
      </div>

      <div className="px-6 py-4 space-y-6">
        {/* Check if order.items exists before mapping */}
        {order?.items?.map((item) => (
          <div
            key={item.product_id}
            className="flex justify-between items-center border-b border-gray-50 pb-4 last:border-0 last:pb-0"
          >
            <div className="flex items-center space-x-4">
              {/* Product Image Container */}
              <div className="w-20 h-20 bg-gray-50 rounded-lg flex-shrink-0 overflow-hidden border border-gray-100">
                {item.product?.image ? (
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    📦
                  </div>
                )}
              </div>
              <div>
                <p className="font-bold text-gray-900 text-base leading-tight">
                  {item.product?.title || "Unknown Product"}
                </p>
                <p className="text-gray-500 text-sm mt-1 font-medium">
                  Quantity: x{item.quantity}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-800 text-lg">
                $
                {(
                  (item.price_at_purchase || 0) * item.quantity
                ).toLocaleString()}
              </p>
              <p className="text-xs text-gray-400">
                ${item.price_at_purchase?.toLocaleString()} / unit
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer: Total and Actions */}
      <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500">
            Order Date: {new Date(order.created_at).toLocaleDateString()}
          </p>
          <div className="mt-1">
            <span className="text-sm text-gray-600 font-medium">
              Total Amount:{" "}
            </span>
            <span className="text-2xl font-black text-indigo-700">
              ${order.total_amount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Cancel Button: Only visible if status is pending */}
        {order.status === "pending" && (
          <button
            onClick={handleCancel}
            disabled={loading}
            className="px-6 py-2.5 text-sm font-bold text-red-600 border-2 border-red-600 rounded-xl hover:bg-red-50 transition-all disabled:opacity-50 active:scale-95"
          >
            Cancel Order
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
