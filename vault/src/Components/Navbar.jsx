import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import "../assets/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="left-section">
        <Link to="/" className="logo">Vehicle Vault</Link>
        <ul className="nav-links">
          <li><Link to="/newcars">New Cars</Link></li>
          <li><Link to="/usedcars">Used Cars</Link></li>
          <li><Link to="/accessory">Accessory</Link></li>
        </ul>
      </div>

      <div className="auth-buttons">
        <Link to="/favorites" className="favorites-link">
          <Heart size={20} className="heart-icon"/>
        </Link>
        <Link to="/login" className="nav-button login">Login</Link>
        {/*<Link to="/signup" className="nav-button signup">Sign Up</Link>*/}
      </div>
    </nav>
    
  );
};

export default Navbar;









