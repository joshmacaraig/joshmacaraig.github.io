import React from 'react';
import { FiLinkedin, FiMail } from 'react-icons/fi';
import personalData from '../../../data/personal';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.07] bg-transparent py-10">
      <div className="container-wrapper">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-5">

          <p className="text-sm text-[#a1a1aa]">
            © {year} {personalData.name}
          </p>

          <div className="flex items-center gap-1">
            <a
              href={personalData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg text-[#a1a1aa] hover:text-[#09090b] dark:hover:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.07] transition-all"
              aria-label="LinkedIn"
            >
              <FiLinkedin className="w-4 h-4" />
            </a>
            <a
              href={`https://mail.google.com/mail/?view=cm&to=${personalData.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg text-[#a1a1aa] hover:text-[#09090b] dark:hover:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.07] transition-all"
              aria-label="Email"
            >
              <FiMail className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
