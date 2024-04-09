import React from 'react';
import './Footer.css';

const Footer = ({ onNavigate }) => {
  const navigateToComingSoon = () => {
    onNavigate('comingSoon');
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-product">
          <div className='product-list'>Product</div>
          <div className='list-item'>
            <a href="#" onClick={navigateToComingSoon}>Landing Page</a>
            <a href="#" onClick={navigateToComingSoon}>Popup Builder</a>
            <a href="#" onClick={navigateToComingSoon}>Web-design</a>
            <a href="#" onClick={navigateToComingSoon}>Content</a>
            <a href="#" onClick={navigateToComingSoon}>Integrations</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
