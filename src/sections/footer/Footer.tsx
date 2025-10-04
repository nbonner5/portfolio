import React from 'react';
import './Footer.css';

const currentYear = new Date().getFullYear();

const Footer: React.FC = () => (
  <footer className="footer-section">
    <div className="footer-content">
      <span>&copy; {currentYear} Nickolas R Bonner. All rights reserved.</span>
    </div>
  </footer>
);

export default Footer;
