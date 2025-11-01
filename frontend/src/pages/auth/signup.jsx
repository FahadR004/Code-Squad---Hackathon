// src/pages/auth/Signup.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "buyer",
    language: "en",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("⚠️ Passwords do not match!");
      return;
    }

    setLoading(true);

    // Mock signup process (simulating backend)
    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify(formData));
      setLoading(false);

      if (formData.role === "buyer") {
        navigate("/buyer/buyerMarketplace");
      } else {
        navigate("/farmer/farmerDashboard");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-green-700 text-center mb-3">
          🌾 Create Your Account
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Join the Farmers’ Marketplace today!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
          />

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
          />

          <div className="flex justify-between items-center">
            <label className="text-gray-700 font-medium">Role:</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="border rounded-lg p-2 w-1/2"
            >
              <option value="buyer">Buyer</option>
              <option value="farmer">Farmer</option>
            </select>
          </div>

          <div className="flex justify-between items-center">
            <label className="text-gray-700 font-medium">Language:</label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="border rounded-lg p-2 w-1/2"
            >
              <option value="en">English</option>
              <option value="ur">Urdu</option>
            </select>
          </div>

          {error && <p className="text-center text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          <p className="text-center text-gray-600 mt-3">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-700 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
