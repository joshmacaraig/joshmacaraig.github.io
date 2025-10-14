import React from 'react';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Book free audit",
      description: "15-minute call to understand your MVP and goals. No pitch, just strategy."
    },
    {
      number: "02",
      title: "Get fixed quote",
      description: "Clear deliverables, timeline, and price. Pay 50% upfront, 50% on delivery."
    },
    {
      number: "03",
      title: "Daily updates",
      description: "Track progress in real-time via Slack. See your MVP come to life."
    },
    {
      number: "04",
      title: "Launch live",
      description: "Deployed to production with custom domain. Bug fixes included."
    }
  ];

  return (
    <section id="how-it-works" className="section-padding bg-gray-50 dark:bg-[#050505] relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      
      <div className="container-wrapper relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.span
            className="badge mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Simple Process
          </motion.span>
          
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            From idea to{' '}
            <span className="gradient-text">launch</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A transparent, straightforward process designed for speed
          </motion.p>
        </div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative pb-12 last:pb-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-[31px] top-16 bottom-0 w-px bg-gradient-to-b from-gray-300 to-transparent dark:from-gray-700"></div>
              )}

              <div className="flex gap-8 items-start">
                {/* Number Circle */}
                <div className="flex-shrink-0 w-16 h-16 rounded-full border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] flex items-center justify-center relative z-10">
                  <span className="text-2xl font-bold gradient-text">{step.number}</span>
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">{step.title}</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
