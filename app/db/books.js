const Books = require("../models/books")

module.exports = {
    createBooks: async (booksData) => {
        try {
            const books = await Books.create(booksData);
            return books;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error creating books", error);
        }
    },
    getBooksByAuthor: async (authorId) => {
        try {
            return await Books.find({ authors: authorId });
        }
        catch (error) {
            console.log(error);
            throw new Error("Error finding a book by its author", error);
        }
    },
    deleteBook: async (bookId) => {
        try {
            await Books.findByIdAndDelete(bookId);
        }
        catch (error) {
            console.log(error);
            throw new Error("Error deleting a book", error);
        }
    },
    getBooks: async (skip, pageSize) => {
        try {
            return await Books.find().skip(skip).limit(pageSize);
        }
        catch (error) {
            console.log(error);
            throw new Error("Error finding books", error);
        }
    },
    getBooksByGenre: async (genre, skip, pageSize) => {
        try {
            return await Books.find({ genres: { $in: [genre] } }).skip(skip).limit(pageSize);
        }
        catch (error) {
            console.log(error);
            throw new Error("Error finding books by genre", error);
        }
    },
    getBooksByPublishingYear: async (yearStart, yearEnd, skip, pageSize) => {
        try {
            return await Books.find({ publishingYear: { $gte: yearStart, $lte: yearEnd } }).skip(skip).limit(pageSize);
        }
        catch (error) {
            console.log(error);
            throw new Error("Error finding books by years", error);
        }
    },
    getBooksByAuthorCountry: async (country, skip, pageSize) => {
        try {
            return await Books.aggregate([
                {
                    $lookup: {
                        from: "authors",
                        localField: "authors",
                        foreignField: "_id",
                        as: "authors",
                    },
                },
                {
                    $match: {
                        "authors.country": country,
                    },
                },

                { $skip: skip },
                { $limit: pageSize },
            ]);
        }
        catch (error) {
            console.log(error);
            throw new Error("Error finding books by country", error);
        }
    },
    checkBookInSupply: async (bookId, amount) => {
        try {
            const book = await Books.findById(bookId);
            return book.quantity >= amount;
        } catch (err) {
            console.log(err);
            throw new Error("Internal Server Error", err);
        }
    },
    getBookPrice: async (bookId) => {
        try {
            const book = await Books.findById(bookId);
            return book.price;
        } catch (err) {
            console.log(err);
            throw new Error("Internal Server Error", err);
        }
    },
    decreaseBookQuantity: async (bookId, amount) => {
        try {
            await Books.findByIdAndUpdate(
                bookId,
                { $inc: { quantity: -amount } },
            );
        } catch (err) {
            console.log(err);
            throw new Error("Internal Server Error", err);
        }
    },
}