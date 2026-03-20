import React from 'react';
import './Navbar.css';

const Navbar = ({ onContactClick }) => {
  return (
    <nav className="navbar-ref">
      <div className="container nav-content-ref">
        <div className="logo-ref">SONG.MIN</div>
        <div className="nav-links-ref">
          <a href="#home">home</a>
          <a href="#work">portfolio</a>
          <a href="https://miiiiiin-devlog.tistory.com/" target="_blank" rel="noopener noreferrer">blog</a>
          <a href="#about">about</a>
          <a href="#contact" className="get-in-touch" onClick={onContactClick}>Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
