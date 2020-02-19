"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createProduct = createProduct;
exports.findProductById = findProductById;
exports.updateProductById = updateProductById;
exports.deleteProduct = deleteProduct;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _index = _interopRequireDefault(require("../db/index"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function createProduct(_x) {
  return _createProduct.apply(this, arguments);
}

function _createProduct() {
  _createProduct = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(replacements) {
    var sql, product;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            sql = "\n    INSERT INTO products(\n      name,\n      description,\n      price,\n      imageUrl,\n      createdAt,\n      updatedAt\n    ) VALUES (\n      :name,\n      :description,\n      :price,\n      :imageUrl,\n      NOW(),\n      NOW()\n    )\n  ";
            _context.next = 4;
            return _index["default"].query(sql, {
              replacements: replacements,
              type: _sequelize.QueryTypes.INSERT
            });

          case 4:
            product = _context.sent;
            return _context.abrupt("return", product[1]);

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", _context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));
  return _createProduct.apply(this, arguments);
}

function findProductById(_x2) {
  return _findProductById.apply(this, arguments);
}

function _findProductById() {
  _findProductById = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(p_id) {
    var sql, user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            sql = 'SELECT * from products WHERE p_id = :p_id';
            _context2.next = 4;
            return _index["default"].query(sql, {
              replacements: {
                p_id: p_id
              },
              type: _sequelize.QueryTypes.SELECT
            });

          case 4:
            user = _context2.sent;
            return _context2.abrupt("return", user[0]);

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            throw _context2.t0;

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return _findProductById.apply(this, arguments);
}

function updateProductById(_x3, _x4) {
  return _updateProductById.apply(this, arguments);
}

function _updateProductById() {
  _updateProductById = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(p_id, replacements) {
    var sql, updatedProduct;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            sql = "\n      UPDATE products\n      SET\n        name = :name,\n        description= :description,\n        price= :price,\n        imageUrl= :imageUrl,\n        updatedAt= :updatedAt\n      WHERE p_id = :p_id\n    ";
            _context3.next = 4;
            return _index["default"].query(sql, {
              replacements: _objectSpread({
                p_id: p_id
              }, replacements, {
                updatedAt: new Date().toISOString().slice(0, -1) // Remove last char 'Z'

              }),
              type: _sequelize.QueryTypes.UPDATE
            });

          case 4:
            updatedProduct = _context3.sent;
            return _context3.abrupt("return", updatedProduct[1]);

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            throw _context3.t0;

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 8]]);
  }));
  return _updateProductById.apply(this, arguments);
}

function deleteProduct(_x5) {
  return _deleteProduct.apply(this, arguments);
}

function _deleteProduct() {
  _deleteProduct = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(p_id) {
    var sql;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            sql = "\n      DELETE FROM products\n      WHERE p_id = :p_id\n  ";
            _context4.prev = 1;
            _context4.next = 4;
            return _index["default"].query(sql, {
              replacements: {
                p_id: p_id
              },
              type: _sequelize.QueryTypes.DELETE
            });

          case 4:
            return _context4.abrupt("return", true);

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](1);
            return _context4.abrupt("return", false);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 7]]);
  }));
  return _deleteProduct.apply(this, arguments);
}