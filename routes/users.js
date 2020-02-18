import express from 'express';

import * as userController from '../controllers/users';

const router = express.Router();


/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/:id', userController.findUserById);
router.post('/post', userController.createUser);
router.put('/:id', userController.updateUser);

export default router;
