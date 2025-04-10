import React, { useContext } from 'react';
import './productdisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import  {Shopcontext}  from '../../contents/shopcontext';

const ProductDisplay = ({ product }) => {
 

  const {addToCart}= useContext(Shopcontext)


  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt={product.name} />
          <img src={product.image} alt={product.name} />
          <img src={product.image} alt={product.name} />
        </div>
        <div className="productdisplay-main-img">
          <img src={product.image} alt={product.name} />
        </div>
      </div>

      <div className="productdisplay-right">
        <h2>{product.name}</h2>
        <div className="productdisplay-rating">
          <img src={star_icon} alt="Star" />
          <img src={star_icon} alt="Star" />
          <img src={star_icon} alt="Star" />
          <img src={star_icon} alt="Star" />
          <img src={star_dull_icon} alt="Star" />
          <p>(122)</p>
        </div>

        <div className="productdisplay-prices">
          <span className="old-price">${product.old_price}</span>
          <span className="new-price">${product.new_price}</span>
        </div>

        <p className="productdisplay-description">Upgrade your wardrobe with this ultra-soft, lightweight, and stylish pullover T-shirt. Designed for a perfect blend of comfort and fashion, this close-fitting tee features a classic round neckline and short sleeves, making it the ideal choice for any season. Whether you're lounging at home, hitting the streets, or layering up for a trendy look, this T-shirt keeps you effortlessly stylish.</p>

        <h3>Select Size</h3>
        <div className="productdisplay-sizes">
        {["S", "M", "L", "XL", "XXL"].map((size) => (
                        <button key={size} className="size-button">{size}</button>
                    ))}
        </div>

        <button  onClick={()=>addToCart(product.id)} className="add-to-cart-btn">ADD TO CART</button>

        <p className="product-category">Category: {product.category}</p>
      </div>
    </div>
  );
};

export default ProductDisplay;
