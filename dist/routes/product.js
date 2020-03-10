"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var productsController = _interopRequireWildcard(require("../controllers/product"));

var router = _express["default"].Router();

router.get('/all', productsController.findAllProduct);
router.post('/create', productsController.createProduct);
router.put('/:id', productsController.updateProduct);
router["delete"]('/:id', productsController.deleteProductById);
var _default = router;
exports["default"] = _default;