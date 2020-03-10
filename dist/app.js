"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _index = _interopRequireDefault(require("./routes/index"));

require("./db/index");

var app = (0, _express["default"])();
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])());
app.use(_express["default"]["static"](_path["default"].join(__dirname, 'public')));
app.get('/pos', function (req, res) {
  res.sendFile(_path["default"].join(__dirname, 'build', 'index.html'));
}); // app.use('/pos', express.static(path.join(__dirname, 'public/dist/index.html')));

app.use(_index["default"]);
console.log(process.env.NODE_ENV); // module.exports = app;

app.listen(process.env.PORT, function () {
  console.log('app listening on port');
});