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
      </Routes>
    </BrowserRouter>
  );
}
