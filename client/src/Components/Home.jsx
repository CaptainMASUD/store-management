import React from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaChartBar, FaUsers, FaCog, FaShieldAlt, FaHeadset } from 'react-icons/fa';

const HomePage = () => {
  const features = [
    { icon: FaRocket, title: 'Quick Setup', description: 'Get started in minutes with our easy-to-use interface.' },
    { icon: FaChartBar, title: 'Powerful Analytics', description: 'Gain insights with comprehensive data analysis tools.' },
    { icon: FaUsers, title: 'Team Collaboration', description: 'Foster teamwork with built-in collaboration features.' },
    { icon: FaCog, title: 'Customizable', description: 'Tailor the system to fit your specific business needs.' },
    { icon: FaShieldAlt, title: 'Secure', description: 'Your data is protected with industry-leading security measures.' },
    { icon: FaHeadset, title: '24/7 Support', description: 'Our support team is always ready to assist you.' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-blue-100 to-white "
    >
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://www.smallbusiness.nsw.gov.au/sites/default/files/styles/1280/public/2023-07/iStock-1492719618.jpg?itok=T1vG28Cx"
            alt="Background"
            className="w-full h-full object-cover z-0"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-white mb-4"
          >
            Welcome to Our Management System
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-white mb-8"
          >
            Streamline your business operations and boost productivity
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-blue-100 transition duration-300"
          >
            Get Started
          </motion.button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <feature.icon className="text-4xl text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-blue-600 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-8">What Our Clients Say</h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xl italic mb-4">
              "This management system has revolutionized our workflow. It's intuitive, powerful, and has significantly improved our team's productivity."
            </p>
            <p className="font-semibold">- John Doe, CEO of TechCorp</p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">Join thousands of businesses already using our management system</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-blue-700 transition duration-300"
          >
            Start Your Free Trial
          </motion.button>
        </div>
      </section>

  
    </motion.div>
  );
};

export default HomePage;

