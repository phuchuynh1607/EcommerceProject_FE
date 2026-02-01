import React, { useEffect } from "react";
import { useOrder } from "../hooks/useOrder";
import OrderCard from "./OrderCard";

const OrderGrid = () => {
  const { orders, loading, refreshOrders } = useOrder();

  // Automatically fetch order history when component mounts
  useEffect(() => {
    refreshOrders();
  }, [refreshOrders]);

  if (loading && orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500">Loading order history...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-lg border-2 border-dashed border-gray-200">
        <p className="text-gray-400">You don't have any orders yet.</p>
        <button
          onClick={() => (window.location.href = "/")}
          className="mt-4 text-indigo-600 font-semibold hover:underline"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">
        Checkout History
      </h2>
      <div className="space-y-2">
        {/* Array.isArray check to protect the app from crashing */}
        {Array.isArray(orders) ? (
          orders.map((order) => <OrderCard key={order.id} order={order} />)
        ) : (
          <p className="text-red-500">
            An error occurred while displaying the order list.
          </p>
        )}
      </div>
    </div>
  );
};

export default OrderGrid;
