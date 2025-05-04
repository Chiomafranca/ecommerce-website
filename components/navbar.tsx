"use client"; // Add this directive at the top

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-br from-blue-50 to-purple-50  shadow-sm dark:bg-gray-900">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Logo/Brand */}
        <Link 
          href="/" 
          className="text-lg font-semibold text-gray-900 hover:text-orange-800 transition-colors dark:text-white dark:hover:text-orange-500"
        >
          My Ecommerce
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            href="/" 
            className="text-gray-600 hover:text-orange-800 transition-colors dark:text-gray-300 dark:hover:text-orange-500"
          >
            Home
          </Link>
          <Link 
            href="/products" 
            className="text-gray-600 hover:text-orange-800 transition-colors dark:text-gray-300 dark:hover:text-orange-500"
          >
            Products
          </Link>
          <Link 
            href="/checkout" 
            className="text-gray-600 hover:text-orange-800 transition-colors dark:text-gray-300 dark:hover:text-orange-500"
          >
            Checkout
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 hover:text-orange-800 focus:outline-none dark:text-gray-300 dark:hover:text-orange-500"
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-md">
          <div className="container mx-auto flex flex-col px-4 py-2 space-y-3">
            <Link 
              href="/" 
              className="py-2 text-gray-600 hover:text-orange-800 transition-colors dark:text-gray-300 dark:hover:text-orange-500"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/products" 
              className="py-2 text-gray-600 hover:text-orange-800 transition-colors dark:text-gray-300 dark:hover:text-orange-500"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link 
              href="/checkout" 
              className="py-2 text-gray-600 hover:text-orange-800 transition-colors dark:text-gray-300 dark:hover:text-orange-500"
              onClick={() => setIsOpen(false)}
            >
              Checkout
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};