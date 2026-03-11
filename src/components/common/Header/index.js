import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import personalData from '../../../data/personal';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Toolkit', href: '#skills' },
  { label: 'Integrations', href: '#integrations' },
  { label: 'Contact', href: '#contact' },
];

const Header = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-400 ${
        scrolled
          ? 'bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-xl border-b border-black/[0.07] dark:border-white/[0.07] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-wrapper">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <a
            href="/"
            className="text-sm font-bold tracking-tight text-[#09090b] dark:text-white hover:opacity-60 transition-opacity"
          >
            {personalData.name}
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(({ label, href }) => (
              <a key={label} href={href} className="nav-link">
                {label}
              </a>
            ))}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-[#71717a] hover:text-[#09090b] dark:hover:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.07] transition-all"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
            </button>

            <a
              href={`https://mail.google.com/mail/?view=cm&to=${personalData.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !py-2 !px-5 !text-sm"
            >
              Email me
            </a>
          </nav>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-[#71717a] hover:text-[#09090b] dark:hover:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.07] transition-all"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-[#71717a] hover:text-[#09090b] dark:hover:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.07] transition-all"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden mt-3 pb-5 border-t border-black/[0.07] dark:border-white/[0.07] pt-4 space-y-0.5">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="block py-2.5 text-sm font-medium text-[#52525b] dark:text-[#a1a1aa] hover:text-[#09090b] dark:hover:text-white transition-colors"
              >
                {label}
              </a>
            ))}
            <div className="pt-3">
              <a href={`https://mail.google.com/mail/?view=cm&to=${personalData.email}`} target="_blank" rel="noopener noreferrer" className="btn-primary !text-sm">
                Email me
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
