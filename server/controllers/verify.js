import bcrypt from 'bcryptjs';
import sgMail from '@sendgrid/mail';
import { pick, isEmpty } from 'lodash';

import * as verificationModel from '../models/verification';
import * as userModel from '../models/user';

export async function sendCode(req, res) {
  const { email } = req.body;

  const verificationCode = Math.random().toString(36);

  if (!email.endsWith('@mailinator.com')) {
    return res.status(404);
  }

  const code = verificationCode.slice(verificationCode.length - 6);
  const replacements = ({
    email,
    code,
  });

  try {
    const userInfo = await userModel.findUserByEmail(email);

    if (userInfo.length > 1) {
      res.sendStatus(404);
    }

    const createCount = await verificationModel.createVerificationCode(replacements);

    if (createCount !== 1) {
      res.sendStatus(404);
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: email,
      from: 'POS@mail',
      subject: 'Verification Code',
      html: `<strong>Code: ${code}</strong>`,
    };

    const mailRes = await sgMail.send(msg);

    // console.log('mailRes', mailRes);

    if (
      createCount === 1
      && mailRes
    ) {
      res.status(200).send();
    }
  } catch (error) {
    res.sendStatus(404);
  }
}


export async function checkCode(req, res) {
  const replacements = pick(req.body, ['email', 'password', 'name', 'location', 'code']);

  const codeInfo = await verificationModel.getVerificationCode(replacements);

  if (isEmpty(codeInfo)) {
    return res.sendStatus(400);
  }

  const isCodeMatch = replacements.code === codeInfo[0].code;

  if (!isCodeMatch) {
    return res.sendStatus(401);
  }

  const user = await userModel.findUserByEmail(replacements.email);

  if (!isEmpty(user)) {
    return res.sendStatus(402);
  }

  const placement = pick(req.body, ['password']);

  const hashedPassword = bcrypt.hashSync(placement.password, 8);

  if (!await verificationModel.deleteCode(replacements)) {
    return res.sendStatus(403);
  }

  const createdStatus = await userModel.createUser({
    ...pick(req.body, ['email', 'name', 'location']),
    password: hashedPassword,
  });

  if (createdStatus) {
    return res.sendStatus(201);
  }

  return res.sendStatus(404);
}
