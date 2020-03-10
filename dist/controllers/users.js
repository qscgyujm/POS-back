"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findUserById = findUserById;
exports.findUser = findUser;
exports.updateUser = updateUser;
exports.createUser = createUser;
exports.changePassword = changePassword;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

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

function findUser(_x3, _x4) {
  return _findUser.apply(this, arguments);
}

function _findUser() {
  _findUser = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res) {
    var userId, user, userInfo;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userId = req.userId;
            _context2.next = 3;
            return userModel.findUser(userId);

          case 3:
            user = _context2.sent;
            userInfo = (0, _lodash.pick)(user, ['email', 'name', 'location']);
            res.status(200).json({
              profile: userInfo
            });

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _findUser.apply(this, arguments);
}

function updateUser(_x5, _x6) {
  return _updateUser.apply(this, arguments);
}

function _updateUser() {
  _updateUser = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(req, res) {
    var userId, user, inputSetting, replacements, updatedCount, newProfile;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            userId = req.userId;
            _context3.prev = 1;
            _context3.next = 4;
            return userModel.findUser(userId);

          case 4:
            user = _context3.sent;
            inputSetting = (0, _lodash.pick)(req.body, ['name', 'location']);
            replacements = _objectSpread({}, (0, _lodash.pick)(user, ['name', 'location']), {}, inputSetting);
            _context3.next = 9;
            return userModel.updateUser(userId, replacements);

          case 9:
            updatedCount = _context3.sent;

            if (updatedCount !== 1) {
              res.status(404);
            }

            _context3.t0 = _lodash.pick;
            _context3.next = 14;
            return userModel.findUser(userId);

          case 14:
            _context3.t1 = _context3.sent;
            _context3.t2 = ['email', 'name', 'location'];
            newProfile = (0, _context3.t0)(_context3.t1, _context3.t2);
            res.status(200).json({
              profile: newProfile
            });
            _context3.next = 23;
            break;

          case 20:
            _context3.prev = 20;
            _context3.t3 = _context3["catch"](1);
            res.sendStatus(401);

          case 23:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 20]]);
  }));
  return _updateUser.apply(this, arguments);
}

function createUser(_x7, _x8) {
  return _createUser.apply(this, arguments);
}

function _createUser() {
  _createUser = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(req, res) {
    var placement, hashedPassword, createdStatus;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            placement = (0, _lodash.pick)(req.body, ['password']);
            hashedPassword = _bcryptjs["default"].hashSync(placement.password, 8);
            _context4.next = 4;
            return userModel.createUser(_objectSpread({}, (0, _lodash.pick)(req.body, ['email', 'name', 'location']), {
              password: hashedPassword
            }));

          case 4:
            createdStatus = _context4.sent;

            if (createdStatus) {
              res.sendStatus(201);
            }

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _createUser.apply(this, arguments);
}

function changePassword(_x9, _x10) {
  return _changePassword.apply(this, arguments);
}

function _changePassword() {
  _changePassword = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(req, res) {
    var userId, placement, userInfo, isMatch;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            userId = req.userId;
            placement = (0, _lodash.pick)(req.body, ['password', 'newPassword', 'confirmPassword']);

            if ((0, _lodash.isEqual)(placement.newPassword, placement.confirmPassword)) {
              _context5.next = 4;
              break;
            }

            return _context5.abrupt("return", res.sendStatus(401));

          case 4:
            _context5.prev = 4;
            _context5.t0 = _lodash.pick;
            _context5.next = 8;
            return userModel.findUser(userId);

          case 8:
            _context5.t1 = _context5.sent;
            _context5.t2 = ['password'];
            userInfo = (0, _context5.t0)(_context5.t1, _context5.t2);
            _context5.next = 13;
            return _bcryptjs["default"].compare(placement.password, userInfo.password);

          case 13:
            isMatch = _context5.sent;

            if (isMatch) {
              _context5.next = 16;
              break;
            }

            return _context5.abrupt("return", res.sendStatus(400));

          case 16:
            res.sendStatus(201).send();
            _context5.next = 22;
            break;

          case 19:
            _context5.prev = 19;
            _context5.t3 = _context5["catch"](4);
            res.sendStatus(401).send();

          case 22:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[4, 19]]);
  }));
  return _changePassword.apply(this, arguments);
}