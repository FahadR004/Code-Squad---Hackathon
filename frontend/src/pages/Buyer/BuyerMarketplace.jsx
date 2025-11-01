import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function BuyerMarketplace() {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [filter, setFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const sampleProducts = [
  { 
    id: 1, 
    name: "Fresh Tomatoes", 
    category: "Vegetables", 
    price: 250, 
    qty: 120, 
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
    farmerName: "Ali Khan",
    rating: 4.5
  },
  { 
    id: 2, 
    name: "Organic Potatoes", 
    category: "Vegetables", 
    price: 180, 
    qty: 200, 
    image: "https://images.unsplash.com/photo-1603052875633-48f5fdf3f8a6",
    farmerName: "Sara Ahmed",
    rating: 4.7
  },
  { 
    id: 3, 
    name: "Bananas", 
    category: "Fruits", 
    price: 220, 
    qty: 130, 
    image: "https://images.unsplash.com/photo-1574226516831-e1dff420e12e",
    farmerName: "Usman Riaz",
    rating: 4.3
  },
  { 
    id: 4, 
    name: "Wheat Grain", 
    category: "Grains", 
    price: 150, 
    qty: 500, 
    image: "https://images.unsplash.com/photo-1603046891744-6191f1c5d4e2",
    farmerName: "Fatima Iqbal",
    rating: 4.6
  },
  { 
    id: 5, 
    name: "Fresh Milk", 
    category: "Dairy Products", 
    price: 180, 
    qty: 60, 
    image: "https://images.unsplash.com/photo-1582719478173-e6cf49176c39",
    farmerName: "Ahmed Bilal",
    rating: 4.8
  },
  { 
    id: 6, 
    name: "Pure Honey", 
    category: "Other", 
    price: 1200, 
    qty: 50, 
    image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2",
    farmerName: "Hina Shah",
    rating: 4.9
  },
];


    setTimeout(() => {
      setProducts(sampleProducts);
      setFilteredProducts(sampleProducts);
    }, 500);
  }, []);

  const handleFilterChange = (category) => {
    setFilter(category);
    setShowFilters(false);
    if (category === "All") setFilteredProducts(products);
    else setFilteredProducts(products.filter((p) => p.category === category));
  };

  const placeOrder = () => {
    if (!quantity || quantity <= 0) {
      alert(t("enterValidQuantity"));
      return;
    }
    alert(
      `${t("orderPlaced")}\n${t("product")}: ${selected.name}\n${t("quantity")}: ${quantity}\n${t("total")}: PKR ${
        selected.price * quantity
      }`
    );
    setSelected(null);
    setQuantity("");
  };

  const categories = ["All", "Fruits", "Vegetables", "Grains", "Dairy Products", "Other"];

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
        {filteredProducts.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">{t("loading")}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((p) => (
              <div key={p.id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                <img src={p.image} alt={p.name} className="h-40 w-full object-cover rounded mb-3" />
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="text-sm text-gray-600">{t("category")}: {t(`categories.${p.category}`)}</p>
                <p className="text-sm text-gray-600">{t("price")}: PKR {p.price}</p>
                <p className="text-sm text-gray-600">{t("available")}: {p.qty}</p>
                <p className="text-sm text-gray-700 mt-1">
  👨‍🌾 {t("farmer")}: {p.farmerName} | ⭐ {p.rating}
</p>

                <p className="text-sm text-gray-600">{t("available")}: {p.qty}</p>
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
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder={t("enterQuantity")}
              className="border w-full mb-3 px-3 py-2 rounded"
            />
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
