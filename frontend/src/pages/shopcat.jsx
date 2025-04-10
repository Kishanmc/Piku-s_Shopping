import React, { useEffect, useState } from 'react';
import './CSS/ShopCategory.css';
import dropdown_icon from '../component/Assets/dropdown_icon.png';
import Item from '../component/Item/item';

const Shopcat = (props) => {
  const [allProduct, setAllProduct] = useState([]);

  useEffect(() => {
    // Fetch from backend
    fetch("http://localhost:4000/allproduct")
      .then((res) => res.json())
      .then((data) => {
        setAllProduct(data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  return (
    <div className='shop-category'>
      <img src={props.banner} alt='' />
      <div className='shopcategory-indexSort'>
        <p>
          <span>Showing 1-12</span> out of {allProduct.length} products
        </p>
        <div className='shopcategory-sort'>
          Sort by <img src={dropdown_icon} alt='' />
        </div>
      </div>
      <div className="shopcat-pro">
        {allProduct
          .filter((item) => item.cat === props.category)
          .map((item, i) => (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              old_price={item.old_price}
              new_price={item.new_price}
            />
          ))}
        <div className="loadmore">load more</div>
      </div>
    </div>
  );
};

export default Shopcat;
