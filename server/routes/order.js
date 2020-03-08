import express from 'express';

import * as orderController from '../controllers/order';

const router = express.Router();

router.get('/', orderController.fetchOrderByUserId);
router.get('/:id', orderController.fetchOrderByOrderId);
router.post('/create', orderController.createOrder);
router.put('/submit/:id', orderController.updateOrderSubmit);

export default router;
