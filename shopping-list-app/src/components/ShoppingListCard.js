// src/components/ShoppingListCard.js
import React from 'react';

const ShoppingListCard = ({ list, onListClick }) => {
  return (
    <div>
      <h3>{list.name}</h3>
      {/* Display other list details */}
      <button onClick={onListClick}>View Details</button>
    </div>
  );
};

export default ShoppingListCard;