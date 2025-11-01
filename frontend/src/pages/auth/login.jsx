import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import API from "../../api";

export default function Login() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  // Validate required fields
  if (!formData.email || !formData.password) {
    setError("Email and password are required");
    return;
  }

  setLoading(true);

  try {
    const response = await API.post("/auth/login", {
      email: formData.email,
      password: formData.password
    });

    // Extract response data
    const { token, user } = response.data;

    // Store token and user info in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setLoading(false);

    // Redirect based on user role
    if (user.role === "buyer") {
      navigate("/buyer/buyerMarketplace");
    } else if (user.role === "farmer") {
      navigate("/farmers/farmerDashboard");
    } 

  } catch (err) {
    setLoading(false);
    console.log(err, 'ERROR ')
    if (err.response) {
      const status = err.response.status;
      const message = err.response.data.message;

      if (status === 401 || status === 400) {
        setError(t("invalidCredentials") || message || "Invalid email or password");
      } else if (status === 500) {
        setError("Server error. Please try again later.");
      } else {
        setError(message || "Login failed. Please try again.");
      }
    } else if (err.request) {
      setError("Network error. Please check your connection.");
    } else {
      setError("An unexpected error occurred. Please try again.");
    }

    console.error("Login error:", err);
  }
};


  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative bg-fixed bg-center bg-cover"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1600')",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 w-full max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-lg scale-[0.95] md:scale-100 mx-auto">
        <div className="bg-white/75 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 overflow-hidden transition-all duration-300 hover:bg-white/85">
          <div className="bg-gradient-to-r from-green-600 to-green-500 py-4 px-5 text-center text-white">
            <h2 className="text-xl font-bold">{t("welcomeBack")}</h2>
            <p className="text-xs text-green-100 mt-1">{t("loginDescription")}</p>
          </div>

          <div className="py-8 px-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-gray-800 mb-1"
                >
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

              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-gray-800 mb-1"
                >
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
                {loading ? t("loggingIn") : t("login")}
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-700">
                {t("noAccount")}{" "}
                <Link
                  to="/signup"
                  className="font-semibold text-green-600 hover:text-green-700 underline"
                >
                  {t("signUpHere")}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
