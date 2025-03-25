import React from 'react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import personalData from '../../../data/personal';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-dark-card py-8">
      <div className="container-wrapper">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold gradient-text">{personalData.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{personalData.title}</p>
          </div>
          
          <div className="flex space-x-4">
            <a 
              href={personalData.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
              aria-label="GitHub Profile"
            >
              <FiGithub size={20} />
            </a>
            <a 
              href={personalData.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <FiLinkedin size={20} />
            </a>
            <a 
              href={`mailto:${personalData.email}`}
              className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
              aria-label="Email Contact"
            >
              <FiMail size={20} />
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            &copy; {currentYear} {personalData.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
