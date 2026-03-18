import React from 'react';
import { portfolioData } from '../data/portfolioData';
import './PortfolioGrid.css';

const PortfolioGrid = ({ onProjectSelect }) => {
  return (
    <section className="portfolio-grid-section" id="work">
      <div className="container">
        <div className="section-header">
          <h2 className="accent">Portfolio</h2>
          <div className="line"></div>
        </div>
        
        <div className="portfolio-grid">
          {portfolioData.map((project) => (
            <div 
              key={project.id} 
              className="portfolio-card glass-panel"
              onClick={() => onProjectSelect && onProjectSelect(project)}
            >
              <div className="card-image-container">
                <img src={project.image} alt={project.title} className="card-image" />
                <div className="card-overlay">
                  <span className="view-details">View Details</span>
                </div>
              </div>
              <div className="card-content">
                <span className="card-category" style={{ color: project.color }}>{project.category}</span>
                <h3 className="card-title">{project.title}</h3>
                <p className="card-description">{project.shortDescription}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioGrid;
