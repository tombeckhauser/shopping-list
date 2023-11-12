// src/components/AddItemButton.js
import React, { useState } from 'react';

const AddItemButton = ({ onClick }) => {
  const [itemName, setItemName] = useState('');

  const handleAddItem = () => {
    onClick(itemName);
    setItemName('');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter item name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <button onClick={handleAddItem}>Add Item</button>
    </div>
  );
};

export default AddItemButton;