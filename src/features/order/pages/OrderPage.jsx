import React from "react";
import OrderGrid from "../components/OrderGrid";
import { useNavigate } from "react-router-dom";
import CustomButton from "@/components/ui/CustomButton";

const OrderPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <CustomButton onClick={() => navigate(-1)} variant="back">
          <span className="text-white font-bold">← Back </span>
        </CustomButton>

        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Your Order
            </h1>
          </div>

          <CustomButton onClick={() => navigate("/")} variant="start_shopping">
            Continue Shopping
          </CustomButton>
        </div>

        <div className="mt-8">
          <OrderGrid />
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
