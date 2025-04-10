import React from "react";
import footer_logo from '../Assets/logo.png'
import insta from '../Assets/instagram_icon.png'
import pintester from '../Assets/pintester_icon.png'
import whatsapp from '../Assets/whatsapp_icon.png'
import './footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="logo">
        <img src={footer_logo} alt="Shopper Logo" />
        <h2>PIKU'S SHOPPING</h2>
      </div>
      <ul className="footer-links">
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="social-icons">
        <img src={insta} alt="" />
        <img src={pintester} alt="" />
        <img src={whatsapp} alt="" />
      </div>
      <p className="copyright">Copyright © 2025 - All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
