import React, { useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { Autoplay, EffectFade } from 'swiper/modules';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', form);
      localStorage.setItem('token', res.data.token);
      alert('🌾 Registered successfully!');
      window.location.href = '/dashboard';
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  // Replace these with farm-themed images
  const images = ['/farm1.jpg', '/farm2.jpg', '/farm3.jpg'];

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-[Poppins]">
      
      {/* Left Side - Swiper */}
      <div className="md:w-1/2 w-full h-64 md:h-auto relative">
        <Swiper
          modules={[Autoplay, EffectFade]}
          autoplay={{ delay: 3000 }}
          effect="fade"
          loop
          className="h-full w-full"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <img
                src={src}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = 'none' }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-black bg-opacity-30 z-10" />

        {/* Text on image */}
        <div className="absolute bottom-8 left-8 z-20 text-white max-w-md drop-shadow-lg">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Farmers’ Empowerment Platform
          </h1>
          <p className="text-lg mt-2 font-medium text-gray-100">
            Grow smarter. Prosper together.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-8 bg-gradient-to-br from-green-50 to-green-100">
        <form
          onSubmit={handleRegister}
          className="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-sm shadow-2xl rounded-2xl px-10 py-12"
        >
          <h2 className="text-3xl font-bold text-green-700 text-center mb-6">
            Create Your Account
          </h2>

          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition duration-300"
          >
            Register
          </button>

          <p className="text-sm text-center text-gray-600 mt-6">
            Already have an account?{' '}
            <a href="/login" className="text-green-700 font-semibold hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
