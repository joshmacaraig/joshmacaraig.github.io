import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import projects from '../../data/projects';

const Projects = () => {
  // Show only featured/recent projects
  const featuredProjects = projects.filter(p => p.featured || p.techStack?.includes('WeWeb')).slice(0, 3);

  return (
    <section id="work" className="section-padding bg-white dark:bg-[#0a0a0a] relative overflow-hidden">
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
            Recent Work
          </motion.span>
          
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Projects I've{' '}
            <span className="gradient-text">shipped</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Real MVPs built with WeWeb + Xano for real businesses
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group card p-0 overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Project Image/Placeholder */}
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
                {project.featured && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                    Demo Available
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
              </div>

              {/* Project Info */}
              <div className="p-8">
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.stack?.slice(0, 3).map((tech, idx) => (
                    <span 
                      key={idx}
                      className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl font-bold mb-3 group-hover:gradient-text transition-all duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Key Features */}
                {project.features && (
                  <ul className="space-y-2 mb-6">
                    {project.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTA */}
                <a
                  href={project.link}
                  className="inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all duration-300"
                >
                  {project.demoAvailable ? 'View demo' : 'View project'}
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Ready to build something amazing?
          </p>
          <a 
            href={require('../../data/personal').default.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex"
          >
            Start your project
            <FiArrowRight />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
