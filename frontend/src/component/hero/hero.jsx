import React from 'react';
import './hero.css';
import hand_icon from '../Assets/hand_icon.png';
import arrow from '../Assets/arrow.png';
import hero_img from '../Assets/hero_image.png';

const Hero = () => {
  return (
    <div className='hero'>
        <div className="hero-left">
          <h2>NEW ARRIVALS ONLY</h2>
          <div>
            <div className="hand-icon">
              <p>new</p>
              <img src={hand_icon} alt="" />
            </div>
            <p>collection</p>
            <p>for everyone</p>
          </div>
          <div className="hero-latest-btn">
            <div>Latest collection</div>
            <img src={arrow} alt="" />
          </div>
        </div>
        <div className="hero-right">
          <img src={hero_img} alt="" />

        </div>
    
        
    </div>
  );
}

export default Hero;
