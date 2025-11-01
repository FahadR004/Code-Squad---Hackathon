import React, { useState } from "react"

export default function Checkout() {
  const [buyerDetails, setBuyerDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setBuyerDetails({ ...buyerDetails, [name]: value })
  }

  const handlePlaceOrder = () => {
    alert("Order placed successfully!")
    // Here you can also call API to save the order
  }

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-3xl font-bold text-green-800 mb-6">🛒 Checkout</h2>

        <div className="space-y-4">
          {["name", "email", "phone", "address"].map((field) => (
            <div key={field}>
              <label className="block text-gray-700 font-medium capitalize">{field}</label>
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
            Place Order
          </button>
        </div>
      </div>
    </div>
  )
}
