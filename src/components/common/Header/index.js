import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../../context/ThemeContext';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import personalData from '../../../data/personal';

const Header = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md py-3 shadow-md' : 'bg-transparent py-5'
    }`}>
      <div className="container-wrapper">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold gradient-text">
            {personalData.name}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="nav-link">Home</Link>
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#skills" className="nav-link">Skills</a>
            <a href="#contact" className="nav-link">Contact</a>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <FiSun className="text-yellow-400" /> : <FiMoon />}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button 
              onClick={toggleTheme} 
              className="p-2 mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <FiSun className="text-yellow-400" /> : <FiMoon />}
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200 dark:border-gray-800">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="nav-link" onClick={toggleMenu}>Home</Link>
              <a href="#projects" className="nav-link" onClick={toggleMenu}>Projects</a>
              <a href="#skills" className="nav-link" onClick={toggleMenu}>Skills</a>
              <a href="#contact" className="nav-link" onClick={toggleMenu}>Contact</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
