import React from 'react';
import ArchivedLabel from './ArchivedLabel';

const ShoppingLists = ({ lists, onListClick, onCreateList }) => {
  const [showArchived, setShowArchived] = React.useState(false);
  const [newName, setNewName] = React.useState('');

  const filteredLists = React.useMemo(() => lists.filter((l) => showArchived || !l.archived), [showArchived, lists]);

  const createList = () => {
    onCreateList(newName);
    setNewName("");
  };

  return (
    <div>
      <h2>Shopping Lists</h2>
      <div className="lists-actions">
        <label>
          <input type="checkbox" name="showArchived" checked={showArchived} onChange={() => setShowArchived(!showArchived)} />
          Show archived
        </label>
      </div>

      <div className="card-container">
        {filteredLists.map((list) => (
          <div key={list.id} className='card' onClick={() => onListClick(list.id)}>
            {list.name}
            <ArchivedLabel isArchived={list.archived} /> 
          </div>
        ))}
        <div className='add-card'>
          <input type='text' placeholder='New list name' value={newName} onInput={(e) => setNewName(e.target.value)}/>
          <button disabled={!newName} onClick={createList}>Create</button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingLists;