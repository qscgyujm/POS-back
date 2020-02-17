/* eslint no-useless-catch: "off" */
const { QueryTypes } = require('sequelize');

const appDB = require('../db/index');

exports.createProduct = async (replacements) => {
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
};

exports.findProductById = async (p_id) => {
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
};

exports.updateProductById = async (p_id, replacements) => {
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
};

exports.deleteProduct = async (p_id) => {
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
};
