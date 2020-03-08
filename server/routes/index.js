import express from 'express';

import protectRoute from './protectRoute';

import testingRoute from './test';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.send('POS API');
});

router.use('/test', testingRoute);
router.use(protectRoute);

export default router;
