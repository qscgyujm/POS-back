import express from 'express';

import generalRoute from './general';
import usersRouter from './users';
import productRouter from './product';
import orderRoute from './order';

import authMiddleware from '../middleware/auth';

const router = express.Router();

router.use('/general', generalRoute);
router.use('/user', authMiddleware, usersRouter);
router.use('/order', authMiddleware, orderRoute);
router.use('/product', authMiddleware, productRouter);

export default router;
