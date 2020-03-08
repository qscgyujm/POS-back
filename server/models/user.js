/* eslint no-useless-catch: "off" */
import { QueryTypes } from 'sequelize';

import appDB from '../db/index';

export async function findUser(userId) {
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
}

export async function findUserByEmail(email) {
  try {
    const sql = 'SELECT * from users WHERE email = :email';

    const user = await appDB.query(
      sql,
      {
        replacements: {
          email,
        },
        type: QueryTypes.SELECT,
      },
    );

    return user;
  } catch (error) {
    throw error;
  }
}

export async function updateUser(userId, placement) {
  const sql = `
    UPDATE users
    SET
      name = :name,
      location= :location,
      updatedAt= :updatedAt
    WHERE id = :id
  `;

  const updatedRes = await appDB.query(
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

  return updatedRes[1];
}

export async function createUser(placement) {
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

  return user[1];
}
