import React from 'react';

const NewListButton = ({ onClick }) => {
  return (
    <div>
      <button onClick={onClick}>Create New List</button>
    </div>
  );
};

export default NewListButton;