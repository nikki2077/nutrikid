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
          {/* <div className='product-list'>Product</div>
          <div className='list-item'>
            <a href="#" onClick={navigateToComingSoon}>Landing Page</a>
            <br />
            <a href="#" onClick={navigateToComingSoon}>Popup Builder</a>
            <br />
            <a href="#" onClick={navigateToComingSoon}>Web-design</a>
            <br />
            <a href="#" onClick={navigateToComingSoon}>Content</a>
            <br />
            <a href="#" onClick={navigateToComingSoon}>Integrations</a>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
