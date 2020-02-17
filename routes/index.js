const express = require('express');
const fs = require('fs');
const AWS = require('aws-sdk');


const uploadFileMiddlerWare = require('../middleware/uploadFile');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/uploadFile',
  uploadFileMiddlerWare,
  (req, res, next) => {
    if (!req.file) {
      res.sendStatus(400);
    }

    console.log(req.file);
  });

router.post('/uploadFileS3',
  uploadFileMiddlerWare,
  (req, res, next) => {
    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    console.log(req.file);

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
        console.log(data);
      }
    });
  });


module.exports = router;
