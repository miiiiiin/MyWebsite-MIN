import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import PortfolioSlider from './components/PortfolioSlider';
import PortfolioGrid from './components/PortfolioGrid';
import PortfolioModal from './components/PortfolioModal';
import './App.css';

function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <PortfolioSlider onProjectSelect={openModal} />
        <PortfolioGrid onProjectSelect={openModal} />
        <About />
      </main>
      
      {selectedProject && (
        <PortfolioModal project={selectedProject} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;
