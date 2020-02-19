"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findUserById = findUserById;
exports.updateUser = updateUser;
exports.createUser = createUser;
exports.login = login;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _lodash = require("lodash");

var userModel = _interopRequireWildcard(require("../models/user"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function findUserById(_x, _x2) {
  return _findUserById.apply(this, arguments);
}

function _findUserById() {
  _findUserById = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var userId, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userId = (0, _lodash.pick)(req.params, ['id']).id;
            _context.t0 = _lodash.pick;
            _context.next = 4;
            return userModel.findUser(userId);

          case 4:
            _context.t1 = _context.sent;
            _context.t2 = ['email', 'name', 'location'];
            user = (0, _context.t0)(_context.t1, _context.t2);
            res.json(user);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _findUserById.apply(this, arguments);
}

function updateUser(_x3, _x4) {
  return _updateUser.apply(this, arguments);
}

function _updateUser() {
  _updateUser = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res) {
    var userId, user, inputSetting, newUserPlacement;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userId = (0, _lodash.pick)(req.params, ['id']).id;
            _context2.next = 3;
            return userModel.findUser(userId);

          case 3:
            user = _context2.sent;
            inputSetting = (0, _lodash.pick)(req.body, ['name', 'location']);
            newUserPlacement = _objectSpread({}, (0, _lodash.pick)(user, ['name', 'location']), {}, inputSetting);
            _context2.next = 8;
            return userModel.updateUser(userId, newUserPlacement);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _updateUser.apply(this, arguments);
}

function createUser(_x5, _x6) {
  return _createUser.apply(this, arguments);
}

function _createUser() {
  _createUser = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(req, res) {
    var placement, hashedPassword, createdStatus;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            placement = (0, _lodash.pick)(req.body, ['password', 'confirmedPassword']);

            if (!(0, _lodash.isEqual)(placement.password, placement.confirmedPassword)) {
              res.sendStatus(400);
            }

            hashedPassword = _bcryptjs["default"].hashSync(placement.password, 8);
            _context3.next = 5;
            return userModel.createUser(_objectSpread({}, (0, _lodash.pick)(req.body, ['email', 'name']), {
              password: hashedPassword
            }));

          case 5:
            createdStatus = _context3.sent;

            if (createdStatus) {
              res.sendStatus(201);
            }

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _createUser.apply(this, arguments);
}

function login(_x7, _x8) {
  return _login.apply(this, arguments);
}

function _login() {
  _login = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(req, res) {
    var placement, userInfo, isMatch, token;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            placement = (0, _lodash.pick)(req.body, ['email', 'password']);
            _context4.t0 = _lodash.pick;
            _context4.next = 4;
            return userModel.findUserByEmail(placement.email);

          case 4:
            _context4.t1 = _context4.sent;
            _context4.t2 = ['password'];
            userInfo = (0, _context4.t0)(_context4.t1, _context4.t2);
            _context4.next = 9;
            return _bcryptjs["default"].compare(placement.password, userInfo.password);

          case 9:
            isMatch = _context4.sent;

            if (!isMatch) {
              res.sendStatus(404);
            }

            _context4.next = 13;
            return _jsonwebtoken["default"].sign({
              email: userInfo.email
            }, process.env.APP_KEY, {
              expiresIn: '7d'
            });

          case 13:
            token = _context4.sent;
            res.status(200).set('token', token).json({
              status: 'success'
            });

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _login.apply(this, arguments);
}