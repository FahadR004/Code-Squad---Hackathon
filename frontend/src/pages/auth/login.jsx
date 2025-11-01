import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'farmer'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // For demo - you can use mock data if backend isn't ready
      // const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      
      // Mock successful login for demo
      setTimeout(() => {
        const mockUser = {
          _id: '1',
          email: formData.email,
          role: formData.role,
          profile: {
            fullName: 'Demo User',
            phone: '+92 300 1234567'
          },
          preferences: {
            language: 'en'
          }
        };
        
        const mockToken = 'mock-jwt-token';
        
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        navigate('/dashboard');
      }, 1000);
      
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-farm-pattern bg-cover bg-fixed bg-center relative">
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-earth-500/10"></div>
      
      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {/* Header with Apple/Farm Icon */}
          <div className="text-center mb-8">
            <div className="mx-auto w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center mb-4">
              <span className="text-4xl">🍎</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Harvest Connect
            </h2>
            <p className="text-gray-600">Fresh from farm to your table</p>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            {/* Decorative Farm Header */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 py-4 px-6">
              <div className="flex items-center justify-center space-x-2 text-white">
                <span className="text-xl">🌱</span>
                <h3 className="text-xl font-semibold">Welcome Back</h3>
                <span className="text-xl">🍅</span>
              </div>
            </div>

            <div className="py-8 px-6">
              {/* Role Selection */}
              <div className="flex gap-3 mb-6 p-2 bg-earth-100 rounded-lg">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, role: 'farmer'})}
                  className={`flex-1 py-3 px-4 rounded-lg text-center font-medium transition-all ${
                    formData.role === 'farmer'
                      ? 'bg-white shadow-md border-2 border-primary-500 text-primary-700'
                      : 'text-gray-600 hover:text-primary-600'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span>👨‍🌾</span>
                    <span>Farmer</span>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, role: 'buyer'})}
                  className={`flex-1 py-3 px-4 rounded-lg text-center font-medium transition-all ${
                    formData.role === 'buyer'
                      ? 'bg-white shadow-md border-2 border-primary-500 text-primary-700'
                      : 'text-gray-600 hover:text-primary-600'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span>🛒</span>
                    <span>Buyer</span>
                  </div>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center space-x-2">
                      <span>📧</span>
                      <span>Email Address</span>
                    </div>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center space-x-2">
                      <span>🔒</span>
                      <span>Password</span>
                    </div>
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Enter your password"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm flex items-center space-x-2">
                    <span>⚠️</span>
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center space-x-2 py-4 px-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>🚜</span>
                      <span>Sign In to Harvest</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  New to our farm community?{' '}
                  <Link
                    to="/signup"
                    className="font-semibold text-primary-600 hover:text-primary-700 transition-colors underline"
                  >
                    Join the harvest!
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Farm-themed bottom decoration */}
          <div className="mt-8 flex justify-center space-x-4 opacity-60">
            <span className="text-2xl">🌽</span>
            <span className="text-2xl">🍓</span>
            <span className="text-2xl">🥕</span>
            <span className="text-2xl">🍯</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;