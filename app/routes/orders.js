const router = require('express').Router();
const ordersService = require("../services/orders");

router.post('/createOrder', ordersService.createOrder);
router.get('/getMaxTotalOrder', ordersService.getMaxTotalOrder);
router.get('/getTopThreeGenre', ordersService.getTopThreeGenre);
router.get('/getSumBetweenDates', ordersService.getSumBetweenDates);
router.get('/getTopAuthors', ordersService.getTopAuthors);

module.exports = router;