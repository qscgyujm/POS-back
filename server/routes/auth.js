import express from 'express';
import multer from 'multer';

import * as verifyController from '../controllers/verify';
import * as authController from '../controllers/auth';
import * as userController from '../controllers/users';

const router = express.Router();


router.post('/sendCode', verifyController.sendCode);
router.post('/checkCode', verifyController.checkCode, userController.createUser);

router.post('/login', multer().array(), authController.login);
router.post('/check', authController.checkAuth);

export default router;
