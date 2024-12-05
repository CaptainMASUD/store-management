import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FaUsers, FaBoxOpen, FaUserPlus, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';

const ManagerDashboard = () => {
  const [users, setUsers] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [activeTab, setActiveTab] = useState('users');

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/staff/all-users');
      setUsers(response.data);
    } catch (error) {
      toast.error('Failed to fetch users');
      console.error(error);
    }
  };

  const fetchInventory = async () => {
    try {
      const response = await axios.get('/inventory');
      setInventory(response.data);
    } catch (error) {
      toast.error('Failed to fetch products');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchInventory();
  }, []);

  const handlePromote = async (userId) => {
    try {
      const response = await axios.post('/staff/promote-to-manager', { userId });
      if (response.data.success) {
        toast.success('User promoted to manager');
        fetchUsers();
      } else {
        toast.error('Failed to promote user');
      }
    } catch (error) {
      toast.error('Failed to promote user');
      console.error(error);
    }
  };

  const handleUpdateStatus = async (productId, status) => {
    try {
      const response = await axios.put('/inventory/update', {
        id: productId,
        isAccepted: status,
      });
      if (response.data.message === 'Package status updated') {
        toast.success('Product status updated');
        fetchInventory();
      } else {
        toast.error('Failed to update product status');
      }
    } catch (error) {
      toast.error('Failed to update product status');
      console.error(error);
    }
  };

  const handleUserDelete = async (userId) => {
    try {
      const response = await axios.delete(`/staff/delete-user/${userId}`);
      if (response.data.message === 'User deleted successfully') {
        toast.success('User deleted');
        fetchUsers();
      } else {
        toast.error('Failed to delete user');
      }
    } catch (error) {
      toast.error('Failed to delete user');
      console.error(error);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 1: return 'text-green-500';
      case 0: return 'text-yellow-500';
      case -1: return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        className="w-64 bg-blue-600 text-white p-6"
      >
        <h1 className="text-2xl font-bold mb-8 flex items-center">
          <MdDashboard className="mr-2" /> Dashboard
        </h1>
        <nav>
          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center mb-4 ${activeTab === 'users' ? 'text-yellow-300' : ''}`}
          >
            <FaUsers className="mr-2" /> Users
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`flex items-center ${activeTab === 'inventory' ? 'text-yellow-300' : ''}`}
          >
            <FaBoxOpen className="mr-2" /> Inventory
          </button>
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-10 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'users' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">User Management</h2>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left">Username</th>
                      <th className="px-6 py-3 text-left">Role</th>
                      <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="border-b"
                      >
                        <td className="px-6 py-4">{user.username}</td>
                        <td className="px-6 py-4">{user.role}</td>
                        <td className="px-6 py-4">
                          {user.role === 'staff' && (
                            <button
                              onClick={() => handlePromote(user.id)}
                              className="bg-blue-500 text-white py-1 px-3 rounded mr-2 flex items-center"
                            >
                              <FaUserPlus className="mr-1" /> Promote
                            </button>
                          )}
                          <button
                            onClick={() => handleUserDelete(user.id)}
                            className="bg-red-500 text-white py-1 px-3 rounded flex items-center"
                          >
                            <FaTrash className="mr-1" /> Delete
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'inventory' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Inventory Management</h2>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left">Product</th>
                      <th className="px-6 py-3 text-left">Category</th>
                      <th className="px-6 py-3 text-left">Price</th>
                      <th className="px-6 py-3 text-left">Pieces</th>
                      <th className="px-6 py-3 text-left">Status</th>
                      <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.map((product) => (
                      <motion.tr
                        key={product.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="border-b"
                      >
                        <td className="px-6 py-4">{product.product_name}</td>
                        <td className="px-6 py-4">{product.category}</td>
                        <td className="px-6 py-4">${product.price}</td>
                        <td className="px-6 py-4">{product.pieces}</td>
                        <td className={`px-6 py-4 ${getStatusClass(product.isAccepted)}`}>
                          {product.isAccepted === 1 ? 'Accepted' : product.isAccepted === 0 ? 'Pending' : 'Rejected'}
                        </td>
                        <td className="px-6 py-4">
                          {product.isAccepted === 0 && (
                            <>
                              <button
                                onClick={() => handleUpdateStatus(product.id, 1)}
                                className="bg-green-500 text-white py-1 px-3 rounded mr-2 flex items-center"
                              >
                                <FaCheck className="mr-1" /> Accept
                              </button>
                              <button
                                onClick={() => handleUpdateStatus(product.id, -1)}
                                className="bg-red-500 text-white py-1 px-3 rounded flex items-center"
                              >
                                <FaTimes className="mr-1" /> Reject
                              </button>
                            </>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ManagerDashboard;

