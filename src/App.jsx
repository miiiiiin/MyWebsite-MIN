import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import PortfolioSlider from './components/PortfolioSlider';
import PortfolioGrid from './components/PortfolioGrid';
import PortfolioModal from './components/PortfolioModal';
import ContactModal from './components/ContactModal';
import './App.css';

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const openModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    if (!isContactOpen) document.body.style.overflow = 'auto';
  };

  const openContact = (e) => {
    if (e) e.preventDefault();
    setIsContactOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeContact = () => {
    setIsContactOpen(false);
    if (!selectedProject) document.body.style.overflow = 'auto';
  };

  return (
    <div className="app">
      <Navbar onContactClick={openContact} />
      <main>
        <Hero />
        <PortfolioSlider onProjectSelect={openModal} />
        <PortfolioGrid onProjectSelect={openModal} />
        <About />
      </main>
      
      {selectedProject && (
        <PortfolioModal project={selectedProject} onClose={closeModal} />
      )}

      <ContactModal isOpen={isContactOpen} onClose={closeContact} />
    </div>
  );
}

export default App;
