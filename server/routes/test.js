import express from 'express';
import sgMail from '@sendgrid/mail';
import AWS from 'aws-sdk';
import fs from 'fs';

import uploadFileMiddlerWare from '../middleware/uploadFile';

import * as productModel from '../models/product';
import * as userModel from '../models/user';

const router = express.Router();

// use https://www.mailinator.com/ testing email

router.get('/product', async (req, res, next) => {
  const products = await productModel.getAllProduct();

  res.status(200).json(products);
});


router.get('/user', async (req, res, next) => {
  const user = await userModel.findUser(3);

  res.status(200).json(user);
});


router.post('/email', async (req, res, next) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: 'froggy@mailinator.com',
    from: 'test@example.com',
    subject: 'Sending with Twilio SendGrid is Fun',
    // text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };

  try {
    const resEmail = await sgMail.send(msg);
    console.log(resEmail);

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

// aws sns
router.post('/snsAWS', async (req, res, next) => {
  const params = {
    Message: 'Send Message',
    PhoneNumber: process.env.TEST_PHONE,
  };

  try {
    const sns = new AWS.SNS();
    const data = await sns.publish(params).send();

    console.log(data);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(404);
  }
});

router.post('/uploadFile',
  uploadFileMiddlerWare,
  (req, res) => {
    if (!req.file) {
      res.sendStatus(404);
    }

    res
      .status(200)
      .json({
        ...req.file,
      });
  });

router.post('/uploadFileS3',
  uploadFileMiddlerWare,
  (req, res) => {
    if (!req.file) {
      res.sendStatus(404);
    }

    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: req.file.filename,
      Body: fs.createReadStream(req.file.path),
      ACL: 'public-read',
      ContentType: req.file.mimetype,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.log('Error occured while trying to upload to S3 bucket', err);
      }

      if (data) {
        fs.unlinkSync(req.file.path); // Empty temp folder

        res
          .status(200)
          .json({
            file: data,
          });
      }
    });
  });

export default router;
