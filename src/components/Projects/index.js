import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiZap } from 'react-icons/fi';
import projects from '../../data/projects';
import personalData from '../../data/personal';

const featuredAccents = [
  {
    border: 'border-t-violet-500',
    dot: 'bg-violet-500',
    label: 'text-violet-600 dark:text-violet-400',
    glow: 'group-hover:shadow-violet-500/10',
  },
  {
    border: 'border-t-cyan-500',
    dot: 'bg-cyan-500',
    label: 'text-cyan-600 dark:text-cyan-400',
    glow: 'group-hover:shadow-cyan-500/10',
  },
  {
    border: 'border-t-emerald-500',
    dot: 'bg-emerald-500',
    label: 'text-emerald-600 dark:text-emerald-400',
    glow: 'group-hover:shadow-emerald-500/10',
  },
];

const FeaturedCard = ({ project, index }) => {
  const accent = featuredAccents[index % featuredAccents.length];
  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      className={`group relative card card-hover border-t-2 ${accent.border} ${accent.glow} hover:shadow-xl p-7 flex flex-col gap-5`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}
    >
      {/* Watermark number */}
      <span className="absolute top-4 right-6 text-[72px] font-black leading-none select-none text-black/[0.04] dark:text-white/[0.04] pointer-events-none">
        {num}
      </span>

      {/* Type */}
      <p className={`text-[10px] uppercase tracking-[0.18em] font-semibold ${accent.label}`}>
        {project.type}
      </p>

      {/* Title */}
      <h3 className="text-xl font-bold leading-snug pr-10 text-[#09090b] dark:text-white">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-[#71717a] dark:text-[#71717a] leading-relaxed flex-1">
        {project.description}
      </p>

      {/* Highlights */}
      <ul className="space-y-2">
        {project.highlights?.map((h) => (
          <li key={h} className="flex items-start gap-2.5 text-sm text-[#52525b] dark:text-[#a1a1aa]">
            <span className={`mt-[7px] w-1.5 h-1.5 rounded-full shrink-0 ${accent.dot}`} />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      {/* Stack */}
      <div className="flex flex-wrap gap-1.5 pt-1 border-t border-black/[0.06] dark:border-white/[0.06]">
        {project.stack?.map((tech) => (
          <span key={tech} className="tag">{tech}</span>
        ))}
      </div>
    </motion.article>
  );
};

const SecondaryCard = ({ project, index }) => (
  <motion.article
    className="card card-hover p-5 flex flex-col gap-3"
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.45, delay: index * 0.05, ease: [0.19, 1, 0.22, 1] }}
  >
    <div className="flex items-start justify-between gap-3">
      <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-[#a1a1aa]">
        {project.type}
      </p>
      {project.ongoing && (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-[9px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 shrink-0">
          <FiZap className="w-2.5 h-2.5" />
          Active
        </span>
      )}
    </div>

    <h3 className="text-[15px] font-semibold leading-snug text-[#09090b] dark:text-white">
      {project.title}
    </h3>

    <p className="text-sm text-[#71717a] leading-relaxed flex-1">
      {project.description}
    </p>

    <div className="flex flex-wrap gap-1.5 pt-1">
      {project.stack?.slice(0, 4).map((tech) => (
        <span key={tech} className="tag">{tech}</span>
      ))}
      {project.stack?.length > 4 && (
        <span className="tag">+{project.stack.length - 4}</span>
      )}
    </div>
  </motion.article>
);

const Projects = () => {
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="section-padding bg-[#fafafa] dark:bg-[#0c0c10]">
      <div className="container-wrapper">

        {/* Header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        >
          <p className="section-label mb-3">Work</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-[#09090b] dark:text-white">
            Selected projects
          </h2>
          <p className="text-[#71717a] max-w-lg text-base leading-relaxed">
            Platforms, dashboards, and tools built across operations, housing, real estate, and AI workflows.
          </p>
        </motion.div>

        {/* Featured grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-16">
          {featured.map((project, index) => (
            <FeaturedCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* More work */}
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#a1a1aa] font-semibold whitespace-nowrap">
            More work
          </span>
          <div className="flex-1 h-px bg-black/[0.07] dark:bg-white/[0.07]" />
        </motion.div>

        {/* Secondary grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {others.map((project, index) => (
            <SecondaryCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 pt-10 border-t border-black/[0.07] dark:border-white/[0.07] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-sm text-[#71717a]">
            Have a project or role in mind?
          </p>
          <a
            href={`mailto:${personalData.email}`}
            className="btn-primary group"
          >
            Let's talk
            <FiArrowRight className="group-hover:translate-x-0.5 transition-transform" />
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default Projects;
