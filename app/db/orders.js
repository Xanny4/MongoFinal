const Order = require("../models/orders")

module.exports = {
    createOrder: async (items, total) => {
        try {
            const newOrder = new Order({
                items: items,
                total: total
            });
            return await newOrder.save();
        }
        catch (error) {
            console.error(error);
            throw new Error("Error creating order", error);
        }

    },

    getMaxTotalOrder: async (dateStart, dateEnd) => {
        try {
            const maxOrder = await Order.aggregate([
                {
                    $match: {
                        date: {
                            $gte: new Date(dateStart),
                            $lte: new Date(dateEnd),
                        },
                    },
                },
                {
                    $sort: {
                        total: -1,
                    },
                },
                {
                    $limit: 1,
                },
            ]);
            return maxOrder[0];
        } catch (error) {
            console.error(error);
            throw new Error("Error finding order with max total", error);
        }
    },

    getTopThreeGenre: async (dateStart, dateEnd) => {
        try {
            return await Order.aggregate([
                {
                    $match: {
                        date: {
                            $gte: new Date(dateStart),
                            $lte: new Date(dateEnd),
                        },
                    },
                },
                {
                    $unwind: "$items"
                },
                {
                    $lookup: {
                        from: "books",
                        localField: "items.book",
                        foreignField: "_id",
                        as: "book",
                    },
                },
                {
                    $unwind: "$book",
                },
                {
                    $unwind: "$book.genres",
                },
                {
                    $group: {
                        _id: "$book.genres",
                        total: {
                            $sum: 1,
                        },
                    },
                },
                {
                    $sort: {
                        total: -1,
                    },
                },
                {
                    $limit: 3,
                }
            ]);
        }
        catch {
            console.error(error);
            throw new Error("Error finding top three genres", error);
        }
    },

    getSumBetweenDates: async (dateStart, dateEnd) => {
        try {
            const sum = await Order.aggregate([
                {
                    $match: {
                        date: {
                            $gte: new Date(dateStart),
                            $lte: new Date(dateEnd),
                        },
                    },
                },
                {
                    $group: {
                        _id: null,
                        total: {
                            $sum: "$total",
                        },
                    },
                },
            ]);

            return sum[0];
        }
        catch {
            console.error(error);
            throw new Error("Error finding sum between dates", error);
        }
    },

    getTopAuthors: async (startDate, endDate) => {
        return await Order.aggregate([
            {
                $match: {
                    date: {
                        $gte: new Date(startDate),
                        $lt: new Date(endDate),
                    },
                },
            },
            {
                $unwind: "$items",
            },
            {
                $group: {
                    _id: "$items.book",
                    totalAmount: {
                        $sum: "$items.amount",
                    },
                },
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookDetails",
                },
            },
            {
                $unwind: "$bookDetails",
            },
            {
                $unwind: "$bookDetails.authors",
            },
            {
                $group: {
                    _id: "$bookDetails.authors",
                    amountAuthor: {
                        $sum: "$totalAmount",
                    },
                },
            },
            {
                $lookup: {
                    from: "authors",
                    localField: "_id",
                    foreignField: "_id",
                    as: "author",
                },
            },
            {
                $unwind: "$author",
            },
            {
                $sort: {
                    amountAuthor: -1,
                },
            },
            {
                $limit: 5,
            },
        ]);
    }
}