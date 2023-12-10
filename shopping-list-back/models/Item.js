const mongoose = require('mongoose');

// Schema for individual items
const itemSchema = new mongoose.Schema({
  itemId: { type: Number, required: true, unique: true }, // Assuming itemId is a unique identifier
  name: { type: String, required: true },
  category: { type: String, required: false}
});

const Item = mongoose.model('Item', itemSchema, 'Items'); // Explicitly setting the collection name

module.exports = Item;