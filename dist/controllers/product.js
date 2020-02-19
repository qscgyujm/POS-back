"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createProduct = createProduct;
exports.findProductById = findProductById;
exports.updateProduct = updateProduct;
exports.deleteProductById = deleteProductById;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _lodash = require("lodash");

var productModel = _interopRequireWildcard(require("../models/product"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function createProduct(_x, _x2) {
  return _createProduct.apply(this, arguments);
}

function _createProduct() {
  _createProduct = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var placement, createStatue;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            placement = _objectSpread({}, (0, _lodash.pick)(req.body, ['name', 'price']), {
              description: req.body.description ? req.body.description : null,
              imageUrl: req.body.description ? req.body.description : null
            });
            _context.next = 3;
            return productModel.createProduct(placement);

          case 3:
            createStatue = _context.sent;

            if (!createStatue === 1) {
              res.sendStatus(404);
            }

            res.sendStatus(200);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _createProduct.apply(this, arguments);
}

function findProductById(_x3, _x4) {
  return _findProductById.apply(this, arguments);
}

function _findProductById() {
  _findProductById = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res) {
    var productId, product;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            productId = (0, _lodash.pick)(req.params, 'id').id;
            _context2.next = 3;
            return productModel.findProductById(productId);

          case 3:
            product = _context2.sent;

            if ((0, _lodash.isNil)(product)) {
              res.sendStatus(404);
            }

            res.status(200).json(product);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _findProductById.apply(this, arguments);
}

function updateProduct(_x5, _x6) {
  return _updateProduct.apply(this, arguments);
}

function _updateProduct() {
  _updateProduct = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(req, res) {
    var productId, newProduct, oldProduct, replacement, updatedProductCount;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            productId = (0, _lodash.pick)(req.params, 'id').id;
            newProduct = (0, _lodash.pick)(req.body, ['name', 'description', 'price', 'imageUrl']);
            _context3.next = 4;
            return productModel.findProductById(productId);

          case 4:
            oldProduct = _context3.sent;

            if ((0, _lodash.isNil)(oldProduct)) {
              res.sendStatus(404);
            }

            replacement = _objectSpread({}, oldProduct, {}, newProduct);
            _context3.next = 9;
            return productModel.updateProductById(productId, replacement);

          case 9:
            updatedProductCount = _context3.sent;

            if (updatedProductCount === 0) {
              res.sendStatus(404);
            }

            res.status(200).json({
              count: updatedProductCount
            });

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _updateProduct.apply(this, arguments);
}

function deleteProductById(_x7, _x8) {
  return _deleteProductById.apply(this, arguments);
}

function _deleteProductById() {
  _deleteProductById = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(req, res) {
    var productId, deleteResult;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            productId = (0, _lodash.pick)(req.params, 'id').id;
            _context4.next = 3;
            return productModel.deleteProduct(productId);

          case 3:
            deleteResult = _context4.sent;

            if (deleteResult) {
              res.sendStatus(404);
            }

            res.status(200).json({
              status: 'success'
            });

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _deleteProductById.apply(this, arguments);
}