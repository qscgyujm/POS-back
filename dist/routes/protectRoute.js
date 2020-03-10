"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _general = _interopRequireDefault(require("./general"));

var _users = _interopRequireDefault(require("./users"));

var _product = _interopRequireDefault(require("./product"));

var _order = _interopRequireDefault(require("./order"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

var router = _express["default"].Router();

router.use('/general', _general["default"]);
router.use('/user', _auth["default"], _users["default"]);
router.use('/order', _auth["default"], _order["default"]);
router.use('/product', _auth["default"], _product["default"]);
var _default = router;
exports["default"] = _default;