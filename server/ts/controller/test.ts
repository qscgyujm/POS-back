import { Request, Response } from 'express';

import productModel from '../model/product';

export async function findProductById(req: Request, res: Response) {
  const { id } = req.params;
  
  try {
    const products = await productModel.find(+id);
    
    if(
      products === []
      || products === null
    ) {
      return res.sendStatus(401);
    }

    res.status(200).send(products[0]);
  } catch (error) {
    return res.sendStatus(404);
  }
}
