"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUUID = void 0;

var _uuid = require("uuid");

var getUUID = function getUUID() {
  //先从本地存储获取UUID
  var uuid_token = localStorage.getItem('UUIDTOKEN'); //如果没有生成

  if (!uuid_token) {
    //生成游客临时身份
    uuid_token = (0, _uuid.v4)(); // 本地存储一次

    localStorage.setItem('UUIDTOKEN', uuid_token);
  }

  return uuid_token;
};

exports.getUUID = getUUID;