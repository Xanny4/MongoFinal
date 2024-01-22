const ProductsCollection = require("../DAL/products.js");

module.exports = {
    getAllProducts: async () => {
        const allProducts = await ProductsCollection.findAll();
        return allProducts.map(p => ({
            id: p._id,
            name: p.name
        }));
    },
    getProduct: async (strId) => {
        const product = await ProductsCollection.findById(strId);
        const { name } = product;
        return {
            name
        };

    },
    createProduct: async (name) => {
        const a = await ProductsCollection.create({ name, createdAt: Date.now() });
        return a;
    }
}