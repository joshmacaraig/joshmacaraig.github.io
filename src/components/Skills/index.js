import React from 'react';
import { motion } from 'framer-motion';
import skills from '../../data/skills';

const categoryConfig = {
  'Product Craft':    { color: 'text-rose-500 dark:text-rose-400',    bg: 'bg-rose-50 dark:bg-rose-500/10',    border: 'border-rose-200/60 dark:border-rose-500/20' },
  'Frontend':         { color: 'text-blue-500 dark:text-blue-400',    bg: 'bg-blue-50 dark:bg-blue-500/10',    border: 'border-blue-200/60 dark:border-blue-500/20' },
  'Backend & Data':   { color: 'text-emerald-500 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10', border: 'border-emerald-200/60 dark:border-emerald-500/20' },
  'Low-Code / Hybrid':{ color: 'text-violet-500 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-500/10', border: 'border-violet-200/60 dark:border-violet-500/20' },
  'AI & Automation':  { color: 'text-amber-500 dark:text-amber-400',  bg: 'bg-amber-50 dark:bg-amber-500/10',  border: 'border-amber-200/60 dark:border-amber-500/20' },
};

const Skills = () => {
  return (
    <section id="skills" className="section-padding bg-white dark:bg-[#09090b]">
      <div className="container-wrapper">

        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        >
          <p className="section-label mb-3">Toolkit</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-[#09090b] dark:text-white">
            Skills & stack
          </h2>
          <p className="text-[#71717a] max-w-lg text-base leading-relaxed">
            I pick tools based on the problem — sometimes a full React build, other times WeWeb + Xano gets us live in days.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.07 } },
          }}
        >
          {skills.map((group) => {
            const cfg = categoryConfig[group.category] ?? {
              color: 'text-gray-500',
              bg: 'bg-gray-50 dark:bg-white/5',
              border: 'border-gray-200/60 dark:border-white/10',
            };

            return (
              <motion.div
                key={group.category}
                className={`rounded-2xl border ${cfg.border} ${cfg.bg} p-6 hover:shadow-md transition-shadow duration-300`}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] } },
                }}
              >
                <h3 className={`text-[11px] uppercase tracking-[0.18em] font-semibold mb-4 ${cfg.color}`}>
                  {group.category}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white/80 dark:bg-black/20 text-[#3f3f46] dark:text-[#d4d4d8] border border-black/[0.06] dark:border-white/[0.08]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;
