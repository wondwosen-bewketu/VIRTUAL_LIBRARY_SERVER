const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

router.post('/books', bookController.uploadBook);
router.get('/:userId', bookController.getBooks);
router.put('/books/:id', bookController.updateBook);
router.delete('/books/:id', bookController.deleteBook);
router.get("allBooks", bookController.getAllBooks)
router.post("/uploadBook", bookController.upload.single('file'), bookController.uploadBooks);


module.exports = router;
