const { updateAuthor, getAllBooks, createAuthor } = require('../services/authors')

module.exports = {
    updateAuthor: async (req, res) => {
        try {
            const { name, country } = req.body
            const updatedAuthor = await updateAuthor(name, country)
            res.json(updatedAuthor)
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
    createAuthor: async (req, res) => {
        try {
            const { name, country } = req.body
            const newAuthor = await createAuthor(name, country)
            res.json(newAuthor)
        }
        catch (err) {
            res.status(500).send(err)
        }
    }

}