import React from 'react';
// 1. Keep the original intact in your files for safety
// import Hero from '../components/Hero';
import DynamicHero from '../components/DynamicHero'; // 2. Import your new component
import About from '../components/About';
import Skills from '../components/Skills';
import BlogSection from '../components/BlogSection';
import TestimonialPreview from '../components/TestimonialPreview';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Projects from '../components/Projects';
import Timeline from '../components/Timeline';
import DevActivity from '../components/DevActivity';

interface HomeProps {
  startAnimation?: boolean;
}

const Home: React.FC<HomeProps> = ({ startAnimation = false }) => {
  return (
    <div className="relative overflow-x-hidden">
      {/* 3. Swap the old hero element with your parallel sandbox asset */}
      {/* <Hero startAnimation={startAnimation} /> */}
      <DynamicHero />
      
      {/* All subsequent data modules stay alive in the document layout stream */}
      <About />
      <Skills />
      <Projects />
      <DevActivity />
      <Timeline />
      <BlogSection />
      {/* <TestimonialPreview /> */}
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;