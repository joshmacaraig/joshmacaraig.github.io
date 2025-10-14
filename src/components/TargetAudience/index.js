import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiArrowRight } from 'react-icons/fi';

const TargetAudience = () => {
  const perfectFor = [
    {
      title: "Indie Hackers",
      description: "Solo founders building their first product who need speed and affordability",
      examples: ["SaaS MVPs", "Side projects", "Bootstrapped apps"]
    },
    {
      title: "Bootstrapped Startups",
      description: "Small teams with limited budget who can't afford $8k+ agencies",
      examples: ["Beta launches", "Market validation", "Quick pivots"]
    },
    {
      title: "Micro-SaaS Founders",
      description: "Entrepreneurs testing niche ideas before committing big resources",
      examples: ["Niche tools", "Internal dashboards", "B2B platforms"]
    },
    {
      title: "Small Businesses",
      description: "Companies needing internal tools without enterprise complexity",
      examples: ["CRMs", "Inventory systems", "Customer portals"]
    }
  ];

  return (
    <section id="target-audience" className="section-padding bg-gray-50 dark:bg-[#0f0f0f] relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      
      <div className="container-wrapper relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.span
            className="badge-primary mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Is This For You?
          </motion.span>
          
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Who I{' '}
            <span className="gradient-text">work with</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            I specialize in helping builders and founders launch fast
          </motion.p>
        </div>

        {/* Perfect For Grid */}
        <div className="mb-20">
          <motion.h3
            className="text-2xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-green-500">✓</span> Perfect for
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {perfectFor.map((audience, index) => (
              <motion.div
                key={index}
                className="card p-8 border-2 border-green-500/20 hover:border-green-500/50 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <FiCheck className="w-5 h-5 text-green-500" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-xl font-bold mb-2">{audience.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {audience.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {audience.examples.map((example, idx) => (
                        <span 
                          key={idx}
                          className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-700 dark:text-green-400"
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Case Study Highlight */}
        <motion.div
          className="mt-20 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="card p-10 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-900">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">
                Typical Client Journey
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                Here's what working together looks like for most founders:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Book Audit</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      15-min free call to discuss your MVP
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Get Quote</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Fixed price, timeline, deliverables
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Build Fast</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Daily updates via Slack
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Launch</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Go live in 7 days
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <a 
                  href={require('../../data/personal').default.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex"
                >
                  Start your journey
                  <FiArrowRight />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TargetAudience;
