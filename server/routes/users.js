import express from 'express';

import * as userController from '../controllers/users';

import authMiddleware from '../middleware/auth';

const router = express.Router();

router.use(authMiddleware);
router.get('/', userController.findUser);
router.get('/:id', userController.findUserById);
router.put('/profile', userController.updateUser);
router.post('/password', userController.changePassword);

export default router;
