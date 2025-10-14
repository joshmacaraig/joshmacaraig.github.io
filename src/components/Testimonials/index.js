import React from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiTwitter } from 'react-icons/fi';

const Testimonials = () => {
  // In the future, move this to personal.js data file
  const testimonials = [
    // Example structure (currently empty - will be populated after first clients)
    // {
    //   name: "Client Name",
    //   role: "Founder, Company",
    //   content: "Josh delivered our MVP in 5 days...",
    //   rating: 5,
    //   image: "/path/to/image.jpg",
    //   project: "Project Name"
    // }
  ];

  const trustIndicators = [
    {
      icon: FiStar,
      metric: "7-day",
      label: "Average delivery"
    },
    {
      icon: FiStar,
      metric: "100%",
      label: "On-time completion"
    },
    {
      icon: FiStar,
      metric: "$2.5k",
      label: "Average project cost"
    },
    {
      icon: FiStar,
      metric: "Direct",
      label: "Access to developer"
    }
  ];

  return (
    <section id="testimonials" className="section-padding bg-gray-50 dark:bg-[#0f0f0f] relative overflow-hidden">
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
            Social Proof
          </motion.span>
          
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            What clients{' '}
            <span className="gradient-text">are saying</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {testimonials.length > 0 
              ? "Real feedback from real founders" 
              : "Building in public—first testimonials coming soon"}
          </motion.p>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 max-w-4xl mx-auto">
          {trustIndicators.map((indicator, index) => (
            <motion.div
              key={index}
              className="card p-6 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                <indicator.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold mb-1">{indicator.metric}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{indicator.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials Grid or Building Message */}
        {testimonials.length === 0 ? (
          // Building in Public Message
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="card p-10 text-center border-2 border-dashed border-gray-300 dark:border-gray-700">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-6">
                <FiStar className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4">
                Launching Soon—Follow the Journey
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
                I'm building this agency in public. First testimonials will appear here after delivering my first few clients. 
                Want to be one of the first? Book an audit call and let's ship your MVP.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <a 
                  href={require('../../data/personal').default.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex"
                >
                  Be my first client
                </a>
                
                <a
                  href={require('../../data/personal').default.twitter || require('../../data/personal').default.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex"
                >
                  Follow my progress
                  <FiTwitter />
                </a>
              </div>

              <p className="text-sm text-gray-500">
                💡 Early clients get featured case studies and special rates
              </p>
            </div>
          </motion.div>
        ) : (
          // Actual Testimonials Grid (will show when testimonials exist)
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="card p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>

                {/* Project Tag */}
                {testimonial.project && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                    <span className="text-xs text-gray-500">
                      Project: {testimonial.project}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Ready to get started on your MVP?
          </p>
          <a 
            href={require('../../data/personal').default.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex"
          >
            Book your free audit
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
