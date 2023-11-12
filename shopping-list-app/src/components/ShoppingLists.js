// src/components/ShoppingLists.js
import React from 'react';

const ShoppingLists = ({ lists, onListClick }) => {
  return (
    <div>
      <h2>Shopping Lists</h2>
      <ul>
        {lists.map((list) => (
          <li key={list.id} onClick={() => onListClick(list.id)}>
            {list.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingLists;