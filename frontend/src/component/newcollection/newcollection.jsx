import React, { useEffect, useState } from 'react';
import './newcollection.css';
import Item from '../Item/item';

const Newcollections = () => {
  const [newCollections, setNewCollections] = useState([]);

  useEffect(() => {
      fetch("http://localhost:4000/newcollections")
          .then((response) => response.json())
          .then((data) => setNewCollections(data))
          .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="popular">
      <h1>NEW COLLECTION</h1>
      <hr />
      <div className="popular-item">
        {newCollections.length > 0 ? (
          newCollections.map((item) => (
            <Item 
              key={item._id}  // Using MongoDB _id as key
              id={item._id} 
              name={item.name} 
              image={item.image} 
              old_price={item.old_price}
              new_price={item.new_price}
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Newcollections;
