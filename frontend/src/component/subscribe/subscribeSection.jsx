import React from "react";
import './SubscribeSection.css'

const SubscribeSection = () => {
  return (
    <div className="subscribe-section">
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>Subscribe to our newsletter and stay updated</p>
      <div className="subscribe-box">
        <input type="email" placeholder="Your Email id" />
        <button>Subscribe</button>
      </div>
    </div>
  );
};

export default SubscribeSection;
