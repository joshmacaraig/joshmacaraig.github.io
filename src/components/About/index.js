import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const About = () => {
  return (
    <section id="about" className="section-passthrough section-padding bg-transparent">
      <div className="container-wrapper">
        <div className="max-w-3xl">

          <motion.p
            className="section-label mb-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            About
          </motion.p>

          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-6 text-[#09090b] dark:text-white leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.19, 1, 0.22, 1] }}
          >
            Builder who bridges{' '}
            <span className="gradient-text">design & code</span>
          </motion.h2>

          <motion.div
            className="space-y-4 text-sm text-[#52525b] dark:text-[#a1a1aa] leading-relaxed mb-8"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p>
              I'm a multi-disciplinary builder who turns early sketches into polished, reliable tools.
              I move between modern web stacks (React, Nuxt, Tailwind) and low-code systems (WeWeb, Xano, Webflow)
              depending on how fast we need to ship.
            </p>
            <p>
              Most of my work lives inside operations teams — dashboards for area managers, housing platforms
              for agents, AI call grading systems, and community portals. I'm usually the person bridging
              product requirements, UX, and the actual build.
            </p>
            <p>
              This portfolio spotlights those operator dashboards, workflow tools, and collaboration layers
              so partners can quickly see how I approach real product problems.
            </p>
          </motion.div>

          {/* Meta pill */}
          <motion.div
            className="flex flex-wrap gap-2 mb-8"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#f4f4f5] dark:bg-white/[0.06] text-[#52525b] dark:text-[#a1a1aa] border border-black/[0.07] dark:border-white/[0.08]">
              6+ years building products
            </span>
          </motion.div>

          <motion.a
            href="#contact"
            className="btn-primary self-start group inline-flex"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Let's connect
            <FiArrowRight className="group-hover:translate-x-0.5 transition-transform" />
          </motion.a>

        </div>
      </div>
    </section>
  );
};

export default About;
