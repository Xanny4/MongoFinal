const booksDB = require("../db/books")

module.exports = {
    createBooks: async (req, res) => {
        try {
            const books = req.body();
            await booksDB.createBooks(books);
            res.status(200).json({ message: "books created" });
        }
        catch (err) {
            res.status(500).send(err);
        }
    },

    deleteBook: async (req, res) => {
        try {
            const id = req.params;
            await booksDB.deleteBook(id);
            res.status(200).json({ message: "book deleted" });
        }
        catch (err) {
            res.status(500).send(err)
        }
    },

    getBooks: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 10;
            const skip = (page - 1) * pageSize;

            const books = await booksDB.getBooks(skip, pageSize);
            res.status(200).json(books);
        }
        catch (err) {
            res.status(500).send(err)
        }
    },

    getBooksByGenre: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 10;
            const skip = (page - 1) * pageSize;
            const genre = req.params;
            const books = await booksDB.getBooksByGenre(genre, skip, pageSize);
            res.status(200).json(books);
        }
        catch (err) {
            res.status(500).send(err)
        }
    },

    getAllBooksByPublishingYear: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 10;
            const skip = (page - 1) * pageSize;
            const { yearStart, yearEnd } = req.params;
            const books = await booksDB.getBooksByPublishingYear(yearStart, yearEnd, skip, pageSize);
            res.status(200).json(books);
        }
        catch (err) {
            res.status(500).send(err)
        }
    },

    getAllBooksByAuthorCountry: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 10;
            const skip = (page - 1) * pageSize;
            const country = req.params;
            const books = await booksDB.getBooksByGenre(country, skip, pageSize);
            res.status(200).json(books);
        }
        catch (err) {
            res.status(500).send(err)
        }
    },
}