"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeToken = exports.getToken = exports.setToken = void 0;

//对外暴露一个函数
var setToken = function setToken(token) {
  localStorage.setItem('TOKEN', token);
};

exports.setToken = setToken;

var getToken = function getToken() {
  return localStorage.getItem('TOKEN');
};

exports.getToken = getToken;

var removeToken = function removeToken() {
  localStorage.removeItem('TOKEN');
};

exports.removeToken = removeToken;