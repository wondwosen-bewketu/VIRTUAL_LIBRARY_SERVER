const express = require('express');
const router = express.Router();
const bookClubController = require('../controllers/BookClubControler');

router.post('/', bookClubController.createBookClub);
router.get('/', bookClubController.getAllBookClubs);
router.post('/:id/members', bookClubController.addMemberToBookClub);
router.post('/books/:id', bookClubController.addBookToBookClub); // New route for adding books
router.get('/users/:userId', bookClubController.getUserBookClubs); // New route for getting user's book clubs


module.exports = router;
