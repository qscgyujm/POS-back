"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendCode = sendCode;
exports.checkCode = checkCode;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _mail = _interopRequireDefault(require("@sendgrid/mail"));

var _lodash = require("lodash");

var verificationModel = _interopRequireWildcard(require("../models/verification"));

var userModel = _interopRequireWildcard(require("../models/user"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function sendCode(_x, _x2) {
  return _sendCode.apply(this, arguments);
}

function _sendCode() {
  _sendCode = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var email, verificationCode, code, replacements, userInfo, createCount, msg, mailRes;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            email = req.body.email;
            verificationCode = Math.random().toString(36);

            if (email.endsWith('@mailinator.com')) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", res.status(404));

          case 4:
            code = verificationCode.slice(verificationCode.length - 6);
            replacements = {
              email: email,
              code: code
            };
            _context.prev = 6;
            _context.next = 9;
            return userModel.findUserByEmail(email);

          case 9:
            userInfo = _context.sent;

            if (userInfo.length > 1) {
              res.sendStatus(404);
            }

            _context.next = 13;
            return verificationModel.createVerificationCode(replacements);

          case 13:
            createCount = _context.sent;

            if (createCount !== 1) {
              res.sendStatus(404);
            }

            _mail["default"].setApiKey(process.env.SENDGRID_API_KEY);

            msg = {
              to: email,
              from: 'POS@mail',
              subject: 'Verification Code',
              html: "<strong>Code: ".concat(code, "</strong>")
            };
            _context.next = 19;
            return _mail["default"].send(msg);

          case 19:
            mailRes = _context.sent;

            // console.log('mailRes', mailRes);
            if (createCount === 1 && mailRes) {
              res.status(200).send();
            }

            _context.next = 26;
            break;

          case 23:
            _context.prev = 23;
            _context.t0 = _context["catch"](6);
            res.sendStatus(404);

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 23]]);
  }));
  return _sendCode.apply(this, arguments);
}

function checkCode(_x3, _x4) {
  return _checkCode.apply(this, arguments);
}

function _checkCode() {
  _checkCode = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res) {
    var replacements, codeInfo, isCodeMatch, user, placement, hashedPassword, createdStatus;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            replacements = (0, _lodash.pick)(req.body, ['email', 'password', 'name', 'location', 'code']);
            _context2.next = 3;
            return verificationModel.getVerificationCode(replacements);

          case 3:
            codeInfo = _context2.sent;

            if (!(0, _lodash.isEmpty)(codeInfo)) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.sendStatus(400));

          case 6:
            isCodeMatch = replacements.code === codeInfo[0].code;

            if (isCodeMatch) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", res.sendStatus(401));

          case 9:
            _context2.next = 11;
            return userModel.findUserByEmail(replacements.email);

          case 11:
            user = _context2.sent;

            if ((0, _lodash.isEmpty)(user)) {
              _context2.next = 14;
              break;
            }

            return _context2.abrupt("return", res.sendStatus(402));

          case 14:
            placement = (0, _lodash.pick)(req.body, ['password']);
            hashedPassword = _bcryptjs["default"].hashSync(placement.password, 8);
            _context2.next = 18;
            return verificationModel.deleteCode(replacements);

          case 18:
            if (_context2.sent) {
              _context2.next = 20;
              break;
            }

            return _context2.abrupt("return", res.sendStatus(403));

          case 20:
            _context2.next = 22;
            return userModel.createUser(_objectSpread({}, (0, _lodash.pick)(req.body, ['email', 'name', 'location']), {
              password: hashedPassword
            }));

          case 22:
            createdStatus = _context2.sent;

            if (!createdStatus) {
              _context2.next = 25;
              break;
            }

            return _context2.abrupt("return", res.sendStatus(201));

          case 25:
            return _context2.abrupt("return", res.sendStatus(404));

          case 26:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _checkCode.apply(this, arguments);
}