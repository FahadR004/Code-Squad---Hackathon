import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t, i18n } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  // -----------------------------
  // Image Slider Data
  // -----------------------------
  const slides = [
    "https://media.istockphoto.com/id/1153630049/photo/the-child-collects-strawberries-in-the-garden-selective-focus.jpg?s=612x612&w=0&k=20&c=LucBxgcEisPYW9ZNNLnkXoEthH2YNjD7YdCkohZ9TfY=",
    "https://media.istockphoto.com/id/655167902/photo/child-picking-and-eating-peach-from-fruit-tree.jpg?s=612x612&w=0&k=20&c=Nm8o_A5GYBkmpEBu2BQpwDzcC38GhOkOsF8OS_Tx8lQ=",
    "https://images.unsplash.com/photo-1610348725531-843dff563e2c?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=870",
    "https://media.istockphoto.com/id/959138846/photo/happy-farmer-child-girl-sitting-with-autumn-harvest-in-the-garden-growing-fresh-organic.jpg?s=612x612&w=0&k=20&c=yp5FMetYFNIlou7LIPXItc-ft32G9Jx46eP2xxiIPDg=",
    "https://media.istockphoto.com/id/917766938/photo/two-little-sibling-boys-on-strawberry-farm-in-summer.jpg?s=612x612&w=0&k=20&c=BlOhrOuvoxKLD0MTMjy4nSR89v4yuu5WzENo2O7V6wY=",
    "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=870",
  ];

  // -----------------------------
  // Image Slider Effect
  // -----------------------------
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [slides.length]);

  // -----------------------------
  // Load language from localStorage on mount
  // -----------------------------
  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "en";
    i18n.changeLanguage(savedLang);
  }, [i18n]);

  // -----------------------------
  // Language Toggle
  // -----------------------------
  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ur" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang); // persist selection
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center overflow-hidden">

      {/* -----------------------------
          Moving Text Bar
      ----------------------------- */}
      <div className="w-full bg-green-600 text-white py-2 overflow-hidden sticky top-0 z-50">
        <motion.div
          className="whitespace-nowrap font-semibold text-lg"
          animate={{ x: ["100%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          Empowering Farmers • Connecting Buyers • Sustainable Growth • Fresh Produce Delivered
        </motion.div>
      </div>

      {/* -----------------------------
          Main Content: Text + Image Slider
      ----------------------------- */}
      <div className="flex flex-col md:flex-row justify-between items-center w-11/12 md:w-9/12 mt-24 md:mt-32 mb-10">

        {/* -----------------------------
            Left Section: Text + Buttons
        ----------------------------- */}
        <motion.div
          className="text-center md:text-left md:w-1/2 space-y-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-800 to-green-400 bg-clip-text text-transparent drop-shadow-lg leading-tight">
            {t("welcome") || "Welcome to"} <span className="text-green-700">AgroLink</span>
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            {t("description") || "We are creating a platform where farmers can plant and sell directly to buyers online. Our goal is to connect buyers and farmers for a transparent and efficient marketplace."}
          </p>

          {/* Login / Signup Buttons */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
            <Link to="/pages/auth/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-green-600 transition"
              >
                {t("login") || "Login"}
              </motion.button>
            </Link>
            <Link to="/pages/auth/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-lime-400 text-green-800 px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-lime-500 transition"
              >
                {t("signup") || "Sign Up"}
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* -----------------------------
            Right Section: Image Slider + Language Button
        ----------------------------- */}
        <div className="relative w-full md:w-1/2 mt-14 md:mt-0">

          {/* Language Button */}
          <div className="flex justify-end mb-2">
            <button
              onClick={toggleLanguage}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300 transition"
            >
              {t("changeLanguage") || "Change Language"}
            </button>
          </div>

          {/* Image Slider */}
          <div className="relative h-64 md:h-80 overflow-hidden rounded-xl shadow-lg">
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
    </div>
  );
}
