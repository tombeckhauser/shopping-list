import React, { useState } from 'react';

const RenameListButton = ({ onClick, disabled }) => {
  const [listName, setListName] = useState('');

  const onRename = () => {
    onClick(listName);
    setListName('');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter list name"
        value={listName}
        disabled={disabled}
        onChange={(e) => setListName(e.target.value)}
      />
      <button disabled={disabled || !listName} onClick={onRename}>Rename list</button>
    </div>
  );
};

export default RenameListButton;