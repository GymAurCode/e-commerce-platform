'use client'; // optional, agar client-side ka behavior chahiye

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex justify-center items-center h-screen flex-col bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
      <p className="text-gray-500 mb-4">Sorry, the page you are looking for does not exist.</p>
      <Link href="/" className="text-white bg-blue-700 px-4 py-2 rounded-md">
        Go Home
      </Link>
    </div>
  );
}
