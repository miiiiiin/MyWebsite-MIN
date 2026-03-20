import React from 'react';
import { useProjects } from '../hooks/useProjects';
import './PortfolioSlider.css';

const PortfolioSlider = ({ onProjectSelect }) => {
  const { projects, loading } = useProjects();

  if (loading) return null;

  return (
    <section className="portfolio-slider-section" id="home-work">
      <div className="slider-container">
        <div className="marquee">
          <div className="marquee-content">
            {[...projects, ...projects].map((project, index) => (
              <div 
                key={`${project.id}-${index}`} 
                className="project-ticket glass-panel"
                onClick={() => onProjectSelect && onProjectSelect(project)}
                style={{ cursor: 'pointer' }}
              >
                <div className="ticket-header">
                  <span className="category">{project.category}</span>
                  <h3 className="project-title">{project.title}</h3>
                </div>
                <div className="ticket-footer">
                   <p className="short-desc">{project.short_description || project.shortDescription}</p>
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
