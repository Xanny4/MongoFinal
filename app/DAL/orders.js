const { ObjectId } = require("mongodb");
const MongoDatabase = require("./db");

class OrdersCollection {
    constructor() {
        this.ordersCollection = MongoDatabase.instance().db().collection("orders");
    }

    static instance() {
        if (!this._instance) {
            this._instance = new OrdersCollection();
        }
        return this._instance;
    }

    static async findAll() {
        try {
            return await this.instance().ordersCollection.find({}).toArray();
        } catch (error) {
            console.error("Error in findAll:", error);
            throw error;
        }
    }

    static async findById(idStr) {
        try {
            return await this.instance().ordersCollection.findOne({ _id: new ObjectId(idStr) });
        } catch (error) {
            console.error("Error in findById:", error);
            throw error;
        }
    }

    static async create(order) {
        try {
            return await this.instance().ordersCollection.insertOne(order);
        } catch (error) {
            console.error("Error in create:", error);
            throw error;
        }
    }
}

module.exports = OrdersCollection;
