import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import API from '../../api';
import { useCart } from "../../contexts/CartContext";

export default function BuyerMarketplace() {
  const { addToCart } = useCart();
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/products", {
        params: { status: "active", page: 1, limit: 100 }
      });

      const fetchedProducts = response.data.products;
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please try again.");
    }
  };

  const handleFilterChange = (category) => {
    setFilter(category);
    if (category === "All") setFilteredProducts(products);
    else setFilteredProducts(products.filter((p) => p.category === category));
  };

  const categories = ["All", "Fruits", "Vegetables", "Grains", "Dairy Products", "Other"];

  return (
    <div className="p-6 bg-gradient-to-b from-green-50 to-green-100 min-h-screen">
      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 shadow-md">
          {error}
          <button onClick={fetchProducts} className="ml-4 underline font-semibold hover:text-red-900">Retry</button>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="text-center text-gray-500 mt-20 font-semibold text-lg">{t("loading")}...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center text-gray-500 mt-20 font-semibold text-lg">No products available</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 duration-300 border-t-4 border-green-500 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={p.images?.[0] || "https://images.unsplash.com/photo-1560493676-04071c5f467b"}
                  alt={p.name}
                  className="h-44 w-full object-cover"
                />
                {p.organicCertified && (
                  <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow">
                    🌱 Organic
                  </span>
                )}
                {p.qualityGrade && (
                  <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full shadow">
                    Grade {p.qualityGrade}
                  </span>
                )}
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-1">{p.name}</h3>
                <p className="text-sm text-gray-600 mb-1">
                  Category: <span className="font-medium">{p.category}</span>
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  Price: <span className="font-medium">{p.price.currency} {p.price.amount}/{p.price.unit}</span>
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  Available: <span className="font-medium">{p.quantity}</span>
                </p>

                <p className="text-sm text-gray-700 mt-2">
                  👨‍🌾 Farmer: {p.farmerId?.name || "Unknown"}{" "}
                  {p.farmerId?.rating && (
                    <span className="text-yellow-500 font-semibold">
                      | ⭐ {p.farmerId.rating.average.toFixed(1)} ({p.farmerId.rating.count})
                    </span>
                  )}
                </p>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => {
                      addToCart(p, 1);
                      navigate("/buyer/buyerMarketplace/cart/Checkout");
                    }}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-lg font-semibold shadow hover:from-green-600 hover:to-green-700 transition transform hover:scale-105 justify-center flex items-center"
                  >
                    {t("orderNow")}
                  </button>

                  <button
                    onClick={() => addToCart(p, 1)}
                    className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white py-2 rounded-lg font-semibold shadow hover:from-yellow-500 hover:to-yellow-600 transition transform hover:scale-105 justify-center flex items-center"
                  >
                    {t("addToCart")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
