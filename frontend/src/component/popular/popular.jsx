// Popular.jsx
import React, { useEffect, useState } from 'react';
import './popular.css';
import Item from '../Item/item';
import axios from 'axios';

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/popularinwomen')
      .then((response) => {
        setPopularProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching popular products:", error);
      });
  }, []);

  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {popularProducts.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            old_price={item.old_price}
            new_price={item.new_price}
          />
        ))}
      </div>
    </div>
  );
};

export default Popular;
