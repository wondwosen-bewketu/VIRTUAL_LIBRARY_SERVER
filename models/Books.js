const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  description: String,
  year: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
  // Add other fields as needed
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
