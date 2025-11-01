import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Make sure you're using react-router

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      const { token, user } = res.data;

      // Store token and role
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', user.role);

      alert(`🌾 Welcome to the Farmers’ Empowerment Platform, ${user.name || 'User'}!`);

      // Redirect based on role
      if (user.role === 'admin') {
        window.location.href = '/admin-dashboard';
      } else if (user.role === 'farmer') {
        window.location.href = '/farmer-dashboard';
      } else {
        window.location.href = '/dashboard';
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: 'Arial, sans-serif',
        background: 'linear-gradient(to right, #4caf50, #81c784)',
        color: '#fff',
      }}
    >
      <h2 style={{ marginBottom: '20px' }}>🌾 Farmers’ Empowerment Platform – Login</h2>
      <form
        onSubmit={loginUser}
        style={{
          display: 'flex',
          flexDirection: 'column',
          background: '#fff',
          padding: '30px',
          borderRadius: '12px',
          width: '320px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          color: '#333',
        }}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your registered email"
          required
          style={{
            marginBottom: '15px',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '16px',
          }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
          style={{
            marginBottom: '20px',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '16px',
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: '#4caf50',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '10px',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: 'pointer',
            marginBottom: '10px',
          }}
        >
          Login
        </button>
        {/* Register link */}
        <p style={{ textAlign: 'center', marginTop: '10px' }}>
          Don’t have an account?{' '}
          <Link to="/register" style={{ color: '#4caf50', fontWeight: 'bold' }}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
