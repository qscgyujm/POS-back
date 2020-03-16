import express from 'express';

import generalRoute from './general';

import authMiddleware from '../middleware/auth';

import * as userController from '../controllers/users';
import * as orderController from '../controllers/order';
import * as userProductController from '../controllers/user-product';
import * as productsController from '../controllers/product';

const router = express.Router();

// general

router.use('/general', generalRoute);

// User
router.get('/user', authMiddleware, userController.findUser);
router.get('user/:id', authMiddleware, userController.findUserById);
router.put('/user/profile', authMiddleware, userController.updateUser);
router.post('/user/password', authMiddleware, userController.changePassword);

// product

router.get('/product/all', authMiddleware, productsController.findAllProduct);
router.post('/product/create', authMiddleware, productsController.createProduct);
router.put('/product/:id', authMiddleware, productsController.updateProduct);
router.delete('/product/:id', authMiddleware, productsController.deleteProduct);

// User-Product

router.get('/user/product', authMiddleware, userProductController.getUserProductInfo);
router.post('/user/product', authMiddleware, userProductController.addUserProductMiddleware, userProductController.getUserProductInfo);
router.delete('/user/product/:id', authMiddleware, userProductController.deleteProductMiddleware, userProductController.getUserProductInfo);

// Order

router.get('/order', authMiddleware, orderController.fetchOrderByUserId);
router.post('/order/create', authMiddleware, orderController.createOrder);
router.put('/order/submit/:id', authMiddleware, orderController.updateOrderSubmit);
router.delete('/order/:id', authMiddleware, orderController.deleteOrder);

export default router;
