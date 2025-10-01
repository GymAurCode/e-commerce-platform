"use client";

import { Disclosure, Menu } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return (
    <Disclosure as="nav" className="bg-gray-200 p-3 rounded-lg">
      {({ open }) => (
        <>
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            {/* Left: Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="text-xl font-bold">MyShop</h1>
              </Link>
            </div>

            {/* Middle: Search (optional) */}
            <div className="hidden md:flex flex-1 mx-4">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-3 py-2 rounded-lg border border-gray-300"
              />
            </div>

            {/* Right: Cart + User/Profile */}
            <div className="flex items-center space-x-4">
              <ShoppingCartIcon className="h-6 w-6 text-gray-700" />

              {/* Conditional rendering */}
              {!user ? (
                <>
                  <Link href="/login" className="px-3 py-1 bg-blue-600 text-white rounded-md">
                    Login
                  </Link>
                  <Link href="/register" className="px-3 py-1 bg-green-600 text-white rounded-md">
                    Sign Up
                  </Link>
                </>
              ) : (
                <Menu as="div" className="relative">
                  <Menu.Button className="flex items-center rounded-full bg-gray-300 p-1">
                    <span className="sr-only">Open user menu</span>
                    <img
                      src={user.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=facearea"}
                      alt="Profile"
                      className="h-8 w-8 rounded-full"
                    />
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/profile"
                          className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}
                        >
                          Profile
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => {
                            localStorage.removeItem("user");
                            setUser(null);
                          }}
                          className={classNames(active ? "bg-gray-100" : "", "w-full text-left px-4 py-2 text-sm text-gray-700")}
                        >
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              )}
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
