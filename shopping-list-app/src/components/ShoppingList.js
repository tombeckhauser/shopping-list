// src/components/ShoppingList.js
import React, { useState } from 'react';
import ItemList from './ItemList';
import MemberList from './MemberList';
import AddItemButton from './AddItemButton';

const ShoppingList = ({ list, isOwner, onViewList, onDeleteList, onArchiveList, onRenameList }) => {
  const [items, setItems] = useState(list.items || []);

  const handleAddItem = (itemName) => {
    const newItem = { id: items.length + 1, name: itemName, done: false };
    setItems([...items, newItem]);
  };

  return (
    <div>
      <h2>{list.name}</h2>
      {/* Display other list details */}
      <button onClick={onViewList}>Back to Lists</button>
      <button onClick={onDeleteList}>Delete List</button>
      <button onClick={onArchiveList}>Archive List</button>
      <button onClick={onRenameList}>Rename List</button>

      <ItemList items={items} isOwner={isOwner} onAddItem={handleAddItem} />
      <AddItemButton onClick={handleAddItem} />
      {/* Add MemberList, AddMemberButton, RemoveMemberButton */}
    </div>
  );
};

export default ShoppingList;