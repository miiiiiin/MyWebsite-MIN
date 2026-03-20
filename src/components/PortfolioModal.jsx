import React from 'react';
import ReactMarkdown from 'react-markdown';
import './PortfolioModal.css';

const PortfolioModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container glass-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        <div className="modal-content">
          <div className="modal-header">
            <div className="image-wrapper">
              <img src={project.image_url || project.image} alt={project.title} className="modal-image" />
            </div>
          </div>

          <div className="modal-body">
            <div className="category-tag" style={{ color: project.color }}>{project.category}</div>
            <h2 className="modal-title">{project.title}</h2>

            <div className="description-section">
              <h3>Overview</h3>
              <div className="full-description markdown-content">
                <ReactMarkdown>
                  {project.full_description || project.fullDescription}
                </ReactMarkdown>
              </div>
            </div>

            <div className="tech-section">
              <h3>Technologies Used</h3>
              <div className="tech-tags">
                {(project.technologies || []).map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>

            <div className="links-section">
              {project.github_url && (
                <a href={project.github_url} className="view-project-btn" target="_blank" rel="noopener noreferrer">
                  Github <span className="arrow">→</span>
                </a>
              )}
              {project.link_url && (
                <a href={project.link_url} className="view-project-btn" target="_blank" rel="noopener noreferrer">
                  More Info <span className="arrow">→</span>
                </a>
              )}
              {(project.blog_url || []).map((url, idx) => (
                <a key={idx} href={url} className="view-project-btn" target="_blank" rel="noopener noreferrer">
                  Blog Post {idx + 1} <span className="arrow">→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioModal;
