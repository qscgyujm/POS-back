"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateOrderSubmit = exports.createOrder = exports.fetchOrderByOrderId = exports.fetchOrderByUserId = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _lodash = require("lodash");

var orderModel = _interopRequireWildcard(require("../models/order"));

var productModel = _interopRequireWildcard(require("../models/product"));

var _time = require("../helper/time");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var fetchOrderByUserId =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var userId, orderList, orderDetailList;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            userId = req.userId; // const orderList = await orderModel.getOrderByUserId(userId);

            _context.next = 4;
            return orderModel.orderRepo.findByUserId(userId);

          case 4:
            orderList = _context.sent;
            orderDetailList = orderList.map(function (order) {
              return _objectSpread({}, order, {
                productIdAry: order.productIdAry.split(','),
                quantityAry: order.quantityAry.split(','),
                priceAry: order.priceAry.split(',')
              });
            }).map(function (order) {
              return _objectSpread({}, order, {
                detailOrder: order.productIdAry.map(function (id, i) {
                  return {
                    id: id,
                    quantity: order.quantityAry[i],
                    price: order.priceAry[i]
                  };
                })
              });
            }).map(function (order) {
              return (0, _lodash.pick)(order, ['order_id', 'totalPrice', 'detailOrder', 'createdAt']);
            });
            res.status(200).json({
              orderDetailList: orderDetailList
            });
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            // return error;
            console.log(_context.t0);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));

  return function fetchOrderByUserId(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.fetchOrderByUserId = fetchOrderByUserId;

var fetchOrderByOrderId =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res) {
    var orderId;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            try {
              orderId = (0, _lodash.pick)(req.params, 'id').id;
              console.log('fetchOrderByOrderId', orderId);
            } catch (error) {
              console.log(error);
            }

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function fetchOrderByOrderId(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.fetchOrderByOrderId = fetchOrderByOrderId;

var createOrder =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(req, res) {
    var userId, orderNumber, orders, orderProductIds, productList, replacements;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            userId = req.userId;
            console.log('create Order');
            _context3.prev = 2;
            _context3.next = 5;
            return orderModel.getOrderId();

          case 5:
            orderNumber = _context3.sent;
            console.log(req.body.order, orderNumber);
            orders = req.body.order;
            orderProductIds = orders.map(function (order) {
              return order.id;
            });
            _context3.next = 11;
            return productModel.findMultipleProduct(orderProductIds);

          case 11:
            productList = _context3.sent;
            replacements = orders.map(function (order) {
              var productInfo = productList.find(function (product) {
                return product.p_id === order.id;
              });
              return [orderNumber + 1, productInfo.p_id, userId, order.count, productInfo.price * order.count, (0, _time.getTime)(), (0, _time.getTime)()];
            });
            console.log('replacements', replacements);
            _context3.next = 16;
            return orderModel.createMultipleOrder(replacements);

          case 16:
            _context3.next = 21;
            break;

          case 18:
            _context3.prev = 18;
            _context3.t0 = _context3["catch"](2);
            return _context3.abrupt("return", _context3.t0);

          case 21:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 18]]);
  }));

  return function createOrder(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.createOrder = createOrder;

var updateOrderSubmit =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(req, res) {
    var orderId;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            orderId = (0, _lodash.pick)(req.params, 'id').id;
            console.log('submitOrder', orderId);
            _context4.next = 5;
            return orderModel.orderRepo.updateSubmission({
              order_id: orderId,
              isComplete: 1
            });

          case 5:
            _context4.next = 10;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", _context4.t0);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));

  return function updateOrderSubmit(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateOrderSubmit = updateOrderSubmit;