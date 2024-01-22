const { ObjectId } = require("mongodb");
const MongoDatabase = require("./db");

class BooksCollection {
    constructor() {
        this.booksCollection = MongoDatabase.instance().db().collection("books");
    }

    static instance() {
        if (!this._instance) {
            this._instance = new BooksCollection();
        }
        return this._instance;
    }

    static async findAll() {
        try {
            return await this.instance().booksCollection.find({}).toArray();
        } catch (error) {
            console.error("Error in findAll:", error);
            throw error;
        }
    }

    static async findById(idStr) {
        try {
            return await this.instance().booksCollection.findOne({ _id: new ObjectId(idStr) });
        } catch (error) {
            console.error("Error in findById:", error);
            throw error;
        }
    }

    static async create(book) {
        try {
            return await this.instance().booksCollection.insertOne(book);
        } catch (error) {
            console.error("Error in create:", error);
            throw error;
        }
    }
}

module.exports = BooksCollection;
