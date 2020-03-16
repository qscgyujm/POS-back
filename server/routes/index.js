import express from 'express';
import cors from 'cors';

import protectRoute from './protectRoute';

import testingRoute from './test';
import authRoute from './auth';
import adminRoute from './admin';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.send('POS API');
});

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  exposedHeaders: ['Content-Type', 'Authorization', 'token'],
};

router.use(cors(corsOptions));
router.use('/test', testingRoute);
router.use('/auth', authRoute);
router.use('/admin', adminRoute);
router.use(protectRoute);

export default router;
