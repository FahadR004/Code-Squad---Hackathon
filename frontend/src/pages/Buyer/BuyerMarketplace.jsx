import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import API from '../../api'

export default function BuyerMarketplace() {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [filter, setFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
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

      // Fetch all active products
      const response = await API.get("/products", {
        params: {
          status: "active",
          page: 1,
          limit: 100 // Adjust based on your needs
        }
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
    setShowFilters(false);
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.category === category));
    }
  };

  const placeOrder = () => {
    if (!quantity || quantity <= 0) {
      alert(t("enterValidQuantity"));
      return;
    }
    
    if (quantity > selected.quantity) {
      alert(`Only ${selected.quantity} units available!`);
      return;
    }

    alert(
      `${t("orderPlaced")}\n${t("product")}: ${selected.name}\n${t("quantity")}: ${quantity}\n${t("total")}: ${selected.price.currency} ${
        selected.price.amount * quantity
      }`
    );
    setSelected(null);
    setQuantity("");
  };

  const categories = ["All","Poultry","Dairy","Meat","Produce","Processed","Fruit","Spices","Herbs","Fiber","Beverages","Grains","Nuts","Sweeteners"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-green-700 text-white px-6 py-4 flex justify-between items-center shadow-md relative">
        <h1 className="text-2xl font-bold">🛒 {t("buyersMarketplace")}</h1>

        <div className="flex items-center gap-6 relative">
          {/* Explore Button */}
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-green-600 px-4 py-2 rounded hover:bg-green-800 transition"
            >
              🌿 {t("explore")}
            </button>

            {showFilters && (
              <div className="absolute mt-2 bg-white text-black border rounded shadow-lg w-56 right-0 z-50">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleFilterChange(cat)}
                    className={`block w-full text-left px-4 py-2 hover:bg-green-100 ${
                      filter === cat ? "bg-green-200 font-semibold" : ""
                    }`}
                  >
                    {t(`categories.${cat}`)}
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

      {/* Products */}
      <div className="p-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
            <button onClick={fetchProducts} className="ml-4 underline">Retry</button>
          </div>
        )}

        {loading ? (
          <div className="text-center text-gray-500 mt-20">{t("loading")}</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">No products available</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((p) => (
              <div key={p._id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                {/* Product Image */}
                <img 
                  src={p.images?.[0] || "https://images.unsplash.com/photo-1560493676-04071c5f467b"} 
                  alt={p.name} 
                  className="h-40 w-full object-cover rounded mb-3" 
                />
                
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="text-sm text-gray-600">{t("category")}: {t(`categories.${p.category}`, { defaultValue: p.category.charAt(0).toUpperCase() + p.category.slice(1) })}</p>
                <p className="text-sm text-gray-600">
                  {t("price")}: {p.price.currency} {p.price.amount}/{p.price.unit}
                </p>
                <p className="text-sm text-gray-600">{t("available")}: {p.quantity}</p>
                
                {/* Farmer Info with Rating */}
                <p className="text-sm text-gray-700 mt-1">
                  👨‍🌾 {t("farmer")}: {p.farmerId?.name || "Unknown"} 
                  {p.farmerId?.rating && (
                    <span> | ⭐ {p.farmerId.rating.average.toFixed(1)} ({p.farmerId.rating.count})</span>
                  )}
                </p>

                {/* Organic Badge */}
                {p.organicCertified && (
                  <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mt-2">
                    🌱 Organic
                  </span>
                )}

                {/* Quality Grade */}
                {p.qualityGrade && (
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-2 ml-2">
                    Grade: {p.qualityGrade}
                  </span>
                )}

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => setSelected(p)}
                    className="w-1/2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                  >
                    {t("orderNow")}
                  </button>
                  <button
                    onClick={() => alert(`${p.name} ${t("addedToCart")}`)}
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

      {/* Order Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-80">
            <h3 className="font-semibold mb-2 text-lg">{t("order")}: {selected.name}</h3>
            <p className="text-sm text-gray-600 mb-2">
              Available: {selected.quantity} {selected.price.unit}
            </p>
            <input
              type="number"
              min="1"
              max={selected.quantity}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder={t("enterQuantity")}
              className="border w-full mb-3 px-3 py-2 rounded"
            />
            <p className="text-sm mb-3">
              Total: {selected.price.currency} {(selected.price.amount * (quantity || 0)).toFixed(2)}
            </p>
            <div className="flex justify-between">
              <button onClick={placeOrder} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                {t("confirm")}
              </button>
              <button onClick={() => setSelected(null)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
                {t("cancel")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}