// src/App.js
import React, { useState } from 'react';
import ShoppingLists from './components/ShoppingLists';
import ShoppingList from './components/ShoppingList';
import { defaultShoppingLists } from './data';

function App() {
  const [selectedList, setSelectedList] = useState(null);

  const handleListClick = (listId) => {
    // Set the selected list based on the clicked list ID
    setSelectedList({ id: listId, name: 'Test List', items: [] }); // Replace with actual data
  };

  const handleBackToLists = () => {
    // Reset the selected list when navigating back to the lists overview
    setSelectedList(null);
  };

  return (
    <div className="App">
      {selectedList ? (
        <ShoppingList
          list={selectedList}
          isOwner={true} // Replace with a valid boolean expression
          onViewList={handleBackToLists}
          onDeleteList={() => alert('Delete list clicked')} // Replace with actual delete list functionality
          onArchiveList={() => alert('Archive list clicked')} // Replace with actual archive list functionality
          onRenameList={() => alert('Rename list clicked')} // Replace with actual rename list functionality
        />
      ) : (
        <ShoppingLists lists={defaultShoppingLists} onListClick={handleListClick} />
      )}
    </div>
  );
}

export default App;