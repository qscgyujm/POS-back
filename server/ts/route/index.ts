import express from 'express';
import cors from 'cors';

import testRoute from './test';

const router = express.Router();

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  exposedHeaders: ['Content-Type', 'Authorization', 'token'],
};

// router.use(cors(corsOptions));
router.use('/test', testRoute);

export default router;
