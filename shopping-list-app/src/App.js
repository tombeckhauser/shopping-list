import React, { useState, useEffect } from 'react';
import ThemeSwitch from './ThemeSwitch';
import ItemList from './components/ItemList'; // Ensure this path is correct

function App() {
  const [shoppingLists, setShoppingLists] = useState([]);
  const [selectedListId, setSelectedListId] = useState(null);

  // Fetch shopping lists from the server
  useEffect(() => {
    fetch('http://localhost:3001/api/getLists')
      .then(response => response.json())
      .then(data => setShoppingLists(data))
      .catch(error => console.error('Error fetching lists:', error));
  }, []);

  // Create a new shopping list
  const createList = (name, userId) => {
    fetch('http://localhost:3001/api/createList', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, userId })
    })
    .then(response => response.json())
    .then(newList => setShoppingLists([...shoppingLists, newList]))
    .catch(error => console.error('Error creating list:', error));
  };

  // Delete a shopping list
  const deleteList = (listId) => {
    fetch(`http://localhost:3001/api/deleteList?id=${listId}`, {
      method: 'DELETE'
    })
    .then(() => setShoppingLists(shoppingLists.filter(list => list.id !== listId)))
    .catch(error => console.error('Error deleting list:', error));
  };

  // Toggle an item's done status
  const toggleDone = (listId, itemId) => {
    // Logic to toggle the item's done status
  };

  // Remove an item from a list
  const removeItem = (listId, itemId) => {
    // Logic to remove an item from a list
  };

  // Select a list to view or edit
  const selectList = (listId) => {
    setSelectedListId(listId);
  };

  // Deselect the current list
  const deselectList = () => {
    setSelectedListId(null);
  };

  // Find the selected list
  const selectedList = shoppingLists.find(list => list.id === selectedListId);

  return (
    <div>
      <header className="App-header">
        <ThemeSwitch />
        {/* Additional header content */}
      </header>
      <h1>Shopping Lists</h1>
      {selectedList ? (
        <div>
          <button onClick={deselectList}>Back to Lists</button>
          <ItemList 
            items={selectedList.items || []}  // Ensure 'items' is always an array
            onToggleDone={(itemId) => toggleDone(selectedListId, itemId)} 
            onRemoveItem={(itemId) => removeItem(selectedListId, itemId)} 
          />
          {/* Additional UI for the selected list */}
        </div>
      ) : (
        <div>
          {shoppingLists.map(list => (
            <div key={list.id}>
              <span>{list.name}</span>
              <button onClick={() => selectList(list.id)}>View</button>
              <button onClick={() => deleteList(list.id)}>Delete</button>
            </div>
          ))}
          <button onClick={() => createList('New List', '123')}>Create New List</button>
        </div>
      )}
    </div>
  );
}

export default App;