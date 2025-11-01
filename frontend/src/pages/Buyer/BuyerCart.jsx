import React from "react"

export default function BuyerCart() {
  const cartItems = [
    { id: 1, name: "Fresh Tomatoes", price: 250 },
    { id: 3, name: "Bananas", price: 220 },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-green-700 mb-4">🛒 My Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <ul className="divide-y">
            {cartItems.map((item) => (
              <li key={item.id} className="py-3 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-600 text-sm">PKR {item.price}</p>
                </div>
                <button className="text-red-500 hover:underline">Remove</button>
              </li>
            ))}
          </ul>
        )}

        <div className="text-right mt-4">
          <button className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}
