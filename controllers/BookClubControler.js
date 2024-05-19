const BookClub = require('../models/BookClub');
const User = require('../models/user.model');
const Book = require("../models/Books");

exports.createBookClub = async (req, res) => {
  const { name, description } = req.body;

  const bookClub = new BookClub({
    name,
    description,
  });

  try {
    const savedBookClub = await bookClub.save();
    res.status(201).json(savedBookClub);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create book club' });
  }
};

exports.getAllBookClubs = async (req, res) => {
  try {
    const bookClubs = await BookClub.find().populate('members').populate('books');
    res.json(bookClubs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch book clubs' });
  }
};

exports.getsinglBook = async (req, res) => {
  try {
    const bookId=req.params.bookId
    const bookClubs = await BookClub.findById(bookId)
    res.json(bookClubs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch book clubs' });
  }
};

exports.addBookToBookClub = async (req, res) => {
    const { id } = req.params;
    const { bookId } = req.body;
  
    try {
      const bookClub = await BookClub.findById(id);
      if (!bookClub) {
        return res.status(404).json({ error: 'Book club not found' });
      }
  
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
  
      if (!bookClub.books.includes(bookId)) {
        bookClub.books.push(bookId);
        await bookClub.save();
      }
  
      res.json(bookClub);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add book to book club' });
    }
  };

exports.addMemberToBookClub = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const bookClub = await BookClub.findById(id);
    if (!bookClub) {
      return res.status(404).json({ error: 'Book club not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!bookClub.members.includes(userId)) {
      bookClub.members.push(userId);
      await bookClub.save();
    }

    res.json(bookClub);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add member to book club' });
  }
};

exports.getUserBookClubs = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const bookClubs = await BookClub.find({ members: userId }).populate('members').populate('books');
      res.json(bookClubs);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch book clubs for user' });
    }
  };