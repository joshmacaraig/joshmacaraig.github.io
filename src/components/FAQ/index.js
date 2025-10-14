import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiCheck } from 'react-icons/fi';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Why WeWeb + Xano instead of custom code?",
      answer: "WeWeb + Xano gives you the same functionality as custom code, but 3x faster and at a fraction of the cost. It's production-ready, scalable, and easy to maintain. You get a real web app, not a prototype—but without the months of development time traditional agencies need."
    },
    {
      question: "Is this production-ready or just a prototype?",
      answer: "100% production-ready. WeWeb + Xano powers real SaaS products and businesses. You get proper authentication, database management, API integrations, and everything needed to launch. The only difference from traditional code is that I build it faster and you can make simple updates yourself."
    },
    {
      question: "What if I need changes after launch?",
      answer: "All packages include bug fixes (7 days to 2 weeks depending on package). For ongoing updates, my $750/month retainer includes 10 hours of development time. Or you can hire me for one-off updates—rates start at $75/hour."
    },
    {
      question: "Can I maintain this myself or am I locked in?",
      answer: "You own everything. WeWeb and Xano are visual platforms, so you or any other developer can make updates. I provide documentation and a handoff call to show you how everything works. No lock-in, no proprietary code."
    },
    {
      question: "Why not hire someone cheaper on Fiverr?",
      answer: "You could, but you'll likely spend weeks going back and forth, dealing with quality issues, and managing someone who doesn't understand your business context. I provide direct access, daily updates, and expertise in both no-code efficiency and traditional development best practices."
    },
    {
      question: "How do payments work?",
      answer: "50% upfront, 50% on delivery for the MVP Sprint. Full payment upfront for the Speed Starter. The Pro Build is split into three payments (33% upfront, 33% at midpoint, 34% on delivery). I accept credit cards via Stripe, PayPal, and wire transfers."
    },
    {
      question: "What if you miss the 7-day deadline?",
      answer: "For the 7-Day MVP Sprint, if I take longer than 7 days, you get a 10% refund for each extra day. This has never happened because I scope projects carefully during the audit call, but the guarantee is there for your peace of mind."
    },
    {
      question: "Do you sign NDAs?",
      answer: "Absolutely. I'm happy to sign your NDA before we discuss your project details. Just send it over during our audit call."
    },
    {
      question: "What types of apps can you build?",
      answer: "SaaS dashboards, internal tools, booking systems, marketplaces, customer portals, admin panels, CRMs, inventory systems, membership platforms—basically any web app that doesn't require native mobile features or real-time video/gaming."
    },
    {
      question: "I'm not sure which package I need. How do I decide?",
      answer: "Book a free 15-minute audit call. I'll ask about your goals, timeline, and budget, then recommend the right package. No pressure, no pitch—just honest advice on the fastest way to get your MVP live."
    }
  ];

  return (
    <section id="faq" className="section-padding bg-gray-50 dark:bg-[#0f0f0f] relative overflow-hidden">
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
            Got Questions?
          </motion.span>
          
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Frequently asked{' '}
            <span className="gradient-text">questions</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Everything you need to know about working with me
          </motion.p>
        </div>

        {/* FAQ Grid */}
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-6 bg-white dark:bg-[#0a0a0a] rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold pr-4">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiChevronDown className="w-5 h-5 flex-shrink-0 text-gray-500" />
                  </motion.div>
                </div>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <motion.div
          className="text-center mt-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="card p-8">
            <h3 className="text-2xl font-bold mb-3">Still have questions?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Book a free 15-minute call. I'll answer anything you want to know about your project.
            </p>
            <a 
              href={require('../../data/personal').default.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex"
            >
              Book free audit
              <FiCheck />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
