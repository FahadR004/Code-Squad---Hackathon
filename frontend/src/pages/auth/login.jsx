// // import React, { useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import axios from "axios";

// // const Login = () => {
// //   const [formData, setFormData] = useState({
// //     email: "",
// //     password: "",
// //     role: "farmer",
// //   });
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");
// //   const navigate = useNavigate();

// //   const handleChange = (e) => {
// //     setFormData({
// //       ...formData,
// //       [e.target.name]: e.target.value,
// //     });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError("");

// //     try {
// //       // Replace mock login with real API later
// //       setTimeout(() => {
// //         const mockUser = {
// //           _id: "1",
// //           email: formData.email,
// //           role: formData.role,
// //         };

// //         localStorage.setItem("token", "mock-token");
// //         localStorage.setItem("user", JSON.stringify(mockUser));

// //         navigate("/dashboard");
// //       }, 1000);
// //     } catch (err) {
// //       setError(
// //         err.response?.data?.message || "Login failed. Please try again."
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div
// //       className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 relative"
// //       style={{
// //         backgroundImage:
// //           "url('https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1600')",
// //       }}
// //     >
// //       {/* Overlay to darken background slightly */}
// //       <div className="absolute inset-0 bg-black/50"></div>

// //       <div className="relative z-10 w-full max-w-md">
// //         {/* Transparent Login Card */}
// //         <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 overflow-hidden transition-all duration-300 hover:bg-white/80">
// //           {/* Header */}
// //           <div className="bg-gradient-to-r from-green-600 to-green-500 py-5 px-6 text-center text-white">
// //             <h2 className="text-2xl font-bold">Harvest Connect</h2>
// //             <p className="text-sm text-green-100 mt-1">
// //               Empowering Farmers and Buyers
// //             </p>
// //           </div>

// //           <div className="py-8 px-6">
// //             {/* Role Selection */}
// //             <div className="flex gap-3 mb-6 p-2 bg-white/40 rounded-lg">
// //               <button
// //                 type="button"
// //                 onClick={() => setFormData({ ...formData, role: "farmer" })}
// //                 className={`flex-1 py-3 px-4 rounded-lg text-center font-medium transition-all ${
// //                   formData.role === "farmer"
// //                     ? "bg-white shadow-md border-2 border-green-600 text-green-700"
// //                     : "text-gray-700 hover:text-green-700"
// //                 }`}
// //               >
// //                 Farmer
// //               </button>
// //               <button
// //                 type="button"
// //                 onClick={() => setFormData({ ...formData, role: "buyer" })}
// //                 className={`flex-1 py-3 px-4 rounded-lg text-center font-medium transition-all ${
// //                   formData.role === "buyer"
// //                     ? "bg-white shadow-md border-2 border-green-600 text-green-700"
// //                     : "text-gray-700 hover:text-green-700"
// //                 }`}
// //               >
// //                 Buyer
// //               </button>
// //             </div>

// //             {/* Form */}
// //             <form onSubmit={handleSubmit} className="space-y-6">
// //               <div>
// //                 <label
// //                   htmlFor="email"
// //                   className="block text-sm font-medium text-gray-800 mb-2"
// //                 >
// //                   Email Address
// //                 </label>
// //                 <input
// //                   id="email"
// //                   name="email"
// //                   type="email"
// //                   required
// //                   value={formData.email}
// //                   onChange={handleChange}
// //                   className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
// //                   placeholder="your.email@example.com"
// //                 />
// //               </div>

// //               <div>
// //                 <label
// //                   htmlFor="password"
// //                   className="block text-sm font-medium text-gray-800 mb-2"
// //                 >
// //                   Password
// //                 </label>
// //                 <input
// //                   id="password"
// //                   name="password"
// //                   type="password"
// //                   required
// //                   value={formData.password}
// //                   onChange={handleChange}
// //                   className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
// //                   placeholder="Enter your password"
// //                 />
// //               </div>

// //               {error && (
// //                 <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
// //                   {error}
// //                 </div>
// //               )}

// //               <button
// //                 type="submit"
// //                 disabled={loading}
// //                 className="w-full flex justify-center items-center py-3 px-4 rounded-lg text-lg font-semibold text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition-all"
// //               >
// //                 {loading ? "Signing in..." : "Sign In"}
// //               </button>
// //             </form>

// //             <div className="mt-6 text-center">
// //               <p className="text-sm text-gray-700">
// //                 Don’t have an account?{" "}
// //                 <Link
// //                   to="/signup"
// //                   className="font-semibold text-green-600 hover:text-green-700 underline"
// //                 >
// //                   Create one
// //                 </Link>
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;


// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// export default function Signup() {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phone: "",
//     role: "buyer",
//     language: "en",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError("");

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     setLoading(true);

//     // Simulate backend signup
//     setTimeout(() => {
//       localStorage.setItem("user", JSON.stringify(formData));
//       setLoading(false);
//       navigate("/login");
//     }, 1000);
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center px-4 relative bg-fixed bg-center bg-cover"
//       style={{
//         backgroundImage:
//           "url('https://images.unsplash.com/photo-1744230673231-865d54a0aba4?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1600')",
//         backgroundAttachment: "fixed",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       {/* Overlay for better contrast */}
//       <div className="absolute inset-0 bg-black/40"></div>

//       {/* Yellow-orange gradient overlay */}
//       <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/40 via-orange-400/40 to-transparent mix-blend-overlay"></div>

//       <div className="relative z-10 w-full max-w-lg mx-auto">
//         <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 overflow-hidden transition-all duration-300 hover:bg-white/80">
//           {/* Header */}
//           <div className="bg-gradient-to-r from-green-600 to-green-500 py-4 px-5 text-center text-white">
//             <h2 className="text-xl font-bold">Create Your Account</h2>
//             <p className="text-xs text-green-100 mt-1">
//               Join the Farmers’ Marketplace
//             </p>
//           </div>

//           {/* Form Section */}
//           <div className="py-8 px-8">
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label
//                   htmlFor="fullName"
//                   className="block text-xs font-medium text-gray-800 mb-1"
//                 >
//                   Full Name
//                 </label>
//                 <input
//                   id="fullName"
//                   name="fullName"
//                   type="text"
//                   value={formData.fullName}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-sm"
//                   placeholder="Enter your full name"
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-xs font-medium text-gray-800 mb-1"
//                 >
//                   Email Address
//                 </label>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-sm"
//                   placeholder="your.email@example.com"
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="phone"
//                   className="block text-xs font-medium text-gray-800 mb-1"
//                 >
//                   Phone Number
//                 </label>
//                 <input
//                   id="phone"
//                   name="phone"
//                   type="text"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-sm"
//                   placeholder="03XXXXXXXXX"
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-2">
//                 <div>
//                   <label
//                     htmlFor="password"
//                     className="block text-xs font-medium text-gray-800 mb-1"
//                   >
//                     Password
//                   </label>
//                   <input
//                     id="password"
//                     name="password"
//                     type="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-sm"
//                     placeholder="••••••"
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="confirmPassword"
//                     className="block text-xs font-medium text-gray-800 mb-1"
//                   >
//                     Confirm
//                   </label>
//                   <input
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     type="password"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-sm"
//                     placeholder="••••••"
//                   />
//                 </div>
//               </div>

//               <div className="flex gap-2">
//                 <div className="flex-1">
//                   <label className="block text-xs font-medium text-gray-800 mb-1">
//                     Role
//                   </label>
//                   <select
//                     name="role"
//                     value={formData.role}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-sm"
//                   >
//                     <option value="buyer">Buyer</option>
//                     <option value="farmer">Farmer</option>
//                   </select>
//                 </div>

//                 <div className="flex-1">
//                   <label className="block text-xs font-medium text-gray-800 mb-1">
//                     Language
//                   </label>
//                   <select
//                     name="language"
//                     value={formData.language}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-sm"
//                   >
//                     <option value="en">English</option>
//                     <option value="ur">Urdu</option>
//                   </select>
//                 </div>
//               </div>

//               {error && (
//                 <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg text-xs">
//                   {error}
//                 </div>
//               )}

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full flex justify-center items-center py-2.5 px-3 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition-all"
//               >
//                 {loading ? "Creating..." : "Sign Up"}
//               </button>
//             </form>

//             <div className="mt-4 text-center">
//               <p className="text-xs text-gray-700">
//                 Already have an account?{" "}
//                 <Link
//                   to="/login"
//                   className="font-semibold text-green-600 hover:text-green-700 underline"
//                 >
//                   Login here
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setError("No account found. Please sign up first.");
      return;
    }

    if (user.email !== formData.email || user.password !== formData.password) {
      setError("Invalid email or password.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 1000);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative bg-fixed bg-center bg-cover"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1600')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 w-full max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-lg scale-[0.95] md:scale-100 mx-auto">
        <div className="bg-white/75 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 overflow-hidden transition-all duration-300 hover:bg-white/85">
          <div className="bg-gradient-to-r from-green-600 to-green-500 py-4 px-5 text-center text-white">
            <h2 className="text-xl font-bold">Welcome Back!</h2>
            <p className="text-xs text-green-100 mt-1">
              Login to continue to the marketplace
            </p>
          </div>

          <div className="py-8 px-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-gray-800 mb-1"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-gray-800 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  placeholder="••••••"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg text-xs">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-2.5 px-3 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition-all"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-700">
                Don’t have an account?{" "}
                <Link
                  to="/signup"
                  className="font-semibold text-green-600 hover:text-green-700 underline"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


