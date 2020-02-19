"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _express = _interopRequireDefault(require("express"));

var _fs = _interopRequireDefault(require("fs"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _uploadFile = _interopRequireDefault(require("../middleware/uploadFile"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var router = _express["default"].Router();

router.get('/uploadFile', function (req, res) {
  res.send('FileUpload');
});
router.post('/uploadFile', _uploadFile["default"], function (req, res) {
  if (!req.file) {
    res.sendStatus(404);
  }

  res.status(200).json(_objectSpread({}, req.file));
});
router.post('/uploadFileS3', _uploadFile["default"], function (req, res) {
  if (!req.file) {
    res.sendStatus(404);
  }

  var s3 = new _awsSdk["default"].S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });
  var params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: req.file.filename,
    Body: _fs["default"].createReadStream(req.file.path),
    ACL: 'public-read',
    ContentType: req.file.mimetype
  };
  s3.upload(params, function (err, data) {
    if (err) {
      console.log('Error occured while trying to upload to S3 bucket', err);
    }

    if (data) {
      _fs["default"].unlinkSync(req.file.path); // Empty temp folder


      res.status(200).json({
        file: data
      });
    }
  });
});
var _default = router;
exports["default"] = _default;