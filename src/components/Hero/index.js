import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowDown } from 'react-icons/fi';
import personalData from '../../data/personal';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-purple-50/50 dark:from-primary-900/10 dark:to-purple-900/10 -z-10"></div>
      
      {/* Animated background element */}
      <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10 dark:opacity-20">
        <div className="w-full h-full rounded-full bg-gradient-to-r from-primary-300 to-purple-400 animate-gradient-x"></div>
      </div>
      
      <div className="container-wrapper z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span>Hi, I'm </span>
            <span className="gradient-text">{personalData.name}</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium mb-6 text-gray-700 dark:text-gray-300">
            {personalData.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8">
            {personalData.summary}
          </p>
          
          <div className="flex justify-center space-x-4">
            <motion.a 
              href="#projects"
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
            <motion.a 
              href="#contact"
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
          </div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
          >
            <FiArrowDown className="text-2xl text-gray-400 dark:text-gray-500" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
