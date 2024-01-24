const ordersDB = require("../db/orders");
const booksDB = require("../db/books");

module.exports = {
    createOrder: async (req, res) => {
        try {
            const { items } = req.body;
            let total = 0;

            for (const item of items) {
                if (!(await booksDB.checkBookInSupply(item.book, item.amount))) {
                    return res.status(400).send("Not enough books in supply");
                }
                total += (await booksDB.getBookPrice(item.book)) * item.amount;
            }

            const order = await ordersDB.createOrder(items, total);

            for (const item of items) {
                await booksDB.decreaseBookQuantity(item.book, item.amount);
            }

            res.status(200).json({ message: "Order created", total, order });
        }
        catch (err) {
            res.status(500).send(err);
        }

    },

    getMaxTotalOrder: async (req, res) => {
        try {
            console.log(req.query);
            const { dateStart, dateEnd } = req.query;
            const maxOrder = await ordersDB.getMaxTotalOrder(dateStart, dateEnd);

            if (maxOrder)
                res.status(200).json({ maxOrder });
            else
                res.status(404).send("No orders found within the specified date range");
        }
        catch (err) {
            res.status(500).send(err);
        }
    },

    getTopThreeGenre: async (req, res) => {
        try {
            const { dateStart, dateEnd } = req.query;
            const genres = await ordersDB.getTopThreeGenre(dateStart, dateEnd);

            if (genres)
                res.status(200).json({ genres });
            else
                res.status(404).send("No orders found within the specified date range");
        }
        catch (err) {
            res.status(500).send(err);
        }
    },

    getSumBetweenDates: async (req, res) => {
        try {
            const { dateStart, dateEnd } = req.query;
            const sum = await ordersDB.getSumBetweenDates(dateStart, dateEnd);

            if (sum)
                res.status(200).json({ sum });
            else
                res.status(404).send("No orders found within the specified date range");
        }
        catch (err) {
            res.status(500).send(err);
        }
    },
    getTopAuthors: async (req, res) => {
        try {
            const { dateStart, dateEnd } = req.query;
            const authors = await ordersDB.getTopAuthors(dateStart, dateEnd);

            if (authors)
                res.status(200).json({ authors });
            else
                res.status(404).send("No orders found within the specified date range");
        }
        catch (err) {
            res.status(500).send(err);
        }
    }
};