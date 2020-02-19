import express from 'express';

import * as userController from '../controllers/users';

const router = express.Router();

router.post('/login', userController.login);
router.post('/post', userController.createUser);

export default router;
