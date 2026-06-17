import React from 'react';

const Welcome = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      
      {/* Navbar */}
      <nav className="absolute top-0 w-full z-20 px-6 md:px-12 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-white drop-shadow-md flex items-center gap-2">
          {/* Small Droplet Logo */}
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C7.5 8 5 12 5 15a7 7 0 0 0 14 0c0-3-2.5-7-7-13z"/></svg>
          LifeFlow
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <a href="/login" className="px-4 py-2 text-white font-medium hover:text-red-100 transition drop-shadow-md">
            Login
          </a>
          <a href="/register" className="px-4 py-2 bg-white text-red-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition">
            Sign Up
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex flex-col justify-center items-center text-center bg-red-600 text-white overflow-hidden pt-20 pb-12">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-300 rounded-full filter blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl px-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            Give Blood, <br className="md:hidden"/> Give Life
          </h1>
          <p className="text-lg md:text-2xl text-red-100 mb-10 max-w-2xl mx-auto">
            Join thousands of donors making a real difference. Your single donation has the power to save up to three lives.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/register" 
              className="bg-white text-red-600 px-8 py-4 rounded-lg text-lg font-bold shadow-xl hover:scale-105 transition transform duration-300"
            >
              Become a Donor
            </a>
            <a 
              href="/login" 
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-white hover:text-red-600 transition duration-300"
            >
              Login to Account
            </a>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
          <svg className="w-6 h-6 text-white opacity-75" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </header>

      {/* Impact Stats Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="p-6">
            <div className="text-5xl font-extrabold text-red-600 mb-2">3</div>
            <p className="text-lg text-gray-700 font-semibold">Lives Saved</p>
            <p className="text-gray-500 text-sm mt-1">From just a single donation.</p>
          </div>
          <div className="p-6 md:border-x md:border-gray-200">
            <div className="text-5xl font-extrabold text-red-600 mb-2">50+</div>
            <p className="text-lg text-gray-700 font-semibold">Active Centers</p>
            <p className="text-gray-500 text-sm mt-1">Connected across the country.</p>
          </div>
          <div className="p-6">
            <div className="text-5xl font-extrabold text-red-600 mb-2">10k+</div>
            <p className="text-lg text-gray-700 font-semibold">Hero Donors</p>
            <p className="text-gray-500 text-sm mt-1">Registered and actively donating.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center md:text-left">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto md:mx-0 mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Register Online</h3>
              <p className="text-gray-600">
                Create your free account, fill in your details, and verify your eligibility to donate blood in your area.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center md:text-left">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto md:mx-0 mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Find a Center</h3>
              <p className="text-gray-600">
                Use our interactive map to find the nearest blood donation center or upcoming mobile drive near you.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center md:text-left">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto md:mx-0 mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Donate & Save Lives</h3>
              <p className="text-gray-600">
                Visit the center, make your donation, and track your life-saving impact right from your dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 md:py-24 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <svg className="w-16 h-16 mx-auto mb-6 text-red-200" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C7.5 8 5 12 5 15a7 7 0 0 0 14 0c0-3-2.5-7-7-13z"/></svg>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Become a Hero?</h2>
          <p className="text-lg text-red-100 mb-10 max-w-2xl mx-auto">
            It only takes 45 minutes to donate blood, but the impact lasts a lifetime. Join the LifeFlow community today.
          </p>
          <a 
            href="/register" 
            className="inline-block bg-white text-red-600 px-10 py-4 rounded-lg text-lg font-bold shadow-xl hover:scale-105 transition transform duration-300"
          >
            Get Started Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} LifeFlow Blood Donation Platform. All rights reserved.</p>
        <div className="mt-4 flex justify-center space-x-6">
          <a href="#" className="hover:text-white transition">Privacy Policy</a>
          <a href="#" className="hover:text-white transition">Terms of Service</a>
          <a href="#" className="hover:text-white transition">Contact Us</a>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;