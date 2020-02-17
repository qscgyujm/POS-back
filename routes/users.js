const express = require('express');

const router = express.Router();

const userController = require('../controllers/users');

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});


router.get('/:id', userController.findUserById);
router.post('/post', userController.createUser);
router.put('/:id', userController.updateUser);

module.exports = router;
