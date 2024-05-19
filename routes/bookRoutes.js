const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const multer = require("multer");
const path = require("path");
const Book = require("../models/Books");
const cloudinary = require("cloudinary").v2;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },

  filename: (req, files, cb) => {
    cb(null, files.originalname);
  },
});

const imageFileFilter = (req, files, cb) => {
  if (!files.originalname.match(/\.(jpg|jpeg|png|gif|pdf)$/)) {
    return cb(new Error("You can upload only image files or a PDF!"), false);
  }
  cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFileFilter });

router.post("/books", bookController.uploadBook);
router.get("/authorName",bookController.authorName)
router.get("/type",bookController.booktype)
router.get("/year",bookController.publishddate)
router.get("/genre",bookController.samegenre)

router.post("/summary/:bookId", bookController.booksummary);

// Route to upload a book with file
router.post(
  "/uploadBook",
  upload.fields([{ name: "file" }, { name: "cuverimage" }]),
  async (req, res) => {
    try {
      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_KEY,
        api_secret: process.env.CLOUD_KEY_SECRET,
      });
      // Extract form data from the request
      const { title, author, description, genre, year } = req.body;

      console.log(req.body);

      // Get the paths of the uploaded files
      const pdfPath = path.join(req.files["file"][0].path); // Use "path" property
      const coverImagePath = path.join(req.files["cuverimage"][0].path);

      // Upload files to Cloudinary
      const pdfURL = await cloudinary.uploader.upload(pdfPath);
      const coverImageURL = await cloudinary.uploader.upload(coverImagePath);

      // Create a new Book document with form data and file URLs
      const newBook = new Book({
        title: title, // Ensure that this field is correctly populated
        author: author,
        description: description,
        genre: genre,
        year: year,
        pdf: pdfURL.secure_url,
        cuverImage: coverImageURL.secure_url,
      });

      console.log(pdfURL);

      // Save the book to MongoDB
      await newBook.save();

      res
        .status(200)
        .json({ success: true, msg: "Book uploaded successfully" });
    } catch (error) {
      console.error("Error uploading book:", error);
      res.status(500).json({
        success: false,
        msg: "Error uploading book. Please try again later.",
      });
    }
  }
);

router.get("/allBooks", bookController.getAllBooks);

router.post("/books", bookController.uploadBook);

router.post("/summary/:bookId", bookController.booksummary);

// Route to upload a book with file

// Route to get books based on user preferences
router.get("/:userId", bookController.getBooks);
// Route to update a book
router.put("/books/:id", bookController.updateBook);
router.delete("/books/:id", bookController.deleteBook);

router.post(
  "/uploadBook",
  bookController.upload.single("file"),
  bookController.uploadBooks
);

module.exports = router;
