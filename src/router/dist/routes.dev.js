"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Login = _interopRequireDefault(require("@/views/Login"));

var _Register = _interopRequireDefault(require("@/views/Register"));

var _Detail = _interopRequireDefault(require("@/views/Detail"));

var _AddCartSuccess = _interopRequireDefault(require("@/views/AddCartSuccess"));

var _ShopCart = _interopRequireDefault(require("../views/ShopCart"));

var _Trade = _interopRequireDefault(require("@/views/Trade"));

var _Pay = _interopRequireDefault(require("@/views/Pay"));

var _PaySuccess = _interopRequireDefault(require("@/views/PaySuccess"));

var _Center = _interopRequireDefault(require("@/views/Center"));

var _myOrder = _interopRequireDefault(require("@/views/Center/myOrder"));

var _groupOrder = _interopRequireDefault(require("@/views/Center/groupOrder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* 
    ???????????????????????????JavaScript ??????????????????????????????????????????
    ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
*/
// ??????????????????
var _default = [{
  path: '/center',
  component: _Center["default"],
  meta: {
    show: true
  },
  //??????????????????
  children: [{
    path: 'myorder',
    component: _myOrder["default"]
  }, {
    path: 'grouporder',
    component: _groupOrder["default"]
  }, {
    path: '/center',
    redirect: '/center/myorder'
  }]
}, {
  path: '/paysuccess',
  component: _PaySuccess["default"],
  meta: {
    show: true
  },
  beforeEnter: function beforeEnter(to, from, next) {
    if (from.path == '/pay') {
      next();
    } else {
      next(false);
    }
  }
}, {
  path: '/home',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/Home'));
    });
  },
  meta: {
    show: true
  }
}, {
  path: '/search/:keyword?',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/Search'));
    });
  },
  meta: {
    show: true
  },
  name: "search"
}, {
  path: '/login',
  component: _Login["default"],
  meta: {
    show: false
  }
}, {
  path: '/register',
  component: _Register["default"],
  meta: {
    show: false
  }
}, {
  path: '/detail/:skuid',
  component: _Detail["default"],
  meta: {
    show: true
  }
}, {
  path: '/addcartsuccess',
  name: 'addcartsuccess',
  component: _AddCartSuccess["default"],
  meta: {
    show: true
  }
}, {
  path: '/shopcart',
  component: _ShopCart["default"],
  meta: {
    show: true
  }
}, {
  path: '/trade',
  component: _Trade["default"],
  meta: {
    show: true
  },
  //??????????????????
  beforeEnter: function beforeEnter(to, from, next) {
    if (from.path == '/shopcart') {
      next();
    } else {
      next(false);
    }
  }
}, {
  path: '/pay',
  component: _Pay["default"],
  meta: {
    show: true
  },
  beforeEnter: function beforeEnter(to, from, next) {
    if (from.path == '/trade') {
      next();
    } else {
      next(false);
    }
  }
}, {
  // ????????? ????????????????????????????????????/??????????????????????????????
  path: '*',
  redirect: "/home"
}];
exports["default"] = _default;