import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaClipboardCheck, FaChartLine } from 'react-icons/fa';

const AboutPage = () => {
  const features = [
    { icon: FaUsers, title: 'Team Management', description: 'Efficiently manage your staff and their roles.' },
    { icon: FaClipboardCheck, title: 'Task Tracking', description: 'Keep track of all tasks and their progress.' },
    { icon: FaChartLine, title: 'Performance Analytics', description: 'Analyze team and individual performance.' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
          className="text-4xl font-bold text-center text-gray-900 mb-12"
        >
          About Our Management System
        </motion.h1>
        
        <div className="mt-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <feature.icon className="h-8 w-8 text-blue-500" />
                    <h3 className="ml-3 text-lg font-medium text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 text-center text-gray-600 max-w-2xl mx-auto"
        >
          Our management system is designed to streamline your business operations, 
          improve team collaboration, and boost overall productivity. With intuitive 
          features and powerful analytics, we help you make data-driven decisions 
          and achieve your business goals.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default AboutPage;
