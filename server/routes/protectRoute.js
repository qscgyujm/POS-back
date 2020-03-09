import express from 'express';
import cors from 'cors';

import generalRoute from './general';
import usersRouter from './users';
import productRouter from './product';
import authRoute from './auth';
import orderRoute from './order';

import authMiddleware from '../middleware/auth';

const router = express.Router();

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  exposedHeaders: ['Content-Type', 'Authorization', 'token'],
};

router.use('/general', cors(corsOptions), generalRoute);
router.use('/auth', cors(corsOptions), authRoute);
router.use('/user', cors(corsOptions), usersRouter);
router.use('/order', cors(corsOptions), authMiddleware, orderRoute);
router.use(
  '/product',
  cors(corsOptions),
  authMiddleware,
  productRouter,
);

export default router;
