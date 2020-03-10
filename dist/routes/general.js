"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _uploadFile = _interopRequireDefault(require("../middleware/uploadFile"));

var generalController = _interopRequireWildcard(require("../controllers/general"));

var router = _express["default"].Router();

router.get('/uploadFile', function (req, res) {
  res.send('FileUpload');
});
router.post('/uploadImg', _uploadFile["default"], generalController.fileUpload);
var _default = router;
exports["default"] = _default;