import React from 'react';
import { motion } from 'framer-motion';
import { FiZap, FiShield, FiTool, FiDollarSign, FiTrendingUp, FiClock, FiDatabase, FiMail, FiCreditCard, FiCode } from 'react-icons/fi';
import { SiStripe } from 'react-icons/si';

const TechStack = () => {
  const benefits = [
    {
      icon: FiZap,
      title: "3x Faster",
      description: "What takes traditional agencies 6-12 weeks, I deliver in days. No bloated processes, just efficient development."
    },
    {
      icon: FiShield,
      title: "Production-Ready",
      description: "Not a prototype. WeWeb + Xano powers real SaaS products with thousands of users. Enterprise-grade security and scalability."
    },
    {
      icon: FiTool,
      title: "Easy to Maintain",
      description: "Visual interface means you can make simple updates yourself. No need to hire a developer for every minor change."
    },
    {
      icon: FiDollarSign,
      title: "Lower Cost",
      description: "Skip the expensive custom code. Get the same functionality at 30-50% the cost of traditional development."
    },
    {
      icon: FiTrendingUp,
      title: "Scales With You",
      description: "Start with an MVP, add features as you grow. The tech stack scales from 10 users to 10,000+ without rebuilding."
    },
    {
      icon: FiClock,
      title: "Faster Iterations",
      description: "Make changes quickly based on user feedback. Don't wait weeks for updates—I can ship new features in days."
    }
  ];

  const techLogos = [
    { name: 'WeWeb', description: 'Frontend Builder', icon: FiCode, color: 'from-blue-500 to-blue-600' },
    { name: 'Xano', description: 'Backend Platform', icon: FiDatabase, color: 'from-purple-500 to-purple-600' },
    { name: 'Stripe', description: 'Payments', icon: FiCreditCard, color: 'from-indigo-500 to-indigo-600' },
    { name: 'SendGrid', description: 'Email', icon: FiMail, color: 'from-cyan-500 to-cyan-600' }
  ];

  return (
    <section id="tech-stack" className="section-padding bg-white dark:bg-[#0a0a0a] relative overflow-hidden">
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
            The Stack
          </motion.span>
          
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Why{' '}
            <span className="gradient-text">WeWeb + Xano?</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            The modern alternative to traditional development—faster, cheaper, and just as powerful
          </motion.p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="card p-8 text-center group hover:border-blue-500/50 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <benefit.icon className="w-7 h-7 text-white" />
              </div>
              
              <h3 className="text-xl font-bold mb-3">
                {benefit.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Tech Logos */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="card p-10">
            <h3 className="text-center text-lg font-semibold mb-8 text-gray-600 dark:text-gray-400">
              Core Technologies
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {techLogos.map((tech, index) => (
                <motion.div 
                  key={index} 
                  className="text-center group cursor-pointer"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${tech.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <tech.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="font-semibold mb-1 text-gray-900 dark:text-white">{tech.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{tech.description}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Comparison CTA */}
        <motion.div
          className="text-center mt-20 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="card p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-900">
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h4 className="font-semibold mb-4 text-red-600 dark:text-red-400">Traditional Development</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• 6-12 weeks minimum</li>
                  <li>• $8k-20k+ per project</li>
                  <li>• Requires developers for all changes</li>
                  <li>• Slower iterations</li>
                  <li>• Complex maintenance</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4 text-green-600 dark:text-green-400">WeWeb + Xano</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• 5-14 days typical</li>
                  <li>• $1.5k-4.5k per project</li>
                  <li>• Make simple updates yourself</li>
                  <li>• Ship features in days</li>
                  <li>• Visual, easy to understand</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
