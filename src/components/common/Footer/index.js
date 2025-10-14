import React from 'react';
import { FiLinkedin, FiMail } from 'react-icons/fi';
import personalData from '../../../data/personal';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] py-12">
      <div className="container-wrapper">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} {personalData.name}. Building MVPs that matter.
            </p>
          </div>
          
          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a 
              href={personalData.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <FiLinkedin className="w-5 h-5" />
            </a>
            <a 
              href={`mailto:${personalData.email}`}
              className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              aria-label="Email"
            >
              <FiMail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
