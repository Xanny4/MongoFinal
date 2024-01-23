const { authorsDB, booksDB } = require('../db/authors')

module.exports = {
    createAuthor: async (req, res) => {
        try {
            const author = req.body;
            await authorsDB.createAuthor(author);
            res.status(200).json({ message: "author created" });
        }
        catch (err) {
            res.status(500).send(err)
        }
    },
    updateAuthor: async (req, res) => {
        try {
            const id = req.params;
            const author = req.body;
            await authorsDB.updateAuthor(author, id);
            res.status(200).json({ message: "author updated" });
        }
        catch (err) {
            res.status(500).send(err)
        }
    },
    getAllBooks: async (req, res) => {
        try {
            const id = req.params;
            const author = authorsDB.findById(id);
            if (!author)
                throw new Error("Author not found");
            const books = await booksDB.getBooksByAuthor(id);
            res.status(200).json(books);
        }
        catch (err) {
            res.status(500).send(err)
        }
    },


}