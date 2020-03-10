import { pick, isNil } from 'lodash';

import * as productModel from '../models/product';
import orderModel from '../models/order';

export async function createProduct(req, res) {
  const placement = {
    ...pick(req.body, ['name', 'price']),
    description: req.body.description ? req.body.description : null,
    imageUrl: req.body.imageUrl ? req.body.imageUrl : null,
  };

  try {
    const createStatue = await productModel.insert(placement);

    if (!createStatue === 1) {
      res.sendStatus(404).end();
    }

    const productList = await productModel.findAll();

    res
      .status(200)
      .json({
        productList,
      });
  } catch (error) {
    return res.sendStatus(401);
  }
}

export async function findAllProduct(req, res) {
  const products = await productModel.findAll();

  res.status(200).json(products);
}

export async function findProductById(req, res) {
  const productId = pick(req.params, 'id').id;
  console.log('req.userId:', req.userId);

  try {
    const product = await productModel.findById(productId);

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
}

export async function updateProduct(req, res) {
  const productId = pick(req.params, 'id').id;
  const newProduct = pick(req.body, ['name', 'description', 'price', 'imageUrl']);

  try {
    const oldProduct = await productModel.findById(productId);

    if (isNil(oldProduct)) {
      return res.sendStatus(404);
    }

    const replacement = {
      ...oldProduct,
      ...newProduct,
    };

    const updatedProductCount = await productModel.updateById(productId, replacement);

    if (updatedProductCount === 0) {
      return res.sendStatus(404);
    }

    const productList = await productModel.findAll();

    res
      .status(200)
      .json({
        count: updatedProductCount,
        productList,
      });
  } catch (error) {
    return res.sendStatus(401);
  }
}

export async function deleteProduct(req, res) {
  const productId = pick(req.params, 'id').id;

  try {
    if (!orderModel.deleteByProductId(productId)) {
      return res.sendStatus(401);
    }

    if (!await productModel.deleteById(productId)) {
      return res.sendStatus(404);
    }

    const productList = await productModel.findAll();
    res
      .status(200)
      .json({
        productList,
      });
  } catch (error) {
    return res.sendStatus(401);
  }
}
