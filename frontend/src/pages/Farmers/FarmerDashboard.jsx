// src/pages/FarmerDashboard.jsx
import React, { useState, useEffect } from "react"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts"

export default function FarmerDashboard() {
  const [data, setData] = useState(null)

  useEffect(() => {
    // Simulated data (instead of fetching from API)
    const dashboardData = {
      total_products: 25,
      total_orders: 120,
      total_revenue: 55000,
      revenue_chart: [
        { name: "Week 1", revenue: 4000 },
        { name: "Week 2", revenue: 6000 },
        { name: "Week 3", revenue: 8000 },
        { name: "Week 4", revenue: 10000 },
      ],
    }

    // Simulate loading delay
    setTimeout(() => {
      setData(dashboardData)
    }, 800)
  }, [])

  if (!data) return <div className="text-center mt-20">Loading...</div>

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold text-green-700 mb-6">
        👨‍🌾 Farmer Dashboard
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-green-100 p-4 rounded shadow">
          <p>Total Products</p>
          <h3 className="text-2xl font-bold">{data.total_products}</h3>
        </div>
        <div className="bg-blue-100 p-4 rounded shadow">
          <p>Total Orders</p>
          <h3 className="text-2xl font-bold">{data.total_orders}</h3>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow">
          <p>Total Revenue</p>
          <h3 className="text-2xl font-bold">PKR {data.total_revenue}</h3>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Revenue Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.revenue_chart}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#34d399" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
