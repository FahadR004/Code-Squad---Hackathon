import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, PieChart, Pie, Cell } from "recharts";
import { FaBox, FaShoppingCart, FaMoneyBillWave, FaWarehouse, FaSpinner } from "react-icons/fa";
import API from "../../api";

export default function FarmerDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Dashboard data states
  const [orderStats, setOrderStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  
  const [selectedMonth, setSelectedMonth] = useState("All Time");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch order statistics
      const statsResponse = await API.get("orders/stats");
      setOrderStats(statsResponse.data.stats);

      // Fetch farmer's products
      const productsResponse = await API.get("products/farmer/my-products", {
        params: { limit: 100 }
      });
      setProducts(productsResponse.data.products || []);

      // Fetch recent orders
      const ordersResponse = await API.get("orders/farmer-orders", {
        params: { limit: 5 }
      });
      setRecentOrders(ordersResponse.data.orders || []);

      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch dashboard data");
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate products by category
  const getProductsByCategory = () => {
    const categoryCounts = {};
    products.forEach(product => {
      const category = product.category || "Other";
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });
    return categoryCounts;
  };

  // Calculate stock status
  const getStockStatus = () => {
    let inStock = 0;
    let lowStock = 0;
    let outOfStock = 0;

    products.forEach(product => {
      if (product.quantity === 0) {
        outOfStock++;
      } else if (product.quantity < 10) {
        lowStock++;
      } else {
        inStock++;
      }
    });

    return [
      { status: "In Stock", quantity: inStock, color: "#22c55e" },
      { status: "Low Stock", quantity: lowStock, color: "#eab308" },
      { status: "Out of Stock", quantity: outOfStock, color: "#ef4444" }
    ];
  };

  // Get orders by status for chart
  const getOrdersByStatus = () => {
    if (!orderStats?.byStatus) return [];
    
    return orderStats.byStatus.map(item => ({
      status: item._id.charAt(0).toUpperCase() + item._id.slice(1),
      count: item.count,
      revenue: item.totalRevenue
    }));
  };

  // Calculate total products
  const getTotalProducts = () => products.length;

  // Calculate total orders
  const getTotalOrders = () => orderStats?.total || 0;

  // Calculate total revenue (excluding cancelled)
  const getTotalRevenue = () => orderStats?.revenue || 0;

  // Get total stock quantity
  const getTotalStockQuantity = () => {
    return products.reduce((sum, product) => sum + (product.quantity || 0), 0);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-100 items-center justify-center">
        <FaSpinner className="animate-spin text-5xl text-green-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-100 items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded">
          {error}
        </div>
      </div>
    );
  }

  const productsByCategory = getProductsByCategory();
  const stockStatus = getStockStatus();
  const ordersByStatus = getOrdersByStatus();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-green-700 shadow-lg p-6">
        <h2 className="text-xl font-bold mb-6 text-white">👨‍🌾 Farmer Dashboard</h2>
        <ul className="space-y-3 text-green-50">
          <li className="hover:text-white cursor-pointer font-medium">Overview</li>
          <li className="hover:text-white cursor-pointer">Products</li>
          <li className="hover:text-white cursor-pointer">Orders</li>
          <li className="hover:text-white cursor-pointer">Reviews</li>
          <li className="hover:text-white cursor-pointer">Settings</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
          <button
            onClick={fetchDashboardData}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Refresh Data
          </button>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-6 rounded-lg shadow-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Products</p>
                <h3 className="text-3xl font-bold mt-1">{getTotalProducts()}</h3>
              </div>
              <FaBox className="text-4xl opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-400 to-green-600 p-6 rounded-lg shadow-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Total Orders</p>
                <h3 className="text-3xl font-bold mt-1">{getTotalOrders()}</h3>
              </div>
              <FaShoppingCart className="text-4xl opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-6 rounded-lg shadow-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm">Total Revenue</p>
                <h3 className="text-3xl font-bold mt-1">
                  {getTotalRevenue().toLocaleString()}
                </h3>
                <p className="text-xs text-yellow-100">PKR</p>
              </div>
              <FaMoneyBillWave className="text-4xl opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-400 to-purple-600 p-6 rounded-lg shadow-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Total Stock</p>
                <h3 className="text-3xl font-bold mt-1">{getTotalStockQuantity()}</h3>
                <p className="text-xs text-purple-100">Units</p>
              </div>
              <FaWarehouse className="text-4xl opacity-80" />
            </div>
          </div>
        </div>

        {/* Products by Category */}
        {Object.keys(productsByCategory).length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow">
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

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Orders by Status Chart */}
          {ordersByStatus.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Orders by Status</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ordersByStatus}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#22c55e" name="Order Count" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Stock Status Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
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
                  label={(entry) => `${entry.status}: ${entry.quantity}`}
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

        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Recent Orders</h3>
          {recentOrders.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No orders yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Buyer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{order._id.slice(-8)}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{order.buyerId.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{order.items.length} items</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        PKR {order.totalAmount}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}