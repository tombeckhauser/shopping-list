import React, { useState, useMemo } from 'react';
import ItemList from './ItemList';
//import MemberList from './MemberList';
import AddItemButton from './AddItemButton';
import ArchivedLabel from './ArchivedLabel';
import RenameListButton from './RenameListButton';

const ShoppingList = ({ lists, selectedList, onViewList, onDeleteList, onArchiveList, onRenameList, onUpdateList }) => {
  const list = useMemo(() => lists.find((v) => v.id == selectedList), [lists, selectedList]);
  const items = useMemo(() => list?.items ?? []);
  const isOwner = useMemo(() => list?.isOwner ?? false);

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
      <button onClick={onDeleteList} disabled={!isOwner}>Delete List</button>
      <button onClick={onArchiveList} disabled={!isOwner}>Archive List</button>
      <RenameListButton onClick={onRenameList} disabled={!isOwner} />

      <ItemList items={items} onAddItem={handleAddItem} onRemoveItem={handleRemoveItem} onToggleDone={toggleDoneItem} />
      <AddItemButton onClick={handleAddItem} />
      {/* Add MemberList, AddMemberButton, RemoveMemberButton */}
    </div>
  );
};

export default ShoppingList;