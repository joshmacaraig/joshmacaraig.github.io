import React from 'react';
import { motion } from 'framer-motion';
import FancyTextHover from '../ui/fancy-text-hover';
import personalData from '../../data/personal';

const links = [
  {
    label: 'Email',
    href: `https://mail.google.com/mail/?view=cm&to=${personalData.email}`,
  },
  {
    label: 'LinkedIn',
    href: personalData.linkedin,
  },
];

const Contact = () => {
  return (
    <section id="contact" className="section-passthrough section-padding bg-transparent">
      <div className="container-wrapper">
        <div className="max-w-3xl">

          <motion.p
            className="section-label mb-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Get in touch
          </motion.p>

          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-6 text-[#09090b] dark:text-white leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.19, 1, 0.22, 1] }}
          >
            Let's build{' '}
            <span className="gradient-text">something great</span>
          </motion.h2>

          <motion.p
            className="text-base text-[#71717a] leading-relaxed mb-10 max-w-xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Open to full-time roles, product collaborations, and interesting systems problems. I typically reply within a day.
          </motion.p>

          <motion.a
            href={`https://mail.google.com/mail/?view=cm&to=${personalData.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex mb-16"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Say hello →
          </motion.a>

          {/* Fancy link hover */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FancyTextHover links={links} />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
