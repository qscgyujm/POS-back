"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

// multer
// https://www.npmjs.com/package/multer
// Issue:
// Q1: form-data can't find body
// A1: https://medium.com/cubemail88/node-js-express-js-body-parser-%E8%99%95%E7%90%86multipart-form-data%E7%9A%84%E8%A7%A3%E6%B1%BA%E6%96%B9%E6%A1%88-d89d2699b9f
//  store path
var fileStorage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, _path["default"].join("".concat(__dirname, "/../public/images")));
  },
  filename: function filename(req, file, cb) {
    cb(null, "".concat(new Date().getMilliseconds().toString(), "-").concat(file.originalname));
  }
});

var fileFilter = function fileFilter(req, file, cb) {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var _default = (0, _multer["default"])({
  storage: fileStorage,
  fileFilter: fileFilter
}).single('image'); // export default (req, res, next) => {
//   const upload = multer({
//     storage: fileStorage,
//     fileFilter,
//   }).single('image');
//   return upload(req, res, (error) => {
//     if (error) {
//       console.log('error', error);
//     }
//     next();
//   });
// };


exports["default"] = _default;