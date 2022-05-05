"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _TypeNav = _interopRequireDefault(require("./components/TypeNav/"));

var _Carousel = _interopRequireDefault(require("./components/Carousel"));

var _Pagination = _interopRequireDefault(require("./components/Pagination"));

var _elementUi = require("element-ui");

require("./mock/mockServe");

require("swiper/css/swiper.css");

var _router = _interopRequireDefault(require("@/router"));

var _store = _interopRequireDefault(require("./store"));

var API = _interopRequireWildcard(require("@/api"));

var _ = _interopRequireDefault(require("@/assets/1.png"));

var _vueLazyload = _interopRequireDefault(require("vue-lazyload"));

var _myPlugins = _interopRequireDefault(require("@/plugins/myPlugins"));

require("@/plugins/validate");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//三级联动组件---全局组件
//全局组件：第一个参数：全局组件的名字  第二个参数：哪一个组件
_vue["default"].component(_TypeNav["default"].name, _TypeNav["default"]);

_vue["default"].component(_Carousel["default"].name, _Carousel["default"]);

_vue["default"].component(_Pagination["default"].name, _Pagination["default"]); //注册全局组件


_vue["default"].component(_elementUi.Button.name, _elementUi.Button); //ElementUI注册组件的时候，还有一种写法，挂在原型上


_vue["default"].prototype.$msgbox = _elementUi.MessageBox;
_vue["default"].prototype.$alert = _elementUi.MessageBox.alert; //引入MockServe.js   mock数据

_vue["default"].config.productionTip = false; // 引用路由

//注册插件
_vue["default"].use(_vueLazyload["default"], {
  //懒加载默认的图片
  loading: _["default"]
}); //引入自定义插件


_vue["default"].use(_myPlugins["default"], {
  name: 'upper'
}); //引入表单校验插件


new _vue["default"]({
  render: function render(h) {
    return h(_App["default"]);
  },
  //全局事件总线$bus配置
  beforeCreate: function beforeCreate() {
    _vue["default"].prototype.$bus = this;
    _vue["default"].prototype.$API = API;
  },
  // 注册路由
  router: _router["default"],
  // 注册仓库:组件实例的身上会多一个属性$store
  store: _store["default"]
}).$mount('#app');