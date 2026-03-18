import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar glass-panel">
      <div className="container nav-content">
        <div className="logo">
          <span className="accent">Backend</span>.Dev
        </div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#portfolio">Portfolio</a></li>
          <li><a href="#contact" className="btn-primary">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
