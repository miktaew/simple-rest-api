const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide the book title'],
    },
    description: {
        type: String,
        maxlength:1000,
    },
    release_date: {
        type: Date,
        required: [true, 'Please provide the release date'],
    },
    authors: [{
        type: String,
        required: [true, 'Please provide author(s)'],
    }],
    is_available: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model('Book', BookSchema);