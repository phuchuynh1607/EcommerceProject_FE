import React from "react";
import { useCart } from "../hooks/useCart"; // Đường dẫn hook của bạn
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { useOrder } from "@/features/order/hooks/useOrder";

const ShoppingCart = () => {
  const {
    cartItems,
    loading,
    updateCartQuantity,
    deleteCartItem,
    refreshCart,
  } = useCart();
  const { placeOrder, loading: orderLoading } = useOrder();
  const navigate = useNavigate();
  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    try {
      await placeOrder();
      await refreshCart();

      alert("🎉 Đặt hàng thành công!");
      navigate("/profile/orders");
    } catch (error) {
      // Xử lý lỗi (ví dụ: Hết hàng - Out of stock)
      const errorMsg =
        error.response?.data?.detail || "Đặt hàng thất bại. Vui lòng thử lại!";
      alert(errorMsg);
    }
  };
  // Tính tổng cộng dựa trên dữ liệu thực tế từ Provider
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20 border-indigo-500">
      {/* Header đơn giản cho trang Cart */}
      <div className="rounded-t-md border-b sticky top-0 z-10 bg-indigo-700">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between ">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-gray-100  "
          >
            <ArrowLeft size={20} className="mr-2" />
            Continue Shopping
          </button>
          <h1 className="text-xl font-bold text-gray-100 flex items-center gap-2 ">
            <ShoppingBag size={24} className="text-gray-100" />
            My Shopping Cart ({cartItems.length})
          </h1>
          <div className="w-24"></div> {/* Spacer để cân bằng layout */}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-8">
        {cartItems.length === 0 ? (
          <div className="text-center bg-white p-16 rounded-2xl shadow-sm border border-dashed border-gray-300">
            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={40} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Danh sách sản phẩm */}
            <div className="lg:col-span-2">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  updateQuantity={updateCartQuantity}
                  removeItem={deleteCartItem}
                />
              ))}
            </div>

            {/* Summary Panel */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-4">
                  Order Summary
                </h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                </div>
                <div className="flex justify-between items-center border-t pt-4 mb-8">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-extrabold text-indigo-700">
                    ${totalAmount.toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={orderLoading || cartItems.length === 0}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-xl active:scale-95 ${
                    orderLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100"
                  }`}
                >
                  {orderLoading ? "Processing Order..." : "Proceed to Checkout"}
                </button>
                <p className="text-center text-xs text-gray-400 mt-4">
                  Secure checkout powered by Ecm
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
