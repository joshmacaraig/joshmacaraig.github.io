import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiArrowRight, FiZap, FiStar } from 'react-icons/fi';
import personalData from '../../data/personal';

const Services = () => {
  const { services } = personalData;

  const packages = [
    {
      key: 'starter',
      data: services.starter,
      icon: FiZap,
      description: 'Perfect for validating your idea quickly'
    },
    {
      key: 'sprint',
      data: services.sprint,
      icon: FiStar,
      description: 'Launch a complete MVP ready for users',
      featured: true
    },
    {
      key: 'pro',
      data: services.pro,
      icon: FiStar,
      description: 'Full-featured app with everything you need'
    }
  ];

  return (
    <section id="services" className="section-padding bg-white dark:bg-[#0a0a0a] relative overflow-hidden">
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
            Transparent Pricing
          </motion.span>
          
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Choose your{' '}
            <span className="gradient-text">launch speed</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            No hidden fees. No surprises. Just straightforward pricing for indie hackers.
          </motion.p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-6xl mx-auto">
          {packages.map(({ key, data, icon: Icon, description, featured }, index) => (
            <motion.div
              key={key}
              className={`pricing-card relative ${featured ? 'featured md:-mt-8 md:mb-8' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Popular Badge */}
              {featured && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                  Most Popular
                </div>
              )}

              {/* Icon */}
              <div className="mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  featured 
                    ? 'bg-white/10 dark:bg-black/10' 
                    : 'bg-gray-100 dark:bg-gray-900'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    featured 
                      ? 'text-white dark:text-black' 
                      : 'text-gray-700 dark:text-gray-300'
                  }`} />
                </div>
              </div>

              {/* Package Info */}
              <h3 className={`text-2xl font-bold mb-2 ${
                featured ? 'text-white dark:text-black' : ''
              }`}>
                {data.name}
              </h3>
              
              <p className={`text-sm mb-6 ${
                featured 
                  ? 'text-white/70 dark:text-black/70' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}>
                {description}
              </p>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className={`text-5xl font-bold ${
                    featured ? 'text-white dark:text-black' : ''
                  }`}>
                    {data.price}
                  </span>
                </div>
                <p className={`text-sm mt-2 ${
                  featured 
                    ? 'text-white/70 dark:text-black/70' 
                    : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {data.timeline} delivery
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {data.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <FiCheck className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      featured 
                        ? 'text-white dark:text-black' 
                        : 'text-green-500'
                    }`} />
                    <span className={`text-sm ${
                      featured 
                        ? 'text-white/90 dark:text-black/90' 
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <a 
                href={personalData.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-semibold transition-all duration-300 group ${
                  featured
                    ? 'bg-white text-black dark:bg-black dark:text-white hover:scale-105'
                    : 'bg-black text-white dark:bg-white dark:text-black hover:scale-105'
                }`}
              >
                Get started
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Guarantee */}
              {data.guarantee && (
                <p className={`text-xs mt-4 text-center ${
                  featured 
                    ? 'text-white/60 dark:text-black/60' 
                    : 'text-gray-500 dark:text-gray-500'
                }`}>
                  {data.guarantee}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Retainer Option */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="card p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <div className="badge-primary mb-3">Ongoing Support</div>
              <h3 className="text-2xl font-bold mb-2">{services.retainer.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Keep your app running smoothly with dedicated monthly support
              </p>
              <div className="flex flex-wrap gap-2">
                {services.retainer.features.slice(0, 3).map((feature, idx) => (
                  <span key={idx} className="text-sm text-gray-600 dark:text-gray-400">
                    • {feature}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-center md:text-right">
              <div className="text-4xl font-bold mb-2">{services.retainer.price}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">per month</p>
              <a 
                href={personalData.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Learn more
              </a>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-3xl font-bold mb-4">Not sure which package?</h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Book a free 15-minute audit. I'll help you figure out exactly what you need.
          </p>
          <a 
            href={personalData.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex"
          >
            Book free audit
            <FiArrowRight />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
