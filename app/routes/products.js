const controller = require('../controllers/products');
const router = require('express').Router();
const cacheNoStore = require('../middlewares/cacheNoStore')

router.get('/', cacheNoStore, controller.listProducts);
router.get('/:id', cacheNoStore, controller.getProduct);
router.post('/', cacheNoStore, controller.createProduct);


module.exports = router;