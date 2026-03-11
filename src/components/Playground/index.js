import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const Playground = () => {
  const experiments = [
    {
      title: "Chess Lab ♟️",
      description: "Chess.com-inspired experience with a custom Stockfish worker, 20 difficulty levels, and a fallback AI when the engine isn't available.",
      link: "/chess",
      stack: ["React", "Stockfish", "Web Workers"]
    },
    {
      title: "Memory Circuit",
      description: "A modern twist on the classic memory game with multiple themes, haptics, and keyboard/touch controls.",
      link: "/memory-game",
      stack: ["React", "Framer Motion", "Web Audio"]
    },
    {
      title: "Slap the Boss",
      description: "Playful stress reliever that explores tactile feedback, micro-animations, and timing loops.",
      link: "/slap-the-boss",
      stack: ["React", "Canvas", "Sound Design"]
    }
  ];

  return (
    <section id="playground" className="section-padding bg-white dark:bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      
      <div className="container-wrapper relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.span
            className="badge-primary mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Creative Playground
          </motion.span>
          
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Experiments &{' '}
            <span className="gradient-text">games</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            I use playful builds to explore new APIs, polish animations, and keep shipping outside client work.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {experiments.map((experiment, index) => (
            <motion.a
              key={experiment.title}
              href={experiment.link}
              className="card p-6 hover-lift flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                {experiment.stack.join(' · ')}
              </div>
              <h3 className="text-2xl font-bold mb-3">{experiment.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 flex-1">
                {experiment.description}
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold">
                Play
                <FiArrowRight />
              </span>
            </motion.a>
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Want to see the full arcade?
          </p>
          <a 
            href="/games"
            className="btn-secondary inline-flex items-center gap-2"
          >
            Visit the games hub
            <FiArrowRight />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Playground;
