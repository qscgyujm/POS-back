import express from 'express';
// import fs from 'fs';
// import AWS from 'aws-sdk';

// import uploadFileMiddlerWare from '../middleware/uploadFile';

import generalRoute from './general';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.use(generalRoute);

export default router;
