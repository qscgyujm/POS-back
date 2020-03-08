/* eslint no-useless-catch: "off" */
import { QueryTypes } from 'sequelize';

import appDB from '../db/index';

export async function createVerificationCode(replacements) {
  try {
    const sql = `
      INSERT INTO verification_email(
        email,
        code
      ) VALUES (
        :email,
        :code
      )
    `;

    const createRes = await appDB.query(
      sql,
      {
        replacements,
        type: QueryTypes.INSERT,
      },
    );

    return createRes[1];
  } catch (error) {
    throw error;
  }
}

export async function getVerificationCode(replacements) {
  try {
    const sql = 'SELECT * from verification_email WHERE email = :email';

    const selectRes = await appDB.query(
      sql,
      {
        replacements,
        type: QueryTypes.SELECT,
      },
    );

    return selectRes;
  } catch (error) {
    throw error;
  }
}

export async function deleteCode(replacements) {
  try {
    const sql = `
      DELETE FROM verification_email
      WHERE email = :email
  `;

    await appDB.query(
      sql,
      {
        replacements,
        type: QueryTypes.DELETE,
      },
    );

    return true;
  } catch (error) {
    throw error;
  }
}
