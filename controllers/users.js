const { pick } = require('lodash');

const userModel = require('../models/user');

const findUserById = async (req, res) => {
  const userId = pick(req.params, ['id']).id;

  const user = pick(await userModel.findUser(userId), ['email', 'name', 'location']);
  res.json(
    user,
  );
};

const updateUser = async (req, res, next) => {
  const userId = pick(req.params, ['id']).id;

  const user = await userModel.findUser(userId);
  const inputSetting = pick(req.body, ['name', 'location']);

  const newUserPlacement = {
    ...pick(user, ['name', 'location']),
    ...inputSetting,
  };

  await userModel.updateUser(userId, newUserPlacement);
};

const createUser = async (req, res, next) => {
  const placement = pick(req.body, ['email', 'password', 'name']);

  await userModel.createUser(placement);
};

module.exports = {
  findUserById,
  createUser,
  updateUser,
};
