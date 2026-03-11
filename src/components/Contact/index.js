import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLinkedin, FiArrowUpRight } from 'react-icons/fi';
import personalData from '../../data/personal';

const links = [
  {
    label: 'Email',
    value: personalData.email,
    href: `https://mail.google.com/mail/?view=cm&to=${personalData.email}`,
    icon: FiMail,
    external: true,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/joshmacaraig',
    href: personalData.linkedin,
    icon: FiLinkedin,
    external: true,
  },
];

const Contact = () => {
  return (
    <section id="contact" className="section-padding bg-white dark:bg-[#09090b]">
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
            className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-[#09090b] dark:text-white leading-tight"
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
            Whether it's a full-time opportunity, a collaboration, or a quick chat about an idea — I'd love to hear from you. I typically reply within a day.
          </motion.p>

          <motion.a
            href={`https://mail.google.com/mail/?view=cm&to=${personalData.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex mb-14"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Say hello →
          </motion.a>

          {/* Contact cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {links.map(({ label, value, href, icon: Icon, external }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="card card-hover group p-5 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#f4f4f5] dark:bg-white/[0.06] flex items-center justify-center shrink-0 group-hover:bg-violet-50 dark:group-hover:bg-violet-500/10 transition-colors">
                      <Icon className="w-4 h-4 text-[#52525b] dark:text-[#a1a1aa] group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors" />
                    </div>
                    <div className="text-xs font-semibold uppercase tracking-[0.12em] text-[#a1a1aa]">
                      {label}
                    </div>
                  </div>
                  {external && (
                    <FiArrowUpRight className="w-3.5 h-3.5 text-[#a1a1aa] group-hover:text-[#09090b] dark:group-hover:text-white transition-colors" />
                  )}
                </div>
                <div className="text-sm font-medium text-[#09090b] dark:text-[#d4d4d8] truncate">
                  {value}
                </div>
              </a>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
