import React from 'react';
import Hero from '../Hero';
import TechStack from '../TechStack';
import TargetAudience from '../TargetAudience';
import HowItWorks from '../HowItWorks';
import Services from '../Services';
import Projects from '../Projects';
import Testimonials from '../Testimonials';
import FAQ from '../FAQ';
import Contact from '../Contact';

const Home = () => {
  return (
    <>
      <Hero />
      <TechStack />
      <TargetAudience />
      <HowItWorks />
      <Services />
      <Projects />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
};

export default Home;
