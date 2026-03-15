import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import personalData from '../../../data/personal';

const navLinks = [
  { label: 'About',        href: '#about' },
  { label: 'Work',         href: '#work' },
  { label: 'Toolkit',      href: '#skills' },
  { label: 'Integrations', href: '#integrations' },
  { label: 'Contact',      href: '#contact' },
];

// Premium eased scroll — cubic-bezier feel in JS
function smoothScrollTo(target) {
  const start = window.scrollY;
  const end = target;
  const distance = end - start;
  const duration = Math.min(Math.abs(distance) * 0.4 + 400, 900);
  let startTime = null;

  const ease = (t) => t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2; // easeInOutCubic

  const step = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, start + distance * ease(progress));
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

function handleNavClick(e, href) {
  e.preventDefault();
  const id = href.replace('#', '');
  const el = document.getElementById(id);
  if (el) {
    const offset = 72; // header height
    smoothScrollTo(el.getBoundingClientRect().top + window.scrollY - offset);
  }
}

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [hoveredLink, setHoveredLink] = useState(null);
  const navRef = useRef(null);

  // Track scroll for header style + active section
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      // Find which section is in view
      let current = '';
      for (const { href } of navLinks) {
        const id = href.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= 120) current = href;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Sliding underline — track position of hovered or active link
  const underlineLeft = useMotionValue(0);
  const underlineWidth = useMotionValue(0);
  const springLeft = useSpring(underlineLeft, { stiffness: 400, damping: 40 });
  const springWidth = useSpring(underlineWidth, { stiffness: 400, damping: 40 });

  const updateUnderline = (el) => {
    if (!el || !navRef.current) return;
    const navRect = navRef.current.getBoundingClientRect();
    const linkRect = el.getBoundingClientRect();
    underlineLeft.set(linkRect.left - navRect.left);
    underlineWidth.set(linkRect.width);
  };

  const clearUnderline = () => {
    // Snap to active section link on leave
    const activeEl = navRef.current?.querySelector('[data-active="true"]');
    if (activeEl) {
      updateUnderline(activeEl);
    } else {
      underlineWidth.set(0);
    }
  };

  return (
    <header
      className="fixed w-full top-0 z-50 transition-[padding] duration-500"
      style={{ paddingTop: scrolled || mobileOpen ? '12px' : '20px', paddingBottom: scrolled || mobileOpen ? '12px' : '20px' }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 border-b border-white/[0.06]"
        animate={{
          backdropFilter: scrolled || mobileOpen ? 'blur(20px) saturate(180%)' : 'blur(0px)',
          backgroundColor: scrolled || mobileOpen ? 'rgba(9,9,11,0.75)' : 'rgba(9,9,11,0)',
        }}
        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
        style={{ borderBottomColor: scrolled || mobileOpen ? 'rgba(255,255,255,0.06)' : 'transparent' }}
      />

      <div className="container-wrapper relative">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <motion.a
            href="/"
            onClick={(e) => { e.preventDefault(); smoothScrollTo(0); }}
            className="text-sm font-bold tracking-tight text-white relative z-10"
            whileHover={{ opacity: 0.7 }}
            transition={{ duration: 0.15 }}
          >
            {personalData.name}
          </motion.a>

          {/* Desktop nav */}
          <nav
            ref={navRef}
            className="hidden md:flex items-center gap-1 relative"
            onMouseLeave={clearUnderline}
          >
            {/* Sliding underline indicator */}
            <motion.div
              className="absolute bottom-[-4px] h-[1.5px] bg-white/60 rounded-full pointer-events-none"
              style={{ left: springLeft, width: springWidth }}
            />

            {navLinks.map(({ label, href }) => {
              const isActive = activeSection === href;
              return (
                <motion.a
                  key={label}
                  href={href}
                  data-active={isActive}
                  onClick={(e) => handleNavClick(e, href)}
                  onMouseEnter={(e) => {
                    setHoveredLink(label);
                    updateUnderline(e.currentTarget);
                  }}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="relative px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 select-none"
                  animate={{
                    color: isActive
                      ? 'rgba(255,255,255,1)'
                      : hoveredLink === label
                      ? 'rgba(255,255,255,0.9)'
                      : 'rgba(161,161,170,1)',
                  }}
                  transition={{ duration: 0.15 }}
                  whileHover={{ y: -1 }}
                >
                  {/* Active dot */}
                  {isActive && (
                    <motion.span
                      layoutId="active-dot"
                      className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-sky-400"
                      transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                    />
                  )}
                  {label}
                </motion.a>
              );
            })}

            <motion.a
              href={`https://mail.google.com/mail/?view=cm&to=${personalData.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 btn-primary !py-2 !px-5 !text-sm"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              Email me
            </motion.a>
          </nav>

          {/* Mobile toggle */}
          <motion.button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex md:hidden p-2 rounded-lg text-[#71717a] hover:text-white hover:bg-white/[0.08] transition-colors relative z-10"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileOpen ? 'close' : 'open'}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.15 }}
              >
                {mobileOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="md:hidden border-t border-white/[0.07] mt-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div className="pt-2 pb-5 space-y-0.5">
                {navLinks.map(({ label, href }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    onClick={(e) => { handleNavClick(e, href); setMobileOpen(false); }}
                    className="flex items-center justify-between py-3 px-1 text-base font-medium text-[#a1a1aa] hover:text-white transition-colors group"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.25, ease: [0.19, 1, 0.22, 1] }}
                  >
                    {label}
                    {activeSection === href && (
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    )}
                  </motion.a>
                ))}
                <motion.div
                  className="pt-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                >
                  <a
                    href={`https://mail.google.com/mail/?view=cm&to=${personalData.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full justify-center !text-sm"
                    onClick={() => setMobileOpen(false)}
                  >
                    Email me
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
