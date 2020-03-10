"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createVerificationCode = createVerificationCode;
exports.getVerificationCode = getVerificationCode;
exports.deleteCode = deleteCode;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _index = _interopRequireDefault(require("../db/index"));

/* eslint no-useless-catch: "off" */
function createVerificationCode(_x) {
  return _createVerificationCode.apply(this, arguments);
}

function _createVerificationCode() {
  _createVerificationCode = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(replacements) {
    var sql, createRes;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            sql = "\n      INSERT INTO verification_email(\n        email,\n        code\n      ) VALUES (\n        :email,\n        :code\n      )\n    ";
            _context.next = 4;
            return _index["default"].query(sql, {
              replacements: replacements,
              type: _sequelize.QueryTypes.INSERT
            });

          case 4:
            createRes = _context.sent;
            return _context.abrupt("return", createRes[1]);

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));
  return _createVerificationCode.apply(this, arguments);
}

function getVerificationCode(_x2) {
  return _getVerificationCode.apply(this, arguments);
}

function _getVerificationCode() {
  _getVerificationCode = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(replacements) {
    var sql, selectRes;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            sql = 'SELECT * from verification_email WHERE email = :email';
            _context2.next = 4;
            return _index["default"].query(sql, {
              replacements: replacements,
              type: _sequelize.QueryTypes.SELECT
            });

          case 4:
            selectRes = _context2.sent;
            return _context2.abrupt("return", selectRes);

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
  return _getVerificationCode.apply(this, arguments);
}

function deleteCode(_x3) {
  return _deleteCode.apply(this, arguments);
}

function _deleteCode() {
  _deleteCode = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(replacements) {
    var sql;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            sql = "\n      DELETE FROM verification_email\n      WHERE email = :email\n  ";
            _context3.next = 4;
            return _index["default"].query(sql, {
              replacements: replacements,
              type: _sequelize.QueryTypes.DELETE
            });

          case 4:
            return _context3.abrupt("return", true);

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            throw _context3.t0;

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return _deleteCode.apply(this, arguments);
}