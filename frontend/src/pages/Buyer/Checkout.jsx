import React, { useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { FaCreditCard, FaPaypal, FaMoneyBillWave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const [selectedPayment, setSelectedPayment] = useState("card");
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = subtotal * 0.05; // 5% tax example
  const total = subtotal   + tax;

  const handlePayment = () => {
    clearCart();
    navigate("/buyer/buyerMarketplace/order-success");
    //navigate("/buyer/buyerMarketplace/orders");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div>
          <h2 className="text-2xl font-bold mb-4">🛒 Order Summary</h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white shadow rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-gray-500">PKR {item.price}</p>
                    <div className="flex items-center mt-2 gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="px-2 py-1 border rounded">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <p className="text-gray-800 font-medium">PKR {item.price * item.quantity}</p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 flex items-center gap-1"
                    >
                      <FaMoneyBillWave /> Remove
                    </button>
                  </div>
                </div>
              ))}

              {/* Total */}
              <div className="bg-white shadow rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>PKR {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (5%):</span>
                  <span>PKR {tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-green-700 text-lg">
                  <span>Total:</span>
                  <span>PKR {total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Payment Options */}
        <div>
          <h2 className="text-2xl font-bold mb-4">💳 Payment Options</h2>
          <div className="bg-white shadow rounded-lg p-6 space-y-4">
            <label className={`flex items-center gap-3 p-3 border rounded cursor-pointer ${selectedPayment === "card" ? "border-green-500 bg-green-50" : ""}`}>
              <input
                type="radio"
                name="payment"
                value="card"
                checked={selectedPayment === "card"}
                onChange={() => setSelectedPayment("card")}
                className="hidden"
              />
              <FaCreditCard size={24} />
              <span>Credit / Debit Card</span>
            </label>

            <label className={`flex items-center gap-3 p-3 border rounded cursor-pointer ${selectedPayment === "paypal" ? "border-green-500 bg-green-50" : ""}`}>
              <input
                type="radio"
                name="payment"
                value="paypal"
                checked={selectedPayment === "paypal"}
                onChange={() => setSelectedPayment("paypal")}
                className="hidden"
              />
              <FaPaypal size={24} />
              <span>PayPal</span>
            </label>

            <label className={`flex items-center gap-3 p-3 border rounded cursor-pointer ${selectedPayment === "cod" ? "border-green-500 bg-green-50" : ""}`}>
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={selectedPayment === "cod"}
                onChange={() => setSelectedPayment("cod")}
                className="hidden"
              />
              <FaMoneyBillWave size={24} />
              <span>Cash on Delivery</span>
            </label>

            <button
              onClick={handlePayment}
              className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 font-semibold text-lg mt-4 transition"
              disabled={cartItems.length === 0}
            >
              Pay PKR {total.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
