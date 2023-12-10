const mongoose = require('mongoose');

// Member schema
const memberSchema = new mongoose.Schema({
  memberId: { type: Number, unique: true, required: true }, // Assuming memberId is a unique identifier
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true }
});

const Member = mongoose.model('Member', memberSchema, 'Members'); // Explicitly setting the collection name

module.exports = Member;