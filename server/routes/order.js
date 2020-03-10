import express from 'express';

import * as orderController from '../controllers/order';

const router = express.Router();

router.get('/', orderController.fetchOrderByUserId);
router.post('/create', orderController.createOrder);
router.put('/submit/:id', orderController.updateOrderSubmit);
router.delete('/:id', orderController.deleteOrder);

export default router;
