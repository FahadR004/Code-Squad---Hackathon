import React from "react"

export default function BuyerOrders() {
  const orders = [
    { id: 1, name: "Wheat Grain", quantity: 20, total: 3000 },
    { id: 2, name: "Fresh Milk", quantity: 10, total: 1800 },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-green-700 mb-4">📦 My Orders</h2>

        {orders.length === 0 ? (
          <p className="text-gray-500">You haven’t placed any orders yet.</p>
        ) : (
          <ul className="divide-y">
            {orders.map((o) => (
              <li key={o.id} className="py-3">
                <p className="font-semibold">{o.name}</p>
                <p className="text-sm text-gray-600">
                  Qty: {o.quantity} | Total: PKR {o.total}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
