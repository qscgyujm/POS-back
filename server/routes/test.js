import express from 'express';
import sgMail from '@sendgrid/mail';
import AWS from 'aws-sdk';

const router = express.Router();

// use https://www.mailinator.com/ testing email

router.post('/email', async (req, res, next) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: 'froggy@mailinator.com',
    from: 'test@example.com',
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };

  try {
    await sgMail.send(msg);

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

export default router;
