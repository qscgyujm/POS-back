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

var _test = _interopRequireDefault(require("./test"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

var router = _express["default"].Router();
/* GET home page. */


router.get('/', function (req, res) {
  res.render('index', {
    title: 'Express'
  });
});
router.use(_general["default"]);
router.use('/test', _test["default"]);
router.use('/users', _users["default"]);
router.use('/product', _auth["default"], _product["default"]);
var _default = router;
exports["default"] = _default;