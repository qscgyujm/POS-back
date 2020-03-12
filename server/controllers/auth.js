import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pick } from 'lodash';

import * as userModel from '../models/user';

export async function login(req, res) {
  const replacement = pick(req.body, ['email', 'password']);
  const { email, password } = replacement;

  try {
    const users = await userModel.findUserByEmail(email);

    if (users.length !== 1) {
      return res.sendStatus(401);
    }

    const userInfo = users[0];
    const isMatch = await bcrypt.compare(password, userInfo.password);

    if (!isMatch) {
      return res.sendStatus(404);
    }

    const token = await jwt.sign({
      userId: userInfo.id,
      email: userInfo.email,
    },
    process.env.APP_KEY,
    {
      expiresIn: '7d',
    });

    return res.status(200)
      .set('token', token)
      .json({
        status: 'success',
      });
  } catch (error) {
    return res.sendStatus(401);
  }
}

export const checkAuth = async (req, res) => {
  const token = req.get('Authorization');

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const isLogin = await jwt.verify(token, process.env.APP_KEY);

    res.status(200).send();
  } catch (error) {
    const { message } = error;

    if (message === 'jwt expired') {
      return res.sendStatus(403);
    }

    return res.sendStatus(401);
  }
};
