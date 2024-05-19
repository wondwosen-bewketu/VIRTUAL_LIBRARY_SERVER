const mongoose = require("mongoose");
const BookTypes = [
  "Hardcover",
  "Paperback",
  "E-book",
  "Audiobook",
  "PDF",
  "Magazine",
  "Journal",
  "Comic Book",
];

// Define the book schema with the genre field
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  type:String,
  description: String,
  year: Number,
  cuverImage:String,
  pdf: String,
  genre: String, // Add the genre field
});

// Create a model based on the schema
const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
