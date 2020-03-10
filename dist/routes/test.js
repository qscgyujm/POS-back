"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _mail = _interopRequireDefault(require("@sendgrid/mail"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _fs = _interopRequireDefault(require("fs"));

var _uploadFile = _interopRequireDefault(require("../middleware/uploadFile"));

var productModel = _interopRequireWildcard(require("../models/product"));

var userModel = _interopRequireWildcard(require("../models/user"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var router = _express["default"].Router(); // use https://www.mailinator.com/ testing email


router.get('/product',
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res, next) {
    var products;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return productModel.getAllProduct();

          case 2:
            products = _context.sent;
            res.status(200).json(products);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
router.get('/user',
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res, next) {
    var user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return userModel.findUser(3);

          case 2:
            user = _context2.sent;
            res.status(200).json(user);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());
router.post('/email',
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(req, res, next) {
    var msg, resEmail;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _mail["default"].setApiKey(process.env.SENDGRID_API_KEY);

            msg = {
              to: 'froggy@mailinator.com',
              from: 'test@example.com',
              subject: 'Sending with Twilio SendGrid is Fun',
              // text: 'and easy to do anywhere, even with Node.js',
              html: '<strong>and easy to do anywhere, even with Node.js</strong>'
            };
            _context3.prev = 2;
            _context3.next = 5;
            return _mail["default"].send(msg);

          case 5:
            resEmail = _context3.sent;
            console.log(resEmail);
            res.sendStatus(200);
            _context3.next = 13;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](2);
            console.log(_context3.t0);

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 10]]);
  }));

  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}()); // aws sns

router.post('/snsAWS',
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(req, res, next) {
    var params, sns, data;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            params = {
              Message: 'Send Message',
              PhoneNumber: process.env.TEST_PHONE
            };
            _context4.prev = 1;
            sns = new _awsSdk["default"].SNS();
            _context4.next = 5;
            return sns.publish(params).send();

          case 5:
            data = _context4.sent;
            console.log(data);
            res.sendStatus(200);
            _context4.next = 13;
            break;

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](1);
            res.sendStatus(404);

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 10]]);
  }));

  return function (_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}());
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