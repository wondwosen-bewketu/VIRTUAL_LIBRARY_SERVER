const mongoose = require('mongoose');

// Define the member schema


// Define the meeting schema
const meetingSchema = new mongoose.Schema({
  date: Date,
  location: String,
  notes: String
});

// Define the book club schema
const bookClubSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  members:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  createdDate: { type: Date, default: Date.now },
  meetings: [meetingSchema]
});

// Create the BookClub model based on the schema
const BookClub = mongoose.model('BookClub', bookClubSchema);

module.exports = BookClub;
