/* eslint no-useless-catch: "off" */
const { QueryTypes } = require('sequelize');

const appDB = require('../db/index');

exports.findUser = async (userId) => {
  try {
    const sql = 'SELECT * from users WHERE id = :id';

    const user = await appDB.query(
      sql,
      {
        replacements: {
          id: userId,
        },
        type: QueryTypes.SELECT,
      },
    );

    return user[0];
  } catch (error) {
    throw error;
  }
};

exports.updateUser = async (userId, placement) => {
  const sql = `
    UPDATE users
    SET
      name = :name,
      location= :location,
      updatedAt= :updatedAt
    WHERE id = :id
  `;

  const newUser = await appDB.query(
    sql,
    {
      replacements: {
        id: userId,
        ...placement,
        updatedAt: (new Date()).toISOString().slice(0, -1), // Remove last char 'Z'
      },
      type: QueryTypes.UPDATE,
    },
  );

  console.log(newUser);
};

exports.createUser = async (placement) => {
  const sql = `
    INSERT INTO users(
      email,
      password,
      name,
      createdAt,
      updatedAt
    ) VALUES (
      :email,
      :password,
      :name,
      NOW(),
      NOW()
    )
  `;
  const user = await appDB.query(
    sql,
    {
      replacements: {
        ...placement,
        createdAt: (new Date()).toISOString().slice(0, -1), // Remove last char 'Z'
        updatedAt: (new Date()).toISOString().slice(0, -1),
      },
      type: QueryTypes.INSERT,
    },
  );

  console.log(user);
};
