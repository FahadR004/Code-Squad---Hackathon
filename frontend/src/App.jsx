<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from "react-router-dom";

import FarmerDashboard from "./pages/Farmers/FarmerDashboard";
import BuyerMarketplace from "./pages/Buyer/BuyerMarketplace";
import BuyerCart from "./pages/Buyer/BuyerCart";
import Checkout from "./pages/Buyer/checkout";
import BuyerOrders from "./pages/Buyer/BuyerOrders";
import BuyerAccount from "./pages/Buyer/BuyerAccount";


import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
=======
// // src/App.jsx
// import { BrowserRouter, Routes, Route } from "react-router-dom"

// import FarmerDashboard from "./pages/Farmers/FarmerDashboard"
// import BuyerMarketplace from "./pages/Buyer/BuyerMarketplace"
// import Login from "./pages/auth/Login"
// import Signup from "./pages/auth/signup"
// import Home from "./pages/HomePage";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Auth routes */}
//          <Route path="/" element={<Home />} />
//         <Route path="/pages/auth/login" element={<Login />} />
//         <Route path="/pages/auth/Signup" element={<Signup />} />

//         {/* Farmer and Buyer routes */}
//         <Route path="/farmer/farmerDashboard" element={<FarmerDashboard />} />
//         <Route path="/buyer/buyerMarketplace" element={<BuyerMarketplace />} />
//       </Routes>
//     </BrowserRouter>
//   )
// }


import { BrowserRouter, Routes, Route } from "react-router-dom";

import FarmerDashboard from "./pages/Farmers/FarmerDashboard";
import BuyerMarketplace from "./pages/Buyer/BuyerMarketplace";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Home from "./pages/HomePage";
>>>>>>> 352fefdb2770279178bd742d20b845ce09296a90

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Farmer route */}
=======
        {/* Default Home Route */}
        <Route path="/" element={<Home />} />

        {/* Auth Routes */}
        <Route path="/pages/auth/login" element={<Login />} />
        <Route path="/pages/auth/signup" element={<Signup />} />

        {/* Farmer and Buyer Routes */}
>>>>>>> 352fefdb2770279178bd742d20b845ce09296a90
        <Route path="/farmer/farmerDashboard" element={<FarmerDashboard />} />

        {/* Buyer routes */}
        <Route path="/buyer/buyerMarketplace" element={<BuyerMarketplace />} />
        <Route path="/buyer/buyerMarketplace/cart" element={<BuyerCart />} />
        <Route path="/buyer/buyerMarketplace/cart/Checkout" element={<Checkout />} />

        <Route path="/buyer/buyerMarketplace/orders" element={<BuyerOrders />} />
        <Route path="/buyer/buyerMarketplace/account" element={<BuyerAccount />} />

      </Routes>
    </BrowserRouter>
  );
}
