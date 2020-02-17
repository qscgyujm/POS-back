const { pick, isNil } = require('lodash');

const productModel = require('../models/product');

exports.createProduct = async (req, res) => {
  const placement = {
    ...pick(req.body, ['name', 'price']),
    description: req.body.description ? req.body.description : null,
    imageUrl: req.body.description ? req.body.description : null,
  };

  const createStatue = await productModel.createProduct(placement);

  if (!createStatue === 1) {
    res.sendStatus(404);
  }

  res.sendStatus(200);
};

exports.findProductById = async (req, res) => {
  const productId = pick(req.params, 'id').id;

  const product = await productModel.findProductById(productId);

  if (isNil(product)) {
    res.sendStatus(404);
  }

  res
    .sendStatus(200)
    .json(product);
};

exports.updateProduct = async (req, res) => {
  const productId = pick(req.params, 'id').id;
  const newProduct = pick(req.body, ['name', 'description', 'price', 'imageUrl']);

  const oldProduct = await productModel.findProductById(productId);

  if (isNil(oldProduct)) {
    res.sendStatus(404);
  }

  const replacement = {
    ...oldProduct,
    ...newProduct,
  };

  const updatedProductCount = await productModel.updateProductById(productId, replacement);

  if (updatedProductCount === 0) {
    res.sendStatus(404);
  }

  res
    .status(200)
    .json({
      count: updatedProductCount,
    });
};

exports.deleteProductById = async (req, res) => {
  const productId = pick(req.params, 'id').id;

  const deleteResult = await productModel.deleteProduct(productId);

  if (deleteResult) {
    res.sendStatus(404);
  }

  res
    .status(200)
    .json({
      status: 'success',
    });
};
