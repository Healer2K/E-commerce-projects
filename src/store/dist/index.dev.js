"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _home = _interopRequireDefault(require("./home"));

var _search = _interopRequireDefault(require("./search"));

var _index = _interopRequireDefault(require("./detail/index"));

var _shopcart = _interopRequireDefault(require("./shopcart"));

var _user = _interopRequireDefault(require("./user"));

var _trade = _interopRequireDefault(require("./trade"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 需要使用插件一次
_vue["default"].use(_vuex["default"]); //state:仓库存储数据的地方
//mutations：修改state的唯一手段
//actions：处理action，可以书写自己的业务逻辑，也可以处理异步
// 这里可以书写业务逻辑，但不能修改state
//getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
//引入小仓库


// 对外暴露Store类的一个实例
var _default = new _vuex["default"].Store({
  //实现Vuex仓库模块化开发存储数据
  modules: {
    home: _home["default"],
    search: _search["default"],
    detail: _index["default"],
    shopcart: _shopcart["default"],
    user: _user["default"],
    trade: _trade["default"]
  }
});

exports["default"] = _default;