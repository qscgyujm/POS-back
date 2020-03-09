import express from 'express';

import * as verifyController from '../controllers/verify';
import * as authController from '../controllers/auth';

import authMiddleware from '../middleware/auth';

const router = express.Router();

router.post('/sendCode', verifyController.sendCode);
router.post('/checkCode', verifyController.checkCode);

router.post('/login', authController.login);
router.post('/checkAuth', authMiddleware, authController.checkAuth);

export default router;
