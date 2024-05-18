const Book = require("../models/Books");

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
const genres = [  "Science Fiction",  "Fantasy",  "Mystery",  "Thriller", "Romance",  "Historical Fiction",  "Literary Fiction",  "Horror",  "Adventure",  "Dystopian",  "Magical Realism",
  "Contemporary Fiction",
  "Biography",
  "Autobiography",
  "Memoir",
  "Self-Help",
  "Health & Wellness",
  "History",
  "True Crime",
  "Travel",
  "Science",
  "Technology",
  "Business & Economics",
  "Philosophy",
  "Politics",
  "Religion & Spirituality",
  "Picture Books",
  "Middle Grade",
  "Young Adult Fantasy",
  "Young Adult Science Fiction",
  "Young Adult Romance",
  "Young Adult Mystery",
  "Nursery",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
  "University Student",
  "GC Student at University",
  "Poetry",
  "Graphic Novels & Comics",
  "Short Stories",
  "Essays",
  "Drama",
  "Cookbooks",
  "Art & Photography",
];
const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateBook = async (req, res) => {
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

module.exports = { uploadBook, getBooks, updateBook, deleteBook };
