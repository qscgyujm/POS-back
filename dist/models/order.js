"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.submitOrder = submitOrder;
exports.orderRepo = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _sequelize = require("sequelize");

var _index = _interopRequireDefault(require("../db/index"));

/* eslint no-useless-catch: "off" */
var OrderRepo =
/*#__PURE__*/
function () {
  function OrderRepo(dataPool) {
    (0, _classCallCheck2["default"])(this, OrderRepo);
    this.dataPool = dataPool;
  }

  (0, _createClass2["default"])(OrderRepo, [{
    key: "findMaxOrderId",
    value: function () {
      var _findMaxOrderId = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee() {
        var sql, res;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                sql = 'SELECT COALESCE(MAX(order_id), 0) as maxNumber from orders';
                _context.prev = 1;
                _context.next = 4;
                return this.dataPool.query(sql, {
                  type: _sequelize.QueryTypes.SELECT
                });

              case 4:
                res = _context.sent;
                return _context.abrupt("return", res[0].maxNumber);

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](1);
                throw _context.t0;

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 8]]);
      }));

      function findMaxOrderId() {
        return _findMaxOrderId.apply(this, arguments);
      }

      return findMaxOrderId;
    }()
  }, {
    key: "findByUserId",
    value: function () {
      var _findByUserId = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(userId) {
        var sql, results;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                sql = "\n      SELECT\n        order_id,\n        SUM(price) as totalPrice, \n        GROUP_CONCAT(product_id) as productIdAry,\n        GROUP_CONCAT(quantity) as quantityAry,\n        GROUP_CONCAT(price) as priceAry,\n        createdAt\n      from orders \n      WHERE user_id = :userId\n        AND isComplete = 0\n      GROUP BY order_id;\n    ";
                _context2.prev = 1;
                _context2.next = 4;
                return this.dataPool.query(sql, {
                  replacements: {
                    userId: userId
                  },
                  type: _sequelize.QueryTypes.SELECT
                });

              case 4:
                results = _context2.sent;
                return _context2.abrupt("return", results);

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](1);
                return _context2.abrupt("return", _context2.t0);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 8]]);
      }));

      function findByUserId(_x) {
        return _findByUserId.apply(this, arguments);
      }

      return findByUserId;
    }()
  }, {
    key: "insertMany",
    value: function () {
      var _insertMany = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(replacements) {
        var sql, order;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                sql = "\n      INSERT INTO orders(\n        order_id,\n        product_id,\n        user_id,\n        quantity,\n        price,\n        createdAt,\n        updatedAt\n      ) VALUES (\n        :order_id,\n        :product_id,\n        :user_id,\n        :quantity,\n        :price,\n        NOW(),\n        NOW()\n      )\n    ";
                _context3.prev = 1;
                _context3.next = 4;
                return this.dataPool.query(sql, {
                  replacements: [replacements],
                  type: _sequelize.QueryTypes.INSERT
                });

              case 4:
                order = _context3.sent;
                return _context3.abrupt("return", order[1]);

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](1);
                return _context3.abrupt("return", _context3.t0);

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 8]]);
      }));

      function insertMany(_x2) {
        return _insertMany.apply(this, arguments);
      }

      return insertMany;
    }()
  }, {
    key: "updateSubmission",
    value: function () {
      var _updateSubmission = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(replacements) {
        var sql, _ref, _ref2, updateCount;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                sql = "\n      UPDATE orders\n        SET\n          isComplete = :isComplete\n        WHERE order_id = :order_id\n    ";
                _context4.prev = 1;
                _context4.next = 4;
                return this.dataPool.query(sql, {
                  replacements: replacements,
                  type: _sequelize.QueryTypes.UPDATE
                });

              case 4:
                _ref = _context4.sent;
                _ref2 = (0, _slicedToArray2["default"])(_ref, 2);
                updateCount = _ref2[1];
                console.log(updateCount);
                return _context4.abrupt("return", updateCount);

              case 11:
                _context4.prev = 11;
                _context4.t0 = _context4["catch"](1);
                return _context4.abrupt("return", _context4.t0);

              case 14:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 11]]);
      }));

      function updateSubmission(_x3) {
        return _updateSubmission.apply(this, arguments);
      }

      return updateSubmission;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(orderId) {
        var sql, results;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                sql = "\n      DELETE FROM orders\n      WHERE order_id = :orderId\n    ";
                _context5.prev = 1;
                _context5.next = 4;
                return this.dataPool.query(sql, {
                  replacements: {
                    orderId: orderId
                  },
                  type: _sequelize.QueryTypes.DELETE
                });

              case 4:
                results = _context5.sent;
                console.log(results);
                return _context5.abrupt("return", results);

              case 9:
                _context5.prev = 9;
                _context5.t0 = _context5["catch"](1);
                return _context5.abrupt("return", _context5.t0);

              case 12:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[1, 9]]);
      }));

      function _delete(_x4) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }]);
  return OrderRepo;
}();

var orderRepo = new OrderRepo(_index["default"]);
exports.orderRepo = orderRepo;

function submitOrder(_x5) {
  return _submitOrder.apply(this, arguments);
}

function _submitOrder() {
  _submitOrder = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6(replacements) {
    var sql, updatedOrder;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            sql = "\n      UPDATE order\n        SET\n          isComplete = :isComplete\n        WHERE order_id =: order_id\n    ";
            _context6.next = 4;
            return _index["default"].query(sql, {
              replacements: replacements,
              type: _sequelize.QueryTypes.UPDATE
            });

          case 4:
            updatedOrder = _context6.sent;
            console.log('updatedOrder', updatedOrder);
            _context6.next = 11;
            break;

          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6["catch"](0);
            return _context6.abrupt("return", _context6.t0);

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 8]]);
  }));
  return _submitOrder.apply(this, arguments);
}