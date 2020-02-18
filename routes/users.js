import express from 'express';

import * as userController from '../controllers/users';
import authRoute from './auth';

import authMiddleware from '../middleware/auth';

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.use(authRoute);

router.use(authMiddleware);
router.get('/:id', userController.findUserById);
router.put('/:id', userController.updateUser);

export default router;
