import React from 'react';
import Hero from '../Hero';
import About from '../About';
import Skills from '../Skills';
import Projects from '../Projects';
import Integrations from '../Integrations';
import Contact from '../Contact';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Integrations />
      <Contact />
    </>
  );
};

export default Home;
