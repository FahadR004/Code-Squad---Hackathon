import { BrowserRouter, Routes, Route } from "react-router-dom";

import FarmerDashboard from "./pages/Farmers/FarmerDashboard";
import BuyerMarketplace from "./pages/Buyer/BuyerMarketplace";
import BuyerCart from "./pages/Buyer/BuyerCart";
import Checkout from "./pages/Buyer/checkout"; 
import BuyerOrders from "./pages/Buyer/BuyerOrders"; 
import BuyerAccount from "./pages/Buyer/BuyerAccount";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Home from "./pages/HomePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default Home Route */}
        <Route path="/" element={<Home />} />

        {/* Auth Routes */}
        <Route path="/pages/auth/login" element={<Login />} />
        <Route path="/pages/auth/signup" element={<Signup />} />

        {/* Farmer and Buyer Routes */}
        <Route path="/farmer/farmerDashboard" element={<FarmerDashboard />} />
        <Route path="/buyer/buyerMarketplace" element={<BuyerMarketplace />} />
        <Route path="/buyer/buyerMarketplace/cart" element={<BuyerCart />} /> 
        <Route path="/buyer/buyerMarketplace/cart/Checkout" element={<Checkout />} /> 
        <Route path="/buyer/buyerMarketplace/orders" element={<BuyerOrders />} /> 
        <Route path="/buyer/buyerMarketplace/account" element={<BuyerAccount />} />

      </Routes>
    </BrowserRouter>
  );
}