import express from 'express';

import generalRoute from './general';
import usersRouter from './users';
import productRouter from './product';
import testingRoute from './test';

import authMiddleware from '../middleware/auth';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.use(generalRoute);
router.use('/test', testingRoute);

router.use('/users', usersRouter);
router.use('/product', authMiddleware, productRouter);

export default router;
