import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pick } from 'lodash';

import * as userModel from '../models/user';

export async function login(req, res) {
  const placement = pick(req.body, ['email', 'password']);

  const userInfoList = await userModel.findUserByEmail(placement.email);
  const userInfo = userInfoList[0];

  const isMatch = await bcrypt.compare(placement.password, userInfo.password);

  if (!isMatch) {
    res.sendStatus(404);
  }

  const token = await jwt.sign({
    userId: userInfo.id,
    email: userInfo.email,
  },
  process.env.APP_KEY,
  {
    expiresIn: '7d',
  });

  res.status(200)
    .set('token', token)
    .json({
      status: 'success',
    });
}

export const checkAuth = async (req, res) => {
  console.log('check');
  const { userId } = req;

  try {
    const userInfo = pick(await userModel.findUser(userId), ['id', 'email']);

    const token = await jwt.sign({
      userId: userInfo.id,
      email: userInfo.email,
    },
    process.env.APP_KEY,
    {
      expiresIn: '7d',
    });

    res.status(200)
      .set('token', token)
      .json({
        status: 'success',
      });
  } catch (error) {
    throw new Error(error);
  }
};
