"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || 'Login failed');
      } else {
        // Save JWT token securely in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Redirect to home/dashboard
        router.push('/');
      }
    } catch (err) {
      console.error(err);
      setError('Server error. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gray-50'>
      <div className='flex flex-col justify-center items-center border border-gray-200 shadow-lg rounded-md p-6 bg-white'>
        <h1 className='font-bold text-2xl text-black mb-1'>Welcome back</h1>
        <p className='text-gray-400 text-xs mb-4'>Login to your account to continue shopping</p>

        <form className='flex flex-col' onSubmit={handleSubmit}>
          {/* Email */}
          <label className='font-bold text-xs ml-4 mb-1 text-black'>Email</label>
          <input
            type='email'
            placeholder='Email'
            className='border border-gray-300 rounded-md h-8 w-64 p-2 ml-4 text-black text-xs placeholder-gray-400'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <label className='font-bold text-xs ml-4 mt-4 mb-1 text-black'>Password</label>
          <div className='relative ml-4 w-64'>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              className='border border-gray-300 rounded-md h-8 w-full p-2 text-black text-xs placeholder-gray-400'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className='absolute right-2 top-2 cursor-pointer text-gray-500'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {error && <p className="text-red-500 text-xs ml-4 mt-1">{error}</p>}

          <button
            type='submit'
            disabled={loading}
            className={`border rounded-md text-white m-4 w-64 bg-blue-700 hover:bg-blue-800 text-sm font-bold p-2 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p className='text-gray-400 text-xs ml-4'>
            <Link href='/register' className='text-purple-500 hover:text-purple-800'>Register an account</Link> | 
            <Link href='/forgot-password' className='ml-1 hover:text-black/80'>Forget password?</Link>
          </p>

          <div className="flex items-center mt-2 ml-4">
            <input
              id="remember"
              type="checkbox"
              className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
            />
            <label htmlFor="remember" className="ml-2 font-bold text-xs text-gray-800">
              Remember me
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
