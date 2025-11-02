// OrderSuccess.jsx
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-6">
      <FaCheckCircle className="text-green-600 text-6xl mb-4" />
      <h2 className="text-3xl font-bold mb-2">Order Placed Successfully!</h2>
      <p className="text-gray-700 mb-6">Thank you for your purchase. You can view your orders below.</p>
      <button
        onClick={() => navigate("/buyer/buyerMarketplace/orders")}
        className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition"
      >
        Go to My Orders
      </button>
    </div>
  );
}
