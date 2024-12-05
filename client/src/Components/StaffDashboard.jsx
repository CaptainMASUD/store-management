import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FaBox, FaClipboardList, FaPlus, FaSearch } from 'react-icons/fa';
import { MdDashboard, MdCategory, MdAttachMoney, MdInventory } from 'react-icons/md';

const StaffDashboard = () => {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [pieces, setPieces] = useState('');
  const [inventory, setInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  const fetchInventory = async () => {
    try {
      const response = await axios.get('/inventory');
      setInventory(response.data);
    } catch (error) {
      toast.error('Failed to fetch inventory');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      product_name: productName,
      category,
      price,
      pieces,
    };

    try {
      await axios.post('/inventory/add', newProduct);
      toast.success('Product added successfully');
      fetchInventory();
      setProductName('');
      setCategory('');
      setPrice('');
      setPieces('');
      setIsFormVisible(false);
    } catch (error) {
      toast.error('Failed to add product');
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

  const filteredInventory = inventory.filter(item =>
    item.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 p-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8 text-indigo-800 flex items-center">
          <MdDashboard className="mr-4" /> Staff Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between"
          >
            <div>
              <h2 className="text-2xl font-semibold text-indigo-600">Total Products</h2>
              <p className="text-4xl font-bold text-gray-800">{inventory.length}</p>
            </div>
            <FaBox className="text-5xl text-indigo-400" />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between"
          >
            <div>
              <h2 className="text-2xl font-semibold text-green-600">Accepted</h2>
              <p className="text-4xl font-bold text-gray-800">
                {inventory.filter(item => item.isAccepted === 1).length}
              </p>
            </div>
            <FaClipboardList className="text-5xl text-green-400" />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between"
          >
            <div>
              <h2 className="text-2xl font-semibold text-yellow-600">Pending</h2>
              <p className="text-4xl font-bold text-gray-800">
                {inventory.filter(item => item.isAccepted === 0).length}
              </p>
            </div>
            <MdInventory className="text-5xl text-yellow-400" />
          </motion.div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-indigo-800">Inventory Management</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFormVisible(!isFormVisible)}
              className="bg-indigo-600 text-white py-2 px-4 rounded-lg flex items-center"
            >
              <FaPlus className="mr-2" />
              {isFormVisible ? 'Hide Form' : 'Add Product'}
            </motion.button>
          </div>

          {isFormVisible && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
            >
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg"
                placeholder="Product Name"
                required
              />
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg"
                placeholder="Category"
                required
              />
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg"
                placeholder="Price"
                required
              />
              <input
                type="number"
                value={pieces}
                onChange={(e) => setPieces(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg"
                placeholder="Pieces"
                required
              />
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 col-span-2"
              >
                Submit Product
              </button>
            </motion.form>
          )}

          <div className="mb-4 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 border border-gray-300 rounded-lg"
              placeholder="Search products..."
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>

          {filteredInventory.length === 0 ? (
            <p className="text-center text-gray-500">No products available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-indigo-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Product Name</th>
                    <th className="px-4 py-2 text-left">Category</th>
                    <th className="px-4 py-2 text-left">Price</th>
                    <th className="px-4 py-2 text-left">Pieces</th>
                    <th className="px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInventory.map((item, index) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-4 py-2">{item.product_name}</td>
                      <td className="px-4 py-2 flex items-center">
                        <MdCategory className="mr-2 text-indigo-500" />
                        {item.category}
                      </td>
                      <td className="px-4 py-2 flex items-center">
                        <MdAttachMoney className="mr-1 text-green-500" />
                        {item.price}
                      </td>
                      <td className="px-4 py-2">{item.pieces}</td>
                      <td className={`px-4 py-2 ${getStatusClass(item.isAccepted)}`}>
                        {item.isAccepted === 1
                          ? 'Accepted'
                          : item.isAccepted === 0
                          ? 'Pending'
                          : 'Rejected'}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default StaffDashboard;

