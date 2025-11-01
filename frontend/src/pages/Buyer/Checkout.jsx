import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Checkout() {
  const { t } = useTranslation();

  const [buyerDetails, setBuyerDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBuyerDetails({ ...buyerDetails, [name]: value });
  };

  const handlePlaceOrder = async () => {
  try {
    // TODO: Get these values from your checkout state/props
    // cartItems should contain: [{ productId, farmerId, quantity, price, name }]
    // deliveryAddress, deliveryPhone from form or user profile
    // paymentMethod from payment selection
    
    // Example structure (replace with actual data from your component):
    const cartItems = [
      { productId: "product123", quantity: 5 },
      { productId: "product456", quantity: 10 }
    ];
    const farmerId = "farmer789"; // All products must be from same farmer
    const deliveryAddress = "123 Street, Karachi"; // From form or user.address
    const deliveryPhone = "03001234567"; // From form or user.phone_no
    const paymentMethod = "cash_on_delivery"; // From payment selection
    const buyerNotes = ""; // Optional notes from buyer

    // Call the API to place order
    const response = await API.post('/orders', {
      farmerId: farmerId,
      items: cartItems, // Array of { productId, quantity }
      deliveryAddress: deliveryAddress,
      deliveryPhone: deliveryPhone,
      paymentMethod: paymentMethod,
      buyerNotes: buyerNotes
    });

    // Success - order created
    const order = response.data.order;
    
    alert(t("orderPlaced") + `\nOrder ID: ${order._id}\nTotal: PKR ${order.totalAmount}`);
    
    // TODO: Clear cart after successful order
    // localStorage.removeItem('cart'); // or dispatch clearCart action
    
    // Redirect to orders page
    navigate('/buyer/buyerMarketplace/orders');
    
  } catch (err) {
    // Handle errors
    console.error('Place order error:', err);
    
    if (err.response) {
      // Backend error with message
      alert(err.response.data.message || 'Failed to place order');
    } else if (err.request) {
      // Network error
      alert('Network error. Please check your connection.');
    } else {
      // Other errors
      alert('Failed to place order. Please try again.');
    }
  }
};

  return (
    <div className="min-h-screen bg-green-50 p-6 pt-30">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-3xl font-bold text-green-800 mb-6">🛒 {t("checkout")}</h2>

        <div className="space-y-4">
          {["name", "email", "phone", "address"].map((field) => (
            <div key={field}>
              <label className="block text-gray-700 font-medium capitalize">{t(field)}</label>
              <input
                type="text"
                name={field}
                value={buyerDetails[field]}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          ))}

          <button
            onClick={handlePlaceOrder}
            className="w-full mt-4 bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 text-lg font-semibold transition"
          >
            {t("placeOrder")}
          </button>
        </div>
      </div>
    </div>
  );
}
