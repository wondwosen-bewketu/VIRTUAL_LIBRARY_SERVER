const fs = require("fs");
const Book = require("../models/workModel");

// Function to save books to the database
async function saveBooksToDB(booksData) {
  try {
    // Insert each book into the database
    await Book.insertMany(booksData);
    console.log("Books saved to database successfully");
  } catch (error) {
    console.error("Error saving books to database:", error);
    throw error; // Propagate the error to the caller
  }
}

// Controller function to handle saving books
async function saveBooks(req, res) {
  const booksData = req.body;

  try {
    // Save the books to the database
    await saveBooksToDB(booksData);
    res.json({ message: "Books saved to database successfully" });
  } catch (error) {
    console.error("Error saving books:", error);
    res.status(500).json({ error: "Failed to save books to database" });
  }
}
// Controller function to handle fetching all books from the database
async function getAllBooks(req, res) {
  try {
    // Fetch all books from the database
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Failed to fetch books from database" });
  }
}

module.exports = { saveBooks, getAllBooks };
