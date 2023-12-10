const mongoose = require('mongoose');

// Schema for individual items in the shopping list
// Adjust this schema based on the actual structure of items in your database
const itemSchema = new mongoose.Schema({
  itemId: Number, // Or ObjectId if you reference another collection
  name: String,
  done: Boolean
  // Include other item fields as necessary
});

// ShoppingList schema adjusted to match the shown database structure
const shoppingListSchema = new mongoose.Schema({
  listId: Number, // Include this only if you want to keep the listId separate from MongoDB's _id
  name: { type: String, required: true },
  creationDate: { type: Date, default: Date.now }, // Sets the current date by default
  ownerId: Number, // Or mongoose.Schema.Types.ObjectId if referencing another collection
  archived: { type: Boolean, default: false }, // Defaults to false if not provided
  items: [itemSchema] // Define the items as an array of itemSchema
});

const ShoppingList = mongoose.model('ShoppingList', shoppingListSchema, 'ShoppingLists');

module.exports = ShoppingList;