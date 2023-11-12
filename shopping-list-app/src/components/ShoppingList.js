import React, { useState, useMemo } from 'react';
import ItemList from './ItemList';
//import MemberList from './MemberList';
import AddItemButton from './AddItemButton';
import ArchivedLabel from './ArchivedLabel';
import RenameListButton from './RenameListButton';

const ShoppingList = ({ lists, selectedList, isOwner, onViewList, onDeleteList, onArchiveList, onRenameList, onUpdateList }) => {
  const list = useMemo(() => lists.find((v) => v.id == selectedList), [lists, selectedList]);
  const items = useMemo(() => list?.items ?? []);

  if (!list) {
    onViewList()
    return ''
  }

  const handleAddItem = (itemName) => {
    const newItem = { name: itemName, done: false };
    onUpdateList({
      items: [...items, newItem],
    });
  };

  const handleRemoveItem = (id) => {
    return onUpdateList({
      items: items.filter((_, i) => i !== id),
    });
  };

  const toggleDoneItem = (id) => onUpdateList({
    items: items.map((item, i) => i === id ? {...item, done: !item.done } : item),
  })

  return (
    <div>
      <h2>{list.name} <ArchivedLabel isArchived={list.archived} /> </h2>
      {/* Display other list details */}
      <button onClick={onViewList}>Back to Lists</button>
      <button onClick={onDeleteList}>Delete List</button>
      <button onClick={onArchiveList}>Archive List</button>
      <RenameListButton onClick={onRenameList} />

      <ItemList items={items} isOwner={isOwner} onAddItem={handleAddItem} onRemoveItem={handleRemoveItem} onToggleDone={toggleDoneItem} />
      <AddItemButton onClick={handleAddItem} />
      {/* Add MemberList, AddMemberButton, RemoveMemberButton */}
    </div>
  );
};

export default ShoppingList;