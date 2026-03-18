import React from 'react';
import './PortfolioSlider.css';

const PortfolioSlider = () => {
  const projects = [
    { title: 'FAST FOOD', category: 'Editorial + Print Design', color: '#5e5ce6' },
    { title: 'MUKHWAS', category: 'Packaging Redesign', color: '#bf5af2' },
    { title: 'BACKEND API', category: 'System Architecture', color: '#007aff' },
    { title: 'IOS APP', category: 'Mobile Development', color: '#ff9500' }
  ];

  return (
    <section className="portfolio-slider-section" id="work">
      <div className="slider-container">
        <div className="marquee">
          <div className="marquee-content">
            {[...projects, ...projects].map((project, index) => (
              <div key={index} className="project-ticket glass-panel">
                <div className="ticket-header">
                  <span className="category">{project.category}</span>
                  <h3 className="project-title">{project.title}</h3>
                </div>
                <div className="ticket-visual">
                  {/* Placeholder for project image/visual */}
                  <div className="visual-placeholder"></div>
                </div>
                <div className="ticket-cutout left"></div>
                <div className="ticket-cutout right"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSlider;
