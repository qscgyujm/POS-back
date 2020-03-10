"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkAuth = exports.fileUpload = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fs = _interopRequireDefault(require("fs"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var fileUpload =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var s3, params;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!req.file) {
              res.sendStatus(404);
            }

            s3 = new _awsSdk["default"].S3({
              accessKeyId: process.env.AWS_ACCESS_KEY_ID,
              secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            });
            params = {
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


                res.status(200).send(data.Location);
              }
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fileUpload(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.fileUpload = fileUpload;

var checkAuth =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function checkAuth(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.checkAuth = checkAuth;