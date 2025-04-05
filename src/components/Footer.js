import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <div className="footer-section">
            <h4>Explore</h4>
            <ul>
              <li><a href="#">Movies</a></li>
              <li><a href="#">Stream</a></li>
              <li><a href="#">Events</a></li>
              <li><a href="#">Plays</a></li>
              <li><a href="#">Sports</a></li>
              <li><a href="#">Activities</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Corporate</h4>
            <ul>
              <li><a href="#">List Your Show</a></li>
              <li><a href="#">Corporate Offers</a></li>
              <li><a href="#">Gift Cards</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Help & Support</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Follow Us</h4>
            <ul className="social-links">
              <li><a href="#"><i className="fab fa-facebook-f"></i> Facebook</a></li>
              <li><a href="#"><i className="fab fa-twitter"></i> Twitter</a></li>
              <li><a href="#"><i className="fab fa-instagram"></i> Instagram</a></li>
              <li><a href="#"><i className="fab fa-youtube"></i> YouTube</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="footer-bottom">
          <p>&copy; 2025 BookMyShow Clone. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
