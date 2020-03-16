import express from 'express';
import sgMail from '@sendgrid/mail';
import AWS from 'aws-sdk';
import fs from 'fs';
import { pick } from 'lodash';


import uploadFileMiddlerWare from '../middleware/uploadFile';

import * as productModel from '../models/product';
import * as userModel from '../models/user';

const router = express.Router();

router.get('/product', async (req, res) => {
  try {
    const products = await productModel.findAll();
    return res.status(200).json(products);
  } catch (error) {
    return res.sendStatus(401);
  }
});

router.get('/user/:id', async (req, res) => {
  const { id } = pick(req.params, ['id']);
  try {
    const user = await userModel.findUser(id);

    if (!user) {
      return res.sendStatus(401);
    }
    return res.status(200).send(user);
  } catch (error) {
    return res.sendStatus(401);
  }
});


router.get('/files', async (req, res) => {
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  const params = {
    Bucket: 'project-side',
  };

  s3.listObjectsV2(params, (err, data) => {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data.Contents); // successful response
  });
});

// aws sns - not Free
// router.post('/snsAWS', async (req, res, next) => {
//   const params = {
//     Message: 'Send Message',
//     PhoneNumber: process.env.TEST_PHONE,
//   };

//   try {
//     const sns = new AWS.SNS();
//     const data = await sns.publish(params).send();

//     console.log(data);
//     res.sendStatus(200);
//   } catch (error) {
//     res.sendStatus(404);
//   }
// });

export default router;
