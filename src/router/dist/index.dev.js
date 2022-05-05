"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _routes = _interopRequireDefault(require("./routes"));

var _store = _interopRequireDefault(require("../store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 配置路由
// 使用插件
_vue["default"].use(_vueRouter["default"]); //引用store 以便获取token来验证是否能对某些路由进行跳转


// 先把vueRouter原型对象的push，先保存一份
var orginPush = _vueRouter["default"].prototype.push;
var orginReplace = _vueRouter["default"].prototype.replace; // 重写push|replace

_vueRouter["default"].prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    orginPush.call(this, location, resolve, reject);
  } else {
    orginPush.call(this, location, function () {}, function () {});
  }
};

_vueRouter["default"].prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    orginReplace.call(this, location, resolve, reject);
  } else {
    orginReplace.call(this, location, function () {}, function () {});
  }
};

var router = new _vueRouter["default"]({
  // 配置路由
  routes: _routes["default"],
  //滚动行为
  scrollBehavior: function scrollBehavior(to, from, savedPosition) {
    //返回的y=0，代表的滚动条在最上方
    return {
      y: 0
    };
  }
}); //全局前置守卫：在路由跳转之前进行判断

router.beforeEach(function _callee(to, from, next) {
  var token, name, toPath;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          //to:获取到你要跳转到那个路由的信息
          // from：将要离开的路由的信息
          // next：调用方法，才能离开的钩子放行函数
          // next('/login') 放行到指定的路由    next(false)当路由发生变化时，会跳回到from的路由
          next(); //用户登录了才会有token

          token = _store["default"].state.user.token; //用户信息

          name = _store["default"].state.user.userInfo.name;

          if (!token) {
            _context.next = 25;
            break;
          }

          if (!(to.path == '/login' || to.path == '/register')) {
            _context.next = 8;
            break;
          }

          next('/');
          _context.next = 23;
          break;

        case 8:
          if (!name) {
            _context.next = 12;
            break;
          }

          next();
          _context.next = 23;
          break;

        case 12:
          _context.prev = 12;
          _context.next = 15;
          return regeneratorRuntime.awrap(_store["default"].dispatch('getUserInfo'));

        case 15:
          next();
          _context.next = 23;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](12);
          _context.next = 22;
          return regeneratorRuntime.awrap(_store["default"].dispatch('userLogout'));

        case 22:
          next('/login');

        case 23:
          _context.next = 27;
          break;

        case 25:
          //未登录：不能其交易相关、不能去支付相关（pay，paysuccess）、不能去个人中心
          //未登录去上面这些路由会跳转到login
          toPath = to.path;

          if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            next('/login?redirect=' + toPath); //记录未登录之前要去的路由，存储到地址中，待用户成功登录后直接跳转
          } else {
            //去的不是上面的路由 -- 放行
            next();
          }

        case 27:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[12, 18]]);
});
var _default = router;
exports["default"] = _default;