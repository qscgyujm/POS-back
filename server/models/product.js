/* eslint no-useless-catch: "off" */
import { QueryTypes } from 'sequelize';

import appDB from '../db/index';

export async function findAll() {
  try {
    const sql = 'SELECT * from products';

    const products = await appDB.query(
      sql,
      {
        type: QueryTypes.SELECT,
      },
    );

    return products;
  } catch (error) {
    throw error;
  }
}

export async function insert(replacements) {
  try {
    const sql = `
    INSERT INTO products(
      name,
      description,
      price,
      imageUrl,
      createdAt,
      updatedAt
    ) VALUES (
      :name,
      :description,
      :price,
      :imageUrl,
      NOW(),
      NOW()
    )
  `;

    const product = await appDB.query(
      sql,
      {
        replacements,
        type: QueryTypes.INSERT,
      },
    );

    return product[1];
  } catch (error) {
    return error;
  }
}

export async function findByIds(ids) {
  try {
    const sql = 'SELECT * from products WHERE p_id IN (:ids)';

    const products = await appDB.query(
      sql,
      {
        replacements: {
          ids,
        },
        type: QueryTypes.SELECT,
      },
    );

    return products;
  } catch (error) {
    return error;
  }
}

export async function findById(id) {
  try {
    const sql = 'SELECT * from products WHERE p_id = :id';

    const user = await appDB.query(
      sql,
      {
        replacements: {
          id,
        },
        type: QueryTypes.SELECT,
      },
    );

    return user[0];
  } catch (error) {
    throw error;
  }
}

export async function updateById(id, replacements) {
  try {
    const sql = `
      UPDATE products
      SET
        name = :name,
        description= :description,
        price= :price,
        imageUrl= :imageUrl,
        updatedAt= :updatedAt
      WHERE p_id = :id
    `;

    const updatedProduct = await appDB.query(
      sql,
      {
        replacements: {
          id,
          ...replacements,
          updatedAt: (new Date()).toISOString().slice(0, -1), // Remove last char 'Z'
        },
        type: QueryTypes.UPDATE,
      },
    );

    return updatedProduct[1];
  } catch (error) {
    throw error;
  }
}

export async function deleteById(id) {
  const sql = `
    DELETE FROM products
    WHERE p_id = :id
  `;

  try {
    await appDB.query(sql, {
      replacements: {
        id,
      },
      type: QueryTypes.DELETE,
    });

    return true;
  } catch (error) {
    return false;
  }
}
