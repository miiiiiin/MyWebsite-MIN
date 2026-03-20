import React from 'react';
import { useProjects } from '../hooks/useProjects';
import './PortfolioGrid.css';

const PortfolioGrid = ({ onProjectSelect }) => {
  const { projects, loading } = useProjects();

  if (loading) {
    return <div className="loading">Loading projects...</div>;
  }

  return (
    <section className="portfolio-grid-section" id="work">
      <div className="container">
        <div className="section-header">
          <h2 className="accent">Portfolio</h2>
          <div className="line"></div>
        </div>
        
        <div className="portfolio-grid">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="portfolio-card glass-panel"
              onClick={() => onProjectSelect && onProjectSelect(project)}
            >
              <div className="card-image-container">
                <img src={project.image_url || project.image} alt={project.title} className="card-image" />
                <div className="card-overlay">
                  <span className="view-details">View Details</span>
                </div>
              </div>
              <div className="card-content">
                <span className="card-category" style={{ color: project.color }}>{project.category}</span>
                <h3 className="card-title">{project.title}</h3>
                <p className="card-description">{project.short_description || project.shortDescription}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioGrid;
