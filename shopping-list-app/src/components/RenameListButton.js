import React, { useState } from 'react';

const RenameListButton = ({ onClick }) => {
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
        onChange={(e) => setListName(e.target.value)}
      />
      <button disabled={!listName} onClick={onRename}>Rename list</button>
    </div>
  );
};

export default RenameListButton;