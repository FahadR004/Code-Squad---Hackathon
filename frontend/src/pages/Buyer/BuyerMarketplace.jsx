import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import API from "../../api";
import { useCart } from "../../contexts/CartContext";

export default function BuyerMarketplace() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addToCart } = useCart(); // ✅ from CartContext

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await API.get("/products", {
        params: { status: "active", page: 1, limit: 100 },
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

  // ✅ Add to cart and navigate to checkout
  const handleOrderNow = (product) => {
    addToCart(product);
    navigate("/buyer/buyerMarketplace/cart/Checkout");
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
          <button onClick={fetchProducts} className="ml-4 underline">
            Retry
          </button>
        </div>
      )}

      {/* Loading / Products */}
      {loading ? (
        <div className="text-center text-gray-500 mt-20">{t("loading")}</div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          {t("noProductsAvailable") || "No products available"}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
            <div
              key={p._id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={
                  p.images?.[0] ||
                  "https://images.unsplash.com/photo-1560493676-04071c5f467b"
                }
                alt={p.name}
                className="h-40 w-full object-cover rounded mb-3"
              />
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="text-sm text-gray-600">
                {t("category")}:{" "}
                {t(`categories.${p.category}`, {
                  defaultValue:
                    p.category.charAt(0).toUpperCase() + p.category.slice(1),
                })}
              </p>
              <p className="text-sm text-gray-600">
                {t("price")}: {p.price.currency} {p.price.amount}/
                {p.price.unit}
              </p>
              <p className="text-sm text-gray-600">
                {t("available")}: {p.quantity}
              </p>
              <p className="text-sm text-gray-700 mt-1">
                👨‍🌾 {t("farmer")}: {p.farmerId?.name || "Unknown"}{" "}
                {p.farmerId?.rating && (
                  <span>
                    {" "}
                    | ⭐ {p.farmerId.rating.average.toFixed(1)} (
                    {p.farmerId.rating.count})
                  </span>
                )}
              </p>

              {p.organicCertified && (
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mt-2">
                  🌱 Organic
                </span>
              )}
              {p.qualityGrade && (
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-2 ml-2">
                  Grade: {p.qualityGrade}
                </span>
              )}

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleOrderNow(p)}
                  className="w-1/2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  {t("orderNow")}
                </button>
                <button
                  onClick={() => handleAddToCart(p)}
                  className="w-1/2 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
                >
                  {t("addToCart")}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
