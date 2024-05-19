const mongoose = require("mongoose");

// Define the book schema with the genre field
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  year: Number,
  pdf: String,
  genre: String, // Add the genre field
});

// Create a model based on the schema
const Book = mongoose.model("DummyBooks", bookSchema);

module.exports = Book;
