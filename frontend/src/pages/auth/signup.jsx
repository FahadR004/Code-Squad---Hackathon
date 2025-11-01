import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Signup() {
  const { t, i18n } = useTranslation();

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

  // ✅ Load saved language from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang) {
      i18n.changeLanguage(savedLang);
      setFormData((prev) => ({ ...prev, language: savedLang }));
    }
  }, [i18n]);

  const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });

  if (e.target.name === "language") {
    i18n.changeLanguage(e.target.value);      // immediately change language
    localStorage.setItem("lang", e.target.value); // save selection
  }
};


  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError(t("passwordMismatch"));
      return;
    }

    setLoading(true);

    setTimeout(() => {
      // Save full user info
      localStorage.setItem("user", JSON.stringify(formData));
      // Save role as a token
      localStorage.setItem("roleToken", formData.role);

      setLoading(false);
      navigate("/pages/auth/login"); // Redirect to login after signup
    }, 1000);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative bg-fixed bg-center bg-cover"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1744230673231-865d54a0aba4?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1600')",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/40 via-orange-400/40 to-transparent mix-blend-overlay"></div>

      <div className="relative z-10 w-full max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-lg scale-[0.95] md:scale-100 mx-auto">
        <div className="bg-white/75 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 overflow-hidden transition-all duration-300 hover:bg-white/85">
          <div className="bg-gradient-to-r from-green-600 to-green-500 py-4 px-5 text-center text-white">
            <h2 className="text-xl font-bold">{t("createAccount")}</h2>
            <p className="text-xs text-green-100 mt-1">{t("joinMarketplace")}</p>
          </div>

          <div className="py-8 px-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-xs font-medium text-gray-800 mb-1">
                  {t("fullName")}
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  placeholder={t("fullNamePlaceholder")}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-gray-800 mb-1">
                  {t("emailAddress")}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  placeholder={t("emailPlaceholder")}
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-xs font-medium text-gray-800 mb-1">
                  {t("phoneNumber")}
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  placeholder={t("phonePlaceholder")}
                />
              </div>

              {/* Password */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="password" className="block text-xs font-medium text-gray-800 mb-1">
                    {t("password")}
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
                  <label htmlFor="confirmPassword" className="block text-xs font-medium text-gray-800 mb-1">
                    {t("confirmPassword")}
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

              {/* Role & Language */}
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-800 mb-1">{t("role")}</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  >
                    <option value="buyer">{t("buyer")}</option>
                    <option value="farmer">{t("farmer")}</option>
                  </select>
                </div>

                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-800 mb-1">{t("language")}</label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  >
                    <option value="en">{t("english")}</option>
                    <option value="ur">{t("urdu")}</option>
                  </select>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg text-xs">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-2.5 px-3 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition-all"
              >
                {loading ? t("creating") : t("signUp")}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-700">
                {t("alreadyHaveAccount")}{" "}
                <Link to="/pages/auth/login" className="font-semibold text-green-600 hover:text-green-700 underline">
                  {t("loginHere")}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
