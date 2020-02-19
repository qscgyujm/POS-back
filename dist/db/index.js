"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var sequelize = new _sequelize.Sequelize({
  host: process.env.DB_HOST,
  database: process.env.DB_DB,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dialect: 'mariadb'
});
sequelize.authenticate().then(function () {
  console.log('DB connected');
})["catch"](function () {
  console.log('Connect DB Error');
  process.exit(1);
});
var _default = sequelize;
exports["default"] = _default;