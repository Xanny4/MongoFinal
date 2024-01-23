const Author = require("../models/authors")

module.exports = {
    updateAuthor: async (authorData, id) => {
        try {
            const { name, country } = authorData;

            const updatedAuthor = await Author.findByIdAndUpdate(
                id,
                { name, country },
                { new: true }
            );

            if (!updatedAuthor) {
                throw new Error("Author not found");
            }

            return updatedAuthor;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error updating author", error);
        }
    },
    createAuthor: async (authorData) => {
        try {
            const author = new Author(authorData);

            const savedAuthor = await author.save();

            return savedAuthor;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error creating author", error);
        }
    },
    findById: (id) => {
        try {
            return Author.findById(id);
        } catch (err) {
            console.log(err);
            throw new Error("Internal Server Error", err);
        }
    }
};