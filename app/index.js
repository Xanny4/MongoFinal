const bodyParser = require("body-parser");
const express = require('express');
const productsRouter = require("./routes/products");


const app = express();
app.use(bodyParser.json());
app.use('/api/products', productsRouter);

module.exports = app;


