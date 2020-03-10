import { pick, isNil } from 'lodash';

import * as productModel from '../models/product';

export async function createProduct(req, res) {
  const placement = {
    ...pick(req.body, ['name', 'price']),
    description: req.body.description ? req.body.description : null,
    imageUrl: req.body.imageUrl ? req.body.imageUrl : null,
  };

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

  const oldProduct = await productModel.findById(productId);

  if (isNil(oldProduct)) {
    res.sendStatus(404);
  }

  const replacement = {
    ...oldProduct,
    ...newProduct,
  };

  const updatedProductCount = await productModel.updateById(productId, replacement);

  if (updatedProductCount === 0) {
    res.sendStatus(404);
  }

  const productList = await productModel.findAll();

  res
    .status(200)
    .json({
      count: updatedProductCount,
      productList,
    });
}

export async function deleteProductById(req, res) {
  const productId = pick(req.params, 'id').id;

  try {
    const deleteResult = await productModel.deleteById(productId);

    if (!deleteResult) {
      res.sendStatus(404);
    }

    const productList = await productModel.findAll();

    res
      .status(200)
      .json({
        productList,
      });
  } catch (error) {
    res.sendStatus(401);
  }
}
