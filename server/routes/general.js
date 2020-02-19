import express from 'express';
import fs from 'fs';
import AWS from 'aws-sdk';

import uploadFileMiddlerWare from '../middleware/uploadFile';

const router = express.Router();

router.get('/uploadFile', (req, res) => {
  res.send('FileUpload');
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
