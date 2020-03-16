import express from 'express';

import * as adminController from '../controllers/admin';
import * as userProductController from '../controllers/user-product';

const router = express.Router();

router.get('/product', adminController.product);

// router.get('/diff', userProductController.getHasDeleteUserProduct);
// router.get('/insert', adminController.createUserProduct);
// router.get('/insert/:id', adminController.addUserProduct);
// router.get('/delete/:id', adminController.deleteUserProduct);


export default router;
