"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var userController = _interopRequireWildcard(require("../controllers/users"));

var router = _express["default"].Router();

router.post('/login', userController.login);
router.post('/post', userController.createUser);
var _default = router;
exports["default"] = _default;