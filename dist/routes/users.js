"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var userController = _interopRequireWildcard(require("../controllers/users"));

var _auth = _interopRequireDefault(require("./auth"));

var _auth2 = _interopRequireDefault(require("../middleware/auth"));

var router = _express["default"].Router();

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.use(_auth["default"]);
router.use(_auth2["default"]);
router.get('/:id', userController.findUserById);
router.put('/:id', userController.updateUser);
var _default = router;
exports["default"] = _default;