import React, { useState, useEffect } from "react";
import { FaUser, FaBox, FaHeart, FaCreditCard, FaEdit, FaSave, FaSpinner } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import API from '../../api'; 

export default function BuyerAccount() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // State for user profile
  const [buyer, setBuyer] = useState({
    name: "",
    email: "",
    phone_no: "",
    address: "",
    bio: "",
    profileImage: ""
  });

  // State for orders
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  // State for wishlist (if you implement it later)
  const [wishlist, setWishlist] = useState([]);

  // State for payment methods (placeholder - implement later)
  const [paymentMethods] = useState(["Cash on Delivery"]);

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Fetch user profile on mount
  useEffect(() => {
    fetchProfile();
    fetchOrders();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");
      
      const response = await API.get('/profile');
      const userData = response.data.user;
      
      setBuyer({
        name: userData.name,
        email: userData.email,
        phone_no: userData.phone_no,
        address: userData.address,
        bio: userData.bio || "",
        profileImage: userData.profileImage || ""
      });
      
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error('Fetch profile error:', err);
      setError('Failed to load profile');
    }
  };

  const fetchOrders = async () => {
    try {
      setOrdersLoading(true);
      
      // Fetch all orders for the buyer
      const response = await API.get('/orders/my-orders', {
        params: {
          page: 1,
          limit: 100 // Get all orders
        }
      });
      
      setOrders(response.data.orders);
      setOrdersLoading(false);
    } catch (err) {
      setOrdersLoading(false);
      console.error('Fetch orders error:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBuyer({ ...buyer, [name]: value });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");

      // Call update profile API
      const response = await API.put('/profile', {
        name: buyer.name,
        phone_no: buyer.phone_no,
        address: buyer.address,
        bio: buyer.bio,
        profileImage: buyer.profileImage
      });

      // Update local storage user data
      const storedUser = JSON.parse(localStorage.getItem('user'));
      localStorage.setItem('user', JSON.stringify({
        ...storedUser,
        name: response.data.user.name
      }));

      setSaving(false);
      setEditMode(false);
      alert('Profile updated successfully!');
    } catch (err) {
      setSaving(false);
      console.error('Update profile error:', err);
      setError(err.response?.data?.message || 'Failed to update profile');
      alert('Failed to update profile');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-200 text-yellow-800",
      confirmed: "bg-blue-200 text-blue-800",
      processing: "bg-purple-200 text-purple-800",
      shipped: "bg-indigo-200 text-indigo-800",
      delivered: "bg-green-200 text-green-800",
      cancelled: "bg-red-200 text-red-800"
    };
    return colors[status] || "bg-gray-200 text-gray-800";
  };

  const handleViewOrder = (orderId) => {
    // Navigate to order details page
    navigate(`/buyer/buyerMarketplace/orders/${orderId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <FaSpinner className="animate-spin text-green-600 text-4xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-green-800 text-center mb-6">
          👤 {t("buyerAccount")}
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Basic Info Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <FaUser className="text-green-600 mr-3 text-2xl" />
            <h2 className="text-xl font-semibold text-gray-700">{t("basicInfo")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-gray-600 font-medium">{t("name")}</label>
              {editMode ? (
                <input
                  type="text"
                  name="name"
                  value={buyer.name}
                  onChange={handleChange}
                  className="mt-1 border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-green-400 focus:outline-none"
                />
              ) : (
                <p className="mt-1 text-gray-800 font-medium">{buyer.name}</p>
              )}
            </div>

            {/* Email (read-only) */}
            <div>
              <label className="block text-gray-600 font-medium">{t("email")}</label>
              <p className="mt-1 text-gray-800 font-medium">{buyer.email}</p>
              {editMode && (
                <span className="text-xs text-gray-500">Email cannot be changed</span>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-600 font-medium">{t("phone")}</label>
              {editMode ? (
                <input
                  type="text"
                  name="phone_no"
                  value={buyer.phone_no}
                  onChange={handleChange}
                  className="mt-1 border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-green-400 focus:outline-none"
                />
              ) : (
                <p className="mt-1 text-gray-800 font-medium">{buyer.phone_no}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-gray-600 font-medium">{t("address")}</label>
              {editMode ? (
                <input
                  type="text"
                  name="address"
                  value={buyer.address}
                  onChange={handleChange}
                  className="mt-1 border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-green-400 focus:outline-none"
                />
              ) : (
                <p className="mt-1 text-gray-800 font-medium">{buyer.address}</p>
              )}
            </div>
          </div>

          {/* Bio (full width) */}
          {editMode && (
            <div className="mt-4">
              <label className="block text-gray-600 font-medium">{t("bio")}</label>
              <textarea
                name="bio"
                value={buyer.bio}
                onChange={handleChange}
                rows="3"
                className="mt-1 border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-green-400 focus:outline-none"
                placeholder="Tell us about yourself..."
              />
            </div>
          )}
        </div>

        {/* Orders Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <FaBox className="text-green-600 mr-3 text-2xl" />
            <h2 className="text-xl font-semibold text-gray-700">{t("orderHistory")}</h2>
          </div>

          {ordersLoading ? (
            <div className="flex justify-center py-8">
              <FaSpinner className="animate-spin text-green-600 text-2xl" />
            </div>
          ) : orders.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No orders yet</p>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-green-50 rounded-lg p-4 hover:bg-green-100 transition-colors cursor-pointer"
                  onClick={() => handleViewOrder(order._id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-gray-800">
                        Order #{order._id.slice(-8)}
                      </p>
                      <p className="text-sm text-gray-600">
                        Farmer: {order.farmerId?.name || "Unknown"}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`font-semibold px-3 py-1 rounded-full text-sm ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>

                  <div className="mt-2">
                    <p className="text-sm text-gray-700">
                      Items: {order.items.length} | Total: PKR {order.totalAmount}
                    </p>
                    <div className="text-xs text-gray-600 mt-1">
                      {order.items.slice(0, 2).map((item, idx) => (
                        <span key={idx}>
                          {item.name} x{item.quantity}
                          {idx < Math.min(order.items.length - 1, 1) && ", "}
                        </span>
                      ))}
                      {order.items.length > 2 && ` +${order.items.length - 2} more`}
                    </div>
                  </div>

                  {/* Show review option if delivered and not reviewed */}
                  {order.status === "delivered" && !order.isReviewed && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/buyer/review/${order._id}`);
                      }}
                      className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      ⭐ Leave a Review
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Wishlist Card - Placeholder for future */}
        <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <FaHeart className="text-red-500 mr-3 text-2xl" />
            <h2 className="text-xl font-semibold text-gray-700">{t("wishlist")}</h2>
          </div>
          {wishlist.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No items in wishlist</p>
          ) : (
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {wishlist.map((item, index) => (
                <li
                  key={index}
                  className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-center font-medium hover:bg-red-100 transition-colors"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Payment Methods Card - Placeholder */}
        <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <FaCreditCard className="text-green-600 mr-3 text-2xl" />
            <h2 className="text-xl font-semibold text-gray-700">{t("paymentMethods")}</h2>
          </div>
          <ul className="space-y-2">
            {paymentMethods.map((method, index) => (
              <li
                key={index}
                className="bg-green-50 px-4 py-2 rounded-lg font-medium hover:bg-green-100 transition-colors"
              >
                {method}
              </li>
            ))}
          </ul>
        </div>

        {/* Edit/Save Button */}
        <div className="flex justify-end gap-3">
          {editMode && (
            <button
              onClick={() => {
                setEditMode(false);
                fetchProfile(); // Reset changes
              }}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            onClick={() => (editMode ? handleSave() : setEditMode(true))}
            disabled={saving}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            {saving ? (
              <FaSpinner className="animate-spin" />
            ) : editMode ? (
              <FaSave />
            ) : (
              <FaEdit />
            )}
            {saving ? "Saving..." : editMode ? t("saveChanges") : t("editInfo")}
          </button>
        </div>
      </div>
    </div>
  );
}