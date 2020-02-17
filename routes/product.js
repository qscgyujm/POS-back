const express = require('express');

const productsController = require('../controllers/product');

const router = express.Router();

router.get('/:id', productsController.findProductById);
router.post('/create', productsController.createProduct);
router.put('/:id', productsController.updateProduct);
router.delete('/:id', productsController.deleteProductById);

module.exports = router;
