import React from "react";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCart } from "../../contexts/CartContext";

export default function BuyerCart() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Get cart state and handlers from context
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-green-800 flex items-center gap-2 mb-6">
          <FaShoppingCart /> {t("myCart")}
        </h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-lg">{t("cartEmpty")}</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-lg rounded-xl p-4 flex justify-between items-center hover:shadow-2xl transition-shadow duration-300"
              >
                <div>
                  <p className="font-semibold text-gray-800 text-lg">{item.name}</p>
                  <p className="text-gray-600 mt-1">
                    PKR {item.price}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                    >
                      -
                    </button>
                    <span className="px-2 py-1 border rounded">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <p className="text-gray-800 font-medium">
                    PKR {item.price * item.quantity}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 flex items-center gap-1"
                  >
                    <FaTrash /> {t("remove")}
                  </button>
                </div>
              </div>
            ))}

            {/* Total */}
            <div className="bg-white shadow-lg rounded-xl p-4 flex justify-between items-center">
              <span className="text-xl font-semibold text-gray-700">{t("total")}:</span>
              <span className="text-xl font-bold text-green-800">PKR {totalAmount}</span>
            </div>

            {/* Checkout Button */}
            <div className="text-right">
              <button
                onClick={() => navigate("/buyer/buyerMarketplace/cart/checkout")}
                className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 text-lg font-semibold transition"
              >
                {t("proceedToCheckout")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
