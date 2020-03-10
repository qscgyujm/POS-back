"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findUser = findUser;
exports.findUserByEmail = findUserByEmail;
exports.updateUser = updateUser;
exports.createUser = createUser;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _index = _interopRequireDefault(require("../db/index"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function findUser(_x) {
  return _findUser.apply(this, arguments);
}

function _findUser() {
  _findUser = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(userId) {
    var sql, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            sql = 'SELECT * from users WHERE id = :id';
            _context.next = 4;
            return _index["default"].query(sql, {
              replacements: {
                id: userId
              },
              type: _sequelize.QueryTypes.SELECT
            });

          case 4:
            user = _context.sent;
            console.log('findUser', user);
            return _context.abrupt("return", user[0]);

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));
  return _findUser.apply(this, arguments);
}

function findUserByEmail(_x2) {
  return _findUserByEmail.apply(this, arguments);
}

function _findUserByEmail() {
  _findUserByEmail = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(email) {
    var sql, user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            sql = 'SELECT * from users WHERE email = :email';
            _context2.next = 4;
            return _index["default"].query(sql, {
              replacements: {
                email: email
              },
              type: _sequelize.QueryTypes.SELECT
            });

          case 4:
            user = _context2.sent;
            return _context2.abrupt("return", user);

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            throw _context2.t0;

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return _findUserByEmail.apply(this, arguments);
}

function updateUser(_x3, _x4) {
  return _updateUser.apply(this, arguments);
}

function _updateUser() {
  _updateUser = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(id, placement) {
    var sql, updatedRes;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            sql = "\n    UPDATE users\n    SET\n      name = :name,\n      location= :location,\n      updatedAt= :updatedAt\n    WHERE id = :id\n  ";
            _context3.prev = 1;
            _context3.next = 4;
            return _index["default"].query(sql, {
              replacements: _objectSpread({
                id: id
              }, placement, {
                updatedAt: new Date().toISOString().slice(0, -1) // Remove last char 'Z'

              }),
              type: _sequelize.QueryTypes.UPDATE
            });

          case 4:
            updatedRes = _context3.sent;
            console.log(updatedRes);
            return _context3.abrupt("return", updatedRes[1]);

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](1);
            return _context3.abrupt("return", _context3.t0);

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 9]]);
  }));
  return _updateUser.apply(this, arguments);
}

function createUser(_x5) {
  return _createUser.apply(this, arguments);
}

function _createUser() {
  _createUser = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(placement) {
    var sql, user;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            sql = "\n    INSERT INTO users(\n      email,\n      password,\n      name,\n      createdAt,\n      updatedAt\n    ) VALUES (\n      :email,\n      :password,\n      :name,\n      NOW(),\n      NOW()\n    )\n  ";
            _context4.next = 3;
            return _index["default"].query(sql, {
              replacements: _objectSpread({}, placement, {
                createdAt: new Date().toISOString().slice(0, -1),
                // Remove last char 'Z'
                updatedAt: new Date().toISOString().slice(0, -1)
              }),
              type: _sequelize.QueryTypes.INSERT
            });

          case 3:
            user = _context4.sent;
            return _context4.abrupt("return", user[1]);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _createUser.apply(this, arguments);
}