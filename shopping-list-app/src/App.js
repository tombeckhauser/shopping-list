import React, { useState } from 'react';
import ShoppingLists from './components/ShoppingLists';
import ShoppingList from './components/ShoppingList';
import { defaultShoppingLists } from './data';

function App() {
  const [selectedList, setSelectedList] = useState(null);
  const [lists, setLists] = useState(defaultShoppingLists);

  const handleListClick = (listId) => {
    // Set the selected list based on the clicked list ID
    setSelectedList(listId); // Replace with actual data
  };

  const handleBackToLists = () => {
    // Reset the selected list when navigating back to the lists overview
    setSelectedList(null);
  };

  /*
    // Unpacking lists and why we do it
    lists = [1,2,3]
    lists2 = [...lists, 4] // [1, 2, 3, 4]
    lists3 = [lists, 4] // [[1, 2, 3], 4]
  */

  const createList = (name) => setLists([...lists, {
    id: crypto.randomUUID(),
    archived: false,
    items: [],
    name,
  }]);

  const deleteList = (id) => setLists(lists.filter(l => l.id !== id));

  const updateList = (id, data) => {
    //console.log(id, data);
    return setLists(lists.map(l => l.id === id ? {...l , ...data} : l));
  };

  return (
    <div className="App">
      {selectedList ? (
        <ShoppingList
          lists={lists}
          selectedList={selectedList}
          isOwner={true} // Replace with owner logic
          onViewList={handleBackToLists}
          onDeleteList={() => deleteList(selectedList)}
          onArchiveList={(archived) => updateList(selectedList, {archived})}
          onRenameList={(name) => updateList(selectedList, {name})}
          onUpdateList={(data) => updateList(selectedList, data)}
        />
      ) : (
        <ShoppingLists lists={lists} onListClick={handleListClick} onCreateList={(name) => createList(name)} />
      )}
    </div>
  );
}

export default App;