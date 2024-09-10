import React from 'react';
import './style.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>© 2024 TV Channel. All rights reserved.</p>
      <div className="social-media">
        <a href="#facebook">F</a>
        <a href="#twitter">T</a>
        <a href="#instagram">I</a>
      </div>
      <p>Developed by <a href="https://github.com/IshanLahiru" target="_blank" rel="noopener noreferrer">Ishan Lahiru</a></p>
    </footer>
  );
};

export default Footer;
