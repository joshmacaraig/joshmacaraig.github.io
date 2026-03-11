import React from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
  const timeline = [
    {
      period: "2023 — Present",
      title: "Independent Product Engineer",
      location: "Remote · Manila, PH",
      description:
        "Partner with founders and teams to design, build, and launch digital products end-to-end—mixing design systems, WeWeb/Xano builds, and traditional stacks.",
      highlights: [
        "Built SaaS dashboards, housing platforms, and client portals",
        "Shipped 48-hour demo builds to unlock new contracts",
        "Mentored teams adopting low-code inside hybrid stacks"
      ]
    },
    {
      period: "2021 — 2023",
      title: "Product & Automation Lead",
      location: "Trash Butler · Remote",
      description:
        "Led internal tools powering 50+ properties—from operations dashboards to field team portals—while automating reporting and communication workflows.",
      highlights: [
        "Architected Knack + Integromat systems for real-time ops",
        "Integrated SMS/email notifications and payroll exports",
        "Reduced manual coordination time by 45%"
      ]
    },
    {
      period: "2019 — 2021",
      title: "Senior Full-Stack Developer",
      location: "Agency & Enterprise Clients",
      description:
        "Delivered Laravel/Vue and PHP/MySQL platforms for Japanese manufacturing, developer marketplaces, and enterprise printing operations.",
      highlights: [
        "Unified ERP modules across sales, accounting, production",
        "Designed data models + APIs for skill-matching marketplace",
        "Introduced component libraries for faster iteration"
      ]
    },
    {
      period: "Always exploring",
      title: "Creative Playgrounds",
      location: "Personal Lab",
      description:
        "I prototyped mini-games, chess engines, and memory challenges to keep learning. These experiments influence how I approach usability and delight.",
      highlights: [
        "React arcade with chess, memory, and reaction games",
        "Custom Stockfish worker + fallback AI implementation",
        "Playful UX details that carry over to client work"
      ]
    }
  ];

  return (
    <section id="experience" className="section-padding bg-gray-50 dark:bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      
      <div className="container-wrapper relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.span
            className="badge mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Experience
          </motion.span>
          
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Work{' '}
            <span className="gradient-text">journey</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A snapshot of the roles, problems, and teams that shaped how I build products today.
          </motion.p>
        </div>

        <div className="max-w-5xl mx-auto">
          {timeline.map((item, index) => (
            <motion.div
              key={item.title}
              className="relative pb-12 last:pb-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {index < timeline.length - 1 && (
                <div className="absolute left-[31px] top-16 bottom-0 w-px bg-gradient-to-b from-gray-300 to-transparent dark:from-gray-700"></div>
              )}

              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-16 h-16 rounded-full border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] flex items-center justify-center relative z-10">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {item.period}
                  </span>
                </div>

                <div className="flex-1 pt-2 card bg-white/70 dark:bg-black/30 backdrop-blur border border-gray-200/60 dark:border-gray-800/60">
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-4">
                    {item.location}
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    {item.description}
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
