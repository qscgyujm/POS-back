"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _default =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res, next) {
    var token, isLogin;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = req.get('Authorization');

            if (token) {
              _context.next = 4;
              break;
            }

            res.sendStatus(401).send('no token');
            return _context.abrupt("return");

          case 4:
            _context.next = 6;
            return _jsonwebtoken["default"].verify(token, process.env.APP_KEY);

          case 6:
            isLogin = _context.sent;

            if (isLogin) {
              _context.next = 10;
              break;
            }

            res.sendStatus(410);
            return _context.abrupt("return");

          case 10:
            console.log(isLogin);
            req.userId = isLogin.userId;
            next();

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;