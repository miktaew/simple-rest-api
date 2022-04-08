const express = require('express');
const router = express.Router();
const {getBook, getAllBooks, addBook, updateBook, removeBook} = require('../controllers/books');
const authenticationMiddleware = require('../middleware/authentication');

router.route('/').post(authenticationMiddleware, addBook).get(getAllBooks);
router.route('/:bookId').get(getBook).patch(authenticationMiddleware, updateBook).delete(authenticationMiddleware, removeBook);

module.exports = router;
