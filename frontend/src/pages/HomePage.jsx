import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaGlobe } from "react-icons/fa"; // 🌐 Added globe icon
import { GiFarmTractor, GiPlantSeed, GiFarmer, GiCow, GiWheat } from "react-icons/gi";


export default function Home() {
  const { t, i18n } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const slides = [
    "https://media.istockphoto.com/id/1153630049/photo/the-child-collects-strawberries-in-the-garden-selective-focus.jpg?s=612x612&w=0&k=20&c=LucBxgcEisPYW9ZNNLnkXoEthH2YNjD7YdCkohZ9TfY=",
    "https://media.istockphoto.com/id/655167902/photo/child-picking-and-eating-peach-from-fruit-tree.jpg?s=612x612&w=0&k=20&c=Nm8o_A5GYBkmpEBu2BQpwDzcC38GhOkOsF8OS_Tx8lQ=",
    "https://images.unsplash.com/photo-1610348725531-843dff563e2c?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=870",
    "https://media.istockphoto.com/id/959138846/photo/happy-farmer-child-girl-sitting-with-autumn-harvest-in-the-garden-growing-fresh-organic.jpg?s=612x612&w=0&k=20&c=yp5FMetYFNIlou7LIPXItc-ft32G9Jx46eP2xxiIPDg=",
    "https://media.istockphoto.com/id/917766938/photo/two-little-sibling-boys-on-strawberry-farm-in-summer.jpg?s=612x612&w=0&k=20&c=BlOhrOuvoxKLD0MTMjy4nSR89v4yuu5WzENo2O7V6wY=",
    "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=870"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "en";
    i18n.changeLanguage(savedLang);
  }, [i18n]);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
    setDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center overflow-hidden">
      {/* Moving Text Bar */}
      <div className="w-full bg-green-600 text-white py-2 overflow-hidden sticky top-0 z-50">
        <motion.div
          className="whitespace-nowrap font-semibold text-lg"
          animate={{ x: ["100%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          Empowering Farmers • Connecting Buyers • Sustainable Growth • Fresh Produce Delivered
        </motion.div>
      </div>

      {/* Navbar */}
      <nav className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center z-40">
       <div className="flex items-center gap-2 text-xl md:text-3xl font-extrabold text-green-700">
  <GiFarmTractor className="text-green-600" />
  <span>AgroMarket</span>
</div>


        <div className="relative">
          {/* 🌐 Language Button with Icon */}
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-full shadow-md hover:bg-gray-300 transition"
            title={t("changeLanguage") || "Change Language"}
          >
            <FaGlobe className="text-green-700 text-lg" />
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
              <button
                onClick={() => changeLanguage("en")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                English
              </button>
              <button
                onClick={() => changeLanguage("ur")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Urdu
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Background + Content (same as before) */}
      <div className="relative w-full flex items-center justify-center min-h-screen">
        <div className="absolute inset-0 h-full w-full overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.img
              key={currentIndex}
              src={slides[currentIndex]}
              alt="Farm"
              className="w-full h-full object-cover"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <motion.div
          className="relative z-10 text-center space-y-8 px-8 py-12 max-w-3xl bg-white/75 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 -mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-green-800 to-green-400 bg-clip-text text-transparent drop-shadow-lg leading-tight">
            {t("welcome") || "Welcome to"}{" "}
            <span className="text-green-700">AgroMarket</span>
          </h1>
          <p className="text-gray-800 text-xl leading-relaxed font-medium">
            {t("description") ||
              "We are creating a platform where farmers can plant and sell directly to buyers online."}
          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <Link to="/pages/auth/login">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="bg-green-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-green-600 transition-all duration-300"
              >
                {t("login") || "Login"}
              </motion.button>
            </Link>
            <Link to="/pages/auth/signup">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="bg-lime-400 text-green-800 px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-lime-500 transition-all duration-300"
              >
                {t("signup") || "Sign Up"}
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
