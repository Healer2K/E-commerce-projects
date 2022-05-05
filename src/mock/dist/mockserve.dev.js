"use strict";

var _mockjs = _interopRequireDefault(require("mockjs"));

var _banner = _interopRequireDefault(require("./banner.json"));

var _floor = _interopRequireDefault(require("./floor.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//先引入mockjs模块
// 把json数据格式引入进来[json数据格式根本没有对外暴露，但是可以引入]
//webpack默认对外暴露的图片、json数据格式
//mock数据 第一个参数是请求地址  第二个参数是请求的数据
_mockjs["default"].mock("/mock/banner", {
  code: 200,
  data: _banner["default"]
}); //模拟首页大轮播图的数据


_mockjs["default"].mock("/mock/floor", {
  code: 200,
  data: _floor["default"]
});