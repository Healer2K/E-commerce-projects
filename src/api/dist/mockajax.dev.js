"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _nprogress = _interopRequireDefault(require("nprogress"));

require("nprogress/nprogress.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//对于axios进行二次封装
// 引入进度条
// 引入进度条样式
// 1.利用axios对象的方法create 去创建一个axios实例
// 2.request就是axios，只不过可以稍微配置一下
var requests = _axios["default"].create({
  // 配置对象
  // 基础路径，发请求时，路径当中会出现挨api
  baseURL: "/mock",
  // 代表请求超时的时间5s
  timeout: 5000
}); // 请求拦截器：在发请求之前，可以做一些处理


requests.interceptors.request.use(function (config) {
  // config:配置对象，对象里面有一个属性很重要，header请求头
  // 进度条开始动
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