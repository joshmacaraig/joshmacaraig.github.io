import React from 'react';
import { motion } from 'framer-motion';
import skills from '../../data/skills';
import { useHolographic } from '../../hooks/useHolographic';

const categoryConfig = {
  'Product Craft':    { color: 'text-rose-400',    bg: 'bg-rose-500/10',    border: 'border-rose-500/20' },
  'Frontend':         { color: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20' },
  'Backend & Data':   { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  'Low-Code / Hybrid':{ color: 'text-sky-400',  bg: 'bg-sky-500/10',  border: 'border-sky-500/20' },
  'AI & Automation':  { color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20' },
};

const SkillCard = ({ group, cfg, index }) => {
  const { cardRef, handleMouseMove, handleMouseLeave } = useHolographic();
  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`holo-card relative rounded-2xl border ${cfg.border} ${cfg.bg} p-6`}
      variants={{
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] } },
      }}
    >
      <div className="holo-glow" />
      <h3 className={`text-[11px] uppercase tracking-[0.18em] font-semibold mb-4 ${cfg.color}`}>
        {group.category}
      </h3>
      <div className="flex flex-wrap gap-2">
        {group.items.map((item) => (
          <span
            key={item}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-black/20 text-[#d4d4d8] border border-white/[0.08]"
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="section-passthrough section-padding bg-transparent">
      <div className="container-wrapper">

        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        >
          <p className="section-label mb-3">Toolkit</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 text-white">
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
          {skills.map((group, index) => {
            const cfg = categoryConfig[group.category] ?? {
              color: 'text-gray-400',
              bg: 'bg-white/5',
              border: 'border-white/10',
            };
            return <SkillCard key={group.category} group={group} cfg={cfg} index={index} />;
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;
