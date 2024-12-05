// src/components/Footer.js
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Importing social media icons

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6 text-center">
        {/* Footer Text */}
        <div className="mb-6 text-lg">
          <p>© 2024 Store Manager System. All rights reserved.</p>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 mb-6">
          <a 
            href="https://facebook.com" 
            className="text-white hover:text-blue-500 transition duration-300"
            target="_blank" 
            rel="noopener noreferrer"
          >
            <FaFacebook size={24} />
          </a>
          <a 
            href="https://twitter.com" 
            className="text-white hover:text-blue-300 transition duration-300"
            target="_blank" 
            rel="noopener noreferrer"
          >
            <FaTwitter size={24} />
          </a>
          <a 
            href="https://instagram.com" 
            className="text-white hover:text-pink-500 transition duration-300"
            target="_blank" 
            rel="noopener noreferrer"
          >
            <FaInstagram size={24} />
          </a>
          <a 
            href="https://linkedin.com" 
            className="text-white hover:text-blue-700 transition duration-300"
            target="_blank" 
            rel="noopener noreferrer"
          >
            <FaLinkedin size={24} />
          </a>
        </div>

        {/* Optional Extra Section */}
        <div className="text-sm">
          <p>Made  by Store Manager Team</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
