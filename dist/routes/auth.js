"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var verifyController = _interopRequireWildcard(require("../controllers/verify"));

var authController = _interopRequireWildcard(require("../controllers/auth"));

var _auth2 = _interopRequireDefault(require("../middleware/auth"));

var router = _express["default"].Router();

router.post('/sendCode', verifyController.sendCode);
router.post('/checkCode', verifyController.checkCode);
router.post('/login', authController.login);
router.post('/checkAuth', _auth2["default"], authController.checkAuth);
var _default = router;
exports["default"] = _default;