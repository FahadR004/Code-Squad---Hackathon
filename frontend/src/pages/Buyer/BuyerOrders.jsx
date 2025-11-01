import React from "react"
import { FaBox, FaCheckCircle, FaClock } from "react-icons/fa"

export default function BuyerOrders() {
  const orders = [
    { id: 1, name: "Wheat Grain", quantity: 20, total: 3000, status: "Delivered" },
    { id: 2, name: "Fresh Milk", quantity: 10, total: 1800, status: "Pending" },
  ]

  const getStatusBadge = (status) => {
    if (status === "Delivered") return "bg-green-100 text-green-800"
    if (status === "Pending") return "bg-yellow-100 text-yellow-800"
    return "bg-gray-100 text-gray-800"
  }

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-green-800 flex items-center gap-2">
          <FaBox /> My Orders
        </h2>

        {orders.length === 0 ? (
          <p className="text-gray-500 text-lg">You haven’t placed any orders yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white shadow-lg rounded-xl p-5 hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-semibold text-gray-700">{order.name}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(
                      order.status
                    )} flex items-center gap-1`}
                  >
                    {order.status === "Delivered" ? <FaCheckCircle /> : <FaClock />}
                    {order.status}
                  </span>
                </div>
                <p className="text-gray-600">Quantity: <span className="font-medium">{order.quantity}</span></p>
                <p className="text-gray-600 mt-1">
                  Total: <span className="font-medium">PKR {order.total}</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
