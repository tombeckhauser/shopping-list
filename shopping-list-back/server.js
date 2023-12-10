const express = require('express');
const mongoose = require('mongoose');
const ShoppingList = require('./models/ShoppingList'); // Adjust path to your actual model
const Member = require('./models/Member'); // Adjust path to your actual model
const Item = require('./models/Item'); // Adjust path to your actual model

const app = express();
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/shoppinglist', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Successfully connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

app.get('/api/getLists', async (req, res) => {
  try {
    // Extract 'archived' from query parameters. If 'archived' is true, show all lists, otherwise show non-archived lists.
    const showArchived = req.query.archived === 'true';

    // Build the query based on 'archived' parameter
    // If showArchived is true, don't filter on 'archived', otherwise, filter for documents where 'archived' is false.
    const query = showArchived ? {} : { archived: false };

    // Execute the query
    const lists = await ShoppingList.find(query).lean(); // Use .lean() for performance optimization

    // Map the results to fit the dtoOut structure
    const response = lists.map(list => ({
      id: list._id, // Assuming _id is used as the identifier in the dtoOut
      name: list.name,
      OwnerId: list.ownerId, // Make sure this ownerId is supposed to be a Boolean as per your dtoOut
      archived: list.archived
    }));

    // Send the response
    res.json(response);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

app.post('/api/createList', async (req, res) => {
  try {
    // Extract the list name and userId from the request body
    const { name, userId } = req.body;

    // Validate the inputs
    if (!name) {
      return res.status(400).send({ error: 'List name is required.' });
    }
    if (!userId) {
      return res.status(400).send({ error: 'User ID is required.' });
    }

    // Create a new list with the provided name and user ID
    const newList = new ShoppingList({
      name: name,
      ownerId: userId, // Set the ownerId to the provided user ID
      archived: false // New lists are typically not archived
    });

    // Save the new list to the database
    const savedList = await newList.save();

    // Respond with the details of the new list
    res.status(201).json({
      id: savedList._id, // MongoDB automatically generates an _id
      name: savedList.name,
      isOwner: true, // Assuming the user creating the list is the owner
      archived: savedList.archived
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

// DeleteList (uuCmd)
app.delete('/api/deleteList', async (req, res) => {
  try {
    // Extract the 'id' and 'userId' from the request parameters
    const listId = req.query.id;
    const userId = req.query.userId;

    // Check if the list with the given 'listId' exists
    const existingList = await ShoppingList.findOne({ listId });

    if (!existingList) {
      // If the list doesn't exist, return an error response
      return res.status(404).json({ error: "List not found" });
    }

    // Check if the list belongs to the current user (you'll need to implement this logic)
    //if (existingList.ownerId !== userId) {
    //  return res.status(403).json({ error: "Access denied" });
    //}

    // Delete the list by its ID
    await ShoppingList.deleteOne({ listId });

    // Send a response with the deleted list details
    const deletedList = {
      id: existingList.listId,
      name: existingList.name,
      isOwner: true, // Replace with the actual ownership logic
      archived: false // Lists are typically not archived when deleted
    };

    res.json(deletedList);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// RenameList (uuCmd)
app.put('/api/renameList', async (req, res) => {
  try {
    // Extract the 'id' and 'name' from the request body
    const { id, name } = req.body;

    // Check if the list with the given 'id' exists
    const existingList = await ShoppingList.findOne({ listId: id });

    if (!existingList) {
      // If the list doesn't exist, return an error response
      return res.status(404).json({ error: "List not found" });
    }

    // Check if the list belongs to the current user (you'll need to implement this logic)
    // For now, let's assume the user has permission to rename any list they can find
    // You can replace this with your actual ownership logic
    const isOwner = true;

    if (!isOwner) {
      return res.status(403).json({ error: "Access denied" });
    }

    // Update the list's name
    existingList.name = name;
    await existingList.save();

    // Send a response with the updated list details
    const updatedList = {
      id: existingList._id,
      name: existingList.name,
      isOwner: true, // Replace with the actual ownership logic
      archived: existingList.archived
    };

    res.json(updatedList);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ArchiveList (uuCmd)
app.put('/api/archiveList', async (req, res) => {
  try {
    // Extract the 'id' and 'archived' (true or false) from the request body
    const { id, archived } = req.body;

    // Check if the list with the given 'id' exists
    const existingList = await ShoppingList.findOne({ listId: id });

    if (!existingList) {
      // If the list doesn't exist, return an error response
      return res.status(404).json({ error: "List not found" });
    }

    // Check if the list belongs to the current user (you'll need to implement this logic)
    // For now, let's assume the user has permission to archive/unarchive any list they can find
    // You can replace this with your actual ownership logic
    const isOwner = true;

    if (!isOwner) {
      return res.status(403).json({ error: "Access denied" });
    }

    // Update the 'archived' status of the list
    existingList.archived = archived;
    await existingList.save();

    // Send a success response with the updated list
    res.json(existingList);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// AddItemToList (uuCmd)
app.post('/api/addItemToList', async (req, res) => {
  try {
    // Extract the 'id' and 'name' of the item, and the 'listId' from the request body
    const { id, name, listId } = req.body;

    // Check if the list with the given 'listId' exists
    const existingList = await ShoppingList.findOne({ listId });

    if (!existingList) {
      // If the list doesn't exist, return an error response
      return res.status(404).json({ error: "List not found" });
    }

    // Check if the list belongs to the current user (you'll need to implement this logic)
    // For now, let's assume the user has permission to add items to any list they can find
    // You can replace this with your actual ownership logic
    const isOwner = true;

    if (!isOwner) {
      return res.status(403).json({ error: "Access denied" });
    }

    // Create a new item and add it to the list
    const newItem = {
      itemId: id,
      name,
      done: false // You can set the initial state of the item here
    };

    existingList.items.push(newItem);
    await existingList.save();

    // Send a response with the added item details
    res.json(newItem);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// DeleteItemFromList (uuCmd)
app.delete('/api/removeItemFromList', async (req, res) => {
  try {
    // Extract the 'itemId' and 'listId' from the request body
    const { itemId, listId } = req.body;

    // Check if the list with the given 'listId' exists
    const existingList = await ShoppingList.findOne({ listId });

    if (!existingList) {
      // If the list doesn't exist, return an error response
      return res.status(404).json({ error: "List not found" });
    }

    // Check if the list belongs to the current user (you'll need to implement this logic)
    // For now, let's assume the user has permission to remove items from any list they can find
    // You can replace this with your actual ownership logic
    const isOwner = true;

    if (!isOwner) {
      return res.status(403).json({ error: "Access denied" });
    }

    // Find the index of the item with the given 'itemId' in the list
    const itemIndex = existingList.items.findIndex(item => item.itemId === itemId);

    if (itemIndex === -1) {
      // If the item doesn't exist in the list, return an error response
      return res.status(404).json({ error: "Item not found" });
    }

    // Remove the item from the list
    existingList.items.splice(itemIndex, 1);
    await existingList.save();

    // Send a success response
    res.json({ message: "Item removed successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// CheckItemInList (uuCmd)
app.put('/api/updateItemStatus', async (req, res) => {
  try {
    // Extract the 'itemId', 'listId', and 'value' (true or false) from the request body
    const { itemId, listId, value } = req.body;

    // Check if the list with the given 'listId' exists
    const existingList = await ShoppingList.findOne({ listId });

    if (!existingList) {
      // If the list doesn't exist, return an error response
      return res.status(404).json({ error: "List not found" });
    }

    // Check if the list belongs to the current user (you'll need to implement this logic)
    // For now, let's assume the user has permission to update item status in any list they can find
    // You can replace this with your actual ownership logic
    const isOwner = true;

    if (!isOwner) {
      return res.status(403).json({ error: "Access denied" });
    }

    // Find the item with the given 'itemId' in the list
    const itemToUpdate = existingList.items.find(item => item.itemId === itemId);

    if (!itemToUpdate) {
      // If the item doesn't exist in the list, return an error response
      return res.status(404).json({ error: "Item not found" });
    }

    // Update the "done" status of the item
    itemToUpdate.done = value;
    await existingList.save();

    // Send a success response with the updated item
    res.json(itemToUpdate);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));