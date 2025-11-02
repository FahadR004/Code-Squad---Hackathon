import { useState, useEffect } from "react";
import { FaBox, FaCheckCircle, FaClock, FaStar, FaTruck, FaSpinner, FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useCart } from "../../contexts/CartContext";
import API from "../../api";

export default function BuyerOrders() {
  const { t } = useTranslation();
  const { orders, setOrders } = useCart(); // Use orders from context

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // Fetch orders from backend
  useEffect(() => {
    fetchOrders();
  }, [statusFilter, currentPage]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const params = { page: currentPage, limit: 10 };
      if (statusFilter) params.status = statusFilter;

      const response = await API.get("orders/my-orders", { params });
      setOrders(response.data.orders);
      setTotalPages(response.data.pages);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-blue-100 text-blue-800",
      processing: "bg-purple-100 text-purple-800",
      shipped: "bg-indigo-100 text-indigo-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800"
    };
    return badges[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (status) => {
    if (status === "delivered") return <FaCheckCircle />;
    if (status === "shipped") return <FaTruck />;
    if (status === "cancelled") return <FaTimes />;
    return <FaClock />;
  };

  const openRatingModal = (order) => {
    setSelectedOrder(order);
    setRating(0);
    setComment("");
    setShowModal(true);
  };

  const submitRating = async () => {
    if (!selectedOrder || rating === 0) {
      alert("Please select a rating");
      return;
    }
    try {
      await API.post("reviews", {
        farmerId: selectedOrder.farmerId._id,
        orderId: selectedOrder._id,
        rating,
        comment
      });
      setOrders(prev =>
        prev.map(o =>
          o._id === selectedOrder._id ? { ...o, isReviewed: true } : o
        )
      );
      setShowModal(false);
      alert(`Rating submitted successfully for ${selectedOrder.farmerId.name}`);
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Failed to submit rating");
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      const reason = prompt("Please provide a cancellation reason (optional):");
      await API.put(`orders/${orderId}/cancel`, { cancellationReason: reason });
      alert("Order cancelled successfully");
      fetchOrders();
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Failed to cancel order");
    }
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric"
  });

  if (loading) return <div className="min-h-screen bg-green-50 p-6 flex items-center justify-center"><FaSpinner className="animate-spin text-4xl text-green-600" /></div>;

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-green-800 flex items-center gap-2"><FaBox /> {t("myOrders") || "My Orders"}</h2>
          <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }} className="px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
            <option value="">All Orders</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}

        {orders.length === 0 ? (
          <div className="bg-white shadow-lg rounded-xl p-8 text-center">
            <FaBox className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">{statusFilter ? `No ${statusFilter} orders found` : t("noOrdersYet") || "No orders yet"}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {orders.map(order => (
              <div key={order._id} className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300">
                {/* Header */}
                <div className="flex justify-between items-start mb-4 pb-4 border-b">
                  <div>
                    <p className="text-sm text-gray-500">Order ID: {order._id}</p>
                    <p className="text-sm text-gray-500">Order Date: {formatDate(order.orderDate)}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(order.status)} flex items-center gap-1`}>
                    {getStatusIcon(order.status)}
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>

                {/* Farmer Info */}
                <div className="mb-4">
                  <p className="text-gray-700 font-semibold">Farmer: {order.farmerId.name}</p>
                  <p className="text-sm text-gray-600">Contact: {order.farmerId.phone_no}</p>
                </div>

                {/* Items */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Items:</h4>
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b last:border-b-0">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">{item.quantity} × PKR {item.price}/{item.unit}</p>
                      </div>
                      <p className="font-semibold">PKR {item.subtotal}</p>
                    </div>
                  ))}
                </div>

                <div className="mb-4 space-y-1">
                  <p className="text-lg font-bold text-green-700">Total: PKR {order.totalAmount}</p>
                  <p className="text-sm text-gray-600">Payment: {order.paymentMethod.replace(/_/g, " ")}</p>
                  <p className="text-sm text-gray-600">Delivery: {order.deliveryAddress}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-wrap">
                  {order.status === "pending" && <button onClick={() => handleCancelOrder(order._id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Cancel Order</button>}
                  {order.status === "delivered" && !order.isReviewed && <button onClick={() => openRatingModal(order)} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition flex items-center gap-2"><FaStar /> Rate Farmer</button>}
                  {order.isReviewed && <span className="bg-green-100 text-green-700 px-4 py-2 rounded flex items-center gap-2"><FaCheckCircle /> Reviewed</span>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            <button onClick={() => setCurrentPage(prev => Math.max(1, prev-1))} disabled={currentPage===1} className="px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-green-700">Previous</button>
            <span className="px-4 py-2 bg-white rounded border">Page {currentPage} of {totalPages}</span>
            <button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev+1))} disabled={currentPage===totalPages} className="px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-green-700">Next</button>
          </div>
        )}
      </div>

      {/* Rating Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 max-w-full mx-4">
            <h3 className="text-xl font-semibold mb-4">Rate Farmer: {selectedOrder.farmerId.name}</h3>
            <div className="flex gap-2 mb-4 justify-center">
              {[1,2,3,4,5].map(star => (
                <FaStar key={star} className={`cursor-pointer text-3xl ${star <= rating ? "text-yellow-400" : "text-gray-300"} hover:text-yellow-400 transition`} onClick={() => setRating(star)} />
              ))}
            </div>
            <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Share your experience (optional)" className="border w-full p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500" rows="4"/>
            <div className="flex justify-between gap-2">
              <button onClick={submitRating} className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">Submit Rating</button>
              <button onClick={() => setShowModal(false)} className="flex-1 bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
