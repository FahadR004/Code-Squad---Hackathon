import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBox, FaShoppingCart, FaMoneyBillWave, FaWarehouse, FaSpinner, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
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
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await API.delete(`products/${productId}`);
      setProducts(products.filter(p => p._id !== productId));
      alert('Product deleted successfully');
    } catch (err) {
      alert('Failed to delete product: ' + (err.response?.data?.message || err.message));
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
        <button
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="mb-6 focus:outline-none self-end text-white hover:text-yellow-400"
        >
          {sidebarOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-5 mt-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        <nav className="flex flex-col text-sm font-medium opacity-90 justify-center">
          <Link
            to="/farmers/products"
            className="flex items-center pl-3 gap-2 cursor-pointer hover:text-yellow-400 hover:bg-green-900"
          >
            <FaBox className="text-lg"/>
            <span className={`transition-all duration-300 ${sidebarOpen ? "opacity-100 w-auto ml-2" : "opacity-0 w-0 overflow-hidden"} text-lg py-4`}>
              Products
            </span>
          </Link>
          <Link
            to="/farmers/orders"
            className="flex items-center pl-3 gap-2 cursor-pointer hover:text-yellow-400 hover:bg-green-900"
          >
            <FaMoneyBillWave className="text-xl"/>
            <span className={`transition-all duration-300 ${sidebarOpen ? "opacity-100 w-auto ml-2" : "opacity-0 w-0 overflow-hidden"} text-lg py-4`}>
              Orders
            </span>
          </Link>
          <Link
            to="/farmers/chat"
            className="flex items-center pl-3 gap-2 cursor-pointer hover:text-yellow-400 hover:bg-green-900"
          >
            <FaShoppingCart className="text-xl"/>
            <span className={`transition-all duration-300 ${sidebarOpen ? "opacity-100 w-auto ml-2" : "opacity-0 w-0 overflow-hidden"} text-lg py-4`}>
              ChatBox
            </span>
          </Link>
        </nav>

        {sidebarOpen && (
          <div className="mt-auto text-xs text-yellow-300 italic animate-pulse pt-10 select-none mb-4 px-3">
            Connected to farm network
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="w-full max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Farmer Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your products and track your farm performance</p>
          </div>

          {/* View Selector */}
          <div className="flex gap-2 mb-6 bg-white p-2 rounded-lg shadow">
            <button
              onClick={() => setSelectedView('overview')}
              className={`px-4 py-2 rounded ${selectedView === 'overview' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Overview
            </button>
            <button
              onClick={() => setSelectedView('products')}
              className={`px-4 py-2 rounded ${selectedView === 'products' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              All Products
            </button>
            <button
              onClick={() => setSelectedView('lowStock')}
              className={`px-4 py-2 rounded ${selectedView === 'lowStock' ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Low Stock ({lowStockProducts.length})
            </button>
          </div>

          {/* Top Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {[{
              label: "Total Products", value: animatedProducts, icon: <FaBox />, bg: "from-blue-400 to-blue-600"
            }, {
              label: "Total Orders", value: animatedOrders, icon: <FaShoppingCart />, bg: "from-green-400 to-green-600"
            }, {
              label: "Total Revenue", value: `Rs. ${animatedRevenue}`, icon: <FaMoneyBillWave />, bg: "from-yellow-400 to-yellow-600"
            }, {
              label: "Total Stock", value: animatedStock, icon: <FaWarehouse />, bg: "from-purple-400 to-purple-600"
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
        <p className="text-sm text-gray-600 font-medium">In Stock</p>
        <p className="text-3xl font-bold text-green-600 mt-2">
          {stockStatus.find(s => s.status === "In Stock")?.quantity || 0}
        </p>
        <p className="text-xs text-gray-500 mt-1">Products available</p>
      </div>
      <FaBox className="text-5xl text-green-200" />
    </div>
  </div>

  {/* Low Stock Card */}
  <div className="bg-white border-l-4 border-yellow-500 rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600 font-medium">Low Stock</p>
        <p className="text-3xl font-bold text-yellow-600 mt-2">
          {stockStatus.find(s => s.status === "Low Stock")?.quantity || 0}
        </p>
        <p className="text-xs text-gray-500 mt-1">Running low (&lt;10 units)</p>
      </div>
      <FaWarehouse className="text-5xl text-yellow-200" />
    </div>
    {lowStockProducts.length > 0 && (
      <button
        onClick={() => setSelectedView('lowStock')}
        className="mt-3 text-sm text-yellow-600 hover:text-yellow-800 font-medium"
      >
        View Details →
      </button>
    )}
  </div>

  {/* Out of Stock Card - NOW MORE PROMINENT */}
  <div className="bg-white border-l-4 border-red-500 rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600 font-medium">Out of Stock</p>
        <p className="text-3xl font-bold text-red-600 mt-2">
          {stockStatus.find(s => s.status === "Out of Stock")?.quantity || 0}
        </p>
        <p className="text-xs text-gray-500 mt-1">Needs restocking</p>
      </div>
      <FaWarehouse className="text-5xl text-red-200" />
    </div>
    {outOfStockProducts.length > 0 && (
      <button
        onClick={() => setSelectedView('lowStock')}
        className="mt-3 text-sm text-red-600 hover:text-red-800 font-medium"
      >
        Restock Now →
      </button>
    )}
  </div>
</div>

<table className="w-full">
  <thead className="bg-gray-50">
    <tr>
      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock Qty</th>
      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock Status</th>
      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
    </tr>
  </thead>
  <tbody className="divide-y divide-gray-200">
    {products.map((product) => {
      // Determine stock status
      const stockQty = product.quantity || 0;
      let stockBadge = {
        text: 'In Stock',
        bgColor: 'bg-green-100',
        textColor: 'text-green-800',
        qtyColor: 'text-green-600'
      };
      
      if (stockQty === 0) {
        stockBadge = {
          text: 'Out of Stock',
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          qtyColor: 'text-red-600'
        };
      } else if (stockQty < 10) {
        stockBadge = {
          text: 'Low Stock',
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
                title="View"
              >
                <FaEye />
              </Link>
              <Link
                to={`/farmers/products/edit/${product._id}`}
                className="text-green-600 hover:text-green-800"
                title="Edit"
              >
                <FaEdit />
              </Link>
              <button
                onClick={() => handleDeleteProduct(product._id)}
                className="text-red-600 hover:text-red-800"
                title="Delete"
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

{selectedView === 'lowStock' && (
  <div className="space-y-6">
    {/* OUT OF STOCK SECTION - NOW SHOWN FIRST & MORE PROMINENT */}
    {outOfStockProducts.length > 0 && (
      <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-red-300">
        <div className="flex items-center mb-4">
          <div className="bg-red-500 text-white rounded-full p-3 mr-3">
            <FaWarehouse className="text-2xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-red-800">
              Out of Stock - Urgent Action Required
            </h3>
            <p className="text-sm text-red-600">
              {outOfStockProducts.length} products need immediate restocking
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
                    ${product.price?.amount}/{product.price?.unit}
                  </p>
                </div>
              </div>
              <div className="text-center mr-4 bg-red-100 px-4 py-2 rounded">
                <p className="text-3xl font-black text-red-700">0</p>
                <p className="text-xs text-red-600 font-semibold uppercase">Out of Stock</p>
              </div>
              <Link
                to={`/farmers/products/edit/${product._id}`}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 font-semibold shadow-lg"
              >
                Restock Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* LOW STOCK SECTION - SHOWN SECOND */}
    {lowStockProducts.length > 0 && (
      <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-yellow-300">
        <div className="flex items-center mb-4">
          <div className="bg-yellow-500 text-white rounded-full p-3 mr-3">
            <FaWarehouse className="text-2xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-yellow-800">
              Low Stock - Action Recommended
            </h3>
            <p className="text-sm text-yellow-600">
              {lowStockProducts.length} products running low (less than 10 units)
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
                    ${product.price?.amount}/{product.price?.unit}
                  </p>
                </div>
              </div>
              <div className="text-center mr-4 bg-yellow-100 px-4 py-2 rounded">
                <p className="text-3xl font-black text-yellow-700">{product.quantity}</p>
                <p className="text-xs text-yellow-600 font-semibold uppercase">Units Left</p>
              </div>
              <Link
                to={`/farmers/products/edit/${product._id}`}
                className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 font-semibold shadow-lg"
              >
                Restock
              </Link>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* NO ISSUES - CELEBRATION MESSAGE */}
    {lowStockProducts.length === 0 && outOfStockProducts.length === 0 && (
      <div className="bg-green-50 border-2 border-green-300 p-8 rounded-lg text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">
          All Products Well Stocked!
        </h3>
        <p className="text-green-600">
          Your inventory is in great shape. Keep up the good work!
        </p>
      </div>
    )}
  </div>
)}
          {/* Overview View */}
          {selectedView === 'overview' && (
            <>
              {/* Products by Category */}
              {Object.keys(productsByCategory).length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Products by Category</h3>
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

                {/* Orders by Status Bar Chart */}
                {ordersByStatus.length > 0 && (
                  <div className="bg-white p-6 rounded-lg shadow-lg">
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
                )}
              </div>

              {/* Alerts for Low/Out of Stock */}
              {(lowStockProducts.length > 0 || outOfStockProducts.length > 0) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {lowStockProducts.length > 0 && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <FaWarehouse className="text-yellow-600 text-xl mr-2" />
                        <h4 className="text-lg font-semibold text-yellow-800">Low Stock Alert</h4>
                      </div>
                      <p className="text-yellow-700 mb-2">{lowStockProducts.length} products running low</p>
                      <button
                        onClick={() => setSelectedView('lowStock')}
                        className="text-yellow-600 hover:text-yellow-800 font-medium text-sm"
                      >
                        View Details →
                      </button>
                    </div>
                  )}
                  {outOfStockProducts.length > 0 && (
                    <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <FaWarehouse className="text-red-600 text-xl mr-2" />
                        <h4 className="text-lg font-semibold text-red-800">Out of Stock</h4>
                      </div>
                      <p className="text-red-700 mb-2">{outOfStockProducts.length} products unavailable</p>
                      <button
                        onClick={() => setSelectedView('products')}
                        className="text-red-600 hover:text-red-800 font-medium text-sm"
                      >
                        Restock Now →
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Recent Orders */}
              {recentOrders.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Recent Orders</h3>
                  <div className="space-y-2">
                    {recentOrders.map((order) => (
                      <div key={order._id} className="border border-gray-200 p-4 rounded flex justify-between items-center hover:bg-gray-50">
                        <div>
                          <span className="font-medium">Order #{order._id.slice(-8)}</span>
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
                <h3 className="text-xl font-semibold text-gray-800">All Products ({products.length})</h3>
                <Link
                  to="/farmers/products/create"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  + Add Product
                </Link>
              </div>
              {products.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No products found. Start by adding your first product!</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {products.map((product) => (
                        <tr key={product._id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              {product.images && product.images[0] && (
                                <img src={product.images[0]} alt={product.name} className="w-10 h-10 rounded object-cover mr-3" />
                              )}
                              <span className="font-medium text-gray-900">{product.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-gray-700">{product.category}</td>
                          <td className="px-4 py-3 text-gray-700">${product.price?.amount}/{product.price?.unit}</td>
                          <td className="px-4 py-3">
                            <span className={`font-medium ${
                              product.quantity === 0 ? 'text-red-600' :
                              product.quantity < 10 ? 'text-yellow-600' :
                              'text-green-600'
                            }`}>
                              {product.quantity}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              product.status === 'active' ? 'bg-green-100 text-green-800' :
                              product.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {product.status || 'active'}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <Link
                                to={`/farmers/products/${product._id}`}
                                className="text-blue-600 hover:text-blue-800"
                                title="View"
                              >
                                <FaEye />
                              </Link>
                              <Link
                                to={`/farmers/products/edit/${product._id}`}
                                className="text-green-600 hover:text-green-800"
                                title="Edit"
                              >
                                <FaEdit />
                              </Link>
                              <button
                                onClick={() => handleDeleteProduct(product._id)}
                                className="text-red-600 hover:text-red-800"
                                title="Delete"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Low Stock View */}
          {selectedView === 'lowStock' && (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Low Stock Products ({lowStockProducts.length})</h3>
              {lowStockProducts.length === 0 ? (
                <p className="text-gray-500 text-center py-8">All products are well stocked! 🎉</p>
              ) : (
                <div className="space-y-4">
                  {lowStockProducts.map((product) => (
                    <div key={product._id} className="border border-yellow-200 bg-yellow-50 p-4 rounded-lg flex justify-between items-center">
                      <div className="flex items-center flex-1">
                        {product.images && product.images[0] && (
                          <img src={product.images[0]} alt={product.name} className="w-16 h-16 rounded object-cover mr-4" />
                        )}
                        <div>
                          <h4 className="font-semibold text-gray-900">{product.name}</h4>
                          <p className="text-sm text-gray-600">{product.category}</p>
                          <p className="text-sm text-gray-600">${product.price?.amount}/{product.price?.unit}</p>
                        </div>
                      </div>
                      <div className="text-right mr-4">
                        <p className="text-2xl font-bold text-yellow-600">{product.quantity}</p>
                        <p className="text-xs text-gray-600">units left</p>
                      </div>
                      <Link
                        to={`/farmers/products/edit/${product._id}`}
                        className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
                      >
                        Restock
                      </Link>
                    </div>
                  ))}
                </div>
              )}
              
              {outOfStockProducts.length > 0 && (
                <>
                  <h3 className="text-xl font-semibold mb-4 mt-8 text-gray-800">Out of Stock ({outOfStockProducts.length})</h3>
                  <div className="space-y-4">
                    {outOfStockProducts.map((product) => (
                      <div key={product._id} className="border border-red-200 bg-red-50 p-4 rounded-lg flex justify-between items-center">
                        <div className="flex items-center flex-1">
                          {product.images && product.images[0] && (
                            <img src={product.images[0]} alt={product.name} className="w-16 h-16 rounded object-cover mr-4 opacity-50" />
                          )}
                          <div>
                            <h4 className="font-semibold text-gray-900">{product.name}</h4>
                            <p className="text-sm text-gray-600">{product.category}</p>
                            <p className="text-sm text-gray-600">${product.price?.amount}/{product.price?.unit}</p>
                          </div>
                        </div>
                        <div className="text-right mr-4">
                          <p className="text-2xl font-bold text-red-600">0</p>
                          <p className="text-xs text-red-600">Out of stock</p>
                        </div>
                        <Link
                          to={`/farmers/products/edit/${product._id}`}
                          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                          Restock Now
                        </Link>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
