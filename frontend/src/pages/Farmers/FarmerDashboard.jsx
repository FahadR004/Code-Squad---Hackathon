import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBox, FaShoppingCart, FaMoneyBillWave, FaWarehouse, FaSpinner } from "react-icons/fa";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from "recharts";
import API from "../../api";

// Hook for animated counting
function useCountUp(target, duration = 1000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 30);
    const interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 30);
    return () => clearInterval(interval);
  }, [target, duration]);
  return count;
}

export default function FarmerDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderStats, setOrderStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const dashboardData = {
      products_by_category: { Fruits: 10, Vegetables: 15, Grains: 8, Dairy: 5 },
      total_orders_year: 320,
      recent_orders: [
        { id: 1, product: "Apple", quantity: 10, status: "Delivered" },
        { id: 2, product: "Milk", quantity: 5, status: "Cancelled" },
        { id: 3, product: "Tomatoes", quantity: 20, status: "Delivered" },
      ],
      total_revenue: 120000,
      monthly_sales: {
        October: [
          { day: "Week 1", revenue: 10000 },
          { day: "Week 2", revenue: 15000 },
          { day: "Week 3", revenue: 20000 },
          { day: "Week 4", revenue: 25000 },
        ],
      },
      stock_status: [
        { status: "Used", quantity: 160 },
        { status: "Waste", quantity: 10 },
      ],
    };
    setTimeout(() => setData(dashboardData), 800);
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fahad's API calls
      const statsResponse = await API.get("orders/stats");
      setOrderStats(statsResponse.data.stats);

      const productsResponse = await API.get("products/farmer/my-products", { params: { limit: 100 } });
      setProducts(productsResponse.data.products || []);

      const ordersResponse = await API.get("orders/farmer-orders", { params: { limit: 5 } });
      setRecentOrders(ordersResponse.data.orders || []);

      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch dashboard data");
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Dashboard calculations
  const getProductsByCategory = () => {
    const categoryCounts = {};
    products.forEach((product) => {
      const category = product.category || "Other";
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });
    return categoryCounts;
  };

  const getStockStatus = () => {
    let inStock = 0, lowStock = 0, outOfStock = 0;
    products.forEach((product) => {
      if (product.quantity === 0) outOfStock++;
      else if (product.quantity < 10) lowStock++;
      else inStock++;
    });
    return [
      { status: "In Stock", quantity: inStock, color: "#22c55e" },
      { status: "Low Stock", quantity: lowStock, color: "#eab308" },
      { status: "Out of Stock", quantity: outOfStock, color: "#ef4444" }
    ];
  };

  const getOrdersByStatus = () => {
    if (!orderStats?.byStatus) return [];
    return orderStats.byStatus.map((item) => ({
      status: item._id.charAt(0).toUpperCase() + item._id.slice(1),
      count: item.count,
      revenue: item.totalRevenue
    }));
  };

  const getTotalProducts = () => products.length;
  const getTotalOrders = () => orderStats?.total || 0;
  const getTotalRevenue = () => orderStats?.revenue || 0;
  const getTotalStockQuantity = () => products.reduce((sum, p) => sum + (p.quantity || 0), 0);

  const productsByCategory = getProductsByCategory();
  const stockStatus = getStockStatus();
  const ordersByStatus = getOrdersByStatus();

  // Animated totals
  const animatedTotals = {
    fruits: useCountUp(productsByCategory.Fruits || 0),
    vegetables: useCountUp(productsByCategory.Vegetables || 0),
    grains: useCountUp(productsByCategory.Grains || 0),
    dairy: useCountUp(productsByCategory.Dairy || 0),
    orders: useCountUp(getTotalOrders()),
    revenue: useCountUp(getTotalRevenue()),
  };

  if (!data)
    return (
      <div className="text-center mt-20 text-lg font-semibold animate-pulse">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-100 items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className={`bg-green-800 text-white p-6 flex flex-col transition-all duration-300 ease-in-out shadow-lg ${sidebarOpen ? "w-56" : "w-16"}`}>
        <button
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="mb-6 focus:outline-none self-end text-white hover:text-yellow-400"
        >
          {sidebarOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        <h2 className={`text-lg font-bold mb-6 flex items-center gap-2 truncate transition-opacity duration-500 ${sidebarOpen ? "opacity-100" : "opacity-0"}`}>
          👨‍🌾 Farmer Dashboard
        </h2>

        <nav className="flex flex-col gap-3 text-sm font-medium opacity-90">
          <Link
            to="/farmers/farmerDashboard"
            className="flex items-center gap-2 cursor-pointer hover:text-yellow-400"
          >
            <FaBox />
            <span className={`transition-all duration-300 ${sidebarOpen ? "opacity-100 w-auto ml-2" : "opacity-0 w-0 overflow-hidden"}`}>
              Dashboard
            </span>
          </Link>
          <Link
            to="/farmers/chat"
            className="flex items-center gap-2 cursor-pointer hover:text-yellow-400"
          >
            <FaShoppingCart />
            <span className={`transition-all duration-300 ${sidebarOpen ? "opacity-100 w-auto ml-2" : "opacity-0 w-0 overflow-hidden"}`}>
              ChatBox
            </span>
          </Link>
          <Link
            to="/farmers/orders"
            className="flex items-center gap-2 cursor-pointer hover:text-yellow-400"
          >
            <FaMoneyBillWave />
            <span className={`transition-all duration-300 ${sidebarOpen ? "opacity-100 w-auto ml-2" : "opacity-0 w-0 overflow-hidden"}`}>
              Orders
            </span>
          </Link>
        </nav>

        {sidebarOpen && (
          <div className="mt-auto text-xs text-yellow-300 italic animate-pulse pt-10 select-none">
            Connected to farm network
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="w-full max-w-7xl bg-white rounded-xl p-6 shadow-lg">
          {/* Top Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[{
              label: "Total Products", value: getTotalProducts(), icon: <FaBox />, bg: "from-blue-400 to-blue-600"
            }, {
              label: "Total Orders", value: getTotalOrders(), icon: <FaShoppingCart />, bg: "from-green-400 to-green-600"
            }, {
              label: "Total Revenue", value: getTotalRevenue(), icon: <FaMoneyBillWave />, bg: "from-yellow-400 to-yellow-600"
            }, {
              label: "Total Stock", value: getTotalStockQuantity(), icon: <FaWarehouse />, bg: "from-purple-400 to-purple-600"
            }].map(({ label, value, icon, bg }) => (
              <div key={label} className={`bg-gradient-to-br ${bg} p-6 rounded-lg shadow-lg text-white`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm">{label}</p>
                    <h3 className="text-3xl font-bold mt-1">{value}</h3>
                  </div>
                  <div className="text-4xl opacity-80">{icon}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Orders List */}
          {recentOrders.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow mt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Recent Orders</h3>
              <ul className="space-y-2">
                {recentOrders.map((order) => (
                  <li key={order._id} className="border p-2 rounded flex justify-between">
                    <span>Order #{order._id}</span>
                    <span>{order.status}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Products by Category */}
          {Object.keys(productsByCategory).length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow mt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Products by Category</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(productsByCategory).map(([category, count]) => (
                  <div key={category} className="bg-green-50 border border-green-200 p-4 rounded-lg text-center">
                    <p className="text-gray-600 text-sm">{category}</p>
                    <h3 className="text-3xl font-bold text-green-700 mt-1">{count}</h3>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Orders by Status Bar Chart */}
          <div className="bg-white p-6 rounded-lg shadow mt-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Orders by Status</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ordersByStatus}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip formatter={(value) => new Intl.NumberFormat().format(value)} />
                <Bar dataKey="count" fill="#4ade80" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Stock Status Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow mt-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Stock Status</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stockStatus}
                  dataKey="quantity"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {stockStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}
