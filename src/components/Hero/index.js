import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiArrowDown, FiLinkedin } from 'react-icons/fi';
import personalData from '../../data/personal';

const Hero = () => {
  const contentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      contentRef.current.style.opacity = String(1 - Math.min(window.pageYOffset / 400, 1));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="section-passthrough relative min-h-screen flex flex-col justify-center overflow-hidden bg-transparent">

      <div ref={contentRef} className="container-wrapper relative z-10 pt-24 sm:pt-32 pb-16 sm:pb-24">

        {/* Status badge */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.15em] text-[#a1a1aa] border border-white/[0.1]" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(8px)' }}>
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {personalData.availability}
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-[-0.03em] text-white mb-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
        >
          {personalData.name.split(' ')[0]}
          <br />
          <span className="text-sky-400">{personalData.name.split(' ')[1]}.</span>
        </motion.h1>

        {/* Role */}
        <motion.p
          className="text-lg sm:text-xl md:text-2xl font-medium text-[#a1a1aa] mb-6 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.19, 1, 0.22, 1] }}
        >
          {personalData.title}
        </motion.p>

        {/* Description */}
        <motion.p
          className="text-sm sm:text-base md:text-lg text-[#71717a] max-w-xl leading-relaxed mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.19, 1, 0.22, 1] }}
        >
          I build dashboards, internal platforms, and AI-assisted workflows for real operations teams. 6+ years turning product ideas into reliable tools.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3 sm:gap-4 mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.19, 1, 0.22, 1] }}
        >
          <a
            href={`https://mail.google.com/mail/?view=cm&to=${personalData.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary group w-full sm:w-auto justify-center"
          >
            Let's work together
            <FiArrowRight className="group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href="#work"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-[#fafafa] border border-white/[0.2] bg-white/[0.04] backdrop-blur-sm transition-all duration-200 hover:bg-white/[0.1] active:scale-[0.97] group w-full sm:w-auto"
          >
            See my work
            <FiArrowDown className="group-hover:translate-y-0.5 transition-transform" />
          </a>
          <div className="flex items-center gap-1 sm:ml-2 justify-center sm:justify-start">
            <a
              href={personalData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl text-[#71717a] hover:text-white hover:bg-white/[0.08] transition-all"
              aria-label="LinkedIn"
            >
              <FiLinkedin className="w-4.5 h-4.5" />
            </a>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-10 gap-y-4 pt-6 sm:pt-8 border-t border-white/[0.07]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          {personalData.stats?.map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-black text-white tracking-tight">{stat.value}</div>
              <div className="text-[10px] text-[#71717a] mt-0.5 uppercase tracking-[0.08em] font-medium leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1.5 text-[#52525b]"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em]">Scroll</span>
          <FiArrowDown className="w-3.5 h-3.5" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
