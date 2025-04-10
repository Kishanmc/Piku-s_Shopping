import React from 'react';
import './slidebar.css';
import { Link } from 'react-router-dom';
import all_product_icon from '../../assets/Product_Cart.svg';
import list_product_icon from '../../assets/Product_list_icon.svg';

const Slidebar = () => {
  return (
    <div className="slidebar">
      <Link to="/addproduct" style={{ textDecoration: "none" }}>
        <div className="item">
          <img src={all_product_icon} alt="Add Product Icon" />
          <p>Add Product</p>
        </div>
      </Link>

      <Link to="/listproduct" style={{ textDecoration: "none" }}>
        <div className="item">
          <img src={list_product_icon} alt="Product List Icon" />
          <p>Product List</p>
        </div>
      </Link>
    </div>
  );
};

export default Slidebar;
