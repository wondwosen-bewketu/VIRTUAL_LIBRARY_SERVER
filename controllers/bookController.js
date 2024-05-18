const Book = require("../models/Books");
const User = require("../models/user.model");
const multer = require("multer");
const path = require("path");

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

const genres = [
  "Science Fiction", "Fantasy", "Mystery", "Thriller", "Romance", "Historical Fiction", 
  "Literary Fiction", "Horror", "Adventure", "Dystopian", "Magical Realism", 
  "Contemporary Fiction", "Biography", "Autobiography", "Memoir", "Self-Help", 
  "Health & Wellness", "History", "True Crime", "Travel", "Science", "Technology", 
  "Business & Economics", "Philosophy", "Politics", "Religion & Spirituality", 
  "Picture Books", "Middle Grade", "Young Adult Fantasy", "Young Adult Science Fiction", 
  "Young Adult Romance", "Young Adult Mystery", "Nursery", "Grade 1", "Grade 2", 
  "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9", 
  "Grade 10", "Grade 11", "Grade 12", "University Student", "GC Student at University", 
  "Poetry", "Graphic Novels & Comics", "Short Stories", "Essays", "Drama", "Cookbooks", 
  "Art & Photography"
];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Books'); // Save files in the 'Books' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the original file name
  }
});

const upload = multer({ storage: storage });

const uploadBook = async (req, res) => {
  try {
    const { title, author, description, year } = req.body;
    const book = new Book({
      title,
      author,
      description,
      year,
      // Add other fields here
    });
    await book.save();
    res.status(201).json({ message: "Book uploaded successfully", book });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const uploadBooks = async (req, res) => {
  try {
    const { title, author, description, year, genre, type } = req.body;
    const filePath = req.file ? req.file.path : null; // Get the file path from multer

    const book = new Book({
      title,
      author,
      description,
      year,
      genre,
      type,
      filePath
    });

    await book.save();
    res.status(201).json({ message: "Book uploaded successfully", book });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
};

const getBooks = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userPreferences = user.preference;
    console.log("User preferences: ", userPreferences);

    // Find books that match the user's preferences
    const books = await Book.find({ genre: { $in: userPreferences } });

    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateBook = async (req, res) => {
  console.log('updateBook');
  try {
    const { id } = req.params;
    const { title, author, description, year } = req.body;
    const book = await Book.findByIdAndUpdate(
      id,
      { title, author, description, year },
      { new: true }
    );
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json({ message: "Book updated successfully", book });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  uploadBook,
  uploadBooks,
  getBooks,
  getAllBooks,
  updateBook,
  deleteBook,
  upload
};
