const express = require("express");
const router = express.Router();

const worksController = require("../controllers/workController");

router.post("/save-books", worksController.saveBooks);

// Route to fetch all books from the database
router.get("/all-books", worksController.getAllBooks);

module.exports = router;
