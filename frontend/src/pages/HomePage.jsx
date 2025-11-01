// import { Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { useState, useEffect } from "react";

// export default function Home() {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const slides = [
//     "https://s7d1.scene7.com/is/image/wbcollab/kids-eating1?qlt=90&fmt=webp&resMode=sharp2",
//     "https://images.unsplash.com/photo-1610348725531-843dff563e2c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870",
//     "https://images.unsplash.com/photo-1718968028283-796c69aa24e1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=387",
//          "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870",
// ];

//   // ⏳ Change slide every 5.5 seconds
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % slides.length);
//     }, 5500);
//     return () => clearInterval(timer);
//   }, [slides.length]);

//   return (
//     <div className="min-h-screen bg-white flex flex-col items-center overflow-hidden">
//       {/* Moving Text Bar */}
//       <div className="w-full bg-green-600 text-white py-2 overflow-hidden sticky top-0 z-50">
//         <motion.div
//           className="whitespace-nowrap font-semibold text-lg"
//           animate={{ x: ["100%", "-100%"] }}
//           transition={{ repeat: Infinity, duration: 20, ease: "linear" }} // slow scroll
//         >
//            Empowering Farmers • Connecting Buyers • Sustainable Growth • Fresh Produce Delivered 🌿
//         </motion.div>
//       </div>

//       {/* Main Content */}
//       <div className="flex flex-col md:flex-row justify-between items-center w-11/12 md:w-9/12 mt-10">
//         {/* Text Section */}
//         <motion.div
//           className="text-center md:text-left md:w-1/2 space-y-6 mt-[-10px]"
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-800 to-green-400 bg-clip-text text-transparent drop-shadow-lg">
//             Welcome to <span className="text-green-700">AgroLink</span>
//           </h1>
//           <p className="text-gray-700 text-lg leading-relaxed">
//             Join our platform to bridge the gap between farmers and buyers.  
//             Experience transparent trading, fresh produce, and sustainable innovation in agriculture.
//           </p>

//           <div className="flex justify-center md:justify-start gap-4">
//             <Link to="/pages/auth/login">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-green-600 transition"
//               >
//                 Login
//               </motion.button>
//             </Link>
//             <Link to="/pages/auth/signup">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 className="bg-lime-400 text-green-800 px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-lime-500 transition"
//               >
//                 Sign Up
//               </motion.button>
//             </Link>
//           </div>
//         </motion.div>

//         {/* Image Slider (horizontal slide) */}
//         <div className="relative w-full md:w-1/2 h-64 md:h-80 overflow-hidden mt-10 md:mt-0 rounded-xl shadow-lg">
//           <AnimatePresence initial={false}>
//             <motion.img
//               key={currentIndex}
//               src={slides[currentIndex]}
//               alt="Farm"
//               className="absolute w-full h-full object-cover rounded-xl"
//               initial={{ x: "100%", opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               exit={{ x: "-100%", opacity: 0 }}
//               transition={{ duration: 1.2, ease: "easeInOut" }}
//             />
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   );
// }


import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    "https://media.istockphoto.com/id/1153630049/photo/the-child-collects-strawberries-in-the-garden-selective-focus.jpg?s=612x612&w=0&k=20&c=LucBxgcEisPYW9ZNNLnkXoEthH2YNjD7YdCkohZ9TfY=",
     "https://media.istockphoto.com/id/655167902/photo/child-picking-and-eating-peach-from-fruit-tree.jpg?s=612x612&w=0&k=20&c=Nm8o_A5GYBkmpEBu2BQpwDzcC38GhOkOsF8OS_Tx8lQ=",
    "https://images.unsplash.com/photo-1610348725531-843dff563e2c?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=870",
    "https://media.istockphoto.com/id/959138846/photo/happy-farmer-child-girl-sitting-with-autumn-harvest-in-the-garden-growing-fresh-organic.jpg?s=612x612&w=0&k=20&c=yp5FMetYFNIlou7LIPXItc-ft32G9Jx46eP2xxiIPDg=",
    "https://media.istockphoto.com/id/917766938/photo/two-little-sibling-boys-on-strawberry-farm-in-summer.jpg?s=612x612&w=0&k=20&c=BlOhrOuvoxKLD0MTMjy4nSR89v4yuu5WzENo2O7V6wY=",
    "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=870",
  ];

  // ⏳ Change slide every 5.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center overflow-hidden">
      {/* Moving Text Bar */}
      <div className="w-full bg-green-600 text-white py-2 overflow-hidden sticky top-0 z-50">
        <motion.div
          className="whitespace-nowrap font-semibold text-lg"
          animate={{ x: ["100%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }} // slow scroll
        >
           Empowering Farmers • Connecting Buyers • Sustainable Growth • Fresh Produce Delivered 
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row justify-between items-center w-11/12 md:w-9/12 mt-24 md:mt-32 mb-10">
        {/* Text Section */}
        <motion.div
          className="text-center md:text-left md:w-1/2 space-y-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-800 to-green-400 bg-clip-text text-transparent drop-shadow-lg leading-tight">
            Welcome to <span className="text-green-700">AgroLink</span>
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            We are creating a platform where farmers can plant and sell directly to buyers online.  
            Our goal is to connect buyers and farmers for a transparent and efficient marketplace.
          </p>

          <div className="flex justify-center md:justify-start gap-4 mt-4">
            <Link to="/pages/auth/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-green-600 transition"
              >
                Login
              </motion.button>
            </Link>
            <Link to="/pages/auth/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-lime-400 text-green-800 px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-lime-500 transition"
              >
                Sign Up
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Image Slider (horizontal slide) */}
        <div className="relative w-full md:w-1/2 h-64 md:h-80 overflow-hidden mt-14 md:mt-0 rounded-xl shadow-lg">
          <AnimatePresence initial={false}>
            <motion.img
              key={currentIndex}
              src={slides[currentIndex]}
              alt="Farm"
              className="absolute w-full h-full object-cover rounded-xl"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
