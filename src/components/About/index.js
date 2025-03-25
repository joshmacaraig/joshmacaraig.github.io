import React from 'react';
import { motion } from 'framer-motion';
import personalData from '../../data/personal';

const About = () => {
  return (
    <section className="section-padding">
      <div className="container-wrapper">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative h-80 md:h-full rounded-lg overflow-hidden bg-gray-200 dark:bg-dark-accent">
              <img 
                src="/assets/images/profile.jpg" 
                alt="Josh Macaraig" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              About <span className="gradient-text">Me</span>
            </h2>
            <div className="w-20 h-1 bg-primary-500 mb-6"></div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
              {personalData.aboutMe}
            </p>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              With a passion for creating efficient and robust solutions, I specialize in bridging the gap between low-code platforms and traditional development to deliver comprehensive business applications that solve real-world problems.
            </p>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Beyond coding, I'm a <a href="https://global-memory.org/athlete.php?id=14786" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">memory athlete</a> and an AI enthusiast, constantly exploring ways to leverage artificial intelligence to enhance productivity and create innovative solutions.
            </p>
            
            <div className="mt-auto">
              <motion.a 
                href="#contact"
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Let's Connect
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
