import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>SustainaMoment</h3>
          <hr />
          <div>© 2024 All Rights Reserved</div>
        </div>
        <div className="footer-product">
          <div className='product-list'>Product</div>
            <div className='list-item'>
              <a href="#">Landing Page</a>
              <a href="#">Popup Builder</a>
              <a href="#">Web-design</a>
              <a href="#">Content</a>
              <a href="#">Integrations</a>
            </div>
        </div>
      </div>
    </footer>
    
  );
};

export default Footer;
