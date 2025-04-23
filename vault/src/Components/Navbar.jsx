import React from "react";
     import { Link, useNavigate } from "react-router-dom";
     import { Heart } from "lucide-react";
     import { getToken, logout } from "../services/authService";
     import "../assets/Navbar.css";

     const Navbar = () => {
         const token = getToken();
         const navigate = useNavigate();

         const handleLogout = () => {
             logout();
             navigate("/login");
         };

         return (
             <nav className="navbar">
                 <div className="left-section">
                     <Link to="/" className="logo">Vehicle Vault</Link>
                     <ul className="nav-links">
                         <li><Link to="/newcars">New Cars</Link></li>
                         <li><Link to="/usedcars">Used Cars</Link></li>
                         <li><Link to="/accessory">Accessory</Link></li>
                         <li><Link to="/compare">Compare</Link></li>
                         {token && <li><Link to="/order-history">Order History</Link></li>}
                     </ul>
                 </div>

                 <div className="auth-buttons">
                     <Link to="/favorites" className="favorites-link">
                         <Heart size={20} className="heart-icon"/>
                     </Link>
                     {token ? (
                         <button className="nav-button logout" onClick={handleLogout}>
                             Logout
                         </button>
                     ) : (
                         <Link to="/login" className="nav-button login">
                             Login
                         </Link>
                     )}
                 </div>
             </nav>
         );
     };

     export default Navbar;