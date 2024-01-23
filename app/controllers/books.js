const { createBooks, deleteBook, getAllBooks, getAllBooksByGenre,
    getAllBooksByPublishingYear, getAllBooksByAuthorCountry } = require('../services/books')

module.exports = {
    createBooks: async (req, res) => {
        try {
            const books = req.body();
            const newBooks = await createBooks(books);
            res.json(newBooks);
        }
        catch (err) {
            res.status(500).send(err);
        }
    },

    deleteBook: async (req, res) => {
        try {
            const id = req.body;
            await deleteBook(id);
        }
        catch (err) {
            res.status(500).send(err)
        }
    },
    getAllBooks: async (req, res) => {
        try {
            const books = await getAllBooks()
            res.json(books)
        }
        catch (err) {
            res.status(500).send(err)
        }
    },
    getAllBooksByGenre: async (req, res) => {
        try {
            const books = await getAllBooksByGenre()
            res.json(books)
        }
        catch (err) {
            res.status(500).send(err)
        }
    },
    getAllBooksByPublishingYear: async (req, res) => {
        try {
            const books = await getAllBooksByPublishingYear()
            res.json(books)
        }
        catch (err) {
            res.status(500).send(err)
        }
    },
    getAllBooksByAuthorCountry: async (req, res) => {
        try {
            const books = await getAllBooksByAuthorCountry()
            res.json(books)
        }
        catch (err) {
            res.status(500).send(err)
        }
    },
}