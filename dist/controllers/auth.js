"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = login;
exports.checkAuth = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _lodash = require("lodash");

var userModel = _interopRequireWildcard(require("../models/user"));

function login(_x, _x2) {
  return _login.apply(this, arguments);
}

function _login() {
  _login = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res) {
    var placement, userInfoList, userInfo, isMatch, token;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            placement = (0, _lodash.pick)(req.body, ['email', 'password']);
            _context2.next = 3;
            return userModel.findUserByEmail(placement.email);

          case 3:
            userInfoList = _context2.sent;
            userInfo = userInfoList[0];
            _context2.next = 7;
            return _bcryptjs["default"].compare(placement.password, userInfo.password);

          case 7:
            isMatch = _context2.sent;

            if (!isMatch) {
              res.sendStatus(404);
            }

            _context2.next = 11;
            return _jsonwebtoken["default"].sign({
              userId: userInfo.id,
              email: userInfo.email
            }, process.env.APP_KEY, {
              expiresIn: '7d'
            });

          case 11:
            token = _context2.sent;
            res.status(200).set('token', token).json({
              status: 'success'
            });

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _login.apply(this, arguments);
}

var checkAuth =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var userId, userInfo, token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('check');
            userId = req.userId;
            _context.prev = 2;
            _context.t0 = _lodash.pick;
            _context.next = 6;
            return userModel.findUser(userId);

          case 6:
            _context.t1 = _context.sent;
            _context.t2 = ['id', 'email'];
            userInfo = (0, _context.t0)(_context.t1, _context.t2);
            _context.next = 11;
            return _jsonwebtoken["default"].sign({
              userId: userInfo.id,
              email: userInfo.email
            }, process.env.APP_KEY, {
              expiresIn: '7d'
            });

          case 11:
            token = _context.sent;
            res.status(200).set('token', token).json({
              status: 'success'
            });
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t3 = _context["catch"](2);
            throw new Error(_context.t3);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 15]]);
  }));

  return function checkAuth(_x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.checkAuth = checkAuth;