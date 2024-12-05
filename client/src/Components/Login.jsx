import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from '../axios';
import { toast } from 'react-toastify';
import { FaUser, FaLock } from 'react-icons/fa';
import { signInStart, signInSuccess, signInError } from '../Redux/UserSlice/UserSlice';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Start login process
    dispatch(signInStart());

    try {
      // Make API call to login
      const response = await axios.post('/auth/login', { username, password });

      // Save user to Redux store
      dispatch(signInSuccess(response.data.user));

      // Save user to localStorage (optional)
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Show success toast
      toast.success('Login successful!');

      // Redirect based on role
      navigate(response.data.user.role === 'manager' ? '/manager-panel' : '/staff-panel');
    } catch (error) {
      // Handle login error
      dispatch(signInError('Login failed!'));
      toast.error('Login failed! Please check your credentials.');
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-700 text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FaUser className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200 focus:outline-none"
              placeholder="Username"
            />
          </div>
          <div className="relative">
            <FaLock className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200 focus:outline-none"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:ring focus:ring-blue-300 transition"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
