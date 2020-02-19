"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _mail = _interopRequireDefault(require("@sendgrid/mail"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var router = _express["default"].Router(); // use https://www.mailinator.com/ testing email


router.post('/email',
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res, next) {
    var msg;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _mail["default"].setApiKey(process.env.SENDGRID_API_KEY);

            msg = {
              to: 'froggy@mailinator.com',
              from: 'test@example.com',
              subject: 'Sending with Twilio SendGrid is Fun',
              text: 'and easy to do anywhere, even with Node.js',
              html: '<strong>and easy to do anywhere, even with Node.js</strong>'
            };
            _context.prev = 2;
            _context.next = 5;
            return _mail["default"].send(msg);

          case 5:
            res.sendStatus(200);
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](2);
            console.log(_context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 8]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}()); // aws sns

router.post('/snsAWS',
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res, next) {
    var params, sns, data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            params = {
              Message: 'Send Message',
              PhoneNumber: process.env.TEST_PHONE
            };
            _context2.prev = 1;
            sns = new _awsSdk["default"].SNS();
            _context2.next = 5;
            return sns.publish(params).send();

          case 5:
            data = _context2.sent;
            console.log(data);
            res.sendStatus(200);
            _context2.next = 13;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](1);
            res.sendStatus(404);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 10]]);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;