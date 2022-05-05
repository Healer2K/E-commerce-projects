"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _nprogress = _interopRequireWildcard(require("nprogress"));

require("nprogress/nprogress.css");

var _store = _interopRequireDefault(require("@/store"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//对于axios进行二次封装
// 引入进度条
// 引入进度条样式
// 在当前模块中引入store
// 1.利用axios对象的方法create 去创建一个axios实例
// 2.request就是axios，只不过可以稍微配置一下
var requests = _axios["default"].create({
  // 配置对象
  // 基础路径，发请求时，路径当中会出现挨api
  baseURL: "/api",
  // 代表请求超时的时间5s
  timeout: 5000
}); // 请求拦截器：在发请求之前，可以做一些处理


requests.interceptors.request.use(function (config) {
  // config:配置对象，对象里面有一个属性很重要，header请求头
  // 进度条开始动
  if (_store["default"].state.detail.uuid_token) {
    //请求头添加一个字段(userTempId)：和后台商量好的
    config.headers.userTempId = _store["default"].state.detail.uuid_token;
  } //需要携带token给服务器


  if (_store["default"].state.user.token) {
    config.headers.token = _store["default"].state.user.token;
  }

  _nprogress["default"].start();

  return config;
}); //响应拦截器

requests.interceptors.response.use(function (res) {
  // 成功的回调函数
  // 进度条结束
  _nprogress["default"].done();

  return res.data;
}, function (err) {
  // 服务器响应失败的回调函数
  return Promise.reject(new Error(err));
}); // 对外暴露

var _default = requests;
exports["default"] = _default;