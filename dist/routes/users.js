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

router.get('/', userController.findUser);
router.get('/:id', userController.findUserById);
router.put('/profile', userController.updateUser);
router.post('/password', userController.changePassword);
var _default = router;
exports["default"] = _default;