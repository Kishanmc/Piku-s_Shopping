import React from 'react';
import './RelatedProducts.css';
import data_product from '../Assets/data';
import Item from '../Item/item';

const RelatedProducts = () => {
  return (
    <div className='related-products'>
      <h1>Related Products</h1>
      <hr />
      <div className='related-products-container'>
        {data_product.map((item, i) => (
          <Item 
            key={i} 
            id={item.id} 
            name={item.name} 
            image={item.image} 
            price={item.price} 
            oldPrice={item.oldPrice}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
