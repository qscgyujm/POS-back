import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pick, isEqual } from 'lodash';

import * as userModel from '../models/user';

export async function findUserById(req, res) {
  const userId = pick(req.params, ['id']).id;

  const user = pick(await userModel.findUser(userId), ['email', 'name', 'location']);
  res.json(
    user,
  );
}

export async function updateUser(req, res) {
  const userId = pick(req.params, ['id']).id;

  const user = await userModel.findUser(userId);
  const inputSetting = pick(req.body, ['name', 'location']);

  const newUserPlacement = {
    ...pick(user, ['name', 'location']),
    ...inputSetting,
  };

  await userModel.updateUser(userId, newUserPlacement);
}

export async function createUser(req, res) {
  const placement = pick(req.body, ['password', 'confirmedPassword']);

  if (!isEqual(placement.password, placement.confirmedPassword)) {
    res.sendStatus(400);
  }

  const hashedPassword = bcrypt.hashSync(placement.password, 8);

  const createdStatus = await userModel.createUser({
    ...pick(req.body, ['email', 'name']),
    password: hashedPassword,
  });

  if (createdStatus) {
    res.sendStatus(201);
  }
}

export async function login(req, res) {
  const placement = pick(req.body, ['email', 'password']);

  const userInfo = pick(
    await userModel.findUserByEmail(placement.email),
    ['password'],
  );

  const isMatch = await bcrypt.compare(placement.password, userInfo.password);

  if (!isMatch) {
    res.sendStatus(404);
  }

  const token = await jwt.sign({
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
