// src/layouts/BuyerLayout.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function BuyerLayout({ children }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation(); // get current path
  const [showFilters, setShowFilters] = useState(false);

  const categories = ["All", "Fruits", "Vegetables", "Grains", "Dairy Products", "Other"];

  const handleExploreClick = () => {
    if (location.pathname !== "/buyer/buyerMarketplace") {
      // Navigate to marketplace if not already there
      navigate("/buyer/buyerMarketplace");
      setShowFilters(false); // don't show filters yet
    } else {
      // If already on marketplace, toggle filters
      setShowFilters(!showFilters);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-green-700 text-white px-6 py-4 flex justify-between items-center shadow-md relative">
        <h1 className="text-2xl font-bold">🛒 {t("buyersMarketplace")}</h1>

        <div className="flex items-center gap-6 relative">
          {/* Explore Button */}
          <div className="relative">
            <button
              onClick={handleExploreClick}
              className="bg-green-600 px-4 py-2 rounded hover:bg-green-800 transition"
            >
              🌿 {t("explore")}
            </button>

            {/* Show categories only if on /buyer/buyerMarketplace */}
            {showFilters && location.pathname === "/buyer/buyerMarketplace" && (
              <div className="absolute mt-2 bg-white text-black border rounded shadow-lg w-56 right-0 z-50">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => alert(`Filter by ${cat}`)} // Replace with actual filter function
                    className="block w-full text-left px-4 py-2 hover:bg-green-100"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={() => navigate("/buyer/buyerMarketplace/cart")} className="hover:text-yellow-300">
            {t("myCart")}
          </button>
          <button onClick={() => navigate("/buyer/buyerMarketplace/orders")} className="hover:text-yellow-300">
            {t("myOrders")}
          </button>
          <button onClick={() => navigate("/buyer/buyerMarketplace/account")} className="hover:text-yellow-300">
            {t("account")}
          </button>
        </div>
      </nav>

      {/* Page Content */}
      <main className="p-6">{children}</main>
    </div>
  );
}
