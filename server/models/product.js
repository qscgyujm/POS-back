/* eslint no-useless-catch: "off" */
import { QueryTypes } from 'sequelize';

import appDB from '../db/index';

export async function getAllProduct() {
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

export async function createProduct(replacements) {
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

export async function findMultipleProduct(p_ids) {
  try {
    const sql = 'SELECT * from products WHERE p_id IN (:p_ids)';

    const products = await appDB.query(
      sql,
      {
        replacements: {
          p_ids,
        },
        type: QueryTypes.SELECT,
      },
    );

    console.log('product', products);
    return products;
  } catch (error) {
    console.log('error', error);
    return error;
  }
}

export async function findProductById(p_id) {
  try {
    const sql = 'SELECT * from products WHERE p_id = :p_id';

    const user = await appDB.query(
      sql,
      {
        replacements: {
          p_id,
        },
        type: QueryTypes.SELECT,
      },
    );

    return user[0];
  } catch (error) {
    throw error;
  }
}

export async function updateProductById(p_id, replacements) {
  try {
    const sql = `
      UPDATE products
      SET
        name = :name,
        description= :description,
        price= :price,
        imageUrl= :imageUrl,
        updatedAt= :updatedAt
      WHERE p_id = :p_id
    `;

    const updatedProduct = await appDB.query(
      sql,
      {
        replacements: {
          p_id,
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

export async function deleteProduct(p_id) {
  const sql = `
      DELETE FROM products
      WHERE p_id = :p_id
  `;

  try {
    await appDB.query(
      sql,
      {
        replacements: {
          p_id,
        },
        type: QueryTypes.DELETE,
      },
    );

    return true;
  } catch (error) {
    return false;
  }
}
