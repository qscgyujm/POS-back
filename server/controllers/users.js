import bcrypt from 'bcryptjs';
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

  try {
    const user = await userModel.findUser(userId);
    const inputSetting = pick(req.body, ['name', 'location']);

    const replacements = {
      ...pick(user, ['name', 'location']),
      ...inputSetting,
    };

    const updatedCount = await userModel.updateUser(userId, replacements);

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
  } catch (error) {
    res.sendStatus(401);
  }
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

  if (!isEqual(placement.newPassword, placement.confirmPassword)) {
    return res.sendStatus(401);
  }

  try {
    const userInfo = pick(
      await userModel.findUser(userId),
      ['password'],
    );

    const isMatch = await bcrypt.compare(placement.password, userInfo.password);

    if (!isMatch) {
      return res.sendStatus(400);
    }

    res.sendStatus(201).send();
  } catch (error) {
    res.sendStatus(401).send();
  }
}
