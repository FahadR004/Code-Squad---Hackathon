// // import React, { useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";

// // export default function Signup() {
// //   const [formData, setFormData] = useState({
// //     fullName: "",
// //     email: "",
// //     password: "",
// //     confirmPassword: "",
// //     phone: "",
// //     role: "buyer",
// //     language: "en",
// //   });

// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");
// //   const navigate = useNavigate();

// //   const handleChange = (e) =>
// //     setFormData({ ...formData, [e.target.name]: e.target.value });

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     setError("");

// //     if (formData.password !== formData.confirmPassword) {
// //       setError("Passwords do not match.");
// //       return;
// //     }

// //     setLoading(true);

// //     // Simulate backend signup
// //     setTimeout(() => {
// //       localStorage.setItem("user", JSON.stringify(formData));
// //       setLoading(false);
// //       navigate("/login");
// //     }, 1000);
// //   };

// //   return (
// //     <div
// //       className="min-h-screen flex items-center justify-center px-4 relative bg-fixed bg-center bg-cover"
// //       style={{
// //         backgroundImage:
// //           "url('https://images.unsplash.com/photo-1744230673231-865d54a0aba4?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1600')",
// //         backgroundAttachment: "fixed", // keeps it steady
// //         backgroundSize: "cover",
// //         backgroundPosition: "center",
// //       }}
// //     >
// //       {/* Overlay */}
// //       <div className="absolute inset-0 bg-black/50"></div>

// //       <div className="relative z-10 w-full max-w-sm">
// //         <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 overflow-hidden transition-all duration-300 hover:bg-white/80">
// //           {/* Header */}
// //           <div className="bg-gradient-to-r from-green-600 to-green-500 py-4 px-5 text-center text-white">
// //             <h2 className="text-xl font-bold">Create Your Account</h2>
// //             <p className="text-xs text-green-100 mt-1">
// //               Join the Farmers’ Marketplace
// //             </p>
// //           </div>

// //           {/* Form */}
// //           <div className="py-6 px-5">
// //             <form onSubmit={handleSubmit} className="space-y-4">
// //               <div>
// //                 <label
// //                   htmlFor="fullName"
// //                   className="block text-xs font-medium text-gray-800 mb-1"
// //                 >
// //                   Full Name
// //                 </label>
// //                 <input
// //                   id="fullName"
// //                   name="fullName"
// //                   type="text"
// //                   value={formData.fullName}
// //                   onChange={handleChange}
// //                   required
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-sm"
// //                   placeholder="Enter your full name"
// //                 />
// //               </div>

// //               <div>
// //                 <label
// //                   htmlFor="email"
// //                   className="block text-xs font-medium text-gray-800 mb-1"
// //                 >
// //                   Email Address
// //                 </label>
// //                 <input
// //                   id="email"
// //                   name="email"
// //                   type="email"
// //                   value={formData.email}
// //                   onChange={handleChange}
// //                   required
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-sm"
// //                   placeholder="your.email@example.com"
// //                 />
// //               </div>

// //               <div>
// //                 <label
// //                   htmlFor="phone"
// //                   className="block text-xs font-medium text-gray-800 mb-1"
// //                 >
// //                   Phone Number
// //                 </label>
// //                 <input
// //                   id="phone"
// //                   name="phone"
// //                   type="text"
// //                   value={formData.phone}
// //                   onChange={handleChange}
// //                   required
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-sm"
// //                   placeholder="03XXXXXXXXX"
// //                 />
// //               </div>

// //               <div className="grid grid-cols-2 gap-2">
// //                 <div>
// //                   <label
// //                     htmlFor="password"
// //                     className="block text-xs font-medium text-gray-800 mb-1"
// //                   >
// //                     Password
// //                   </label>
// //                   <input
// //                     id="password"
// //                     name="password"
// //                     type="password"
// //                     value={formData.password}
// //                     onChange={handleChange}
// //                     required
// //                     className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-sm"
// //                     placeholder="••••••"
// //                   />
// //                 </div>

// //                 <div>
// //                   <label
// //                     htmlFor="confirmPassword"
// //                     className="block text-xs font-medium text-gray-800 mb-1"
// //                   >
// //                     Confirm
// //                   </label>
// //                   <input
// //                     id="confirmPassword"
// //                     name="confirmPassword"
// //                     type="password"
// //                     value={formData.confirmPassword}
// //                     onChange={handleChange}
// //                     required
// //                     className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-sm"
// //                     placeholder="••••••"
// //                   />
// //                 </div>
// //               </div>

// //               <div className="flex gap-2">
// //                 <div className="flex-1">
// //                   <label className="block text-xs font-medium text-gray-800 mb-1">
// //                     Role
// //                   </label>
// //                   <select
// //                     name="role"
// //                     value={formData.role}
// //                     onChange={handleChange}
// //                     className="w-full border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-sm"
// //                   >
// //                     <option value="buyer">Buyer</option>
// //                     <option value="farmer">Farmer</option>
// //                   </select>
// //                 </div>

// //                 <div className="flex-1">
// //                   <label className="block text-xs font-medium text-gray-800 mb-1">
// //                     Language
// //                   </label>
// //                   <select
// //                     name="language"
// //                     value={formData.language}
// //                     onChange={handleChange}
// //                     className="w-full border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-sm"
// //                   >
// //                     <option value="en">English</option>
// //                     <option value="ur">Urdu</option>
// //                   </select>
// //                 </div>
// //               </div>

// //               {error && (
// //                 <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg text-xs">
// //                   {error}
// //                 </div>
// //               )}

// //               <button
// //                 type="submit"
// //                 disabled={loading}
// //                 className="w-full flex justify-center items-center py-2.5 px-3 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition-all"
// //               >
// //                 {loading ? "Creating..." : "Sign Up"}
// //               </button>
// //             </form>

// //             <div className="mt-4 text-center">
// //               <p className="text-xs text-gray-700">
// //                 Already have an account?{" "}
// //                 <Link
// //                   to="/login"
// //                   className="font-semibold text-green-600 hover:text-green-700 underline"
// //                 >
// //                   Login here
// //                 </Link>
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

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
//       {/* Dark overlay for contrast */}
//       <div className="absolute inset-0 bg-black/40"></div>

//       {/* 🌅 Yellow-Orange Gradient Layer */}
//       <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/40 via-orange-400/40 to-transparent mix-blend-overlay"></div>

//       <div className="relative z-10 w-full max-w-sm">
//         <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 overflow-hidden transition-all duration-300 hover:bg-white/80">
//           {/* Header */}
//           <div className="bg-gradient-to-r from-green-600 to-green-500 py-4 px-5 text-center text-white">
//             <h2 className="text-xl font-bold">Create Your Account</h2>
//             <p className="text-xs text-green-100 mt-1">
//               Join the Farmers’ Marketplace
//             </p>
//           </div>

//           {/* Form */}
//           <div className="py-6 px-5">
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

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify(formData));
      setLoading(false);
      navigate("/login");
    }, 1000);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative bg-fixed bg-center bg-cover"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1744230673231-865d54a0aba4?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1600')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark & Gradient Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/40 via-orange-400/40 to-transparent mix-blend-overlay"></div>

      {/* Centered Form */}
      <div className="relative z-10 w-full max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-lg scale-[0.95] md:scale-100 mx-auto">
        <div className="bg-white/75 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 overflow-hidden transition-all duration-300 hover:bg-white/85">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-500 py-4 px-5 text-center text-white">
            <h2 className="text-xl font-bold">Create Your Account</h2>
            <p className="text-xs text-green-100 mt-1">
              Join the Farmers’ Marketplace
            </p>
          </div>

          {/* Form Section */}
          <div className="py-8 px-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-xs font-medium text-gray-800 mb-1"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  placeholder="Enter your full name"
                />
              </div>

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
                  htmlFor="phone"
                  className="block text-xs font-medium text-gray-800 mb-1"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  placeholder="03XXXXXXXXX"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
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

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-xs font-medium text-gray-800 mb-1"
                  >
                    Confirm
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    placeholder="••••••"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-800 mb-1">
                    Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  >
                    <option value="buyer">Buyer</option>
                    <option value="farmer">Farmer</option>
                  </select>
                </div>

                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-800 mb-1">
                    Language
                  </label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  >
                    <option value="en">English</option>
                    <option value="ur">Urdu</option>
                  </select>
                </div>
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
                {loading ? "Creating..." : "Sign Up"}
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-700">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-green-600 hover:text-green-700 underline"
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


