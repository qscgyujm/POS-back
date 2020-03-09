import express from 'express';

import * as userController from '../controllers/users';

const router = express.Router();

router.get('/', userController.findUser);
router.get('/:id', userController.findUserById);
router.put('/profile', userController.updateUser);
router.post('/password', userController.changePassword);

export default router;
