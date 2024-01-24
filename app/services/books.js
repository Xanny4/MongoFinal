const booksDB = require("../db/books")
const authorsDB = require("../db/authors");
module.exports = {

    createBooks: async (req, res) => {
        try {
            for (let i = 0; i < req.body.length; i++) {
                for (let j = 0; j < req.body[i].authors.length; j++) {
                    console.log(req.body[i].authors[j]);
                    const author = await authorsDB.findById(req.body[i].authors[j]);
                    if (!author)
                        throw new Error("Author not found");
                }
            }

            const books = await booksDB.createBooks(req.body);
            res.status(200).json({ books, message: "books created" });
        }
        catch (err) {
            res.status(500).send(err);
        }
    },

    deleteBook: async (req, res) => {
        try {
            const id = req.params.id;
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
            const genre = req.params.genre;
            const books = await booksDB.getBooksByGenre(genre, skip, pageSize);
            res.status(200).json(books);
        }
        catch (err) {
            res.status(500).send(err)
        }
    },

    getBooksByPublishingYear: async (req, res) => {
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

    getBooksByAuthorCountry: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 10;
            const skip = (page - 1) * pageSize;
            const country = req.params.country;
            const books = await booksDB.getBooksByAuthorCountry(country, skip, pageSize);
            res.status(200).json(books);
        }
        catch (err) {
            res.status(500).send(err)
        }
    },
}