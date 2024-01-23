const mongoose = require("mongoose");

const ordersItemSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
});

const ordersSchema = new mongoose.Schema({
    items: {
        type: [ordersItemSchema],
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    date: { type: Date, default: Date.now },
});

const Orders = mongoose.model("Orders", ordersSchema);

module.exports = Orders;