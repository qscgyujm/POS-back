import express from 'express';

import * as verifyController from '../controllers/verify';
import * as userController from '../controllers/users';
import * as authController from '../controllers/auth';

import authMiddleware from '../middleware/auth';

const router = express.Router();


router.post('/sendCode', verifyController.sendCode);
router.post('/checkCode', verifyController.checkCode);

router.post('/login', authController.login);
router.post('/post', userController.createUser);

router.post('/checkAuth', authMiddleware, authController.checkAuth);

// async (req, res) => {
//   const { email } = req.body;

//   const verificationCode = Math.random().toString(36);

//   if (!email.endsWith('@mailinator.com')) {
//     return res.status(404);
//   }

//   const code = verificationCode.slice(verificationCode.length - 6);
//   const replacements = ({
//     email,
//     code,
//   });

//   try {
//     const createCount = await verificationModel.createVerificationCode(replacements);

//     if (createCount !== 1) {
//       res.sendStatus(404);
//     }

//     sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//     const msg = {
//       to: email,
//       from: 'POS@mail',
//       subject: 'Verification Code',
//       // text: `code: ${code}`,
//       html: `<strong>Code: ${code}</strong>`,
//     };

//     const mailRes = await sgMail.send(msg);

//     // console.log('mailRes', mailRes);

//     if (
//       createCount === 1
//       && mailRes
//     ) {
//       res.status(200).send();
//     }
//   } catch (error) {
//     res.sendStatus(404);
//   }
// }

export default router;
