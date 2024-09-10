import React from 'react';
import './style.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo">TV Channel</div>
      <nav className="nav">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#programs">Programs</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
