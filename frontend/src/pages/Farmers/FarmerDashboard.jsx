import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

export default function FarmerDashboard() {
  const [data, setData] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("October");
  const totalStock = data.stock_status.reduce((sum, item) => sum + item.quantity, 0);

const stockStatusPercent = data.stock_status.map(item => ({
  status: item.status,
  percentage: ((item.quantity / totalStock) * 100).toFixed(1), // keep 1 decimal
}));



  useEffect(() => {
    // Simulated data
    const dashboardData = {
      products_by_category: {
        Fruits: 10,
        Vegetables: 15,
        Grains: 8,
        Dairy: 5,
      },
      total_orders_year: 320,
      recent_orders: [
        { id: 1, product: "Apple", quantity: 10, status: "Delivered" },
        { id: 2, product: "Milk", quantity: 5, status: "Cancelled" },
        { id: 3, product: "Tomatoes", quantity: 20, status: "Delivered" },
      ],
      total_revenue: 120000,
      monthly_sales: {
        January: [
    { day: "Week 1", revenue: 5000 },
    { day: "Week 2", revenue: 7000 },
    { day: "Week 3", revenue: 6000 },
    { day: "Week 4", revenue: 8000 },
  ],
  February: [
    { day: "Week 1", revenue: 6000 },
    { day: "Week 2", revenue: 6500 },
    { day: "Week 3", revenue: 7000 },
    { day: "Week 4", revenue: 7500 },
  ],
  March: [
    { day: "Week 1", revenue: 8000 },
    { day: "Week 2", revenue: 8500 },
    { day: "Week 3", revenue: 9000 },
    { day: "Week 4", revenue: 9500 },
  ],
  April: [
    { day: "Week 1", revenue: 10000 },
    { day: "Week 2", revenue: 11000 },
    { day: "Week 3", revenue: 12000 },
    { day: "Week 4", revenue: 13000 },
  ],
  May: [
    { day: "Week 1", revenue: 14000 },
    { day: "Week 2", revenue: 14500 },
    { day: "Week 3", revenue: 15000 },
    { day: "Week 4", revenue: 15500 },
  ],
  June: [
    { day: "Week 1", revenue: 16000 },
    { day: "Week 2", revenue: 16500 },
    { day: "Week 3", revenue: 17000 },
    { day: "Week 4", revenue: 17500 },
  ],
  July: [
    { day: "Week 1", revenue: 18000 },
    { day: "Week 2", revenue: 18500 },
    { day: "Week 3", revenue: 19000 },
    { day: "Week 4", revenue: 19500 },
  ],
  August: [
    { day: "Week 1", revenue: 20000 },
    { day: "Week 2", revenue: 20500 },
    { day: "Week 3", revenue: 21000 },
    { day: "Week 4", revenue: 21500 },
  ],
        October: [
          { day: "Week 1", revenue: 10000 },
          { day: "Week 2", revenue: 15000 },
          { day: "Week 3", revenue: 20000 },
          { day: "Week 4", revenue: 25000 },
        ],
        September: [
          { day: "Week 1", revenue: 8000 },
          { day: "Week 2", revenue: 12000 },
          { day: "Week 3", revenue: 18000 },
          { day: "Week 4", revenue: 22000 },
        ],
      },
      stockStatusPercent: [
        { status: "In Stock", percentage: 94.1 },
        { status: "Wasted", percentage: 5.9 },
      ],
    };

    setTimeout(() => setData(dashboardData), 800);
  }, []);

  if (!data) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-green-700 shadow-lg p-6">
        <h2 className="text-xl font-bold mb-6 text-white">👨‍🌾 Farmer Dashboard</h2>
        <ul className="space-y-3">
          <li className="hover:text-white cursor-pointer">Overview</li>
          <li className="hover:text-white cursor-pointer">Messages</li>
          <li className="hover:text-white cursor-pointer">Orders</li>
          <li className="hover:text-white cursor-pointer">Performance</li>
          <li className="hover:text-white cursor-pointer">Settings</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        {/* Product Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {Object.entries(data.products_by_category).map(([category, count]) => (
            <div key={category} className="bg-green-300 p-4 rounded shadow">
              <p>{category}</p>
              <h3 className="text-2xl font-bold">{count}</h3>
            </div>
          ))}
        </div>

        {/* Orders & Revenue */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-100 p-4 rounded shadow">
            <p>Total Orders This Year</p>
            <h3 className="text-2xl font-bold">{data.total_orders_year}</h3>
          </div>
          <div className="bg-yellow-100 p-4 rounded shadow">
            <p>Total Revenue</p>
            <h3 className="text-2xl font-bold">PKR {data.total_revenue}</h3>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p>Recent Orders</p>
            <ul className="mt-2 space-y-1 text-sm">
              {data.recent_orders.map((order) => (
                <li key={order.id} className="flex justify-between">
                  <span>{order.product} x {order.quantity}</span>
                  <span className={order.status === "Cancelled" ? "text-red-500" : "text-green-600"}>
                    {order.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Charts Section */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Monthly Sales Chart */}
  <div className="bg-white p-4 rounded shadow">
    <div className="flex justify-between items-center mb-2">
      <h3 className="font-semibold">Monthly Sales</h3>
      <select
        className="border rounded px-2 py-1"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
      >
        {Object.keys(data.monthly_sales).map((month) => (
          <option key={month} value={month}>{month}</option>
        ))}
      </select>
    </div>
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data.monthly_sales[selectedMonth]}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="revenue" stroke="#34d399" />
      </LineChart>
    </ResponsiveContainer>
  </div>

  {/* Stock vs Wastage Chart */}
  <div className="bg-white p-4 rounded shadow">
    <h3 className="font-semibold mb-2">Stock Status</h3>
    <ResponsiveContainer width="100%" height={250}>
  <BarChart data={stockStatusPercent}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="status" />
    <YAxis unit="%" />
    <Tooltip formatter={(value) => `${value}%`} />
    <Bar dataKey="percentage" fill="#facc15" />
  </BarChart>
</ResponsiveContainer>

  </div>
</div>

      </main>
    </div>
  );
}
