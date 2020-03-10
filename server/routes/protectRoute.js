import express from 'express';

import generalRoute from './general';
import usersRouter from './users';
import productRouter from './product';
import orderRoute from './order';

import authMiddleware from '../middleware/auth';

const router = express.Router();

router.use('/general', generalRoute);
router.use('/user', authMiddleware, usersRouter);
router.use('/product', authMiddleware, productRouter);
router.use('/order', authMiddleware, orderRoute);

export default router;
