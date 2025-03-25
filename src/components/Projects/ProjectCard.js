import React from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const ProjectCard = ({ project }) => {
  const { 
    title, 
    period, 
    stack, 
    description, 
    features, 
    achievements, 
    components, 
    impact, 
    contribution, 
    role, 
    image, 
    link 
  } = project;

  return (
    <motion.div 
      className="card overflow-hidden flex flex-col h-full"
      variants={item}
    >
      <div className="relative h-48 bg-gradient-to-br from-primary-500/20 to-primary-700/20 dark:from-primary-800/30 dark:to-primary-900/30">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-primary-700 dark:text-primary-300 font-bold">{title}</span>
          <span className="text-sm text-primary-600/70 dark:text-primary-400/70 mt-1">{period}</span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold">{title}</h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">{period}</span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
        
        {stack && (
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Technologies Used:</h4>
            <div className="flex flex-wrap gap-2">
              {stack.map((tech, index) => (
                <span 
                  key={index}
                  className="text-xs px-2 py-1 bg-gray-100 dark:bg-dark-accent rounded-md text-gray-700 dark:text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {features && (
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Key Features:</h4>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 text-sm">
              {features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}
        
        {components && (
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Components:</h4>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 text-sm">
              {components.map((component, index) => (
                <li key={index}>{component}</li>
              ))}
            </ul>
          </div>
        )}
        
        {(achievements || impact) && (
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Outcomes:</h4>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 text-sm">
              {achievements && achievements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
              {impact && impact.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        
        {contribution && (
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Contribution:</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{contribution}</p>
          </div>
        )}
        
        {role && (
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Role:</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{role}</p>
          </div>
        )}
        
        {/* Learn More link hidden for now */}
        {/* <div className="mt-auto pt-4">
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
          >
            Learn More <FiExternalLink className="ml-1" />
          </a>
        </div> */}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
