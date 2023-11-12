// src/components/ItemList.js
import React from 'react';

const ItemList = ({ items, isOwner, onToggleDone, onDeleteItem }) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <span>{item.name}</span>
          {isOwner && (
            <>
              <button onClick={() => onToggleDone(item.id)}>Toggle Done</button>
              <button onClick={() => onDeleteItem(item.id)}>Delete Item</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ItemList;