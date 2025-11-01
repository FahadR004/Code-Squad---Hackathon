// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom"

import FarmerDashboard from "./pages/Farmers/FarmerDashboard"
import BuyerMarketplace from "./pages/Buyer/BuyerMarketplace"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/signup"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes */}
        <Route path="/pages/auth/login" element={<Login />} />
        <Route path="/pages/auth/Signup" element={<Signup />} />

        {/* Farmer and Buyer routes */}
        <Route path="/farmer/farmerDashboard" element={<FarmerDashboard />} />
        <Route path="/buyer/buyerMarketplace" element={<BuyerMarketplace />} />
      </Routes>
    </BrowserRouter>
  )
}
