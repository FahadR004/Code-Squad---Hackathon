import React, { useState } from "react"

export default function BuyerAccount() {
  const [buyer, setBuyer] = useState({
    name: "Ali Ahmed",
    email: "ali.ahmed@example.com",
    phone: "+92 300 1234567",
    address: "Model Town, Lahore",
  })
  const [editMode, setEditMode] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setBuyer({ ...buyer, [name]: value })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-green-700 mb-4">👤 Buyer Account</h1>

        <div className="space-y-3">
          {Object.keys(buyer).map((key) => (
            <div key={key}>
              <label className="block text-gray-600 capitalize">{key}</label>
              {editMode ? (
                <input
                  type="text"
                  name={key}
                  value={buyer[key]}
                  onChange={handleChange}
                  className="border w-full px-3 py-2 rounded"
                />
              ) : (
                <p className="text-gray-800">{buyer[key]}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={() => setEditMode(!editMode)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editMode ? "Save" : "Edit"}
          </button>
        </div>
      </div>
    </div>
  )
}
