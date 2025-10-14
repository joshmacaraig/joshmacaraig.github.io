import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';
import personalData from '../../../data/personal';

const Header = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 py-4' 
        : 'bg-transparent py-6'
    }`}>
      <div className="container-wrapper">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold tracking-tight hover:opacity-70 transition-opacity">
            {personalData.name}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#work" className="text-sm font-medium hover:opacity-60 transition-opacity">
              Work
            </a>
            <a href="#services" className="text-sm font-medium hover:opacity-60 transition-opacity">
              Pricing
            </a>
            <a href="#contact" className="text-sm font-medium hover:opacity-60 transition-opacity">
              Contact
            </a>
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 hover:opacity-60 transition-opacity"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <FiSun className="w-5 h-5" />
              ) : (
                <FiMoon className="w-5 h-5" />
              )}
            </button>

            {/* CTA Button */}
            <a
              href={personalData.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold rounded-full hover:scale-105 transition-transform"
            >
              Book a call
            </a>
          </nav>

          {/* Mobile Menu */}
          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>
            <a
              href={personalData.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold rounded-full"
            >
              Book
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
