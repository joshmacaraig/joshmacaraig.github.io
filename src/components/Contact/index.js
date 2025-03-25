import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiMail, FiGithub, FiLinkedin } from 'react-icons/fi';
import emailjs from 'emailjs-com';
import personalData from '../../data/personal';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null }
  });
  const form = useRef();

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus(prevStatus => ({ ...prevStatus, submitting: true }));

    try {
      // Using your EmailJS configuration
      await emailjs.sendForm(
        'service_kfprxmz', // Your EmailJS service ID
        'template_3v8gndb', // Your template ID
        form.current,
        '4P4mKRPHVcmUU67x-' // Your user ID / public key
      );
      
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: "Message sent successfully!" }
      });
      
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg: "An error occurred. Please try again later." }
      });
    }
  };

  return (
    <section id="contact" className="section-padding bg-gray-50 dark:bg-dark-bg">
      <div className="container-wrapper">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Get In <span className="gradient-text">Touch</span>
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-primary-500 mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          ></motion.div>
          <motion.p 
            className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Have a project in mind or want to discuss a potential collaboration? Feel free to reach out!
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact form */}
          <motion.div 
            className="card p-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold mb-6">Send Me a Message</h3>
            <form ref={form} onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-dark-accent text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-dark-accent text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message
                </label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message}
                  onChange={handleChange}
                  rows="5" 
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-dark-accent text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  required
                ></textarea>
              </div>
              <button 
                type="submit"
                className="btn-primary w-full flex justify-center items-center"
                disabled={status.submitting}
              >
                {status.submitting ? 
                  'Sending...' : 
                  <>Send Message <FiSend className="ml-2" /></>
                }
              </button>
              
              {status.info.msg && (
                <div className={`mt-4 p-3 rounded-md ${status.info.error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  {status.info.msg}
                </div>
              )}
            </form>
          </motion.div>
          
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="card p-6 mb-6">
              <h3 className="text-xl font-semibold mb-6">Connect With Me</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-full mr-4">
                    <FiMail className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <span className="block text-sm text-gray-500 dark:text-gray-400">Email</span>
                    <a href={`mailto:${personalData.email}`} className="text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400">
                      {personalData.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-center">
                  <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-full mr-4">
                    <FiGithub className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <span className="block text-sm text-gray-500 dark:text-gray-400">GitHub</span>
                    <a href={personalData.github} target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400">
                      github.com/joshmacaraig
                    </a>
                  </div>
                </li>
                <li className="flex items-center">
                  <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-full mr-4">
                    <FiLinkedin className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <span className="block text-sm text-gray-500 dark:text-gray-400">LinkedIn</span>
                    <a href={personalData.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400">
                      linkedin.com/in/joshmacaraig
                    </a>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-4">Let's Build Something Amazing</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Whether you need a complete business solution, a custom application, or integration work,
                I'm ready to help bring your vision to life with expertise in both low-code and traditional
                development approaches.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
