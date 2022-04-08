const Book = require('../models/Book');
const {NotFoundError} = require('../errors');

const getAllBooks = async(req, res) => {
    const {available, title, releasedBefore, releasedAfter, author, sort, order} = req.query;
    const booksQuery = {};

    if(available) {
        booksQuery.is_available = available === 'true' ? true: false;
    }

    if(title) {
        booksQuery.title = {$regex: title, $options: "i"};
    }

    if(releasedBefore) {
        booksQuery.release_date = {$lt: new Date(releasedBefore)};
    }

    if(releasedAfter) {
        if(booksQuery.release_date) {
            booksQuery.release_date["$gt"] = new Date(releasedAfter);
        } else {
            booksQuery.release_date = {$gt: new Date(releasedAfter)};
        }
        
    }

    if(author) {
        booksQuery.authors = {$elemMatch: {$regex: author, $options: "i"}};
        console.log(author);
    }

    let query = Book.find(booksQuery);

    const orderMap = {"asc": 1, "desc": -1}; 

    if(!sort || sort === "release_date"){
        query = query.sort({"release_date": orderMap[order] || -1});
    } else if(sort === "author" || sort === "authors"){
        query = query.sort({"authors": orderMap[order] || 1});
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 25;
    const skip = (page - 1) * limit;

    const bookCount = await Book.countDocuments({});
    const books = await query.skip(skip).limit(limit);
    res.status(200).json({returnedBooks: books.length, totalBooksInSystem: bookCount, books});
}

const getBook = async (req, res) => {
    const book = await Book.findById(req.params.bookId);
    if(!book) {
        throw new NotFoundError(`No book with id ${req.params.bookId}`);
    }

    res.status(200).json({book});
}

const addBook = async (req, res) => {
    const book = await Book.create({...req.body.book});
    res.status(201).json({book});
}

const updateBook = async (req, res) => {
    const book = await Book.findById({_id: req.params.bookId});
    if(!book) {
        throw new NotFoundError(`No book with id ${req.params.bookId}`);
    }

    const {title, description, authors, release_date, is_available} = req.body.book;

    if(title) {
        book.title = title;
    }
    if(description) {
        book.description = description;
    }
    if(authors) {
        book.authors = authors;
    }
    if(release_date) {
        book.release_date = release_date;
    }
    if(is_available != null) {
        book.is_available = is_available;
    }

    await book.save();
    res.status(200).json({book});
}

const removeBook = async (req, res) => {
    const book = await Book.findByIdAndDelete({_id: req.params.bookId});
    if(!book) {
        throw new NotFoundError(`No book with id ${req.params.bookId}`);
    }
    
    res.status(200).json({book});
}

module.exports = {
    getAllBooks,
    getBook,
    addBook,
    updateBook,
    removeBook,
};