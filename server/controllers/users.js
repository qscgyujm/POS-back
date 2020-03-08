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

export async function findUser(req, res) {
  const { userId } = req;

  const user = await userModel.findUser(userId);
  const userInfo = pick(user, ['email', 'name', 'location']);

  res
    .status(200)
    .json({
      profile: userInfo,
    });
}

export async function updateUser(req, res) {
  const { userId } = req;

  const user = await userModel.findUser(userId);
  const inputSetting = pick(req.body, ['name', 'location']);

  const newUserPlacement = {
    ...pick(user, ['name', 'location']),
    ...inputSetting,
  };

  const updatedCount = await userModel.updateUser(userId, newUserPlacement);

  if (updatedCount !== 1) {
    res.status(404);
  }

  const newProfile = pick(
    await userModel.findUser(userId),
    ['email', 'name', 'location'],
  );

  res
    .status(200)
    .json({
      profile: newProfile,
    });
}

export async function createUser(req, res) {
  const placement = pick(req.body, ['password']);

  const hashedPassword = bcrypt.hashSync(placement.password, 8);

  const createdStatus = await userModel.createUser({
    ...pick(req.body, ['email', 'name', 'location']),
    password: hashedPassword,
  });

  if (createdStatus) {
    res.sendStatus(201);
  }
}

export async function changePassword(req, res) {
  const { userId } = req;

  const placement = pick(req.body, ['password', 'newPassword', 'confirmPassword']);

  if (!isEqual(placement.newPassword, placement.confirmedPassword)) {
    res.sendStatus(400);
  }

  const userInfo = pick(
    await userModel.findUser(userId),
    ['password'],
  );

  const isMatch = await bcrypt.compare(placement.password, userInfo.password);

  if (!isMatch) {
    res.sendStatus(400);
  }

  console.log('changePassword:', placement, userInfo, isMatch);
  res.sendStatus(201);
}
