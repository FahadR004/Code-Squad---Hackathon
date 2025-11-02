import React, { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBox, FaSpinner } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import API from '../../api';

export default function BuyerAccount() {
  const { t } = useTranslation();

  const [buyer, setBuyer] = useState({
    name: "",
    email: "",
    phone_no: "",
    address: ""
  });
  const [ordersCount, setOrdersCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBuyerData();
  }, []);

  const fetchBuyerData = async () => {
    try {
      setLoading(true);
      setError("");

      const profileRes = await API.get('/profile');
      const userData = profileRes.data.user;
      setBuyer({
        name: userData.name,
        email: userData.email,
        phone_no: userData.phone_no,
        address: userData.address
      });

      const ordersRes = await API.get('/orders/my-orders', {
        params: { page: 1, limit: 1 }
      });
      setOrdersCount(ordersRes.data.totalOrders || ordersRes.data.orders.length || 0);

      setLoading(false);
    } catch (err) {
      console.error("Error fetching buyer data:", err);
      setError("Failed to load buyer information");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <FaSpinner className="animate-spin text-green-600 text-5xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 p-6 flex justify-center">
      <div className="w-full max-w-4xl space-y-6">
        <h1 className="text-4xl font-bold text-green-800 text-center mb-6">
          👤 {t("buyerAccount")}
        </h1>

        {/* Personal Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="bg-green-100 p-5 rounded-xl shadow hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-2">
              <FaUser className="text-green-700 text-2xl" />
              <p className="text-lg font-semibold text-green-800">{t("name")}</p>
            </div>
            <p className="text-gray-800 text-xl font-medium">{buyer.name}</p>
          </div>

          {/* Email */}
          <div className="bg-green-100 p-5 rounded-xl shadow hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-2">
              <FaEnvelope className="text-green-700 text-2xl" />
              <p className="text-lg font-semibold text-green-800">{t("email")}</p>
            </div>
            <p className="text-gray-800 text-xl font-medium">{buyer.email}</p>
          </div>

          {/* Phone */}
          <div className="bg-green-100 p-5 rounded-xl shadow hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-2">
              <FaPhone className="text-green-700 text-2xl" />
              <p className="text-lg font-semibold text-green-800">{t("phone")}</p>
            </div>
            <p className="text-gray-800 text-xl font-medium">{buyer.phone_no}</p>
          </div>

          {/* Address */}
          <div className="bg-green-100 p-5 rounded-xl shadow hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-2">
              <FaMapMarkerAlt className="text-green-700 text-2xl" />
              <p className="text-lg font-semibold text-green-800">{t("address")}</p>
            </div>
            <p className="text-gray-800 text-xl font-medium">{buyer.address}</p>
          </div>
        </div>

        {/* Orders Count */}
        <div className="bg-green-200 p-8 rounded-xl shadow-lg hover:shadow-2xl transition flex items-center justify-center flex-col">
          <FaBox className="text-green-800 text-5xl mb-3" />
          <p className="text-2xl font-semibold text-green-900">{t("totalOrders")}</p>
          <p className="text-4xl font-bold text-green-900 mt-1">{ordersCount}</p>
        </div>
      </div>
    </div>
  );
}
