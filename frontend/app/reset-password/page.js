import Link from 'next/link'
import React from 'react'


const resetPassword = () => {
  return (
    <div className='flex justify-center items-center h-screen bg-gray-50'>
      <div className='flex flex-col justify-center items-center border border-gray-200 shadow-lg rounded-md p-6 bg-white'>
        <h1 className='font-bold text-xl text-black mb-1'>Enter New Password</h1>
        <p className='text-gray-400 text-xs mb-4'>Enter and confirm you password</p>

        <form className='flex flex-col'>
          
           <label className='font-bold text-xs ml-5 mb-2 text-black'>New Password</label>
          <input
            type='email'
            placeholder='Enter your password'
            className='border border-gray-300 rounded-md h-8 w-64 p-2 mb-3 ml-4 text-black text-xs placeholder-gray-400'
            required
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
          />
           <label className='font-bold text-xs ml-5 mb-2 text-black'>Confirm Password</label>
          <input
            type='email'
            placeholder='Confirm your password'
            className='border border-gray-300 rounded-md h-8 w-64 p-2 ml-4 text-black text-xs placeholder-gray-400'
            required
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
          />
           
         <Link href='/reset-password'>
          <button
            type='submit'
            // disabled={loading}
            className={`border rounded-md text-white m-4 w-64 bg-blue-700 hover:bg-blue-800 text-sm font-bold p-2`}
            >

            Reset Password
           
          </button>
          </Link>

        </form>
      </div>
    </div>
  )
}

export default resetPassword