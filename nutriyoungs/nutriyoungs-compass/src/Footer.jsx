import React from 'react';
import './Footer.css';
import facebookLogo from './assets/images/facebook-logo.png'
import twitterLogo from './assets/images/twitter-logo.png';
import instagramLogo from './assets/images/instagram-logo.png';
import googleLogo from './assets/images/google-logo.png';
import siteLogo from './assets/images/site-logo.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="site-logo">
          <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
            <img src={siteLogo} alt="Site" />
        </a>
          </div>
          <p>High level experience in web design and development knowledge, producing quality work.</p>
          <hr />
          <div>© 2021 All Rights Reserved</div>
          <br />
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Sales and Refunds</a>
            <a href="#">Legal</a>
            <a href="#">Site Map</a>
          </div>
        </div>
        <div className="footer-section">
          <div>Follow us</div>
          <div className="social-icons">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <img src={facebookLogo} alt="Facebook" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src={twitterLogo} alt="Twitter" />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img src={instagramLogo} alt="Instagram" />
        </a>
        <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
            <img src={googleLogo} alt="Google" />
        </a>
          </div>
          <div>Call us</div>
          <div>+1 800 854-36-80</div>
        </div>
        <div className="footer-section">
          <div>Product</div>
          <a href="#">Landing Page</a>
          <a href="#">Popup Builder</a>
          <a href="#">Web-design</a>
          <a href="#">Content</a>
          <a href="#">Integrations</a>
        </div>
        <div className="footer-section">
          <div>Use Cases</div>
          <a href="#">Web-designers</a>
          <a href="#">Marketers</a>
          <a href="#">Small Business</a>
          <a href="#">Website Builder</a>
        </div>
        <div className="footer-section">
          <div>Company</div>
          <a href="#">About Us</a>
          <a href="#">Careers</a>
          <a href="#">FAQs</a>
          <a href="#">Teams</a>
          <a href="#">Contact Us</a>
        </div>
      </div>
    </footer>
    
  );
};

export default Footer;
