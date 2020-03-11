import { Sequelize, QueryTypes } from 'sequelize';

import appDB from '../db';

interface Article {
  p_id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

class Product {
  private dataPool : Sequelize;

  public constructor (dataPool: Sequelize) {
    this.dataPool = dataPool;
  }

  public async find(id: number): Promise<Article[] | null> {
    const sql =`
      SELECT * FROM products
      WHERE p_id = :id
    `

    try {
      const result = await this.dataPool.query(sql,{
        replacements: {
          id,
        },
        type: QueryTypes.SELECT
      })
      return result;
    } catch (error) {
      return null;
    }
  }
}

const productRepo = new Product(appDB);

export default productRepo;