import React, { useState } from 'react';

const Header = ({ isAuthenticated = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-2 text-red-600 font-bold text-xl">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C7.5 8 5 12 5 15a7 7 0 0 0 14 0c0-3-2.5-7-7-13z"/></svg>
              LifeFlow
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-600 hover:text-red-600 transition font-medium">Home</a>
            <a href="/about" className="text-gray-600 hover:text-red-600 transition font-medium">About Us</a>
            <a href="/centers" className="text-gray-600 hover:text-red-600 transition font-medium">Find Centers</a>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <a href="/dashboard" className="text-gray-600 hover:text-red-600 transition font-medium">Dashboard</a>
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-sm border-2 border-red-200">
                  JD
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <a href="/login" className="text-gray-600 hover:text-red-600 transition font-medium">Login</a>
                <a href="/register" className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition">Sign Up</a>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 hover:text-gray-900 focus:outline-none">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <a href="/" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md font-medium">Home</a>
            <a href="/about" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md font-medium">About Us</a>
            <a href="/centers" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md font-medium">Find Centers</a>
            {isAuthenticated ? (
              <a href="/dashboard" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md font-medium">Dashboard</a>
            ) : (
              <div className="pt-2 flex flex-col space-y-2">
                <a href="/login" className="block text-center px-3 py-2 border border-gray-300 rounded-md text-gray-700 font-medium">Login</a>
                <a href="/register" className="block text-center px-3 py-2 bg-red-600 text-white rounded-md font-semibold">Sign Up</a>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;