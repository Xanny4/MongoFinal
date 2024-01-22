const { ObjectId } = require("mongodb");
const MongoDatabase = require("./db");

class AuthorsCollection {
    constructor() {
        this.authorsCollection = MongoDatabase.instance().db().collection("authors");
    }

    static instance() {
        if (!this._instance) {
            this._instance = new AuthorsCollection();
        }
        return this._instance;
    }

    static async findAll() {
        try {
            return await this.instance().authorsCollection.find({}).toArray();
        } catch (error) {
            console.error("Error in findAll:", error);
            throw error;
        }
    }

    static async findById(idStr) {
        try {
            return await this.instance().authorsCollection.findOne({ _id: new ObjectId(idStr) });
        } catch (error) {
            console.error("Error in findById:", error);
            throw error;
        }
    }

    static async create(author) {
        try {
            return await this.instance().authorsCollection.insertOne(author);
        } catch (error) {
            console.error("Error in create:", error);
            throw error;
        }
    }
}

module.exports = AuthorsCollection;
