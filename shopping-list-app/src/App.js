import React, { useState, useEffect } from 'react';

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

  // Select a list to view or edit
  const selectList = (listId) => {
    setSelectedListId(listId);
  };

  // Deselect the current list
  const deselectList = () => {
    setSelectedListId(null);
  };

  // UI to display and interact with shopping lists
  return (
    <div>
      <h1>Shopping Lists</h1>
      {selectedListId ? (
        // Display selected list details and options to modify it
        <div>
          <button onClick={deselectList}>Back to Lists</button>
          {/* Additional UI for the selected list */}
        </div>
      ) : (
        // Display all lists and options to create a new one
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