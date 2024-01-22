const { getAllProducts, getProduct, createProduct } = require('../services/products')

module.exports = {
    listProducts: async (req, res) => {
        try {
            const products = await getAllProducts()
            res.json(products)
        }
        catch (err) {
            res.status(500).send(err)
        }
    },
    getProduct: async (req, res) => {
        try {
            const id = req.params.id
            const product = await getProduct(id)
            res.json(product)
        }
        catch (err) {
            res.status(500).send(err)
        }
    },
    createProduct: async (req, res) => {
        try {
            const { name } = req.body
            const newProduct = await createProduct(name)
            res.json(newProduct)
        }
        catch (err) {
            res.status(500).send(err)
        }
    }

}