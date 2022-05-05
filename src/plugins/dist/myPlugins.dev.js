"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
//Vue插件一定暴露一个对象
var myPlugins = {};

myPlugins.install = function (Vue, options) {
  //Vue.prototype.$bus:任何组件都可以使用
  //Vue.directive():全局指令
  //Vue.component：全局组件
  //Vue.Filter 过滤器
  Vue.directive(options.name, function (element, params) {
    element.innerHTML = params.value.toUpperCase();
  });
};

var _default = myPlugins;
exports["default"] = _default;