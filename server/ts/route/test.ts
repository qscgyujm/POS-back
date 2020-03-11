import express from 'express';

import { findProductById } from '../controller/test';

const router = express.Router();

router.use('/product/:id', findProductById);

export default router;
