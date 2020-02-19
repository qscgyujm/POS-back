import express from 'express';

import * as productsController from '../controllers/product';

const router = express.Router();

router.get('/:id', productsController.findProductById);
router.post('/create', productsController.createProduct);
router.put('/:id', productsController.updateProduct);
router.delete('/:id', productsController.deleteProductById);

export default router;
