import React from "react";
import OrderGrid from "../components/OrderGrid";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm bg-indigo-600 hover:bg-indigo-800 mb-6 px-5 py-3 rounded-lg transition-colors"
        >
          <span className="text-white font-bold">← Back </span>
        </button>

        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Your Order
            </h1>
          </div>

          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Continue Shopping
          </button>
        </div>

        <div className="mt-8">
          <OrderGrid />
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
