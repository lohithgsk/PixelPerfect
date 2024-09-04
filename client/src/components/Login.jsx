// src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/login', { email, password });
      alert('Login successful!');
      navigate('/');
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
         style={{ backgroundImage: 'url(https://cdn.pixabay.com/photo/2024/06/10/15/05/flower-8820894_1280.png)' }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative bg-black bg-opacity-75 p-8 rounded-lg shadow-lg max-w-md w-full transition-transform duration-1000 transform hover:scale-105 animate-fadeIn">
        <h2 className="text-3xl font-bold text-white mb-6 text-center animate-fadeIn">Welcome Back</h2>
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-transform duration-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-transform duration-300"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md transition-transform duration-300 transform hover:scale-105"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-sm text-gray-400 text-center animate-fadeIn">
          Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
