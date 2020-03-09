/* eslint no-useless-catch: "off" */
import { QueryTypes } from 'sequelize';

import appDB from '../db/index';

class OrderRepo {
  constructor(dataPool) {
    this.dataPool = dataPool;
  }

  async findMaxOrderId() {
    const sql = 'SELECT COALESCE(MAX(order_id), 0) as maxNumber from orders';

    try {
      const res = await this.dataPool.query(sql, {
        type: QueryTypes.SELECT,
      });

      return res[0].maxNumber;
    } catch (error) {
      throw error;
    }
  }

  async findByUserId(userId) {
    const sql = `
      SELECT
        order_id,
        SUM(price) as totalPrice, 
        GROUP_CONCAT(product_id) as productIdAry,
        GROUP_CONCAT(quantity) as quantityAry,
        GROUP_CONCAT(price) as priceAry,
        createdAt
      from orders 
      WHERE user_id = :userId
        AND isComplete = 0
      GROUP BY order_id;
    `;

    try {
      const results = await this.dataPool.query(
        sql,
        {
          replacements: {
            userId,
          },
          type: QueryTypes.SELECT,
        },
      );
      return results;
    } catch (error) {
      return error;
    }
  }

  async insertMany(replacements) {
    const sql = `
      INSERT INTO orders(
        order_id,
        product_id,
        user_id,
        quantity,
        price,
        createdAt,
        updatedAt
      ) VALUES (
        :order_id,
        :product_id,
        :user_id,
        :quantity,
        :price,
        NOW(),
        NOW()
      )
    `;

    try {
      const order = await this.dataPool.query(
        sql,
        {
          replacements: [replacements],
          type: QueryTypes.INSERT,
        },
      );

      return order[1];
    } catch (error) {
      return error;
    }
  }

  async updateSubmission(replacements) {
    const sql = `
      UPDATE orders
        SET
          isComplete = :isComplete
        WHERE order_id = :order_id
    `;

    try {
      const [, updateCount] = await this.dataPool.query(sql, {
        replacements,
        type: QueryTypes.UPDATE,
      });


      console.log(updateCount);
      return updateCount;
    } catch (error) {
      return error;
    }
  }

  async delete(orderId) {
    const sql = `
      DELETE FROM orders
      WHERE order_id = :orderId
    `;

    try {
      const results = await this.dataPool.query(sql, {
        replacements: {
          orderId,
        },
        type: QueryTypes.DELETE,
      });
      console.log(results);
      return results;
    } catch (error) {
      return error;
    }
  }
}

export const orderRepo = new OrderRepo(appDB);


export async function submitOrder(replacements) {
  try {
    const sql = `
      UPDATE order
        SET
          isComplete = :isComplete
        WHERE order_id =: order_id
    `;

    const updatedOrder = await appDB.query(
      sql,
      {
        replacements,
        type: QueryTypes.UPDATE,
      },
    );

    console.log('updatedOrder', updatedOrder);
  } catch (error) {
    return error;
  }
}
