import React from 'react';
import './Footer.css';

const Footer = ({ onNavigate }) => {
  const navigateToComingSoon = () => {
    onNavigate('comingSoon');
  };

  return (
    <footer className="footer">
      <div className="footer-content">
      <div className="footer-section">
          <h3>SustainaMoment</h3>
          <hr />
          <div>© 2024 All Rights Reserved</div>
        </div>
        <div className="footer-product">
        </div>
      </div>
    </footer>
  );
};

export default Footer;
