import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import PortfolioSlider from './components/PortfolioSlider';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <PortfolioSlider />
        <About />
      </main>
    </div>
  );
}

export default App;
