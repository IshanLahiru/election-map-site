import React from 'react';
import './style.css';
import { useTheme } from '../../contexts/theme-context/theme-context';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="brand">
        <span className="logo">Sri Lanka Presidential Election 2024</span>
        <span className="tagline">Results by Division &amp; District</span>
      </div>
      <nav className="nav">
        <ul>
          <li>
            <a
              href="https://manthri.lk/en/presidential-election-result-2024"
              target="_blank"
              rel="noopener noreferrer"
            >
              Data Source
            </a>
          </li>
        </ul>
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </nav>
    </header>
  );
};

export default Header;
