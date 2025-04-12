import React from 'react';
import { Mail, Phone, MapPin, ChevronRight, Car, Shield, Award } from 'lucide-react';
import "../assets/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Company Info */}
            <div className="footer-section">
              <h3 className="footer-title">Vehicle Vault</h3>
              <p className="company-description">
                Your trusted partner in finding the perfect vehicle. We provide comprehensive information about new cars, expert reviews, and detailed comparisons.
              </p>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h4 className="footer-subtitle">Quick Links</h4>
              <ul className="footer-links">
                <li>
                  <ChevronRight size={16} />
                  <a href="#">New Cars</a>
                </li>
                <li>
                  <ChevronRight size={16} />
                  <a href="#">Used Cars</a>
                </li>
                <li>
                  <ChevronRight size={16} />
                  <a href="#">Compare Cars</a>
                </li>
                <li>
                  <ChevronRight size={16} />
                  <a href="#">Car News</a>
                </li>
                <li>
                  <ChevronRight size={16} />
                  <a href="#">Car Reviews</a>
                </li>
              </ul>
            </div>

            {/* Popular Brands */}
            <div className="footer-section">
              <h4 className="footer-subtitle">Popular Brands</h4>
              <ul className="footer-links">
                <li>
                  <Car size={16} />
                  <a href="#">BMW</a>
                </li>
                <li>
                  <Car size={16} />
                  <a href="#">Mercedes-Benz</a>
                </li>
                <li>
                  <Car size={16} />
                  <a href="#">Audi</a>
                </li>
                <li>
                  <Car size={16} />
                  <a href="#">Tesla</a>
                </li>
                <li>
                  <Car size={16} />
                  <a href="#">Porsche</a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-section">
              <h4 className="footer-subtitle">Contact Us</h4>
              <ul className="contact-info">
                <li>
                  <MapPin size={16} />
                  <span>123 Auto Plaza, Car Street<br />New York, NY 10001</span>
                </li>
                <li>
                  <Phone size={16} />
                  <a href="tel:+1234567890">+1 (234) 567-890</a>
                </li>
                <li>
                  <Mail size={16} />
                  <a href="mailto:info@vehiclevault.com">info@vehiclevault.com</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="trust-badges">
        <div className="footer-container">
          <div className="badges-grid">
            <div className="badge">
              <Shield size={24} />
              <div>
                <h5>Secure Payments</h5>
                <p>All transactions are secure</p>
              </div>
            </div>
            <div className="badge">
              <Award size={24} />
              <div>
                <h5>Quality Assured</h5>
                <p>Verified dealers only</p>
              </div>
            </div>
            <div className="badge">
              <Car size={24} />
              <div>
                <h5>Wide Selection</h5>
                <p>Over 10,000 cars</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-bottom-content">
            <p>&copy; 2024 Vehicle Vault. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;