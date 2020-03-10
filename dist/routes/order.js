"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var orderController = _interopRequireWildcard(require("../controllers/order"));

var router = _express["default"].Router();

router.get('/', orderController.fetchOrderByUserId);
router.get('/:id', orderController.fetchOrderByOrderId);
router.post('/create', orderController.createOrder);
router.put('/submit/:id', orderController.updateOrderSubmit);
var _default = router;
exports["default"] = _default;