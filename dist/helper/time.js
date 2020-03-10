"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTime = void 0;

/* eslint-disable import/prefer-default-export */
var getTime = function getTime() {
  return new Date().toISOString().slice(0, -1);
}; // Remove last char 'Z'


exports.getTime = getTime;