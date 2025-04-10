import React from 'react';
import { Link } from 'react-router-dom';
import './breadcrum.css';
import arrow from '../Assets/breadcrum_arrow.png';

const Breadcrum = ({ product }) => {
  return (
    <div className="breadcrum">
      <Link to="/">HOME</Link>
      <img src={arrow} alt="Arrow" />
      <Link to="/">SHOP</Link>
      <img src={arrow} alt="Arrow" />
      <Link to={`/${product.cat}`}>{product.cat}</Link>
      <img src={arrow} alt="Arrow" />
      <span>{product.name}</span>
    </div>
  );
};

export default Breadcrum;
