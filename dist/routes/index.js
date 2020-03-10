"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _protectRoute = _interopRequireDefault(require("./protectRoute"));

var _test = _interopRequireDefault(require("./test"));

var _auth = _interopRequireDefault(require("./auth"));

var router = _express["default"].Router();
/* GET home page. */


router.get('/', function (req, res) {
  res.send('POS API');
});
var corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  exposedHeaders: ['Content-Type', 'Authorization', 'token']
};
router.use((0, _cors["default"])(corsOptions));
router.use('/test', _test["default"]);
router.use('/auth', _auth["default"]);
router.use(_protectRoute["default"]);
var _default = router;
exports["default"] = _default;