'use client'

import React, { useState } from 'react'
import axios from 'axios'

const ForgetPassword = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')
    setLoading(true)
    try {
      const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { email })
      setMessage(res.data.message || 'Reset link sent to your email.')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex justify-center items-center h-screen bg-gray-50'>
      <div className='flex flex-col justify-center items-center border border-gray-200 shadow-lg rounded-md p-6 bg-white'>
        <h1 className='font-bold text-xl text-black mb-1'>Reset your password</h1>
        <p className='text-gray-400 text-xs mb-4'>Enter your email to reset the password</p>

        {message && <p className="text-green-500 text-xs mb-2">{message}</p>}
        {error && <p className="text-red-500 text-xs mb-2">{error}</p>}

        <form className='flex flex-col w-full' onSubmit={handleSubmit}>
          <label className='font-bold text-xs ml-5 mb-2 text-black'>Email</label>
          <input
            type='email'
            placeholder='Enter Your Email'
            className='border border-gray-300 rounded-md h-8 w-64 p-2 ml-4 text-black text-xs placeholder-gray-400'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type='submit'
            disabled={loading}
            className={`border rounded-md text-white m-4 w-64 bg-blue-700 hover:bg-blue-800 text-sm font-bold p-2 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Sending...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ForgetPassword
