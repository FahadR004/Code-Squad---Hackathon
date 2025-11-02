import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBox, FaShoppingCart, FaMoneyBillWave, FaWarehouse, FaSpinner, FaEdit, FaTrash, FaEye, FaHandsHelping, FaSignOutAlt } from "react-icons/fa";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import API from "../../api";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderStats, setOrderStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedView, setSelectedView] = useState('overview'); // overview, products, lowStock

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch farmer's products using the correct endpoint
      const productsResponse = await API.get("products/my-products");
      setProducts(productsResponse.data.products || []);

      // Fetch order stats
      try {
        const statsResponse = await API.get("orders/stats");
        setOrderStats(statsResponse.data.stats);
      } catch (err) {
        console.warn("Orders stats not available:", err);
        setOrderStats({ total: 0, revenue: 0, byStatus: [] });
      }

      // Fetch recent orders
      try {
        const ordersResponse = await API.get("orders/farmer-orders", { params: { limit: 5 } });
        setRecentOrders(ordersResponse.data.orders || []);
      } catch (err) {
        console.warn("Recent orders not available:", err);
        setRecentOrders([]);
      }

      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || t("failed_to_fetch_dashboard_data"));
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear any stored authentication tokens
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    
    // Redirect to homepage
    navigate('/');
  };

  // Dashboard calculations
  const getProductsByCategory = () => {
    const categoryCounts = {};
    products.forEach((product) => {
      const category = product.category || t("other");
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
      { status: t("in_stock"), quantity: inStock, color: "#22c55e" },
      { status: t("low_stock"), quantity: lowStock, color: "#eab308" },
      { status: t("out_of_stock"), quantity: outOfStock, color: "#ef4444" }
    ];
  };

  const getLowStockProducts = () => {
    return products.filter(p => p.quantity > 0 && p.quantity < 10);
  };

  const getOutOfStockProducts = () => {
    return products.filter(p => p.quantity === 0);
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
  const getAveragePrice = () => {
    if (products.length === 0) return 0;
    const total = products.reduce((sum, p) => sum + (p.price?.amount || 0), 0);
    return (total / products.length).toFixed(2);
  };

  const productsByCategory = getProductsByCategory();
  const stockStatus = getStockStatus();
  const ordersByStatus = getOrdersByStatus();
  const lowStockProducts = getLowStockProducts();
  const outOfStockProducts = getOutOfStockProducts();

  // Animated totals
  const animatedProducts = useCountUp(getTotalProducts());
  const animatedOrders = useCountUp(getTotalOrders());
  const animatedRevenue = useCountUp(getTotalRevenue());
  const animatedStock = useCountUp(getTotalStockQuantity());

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm(t("confirm_delete_product"))) return;
    
    try {
      await API.delete(`products/${productId}`);
      setProducts(products.filter(p => p._id !== productId));
      alert(t("product_deleted_successfully"));
    } catch (err) {
      alert(t("failed_to_delete_product") + ': ' + (err.response?.data?.message || err.message));
    }
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
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen font-sans overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <aside className={`bg-green-800 text-white pt-1 flex flex-col transition-all duration-300 ease-in-out shadow-lg ${sidebarOpen ? "w-56" : "w-14"}`}>
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-white hover:text-yellow-400 transition-colors ml-3"
            title={t("logout")}
          >
            <FaSignOutAlt className="text-lg" />
            {sidebarOpen && (
              <span className="text-sm font-medium">{t("logout")}</span>
            )}
          </button>
          <button
            aria-label={sidebarOpen ? t("close_sidebar") : t("open_sidebar")}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="focus:outline-none text-white hover:text-yellow-400 mr-2"
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
        </div>

        <nav className="flex flex-col text-sm font-medium opacity-90 justify-center">
          <Link
            to="/farmers/products"
            className="flex items-center pl-3 gap-2 cursor-pointer hover:text-yellow-400 hover:bg-green-900 py-4"
          >
            <FaBox className="text-lg"/>
            <span className={`transition-all duration-300 ${sidebarOpen ? "opacity-100 w-auto ml-2" : "opacity-0 w-0 overflow-hidden"} text-lg`}>
              {t("products")}
            </span>
          </Link>
          <Link
            to="/farmers/orders"
            className="flex items-center pl-3 gap-2 cursor-pointer hover:text-yellow-400 hover:bg-green-900 py-4"
          >
            <FaMoneyBillWave className="text-xl"/>
            <span className={`transition-all duration-300 ${sidebarOpen ? "opacity-100 w-auto ml-2" : "opacity-0 w-0 overflow-hidden"} text-lg`}>
              {t("orders")}
            </span>
          </Link>
          <Link
            to="/farmers/chat"
            className="flex items-center pl-3 gap-2 cursor-pointer hover:text-yellow-400 hover:bg-green-900 py-4"
          >
            <FaShoppingCart className="text-xl"/>
            <span className={`transition-all duration-300 ${sidebarOpen ? "opacity-100 w-auto ml-2" : "opacity-0 w-0 overflow-hidden"} text-lg`}>
              {t("chat_box")}
            </span>
          </Link>
          <Link
            to="/farmers/donate-waste"
            className="flex items-center pl-3 gap-2 cursor-pointer hover:text-yellow-400 hover:bg-green-900 py-4"
          >
            <FaHandsHelping className="text-xl"/>
            <span className={`transition-all duration-300 ${sidebarOpen ? "opacity-100 w-auto ml-2" : "opacity-0 w-0 overflow-hidden"} text-lg`}>
              {t("donate_waste")}
            </span>
          </Link>
        </nav>

        {sidebarOpen && (
          <div className="mt-auto text-xs text-yellow-300 italic animate-pulse pt-10 select-none mb-4 px-3">
            {t("connected_to_farm_network")}
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="w-full max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">{t("farmer_dashboard")}</h1>
            <p className="text-gray-600 mt-1">{t("manage_your_products_and_track_performance")}</p>
          </div>

          {/* View Selector */}
          <div className="flex gap-2 mb-6 bg-white p-2 rounded-lg shadow">
            <button
              onClick={() => setSelectedView('overview')}
              className={`px-4 py-2 rounded ${selectedView === 'overview' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {t("overview")}
            </button>
            <button
              onClick={() => setSelectedView('products')}
              className={`px-4 py-2 rounded ${selectedView === 'products' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {t("all_products")}
            </button>
            <button
              onClick={() => setSelectedView('lowStock')}
              className={`px-4 py-2 rounded ${selectedView === 'lowStock' ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {t("low_stock")} ({lowStockProducts.length})
            </button>
          </div>

          {/* Top Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {[{
              label: t("total_products"), value: animatedProducts, icon: <FaBox />, bg: "from-blue-400 to-blue-600"
            }, {
              label: t("total_orders"), value: animatedOrders, icon: <FaShoppingCart />, bg: "from-green-400 to-green-600"
            }, {
              label: t("total_revenue"), value: `Rs. ${animatedRevenue}`, icon: <FaMoneyBillWave />, bg: "from-yellow-400 to-yellow-600"
            }, {
              label: t("total_stock"), value: animatedStock, icon: <FaWarehouse />, bg: "from-purple-400 to-purple-600"
            }].map(({ label, value, icon, bg }) => (
              <div key={label} className={`bg-gradient-to-br ${bg} p-6 rounded-lg shadow-lg text-white`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm opacity-90">{label}</p>
                    <h3 className="text-3xl font-bold mt-1">{value}</h3>
                  </div>
                  <div className="text-4xl opacity-80">{icon}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* In Stock Card */}
            <div className="bg-white border-l-4 border-green-500 rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">{t("in_stock")}</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">
                    {stockStatus.find(s => s.status === t("in_stock"))?.quantity || 0}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{t("products_available")}</p>
                </div>
                <FaBox className="text-5xl text-green-200" />
              </div>
            </div>

            {/* Low Stock Card */}
            <div className="bg-white border-l-4 border-yellow-500 rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">{t("low_stock")}</p>
                  <p className="text-3xl font-bold text-yellow-600 mt-2">
                    {stockStatus.find(s => s.status === t("low_stock"))?.quantity || 0}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{t("running_low")} (&lt;10 {t("units")})</p>
                </div>
                <FaWarehouse className="text-5xl text-yellow-200" />
              </div>
              {lowStockProducts.length > 0 && (
                <button
                  onClick={() => setSelectedView('lowStock')}
                  className="mt-3 text-sm text-yellow-600 hover:text-yellow-800 font-medium"
                >
                  {t("view_details")} →
                </button>
              )}
            </div>

            {/* Out of Stock Card */}
            <div className="bg-white border-l-4 border-red-500 rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">{t("out_of_stock")}</p>
                  <p className="text-3xl font-bold text-red-600 mt-2">
                    {stockStatus.find(s => s.status === t("out_of_stock"))?.quantity || 0}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{t("needs_restocking")}</p>
                </div>
                <FaWarehouse className="text-5xl text-red-200" />
              </div>
              {outOfStockProducts.length > 0 && (
                <button
                  onClick={() => setSelectedView('lowStock')}
                  className="mt-3 text-sm text-red-600 hover:text-red-800 font-medium"
                >
                  {t("restock_now")} →
                </button>
              )}
            </div>
          </div>

          {/* Overview View */}
          {selectedView === 'overview' && (
            <>
              {/* Products by Category */}
              {Object.keys(productsByCategory).length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">{t("products_by_category")}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(productsByCategory).map(([category, count]) => (
                      <div key={category} className="bg-green-50 border border-green-200 p-4 rounded-lg text-center hover:shadow-md transition">
                        <p className="text-gray-600 text-sm">{category}</p>
                        <h3 className="text-3xl font-bold text-green-700 mt-1">{count}</h3>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Stock Status Pie Chart */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">{t("stock_status")}</h3>
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

                {/* Orders by Status Bar Chart */}
                {ordersByStatus.length > 0 && (
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">{t("orders_by_status")}</h3>
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
                )}
              </div>

              {/* Alerts for Low/Out of Stock */}
              {(lowStockProducts.length > 0 || outOfStockProducts.length > 0) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {lowStockProducts.length > 0 && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <FaWarehouse className="text-yellow-600 text-xl mr-2" />
                        <h4 className="text-lg font-semibold text-yellow-800">{t("low_stock_alert")}</h4>
                      </div>
                      <p className="text-yellow-700 mb-2">{lowStockProducts.length} {t("products_running_low")}</p>
                      <button
                        onClick={() => setSelectedView('lowStock')}
                        className="text-yellow-600 hover:text-yellow-800 font-medium text-sm"
                      >
                        {t("view_details")} →
                      </button>
                    </div>
                  )}
                  {outOfStockProducts.length > 0 && (
                    <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <FaWarehouse className="text-red-600 text-xl mr-2" />
                        <h4 className="text-lg font-semibold text-red-800">{t("out_of_stock")}</h4>
                      </div>
                      <p className="text-red-700 mb-2">{outOfStockProducts.length} {t("products_unavailable")}</p>
                      <button
                        onClick={() => setSelectedView('products')}
                        className="text-red-600 hover:text-red-800 font-medium text-sm"
                      >
                        {t("restock_now")} →
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Recent Orders */}
              {recentOrders.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">{t("recent_orders")}</h3>
                  <div className="space-y-2">
                    {recentOrders.map((order) => (
                      <div key={order._id} className="border border-gray-200 p-4 rounded flex justify-between items-center hover:bg-gray-50">
                        <div>
                          <span className="font-medium">{t("order")} #{order._id.slice(-8)}</span>
                          <span className="text-gray-500 text-sm ml-2">{new Date(order.createdAt).toLocaleDateString()}</span>
                        </div>
                        <span className={`px-3 py-1 rounded text-sm font-medium ${
                          order.status === 'completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* All Products View */}
          {selectedView === 'products' && (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{t("all_products")} ({products.length})</h3>
                <Link
                  to="/farmers/products/create"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  {t("add_product")}
                </Link>
              </div>
              {products.length === 0 ? (
                <p className="text-gray-500 text-center py-8">{t("no_products_found")}</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t("product")}</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t("category")}</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t("price")}</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t("stock_quantity")}</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t("stock_status")}</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t("actions")}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {products.map((product) => {
                        // Determine stock status
                        const stockQty = product.quantity || 0;
                        let stockBadge = {
                          text: t('in_stock'),
                          bgColor: 'bg-green-100',
                          textColor: 'text-green-800',
                          qtyColor: 'text-green-600'
                        };
                        
                        if (stockQty === 0) {
                          stockBadge = {
                            text: t('out_of_stock'),
                            bgColor: 'bg-red-100',
                            textColor: 'text-red-800',
                            qtyColor: 'text-red-600'
                          };
                        } else if (stockQty < 10) {
                          stockBadge = {
                            text: t('low_stock'),
                            bgColor: 'bg-yellow-100',
                            textColor: 'text-yellow-800',
                            qtyColor: 'text-yellow-600'
                          };
                        }

                        return (
                          <tr key={product._id} className={`hover:bg-gray-50 ${stockQty === 0 ? 'bg-red-50' : ''}`}>
                            <td className="px-4 py-3">
                              <div className="flex items-center">
                                {product.images && product.images[0] && (
                                  <img 
                                    src={product.images[0]} 
                                    alt={product.name} 
                                    className={`w-10 h-10 rounded object-cover mr-3 ${stockQty === 0 ? 'opacity-50' : ''}`}
                                  />
                                )}
                                <span className={`font-medium ${stockQty === 0 ? 'text-gray-500' : 'text-gray-900'}`}>
                                  {product.name}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-gray-700">{product.category}</td>
                            <td className="px-4 py-3 text-gray-700">Rs. {product.price?.amount}/{product.price?.unit}</td>
                            <td className="px-4 py-3">
                              <span className={`font-bold text-lg ${stockBadge.qtyColor}`}>
                                {stockQty}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${stockBadge.bgColor} ${stockBadge.textColor}`}>
                                {stockBadge.text}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex gap-2">
                                <Link
                                  to={`/farmers/products/${product._id}`}
                                  className="text-blue-600 hover:text-blue-800"
                                  title={t("view")}
                                >
                                  <FaEye />
                                </Link>
                                <Link
                                  to={`/farmers/products/edit/${product._id}`}
                                  className="text-green-600 hover:text-green-800"
                                  title={t("edit")}
                                >
                                  <FaEdit />
                                </Link>
                                <button
                                  onClick={() => handleDeleteProduct(product._id)}
                                  className="text-red-600 hover:text-red-800"
                                  title={t("delete")}
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Low Stock View */}
          {selectedView === 'lowStock' && (
            <div className="space-y-6">
              {/* OUT OF STOCK SECTION */}
              {outOfStockProducts.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-red-300">
                  <div className="flex items-center mb-4">
                    <div className="bg-red-500 text-white rounded-full p-3 mr-3">
                      <FaWarehouse className="text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-red-800">
                        {t("out_of_stock_urgent_action")}
                      </h3>
                      <p className="text-sm text-red-600">
                        {outOfStockProducts.length} {t("products_need_restocking")}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {outOfStockProducts.map((product) => (
                      <div 
                        key={product._id} 
                        className="bg-red-50 border-2 border-red-300 p-4 rounded-lg flex justify-between items-center"
                      >
                        <div className="flex items-center flex-1">
                          {product.images && product.images[0] && (
                            <img 
                              src={product.images[0]} 
                              alt={product.name} 
                              className="w-16 h-16 rounded object-cover mr-4 opacity-60" 
                            />
                          )}
                          <div>
                            <h4 className="font-bold text-gray-900">{product.name}</h4>
                            <p className="text-sm text-gray-600">{product.category}</p>
                            <p className="text-sm font-medium text-gray-700">
                              Rs. {product.price?.amount}/{product.price?.unit}
                            </p>
                          </div>
                        </div>
                        <div className="text-center mr-4 bg-red-100 px-4 py-2 rounded">
                          <p className="text-3xl font-black text-red-700">0</p>
                          <p className="text-xs text-red-600 font-semibold uppercase">{t("out_of_stock")}</p>
                        </div>
                        <Link
                          to={`/farmers/products/edit/${product._id}`}
                          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 font-semibold shadow-lg"
                        >
                          {t("restock_now")}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* LOW STOCK SECTION */}
              {lowStockProducts.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-yellow-300">
                  <div className="flex items-center mb-4">
                    <div className="bg-yellow-500 text-white rounded-full p-3 mr-3">
                      <FaWarehouse className="text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-yellow-800">
                        {t("low_stock_action_recommended")}
                      </h3>
                      <p className="text-sm text-yellow-600">
                        {lowStockProducts.length} {t("products_running_low_units")}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {lowStockProducts.map((product) => (
                      <div 
                        key={product._id} 
                        className="bg-yellow-50 border-2 border-yellow-300 p-4 rounded-lg flex justify-between items-center"
                      >
                        <div className="flex items-center flex-1">
                          {product.images && product.images[0] && (
                            <img 
                              src={product.images[0]} 
                              alt={product.name} 
                              className="w-16 h-16 rounded object-cover mr-4" 
                            />
                          )}
                          <div>
                            <h4 className="font-bold text-gray-900">{product.name}</h4>
                            <p className="text-sm text-gray-600">{product.category}</p>
                            <p className="text-sm font-medium text-gray-700">
                              Rs. {product.price?.amount}/{product.price?.unit}
                            </p>
                          </div>
                        </div>
                        <div className="text-center mr-4 bg-yellow-100 px-4 py-2 rounded">
                          <p className="text-3xl font-black text-yellow-700">{product.quantity}</p>
                          <p className="text-xs text-yellow-600 font-semibold uppercase">{t("units_left")}</p>
                        </div>
                        <Link
                          to={`/farmers/products/edit/${product._id}`}
                          className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 font-semibold shadow-lg"
                        >
                          {t("restock")}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* NO ISSUES */}
              {lowStockProducts.length === 0 && outOfStockProducts.length === 0 && (
                <div className="bg-green-50 border-2 border-green-300 p-8 rounded-lg text-center">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-2xl font-bold text-green-800 mb-2">
                    {t("all_products_well_stocked")}
                  </h3>
                  <p className="text-green-600">
                    {t("inventory_great_shape")}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}