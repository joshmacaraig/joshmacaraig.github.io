import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight, FiArrowDown, FiLinkedin } from 'react-icons/fi';
import personalData from '../../data/personal';

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.45], [0, 40]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#f5f5f7] dark:bg-[#09090b]"
    >
      {/* Dot-grid texture */}
      <div className="absolute inset-0 dot-grid opacity-60 dark:opacity-100" />

      {/* Violet glow – top right */}
      <div className="absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full bg-violet-500/[0.08] dark:bg-violet-500/[0.12] blur-[100px] pointer-events-none" />
      {/* Warm glow – bottom left */}
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-purple-400/[0.06] dark:bg-purple-400/[0.08] blur-[80px] pointer-events-none" />

      <motion.div
        style={{ opacity, y }}
        className="container-wrapper relative z-10 pt-32 pb-24"
      >
        {/* Status badge */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        >
          <span className="badge">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {personalData.availability}
          </span>
        </motion.div>

        {/* Name display */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-[-0.03em] text-[#09090b] dark:text-white">
            {personalData.name.split(' ')[0]}
            <br />
            <span className="text-violet-600 dark:text-violet-400">
              {personalData.name.split(' ')[1]}.
            </span>
          </h1>
        </motion.div>

        {/* Role */}
        <motion.p
          className="text-xl md:text-2xl font-medium text-[#52525b] dark:text-[#a1a1aa] mb-6 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.19, 1, 0.22, 1] }}
        >
          {personalData.title}
        </motion.p>

        {/* Description */}
        <motion.p
          className="text-base md:text-lg text-[#71717a] dark:text-[#71717a] max-w-xl leading-relaxed mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.19, 1, 0.22, 1] }}
        >
          I build dashboards, operations platforms, and AI-assisted workflows that teams actually enjoy using. 6+ years bridging design, code, and real-world operations.
        </motion.p>

        {/* CTAs + social */}
        <motion.div
          className="flex flex-col sm:flex-row items-start gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.19, 1, 0.22, 1] }}
        >
          <a href={`https://mail.google.com/mail/?view=cm&to=${personalData.email}`} target="_blank" rel="noopener noreferrer" className="btn-primary group">
            Let's work together
            <FiArrowRight className="group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a href="#work" className="btn-secondary group">
            See my work
            <FiArrowDown className="group-hover:translate-y-0.5 transition-transform" />
          </a>

          <div className="flex items-center gap-1 sm:ml-2">
            <a
              href={personalData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl text-[#71717a] hover:text-[#09090b] dark:hover:text-white hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-all"
              aria-label="LinkedIn"
            >
              <FiLinkedin className="w-4.5 h-4.5" />
            </a>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="flex flex-wrap gap-x-10 gap-y-4 pt-8 border-t border-black/[0.07] dark:border-white/[0.07]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          {personalData.stats?.map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-black text-[#09090b] dark:text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs text-[#71717a] dark:text-[#71717a] mt-0.5 uppercase tracking-[0.1em] font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

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
          className="flex flex-col items-center gap-1.5 text-[#a1a1aa]"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em]">Scroll</span>
          <FiArrowDown className="w-3.5 h-3.5" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
