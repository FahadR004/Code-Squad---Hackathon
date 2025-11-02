import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Hook to animate number counting
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
  const [data, setData] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("October");
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

  const animatedTotals = {
    fruits: useCountUp(data?.products_by_category.Fruits || 0),
    vegetables: useCountUp(data?.products_by_category.Vegetables || 0),
    grains: useCountUp(data?.products_by_category.Grains || 0),
    dairy: useCountUp(data?.products_by_category.Dairy || 0),
    orders: useCountUp(data?.total_orders_year || 0),
    revenue: useCountUp(data?.total_revenue || 0),
  };

  if (!data)
    return (
      <div className="text-center mt-20 text-lg font-semibold animate-pulse">
        Loading...
      </div>
    );

  const totalStock = data.stock_status.reduce((sum, item) => sum + item.quantity, 0);
  const stockStatusPercent = data.stock_status.map(item => ({
    name: item.status,
    value: item.quantity,
  }));
  const COLORS = ["#4ade80", "#f87171"]; // green for Used, red for Waste

  return (
    <div
      className="flex min-h-screen font-sans overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1631535616112-91cd350b9801?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Sidebar */}
      <aside
        className={`bg-green-800 text-white p-6 flex flex-col transition-width duration-300 ease-in-out shadow-lg
        ${sidebarOpen ? "w-56" : "w-16"}`}
        aria-expanded={sidebarOpen}
      >
        <button
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="mb-6 focus:outline-none self-end text-white hover:text-yellow-400"
        >
          {sidebarOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        <h2
          className={`text-lg font-bold mb-6 flex items-center gap-2 whitespace-nowrap truncate transition-opacity duration-500 ${
            sidebarOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          Farmer Dashboard
        </h2>

        <nav className="flex flex-col gap-3 text-sm font-medium opacity-90">
          {[
            { label: "Dash Board", path: "/farmers/farmerDashboard" },
            { label: "ChatBox", path: "/farmers/chat" },
            { label: "Orders", path: "/farmers/orders" },
          ].map(({ label, path }) => (
            <Link
              key={label}
              to={path}
              title={label}
              className={`cursor-pointer hover:text-yellow-400 truncate transition-colors ${
                sidebarOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {sidebarOpen && (
          <div className="mt-auto text-xs text-yellow-300 italic animate-pulse pt-10 select-none">
            Connected to farm network
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto scale-90 flex justify-center">
        {/* White Container Box */}
        <div className="w-full max-w-7xl bg-white rounded-xl p-6 shadow-lg">
          {/* Product Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Fruits", value: animatedTotals.fruits, bg: "bg-green-400 text-white" },
              { label: "Vegetables", value: animatedTotals.vegetables, bg: "bg-green-400 text-white" },
              { label: "Grains", value: animatedTotals.grains, bg: "bg-green-400 text-white" },
              { label: "Dairy", value: animatedTotals.dairy, bg: "bg-green-400 text-white" },
            ].map(({ label, value, bg }) => (
              <div
                key={label}
                className={`${bg} rounded p-3 text-center font-semibold text-lg relative overflow-hidden cursor-default`}
              >
                <div className="absolute top-0 right-1 text-7xl font-extrabold text-white/20 animate-spin-slow select-none pointer-events-none">
                  {label.charAt(0)}
                </div>
                <span>{label}</span>
                <h3 className="text-3xl font-bold mt-1">{value}</h3>
              </div>
            ))}
          </div>

          {/* Orders & Revenue */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <div className="bg-blue-100 rounded p-4 border-l-4 border-blue-600 font-semibold text-blue-900 flex flex-col items-center justify-center cursor-default animate-shadowPulse">
              <p>Total Orders This Year</p>
              <h3 className="text-2xl font-bold mt-1">{animatedTotals.orders}</h3>
            </div>
            <div className="bg-yellow-100 rounded p-4 border-l-4 border-yellow-500 font-semibold text-yellow-900 flex flex-col items-center justify-center cursor-default animate-shadowPulse">
              <p>Total Revenue</p>
              <h3 className="text-2xl font-bold mt-1">PKR {animatedTotals.revenue.toLocaleString()}</h3>
            </div>
            <div className="bg-white rounded p-4 shadow-inner cursor-default select-none">
              <p className="font-semibold mb-2">Recent Orders</p>
              <ul className="text-sm space-y-1">
                {data.recent_orders.map(({ id, product, quantity, status }) => (
                  <li key={id} className="flex justify-between">
                    <span>
                      {product} x {quantity}
                    </span>
                    <span
                      className={`font-semibold ${
                        status === "Cancelled" ? "text-red-600" : "text-green-600 animate-pulse"
                      }`}
                    >
                      {status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Graphs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {/* Monthly Sales Bar Chart */}
            <div className="bg-white rounded p-4 shadow-inner">
              <p className="font-semibold mb-2">Monthly Sales - {selectedMonth}</p>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data.monthly_sales[selectedMonth]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#34d399" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Stock Status Pie Chart */}
            <div className="bg-white rounded p-4 shadow-inner flex flex-col items-center justify-center">
              <p className="font-semibold mb-2">Stock Status</p>

              {/* Legends with percentages */}
              <div className="flex gap-4 mb-2 text-sm">
                {stockStatusPercent.map((item, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <span
                      className={`w-3 h-3 inline-block rounded-full`}
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></span>
                    <span>
                      {item.name} - {item.value} ({((item.value / totalStock) * 100).toFixed(1)}%)
                    </span>
                  </div>
                ))}
              </div>

              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={stockStatusPercent}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {stockStatusPercent.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}