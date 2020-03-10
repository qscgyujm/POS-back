import express from 'express';

import * as productsController from '../controllers/product';

const router = express.Router();

router.get('/all', productsController.findAllProduct);
router.post('/create', productsController.createProduct);
router.put('/:id', productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

export default router;
