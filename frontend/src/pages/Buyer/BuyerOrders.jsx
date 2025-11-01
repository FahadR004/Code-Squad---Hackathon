import React, { useState } from "react";
import { FaBox, FaCheckCircle, FaClock, FaStar } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function BuyerOrders() {
  const { t } = useTranslation();

  const initialOrders = [
    { id: 1, name: "Wheat Grain", quantity: 20, total: 3000, status: "Delivered", rated: false, farmer: "Ali Farm", rating: 0, comment: "" },
    { id: 2, name: "Fresh Milk", quantity: 10, total: 1800, status: "Pending", rated: false, farmer: "Dairy Farm", rating: 0, comment: "" },
  ];

  const [orders, setOrders] = useState(initialOrders);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const getStatusBadge = (status) => {
    if (status === "Delivered") return "bg-green-100 text-green-800";
    if (status === "Pending") return "bg-yellow-100 text-yellow-800";
    return "bg-gray-100 text-gray-800";
  };

  const openRatingModal = (order) => {
    setSelectedOrder(order);
    setRating(order.rating || 0);  // Show previously rated stars
    setComment(order.comment || "");
    setShowModal(true);
  };

  const submitRating = () => {
    if (!selectedOrder) return;

    setOrders((prev) =>
      prev.map((o) =>
        o.id === selectedOrder.id
          ? { ...o, rated: true, rating, comment }
          : o
      )
    );
    setShowModal(false);
    alert(`You rated ${selectedOrder.farmer} ${rating} stars\nComment: ${comment}`);
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-green-800 flex items-center gap-2">
          <FaBox /> {t("myOrders")}
        </h2>

        {orders.length === 0 ? (
          <p className="text-gray-500 text-lg">{t("noOrdersYet")}</p>
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
                    {t(`status.${order.status}`)}
                  </span>
                </div>
                <p className="text-gray-600">
                  {t("quantity")}: <span className="font-medium">{order.quantity}</span>
                </p>
                <p className="text-gray-600 mt-1">
                  {t("total")}: <span className="font-medium">PKR {order.total}</span>
                </p>
                <p className="text-gray-600 mt-1">
                  {t("farmer")}: <span className="font-medium">{order.farmer}</span>
                </p>

                {/* Rate Farmer Button */}
                {order.status === "Delivered" && !order.rated && (
                  <button
                    onClick={() => openRatingModal(order)}
                    className="mt-3 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  >
                    {t("rateFarmer")}
                  </button>
                )}

                {order.rated && (
                  <div className="mt-3 flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < order.rating ? "text-yellow-400" : "text-gray-300"}
                      />
                    ))}
                    <span className="text-green-700 font-semibold">{t("alreadyRated")}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Rating Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-80">
            <h3 className="text-lg font-semibold mb-3">{t("rateFarmer")}: {selectedOrder.farmer}</h3>
            
            {/* Star Rating */}
            <div className="flex gap-1 mb-3">
              {[1,2,3,4,5].map((star) => (
                <FaStar
                  key={star}
                  className={`cursor-pointer ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>

            {/* Comment Box */}
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={t("leaveComment")}
              className="border w-full p-2 rounded mb-3"
            />

            <div className="flex justify-between">
              <button
                onClick={submitRating}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                {t("submit")}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                {t("cancel")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
