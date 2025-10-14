import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLinkedin, FiArrowRight } from 'react-icons/fi';
import personalData from '../../data/personal';

const Contact = () => {
  return (
    <section id="contact" className="section-padding bg-white dark:bg-[#0a0a0a]">
      <div className="container-wrapper">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.span
              className="badge mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Get in Touch
            </motion.span>
            
            <motion.h2 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Let's build your{' '}
              <span className="gradient-text">MVP</span>
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-400 font-light mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Have a project in mind? Let's talk about how we can bring it to life.
            </motion.p>

            <motion.a
              href={personalData.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Book free 15-min audit
              <FiArrowRight />
            </motion.a>
          </div>

          {/* Contact Methods */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Email */}
            <a
              href={`mailto:${personalData.email}`}
              className="card p-6 text-center hover-lift group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-900 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <FiMail className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-1">Email</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {personalData.email}
              </p>
            </a>

            {/* LinkedIn */}
            <a
              href={personalData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="card p-6 text-center hover-lift group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-900 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <FiLinkedin className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-1">LinkedIn</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Connect with me
              </p>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
