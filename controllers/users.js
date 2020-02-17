import { pick } from 'lodash';

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
  const placement = pick(req.body, ['email', 'password', 'name']);

  await userModel.createUser(placement);
}
