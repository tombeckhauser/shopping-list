import React from 'react';

const Item = ({ item, isOwner, onDoneToggle, onDeleteItem }) => {
  return (
    <div>
      <span>{item.name}</span>
      <input type="checkbox" checked={item.done} onChange={() => onDoneToggle(item.id)} />
      {isOwner && <button onClick={() => onDeleteItem(item.id)}>Delete Item</button>}
    </div>
  );
};

export default Item;