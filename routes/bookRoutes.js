const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Route to upload a book without file
router.post('/books', bookController.uploadBook);

// Route to upload a book with file
router.post("/uploadBook", bookController.upload.single('file'), bookController.uploadBooks);

// Route to get books based on user preferences
router.get('/:userId', bookController.getBooks);

// Route to get all books
router.get('/allBooks', bookController.getAllBooks);

// Route to update a book
router.put('/books/:id', bookController.updateBook);

// Route to delete a book
router.delete('/books/:id', bookController.deleteBook);

module.exports = router;
