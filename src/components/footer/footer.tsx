import React from 'react';
import './style.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>© 2024 Sri Lanka Presidential Election Results Map.</p>
      <p className="footer-source">
        Results data sourced from{' '}
        <a
          href="https://manthri.lk/en/presidential-election-result-2024"
          target="_blank"
          rel="noopener noreferrer"
        >
          Manthri.lk
        </a>
        .
      </p>
      <p>
        Developed by{' '}
        <a
          href="https://github.com/IshanLahiru"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ishan Lahiru
        </a>
      </p>
    </footer>
  );
};

export default Footer;
