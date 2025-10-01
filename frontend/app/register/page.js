'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const Register = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password
      });

      // Save token in localStorage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      // Redirect to login page
      router.push('/login');
    } catch (err) {
      setError(err.response?.data?.message || "Password must be 6 letters");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex justify-center items-center h-screen bg-gray-50'>
      <div className='flex flex-col justify-center items-center border border-gray-200 shadow-lg rounded-md p-7 bg-white'>
        <h1 className='font-bold text-2xl text-black mb-1'>Welcome</h1>
        <p className='text-gray-400 text-xs mb-4'>Create a new account</p>

        {error && <p className="text-red-500 text-xs mb-2">{error}</p>}

        <form className='flex flex-col text-black' onSubmit={handleSubmit}>
          <label className='font-bold text-xs p-1  '>Name</label>
          <input
            type='text'
            placeholder='Name'
            className='border border-gray-300 rounded-md h-10 w-64 p-2 mb-2 text-xs placeholder-gray-400'
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />

          <label className='font-bold text-xs p-1 '>Email</label>
          <input
            type='email'
            placeholder='Email'
            className='border border-gray-300 rounded-md h-10 w-64 p-2 mb-2 text-xs placeholder-gray-400'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <label className='font-bold text-xs p-1'>Password</label>
          <div className='relative w-64'>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            className='border border-gray-300 rounded-md h-10 w-64 p-2 mb-2 text-xs placeholder-gray-400'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            />
            <span
            className='absolute right-2 top-[11px] cursor-pointer text-gray-500'
              onClick={() => setShowPassword(!showPassword)}
              >
               {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            </div>

          <label className='font-bold text-xs p-1'>Confirm Password</label>
          <div className='relative w-64'>
          <input
            type={showConfirmPassword ?'text' : 'password'}
            placeholder='Confirm Password'
            className='border border-gray-300 rounded-md h-10 w-64 p-2 mb-4 text-xs placeholder-gray-400'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            />
            <span
            className='absolute right-2 top-[11px] cursor-pointer text-gray-500'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

          <button
            type='submit'
            disabled={loading}
            className={`border rounded-md text-white w-64 p-2 mb-3 text-sm font-bold hover:bg-blue-800 transition-all duration-300 ${
              loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-700'
            }`}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>

          <p className='text-gray-400 text-xs text-center'>
            Already have an account?{' '}
            <Link href='/login' className='text-purple-500 hover:text-purple-800'>
              Login
            </Link> 
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
