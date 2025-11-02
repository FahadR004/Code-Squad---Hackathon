import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import BuyerMarketplace from "./pages/Buyer/BuyerMarketplace";
import BuyerCart from "./pages/Buyer/BuyerCart";
import Checkout from "./pages/Buyer/checkout"; 
import OrderSuccess from "./pages/Buyer/OrderSucess";
import BuyerOrders from "./pages/Buyer/BuyerOrders"; 
import BuyerAccount from "./pages/Buyer/BuyerAccount";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Home from "./pages/HomePage";

import FarmerDashboard from "./pages/Farmers/FarmerDashboard";
import Chat from "./pages/Farmers/Chat";
import Orders from "./pages/Farmers/Orders.jsx";
import Performance from "./pages/Farmers/Performance.jsx";
import Settings from "./pages/Farmers/Settings.jsx";

import { CartProvider } from "./contexts/CartContext";
import BuyerLayout from "./layouts/BuyerLayout";

export default function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "en";
    i18n.changeLanguage(savedLang);
  }, [i18n]);

  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pages/auth/login" element={<Login />} />
          <Route path="/pages/auth/signup" element={<Signup />} />

          {/* Farmer routes */}
          <Route path="/farmers/farmerDashboard" element={<FarmerDashboard />} />
          <Route path="/farmers/chat" element={<Chat />} />
          <Route path="/farmers/orders" element={<Orders />} />
          <Route path="/farmers/performance" element={<Performance />} />
          <Route path="/farmers/settings" element={<Settings />} />

          {/* Buyer routes with Navbar */}
          <Route path="/buyer/buyerMarketplace" element={<BuyerLayout><BuyerMarketplace /></BuyerLayout>} />
          <Route path="/buyer/buyerMarketplace/cart" element={<BuyerLayout><BuyerCart /></BuyerLayout>} /> 
          <Route path="/buyer/buyerMarketplace/cart/Checkout" element={<BuyerLayout><Checkout /></BuyerLayout>} /> 
          <Route path="/buyer/buyerMarketplace/order-success" element={<BuyerLayout><OrderSuccess /></BuyerLayout>} />
          <Route path="/buyer/buyerMarketplace/orders" element={<BuyerLayout><BuyerOrders /></BuyerLayout>} /> 
          <Route path="/buyer/buyerMarketplace/account" element={<BuyerLayout><BuyerAccount /></BuyerLayout>} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
