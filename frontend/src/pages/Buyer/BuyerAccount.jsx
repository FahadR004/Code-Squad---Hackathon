import React, { useState } from "react"
import { FaUser, FaBox, FaHeart, FaCreditCard, FaEdit, FaSave } from "react-icons/fa"

export default function BuyerAccount() {
  const [buyer, setBuyer] = useState({
    name: "Ali Ahmed",
    email: "ali.ahmed@example.com",
    phone: "+92 300 1234567",
    address: "Model Town, Lahore",
    orders: [
      { id: 1, product: "Fresh Tomatoes", quantity: 5, status: "Delivered" },
      { id: 2, product: "Organic Wheat", quantity: 10, status: "Pending" },
    ],
    wishlist: ["Organic Honey", "Fresh Milk"],
    paymentMethods: ["Visa ****1234", "PayPal ali@example.com"],
  })

  const [editMode, setEditMode] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setBuyer({ ...buyer, [name]: value })
  }

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-green-800 text-center mb-6">
          👤 Buyer Account
        </h1>

        {/* Basic Info Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <FaUser className="text-green-600 mr-3 text-2xl" />
            <h2 className="text-xl font-semibold text-gray-700">Basic Info</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["name", "email", "phone", "address"].map((key) => (
              <div key={key}>
                <label className="block text-gray-600 font-medium capitalize">{key}</label>
                {editMode ? (
                  <input
                    type="text"
                    name={key}
                    value={buyer[key]}
                    onChange={handleChange}
                    className="mt-1 border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-green-400 focus:outline-none"
                  />
                ) : (
                  <p className="mt-1 text-gray-800 font-medium">{buyer[key]}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Orders Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <FaBox className="text-green-600 mr-3 text-2xl" />
            <h2 className="text-xl font-semibold text-gray-700">Order History</h2>
          </div>
          <ul className="space-y-2">
            {buyer.orders.map((order) => (
              <li
                key={order.id}
                className="flex justify-between items-center bg-green-50 rounded-lg px-4 py-2 hover:bg-green-100 transition-colors"
              >
                <span className="font-medium">{order.product} x {order.quantity}</span>
                <span
                  className={`font-semibold px-2 py-1 rounded-full text-sm ${
                    order.status === "Delivered"
                      ? "bg-green-200 text-green-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {order.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Wishlist Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <FaHeart className="text-red-500 mr-3 text-2xl" />
            <h2 className="text-xl font-semibold text-gray-700">Wishlist</h2>
          </div>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {buyer.wishlist.map((item, index) => (
              <li
                key={index}
                className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-center font-medium hover:bg-red-100 transition-colors"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Payment Methods Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <FaCreditCard className="text-green-600 mr-3 text-2xl" />
            <h2 className="text-xl font-semibold text-gray-700">Payment Methods</h2>
          </div>
          <ul className="space-y-2">
            {buyer.paymentMethods.map((method, index) => (
              <li
                key={index}
                className="bg-green-50 px-4 py-2 rounded-lg font-medium hover:bg-green-100 transition-colors"
              >
                {method}
              </li>
            ))}
          </ul>
        </div>

        {/* Edit Button */}
        <div className="flex justify-end">
          <button
            onClick={() => setEditMode(!editMode)}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {editMode ? <FaSave /> : <FaEdit />}
            {editMode ? "Save Changes" : "Edit Info"}
          </button>
        </div>
      </div>
    </div>
  )
}
