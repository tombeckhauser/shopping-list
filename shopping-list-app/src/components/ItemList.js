import React from 'react';

const ItemList = ({ items, isOwner, onToggleDone, onRemoveItem }) => {
  return (
    <ul>
      {items.map((item, i) => (
        <li key={i}>
          <label>
            <input type="checkbox" name={i + '_done'} checked={item.done} onChange={() => onToggleDone(i)} />
            <span>{item.name}</span>
          </label>
          {isOwner && (
            <>
              <button onClick={() => onRemoveItem(i)}>Delete Item</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ItemList;