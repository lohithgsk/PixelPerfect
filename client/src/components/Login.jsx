import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GoogleLogin } from 'react-google-login';

const ClientId = "478980045480-k81kmkdfa19emp9btc9kq230p1k605ha.apps.googleusercontent.com"

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

  const onSuccess = (res) => {
    console.log("LOGIN SUCCESS! Current user: ", res.profileObj)
  }

  const onFailure = (res) => {
    console.log("LOGIN FAILED! res: ", res)
  }

  return (
    <motion.div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: 'url(https://i.pinimg.com/originals/fc/fe/65/fcfe65272f02ca4ee988a7ed0e79c2d1.jpg)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      
      <div
        className="relative h-full w-full bg-gray-800 bg-opacity-80 p-8 rounded-2xl shadow-2xl max-w-md transition-transform duration-1000 transform hover:scale-105 bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-100"
        style={{ animation: 'fadeIn 1s ease-in-out' }}
      >
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Welcome Back
        </h2>
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <label className="text-white font-semibold">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email"
            className="p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-300"
          />
          <label className="text-white font-semibold">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-label="Password"
            className="p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-300"
          />
          <button
            type="submit"
            className={`bg-black hover:bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md transition-transform duration-300 transform hover:scale-105`}
          >
            Login
          </button>
        </form>
        <div id="signInButton">
          <GoogleLogin
            clientId="YOUR_CLIENT_ID"
            buttonText='Login Using Google'
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
            />
        </div>
        <p className="mt-6 text-sm text-gray-300 text-center">
          Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
