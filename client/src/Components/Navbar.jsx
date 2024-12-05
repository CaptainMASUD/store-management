import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../Redux/UserSlice/UserSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaInfoCircle, FaUser, FaUserCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';

const CustomNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!currentUser);
  }, [currentUser]);

  const handleLogout = () => {
    dispatch(signOut());
    navigate('/login');
  };

  const handleProfileRedirect = () => {
    if (currentUser?.role === 'manager') {
      navigate('/manager-panel');
    } else if (currentUser?.role === 'staff') {
      navigate('/staff-panel');
    }
    setDropdownOpen(false);
  };

  const navItems = [
    { to: '/', icon: FaHome, text: 'Home' },
    { to: '/about', icon: FaInfoCircle, text: 'About Us' },
  ];

  const NavItem = ({ to, icon: Icon, text }) => {
    const isActive = location.pathname === to;
    return (
      <a
        href={to}
        className={`flex items-center px-4 py-2 rounded-full transition-colors duration-200 ${
          isActive
            ? 'bg-indigo-700 text-white'
            : 'text-gray-300 hover:bg-indigo-600 hover:text-white'
        }`}
      >
        <Icon className="mr-2" />
        <span>{text}</span>
      </a>
    );
  };

  return (
    <nav className="bg-gradient-to-r from-purple-800 to-indigo-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex-shrink-0">
              <motion.span
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-white"
              >
                My Website
              </motion.span>
            </a>
            <div className="hidden lg:flex ml-10 items-baseline space-x-4">
              {navItems.map((item) => (
                <NavItem key={item.to} {...item} />
              ))}
            </div>
          </div>
          <div className="hidden lg:block">
            {isLoggedIn ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center text-white px-4 py-2 rounded-full bg-indigo-700 hover:bg-indigo-600 transition-colors duration-200 focus:outline-none"
                >
                  <FaUserCircle className="mr-2" />
                  <span>{currentUser?.username || 'Profile'}</span>
                </motion.button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl overflow-hidden z-30"
                    >
                      <div className="px-4 py-2 bg-gray-100">
                        <p className="text-sm font-medium text-gray-900">{currentUser?.username}</p>
                        <p className="text-xs text-gray-500">{currentUser?.email}</p>
                      </div>
                      <div className="py-1">
                        <button
                          onClick={handleProfileRedirect}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100"
                        >
                          <FaCog className="mr-2" /> Profile
                        </button>
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                        >
                          <FaSignOutAlt className="mr-2" /> Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <a
                href="/login"
                className="flex items-center text-white px-4 py-2 rounded-full bg-indigo-700 hover:bg-indigo-600 transition-colors duration-200"
              >
                <FaUser className="mr-2" /> Login / Register
              </a>
            )}
          </div>
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 z-30">
              {navItems.map((item) => (
                <NavItem key={item.to} {...item} />
              ))}
              {isLoggedIn ? (
                <>
                  <button
                    onClick={handleProfileRedirect}
                    className="flex items-center w-full px-4 py-2 text-sm z-40 text-gray-300 hover:bg-indigo-600 hover:text-white rounded-full"
                  >
                    <FaCog className="mr-2" /> Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex z-20 items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-red-600 hover:text-white rounded-full"
                  >
                    <FaSignOutAlt className="mr-2" /> Logout
                  </button>
                </>
              ) : (
                <a
                  href="/login"
                  className="flex items-center text-gray-300 px-4 py-2 rounded-full hover:bg-indigo-600 hover:text-white"
                >
                  <FaUser className="mr-2" /> Login / Register
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default CustomNavbar;

