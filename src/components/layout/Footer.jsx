import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & Mission */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 text-2xl font-bold text-white mb-4">
              <svg className="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C7.5 8 5 12 5 15a7 7 0 0 0 14 0c0-3-2.5-7-7-13z"/></svg>
              LifeFlow
            </div>
            <p className="text-sm leading-relaxed max-w-md">
              LifeFlow is a dedicated platform connecting blood donors with those in urgent need. 
              Our mission is to ensure that no life is lost due to a shortage of blood. 
              Give blood, give life.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-red-400 transition">Home</a></li>
              <li><a href="/about" className="hover:text-red-400 transition">About Us</a></li>
              <li><a href="/centers" className="hover:text-red-400 transition">Find Centers</a></li>
              <li><a href="/register" className="hover:text-red-400 transition">Become a Donor</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/contact" className="hover:text-red-400 transition">Contact Us</a></li>
              <li><a href="/faq" className="hover:text-red-400 transition">FAQ</a></li>
              <li><a href="/privacy" className="hover:text-red-400 transition">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-red-400 transition">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} LifeFlow Platform. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;