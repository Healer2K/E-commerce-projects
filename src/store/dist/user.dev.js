"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _api = require("../api");

var _token = require("../utils/token");

//登录与注册的模块
var state = {
  code: '',
  token: (0, _token.getToken)(),
  userInfo: {}
};
var mutations = {
  GETCODE: function GETCODE(state, code) {
    state.code = code;
  },
  USERLOGIN: function USERLOGIN(state, token) {
    state.token = token;
  },
  GETUSERINFO: function GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  //退出登录时清除本地数据
  CLEAR: function CLEAR(state) {
    //把仓库中相关信息清空
    state.token = '';
    state.userInfo = {}; //把本地存储的token清空

    (0, _token.removeToken)();
  }
};
var actions = {
  //获取验证码
  getCode: function getCode(_ref, phone) {
    var commit, result;
    return regeneratorRuntime.async(function getCode$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            commit = _ref.commit;
            _context.next = 3;
            return regeneratorRuntime.awrap((0, _api.reqGetCode)(phone));

          case 3:
            result = _context.sent;

            if (!(result.code == 200)) {
              _context.next = 9;
              break;
            }

            commit('GETCODE', result.data);
            return _context.abrupt("return", 'ok');

          case 9:
            return _context.abrupt("return", Promise.reject(new Error('failed')));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  //用户注册
  userRegister: function userRegister(_ref2, user) {
    var commit, result;
    return regeneratorRuntime.async(function userRegister$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            commit = _ref2.commit;
            _context2.next = 3;
            return regeneratorRuntime.awrap((0, _api.reqUserRegister)(user));

          case 3:
            result = _context2.sent;

            if (!(result.code == 200)) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", 'ok');

          case 8:
            return _context2.abrupt("return", Promise.reject(new Error('failed')));

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  //登录业务 token
  userLogin: function userLogin(_ref3, data) {
    var commit, result;
    return regeneratorRuntime.async(function userLogin$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            commit = _ref3.commit;
            _context3.next = 3;
            return regeneratorRuntime.awrap((0, _api.reqUserLogin)(data));

          case 3:
            result = _context3.sent;

            if (!(result.code == 200)) {
              _context3.next = 10;
              break;
            }

            commit('USERLOGIN', result.data.token); // 持久化存储token

            (0, _token.setToken)(result.data.token);
            return _context3.abrupt("return", 'ok');

          case 10:
            return _context3.abrupt("return", Promise.reject(new Error('failed')));

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  //获取用户信息 通过token
  getUserInfo: function getUserInfo(_ref4) {
    var commit, result;
    return regeneratorRuntime.async(function getUserInfo$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            commit = _ref4.commit;
            _context4.next = 3;
            return regeneratorRuntime.awrap((0, _api.reqUserInfo)());

          case 3:
            result = _context4.sent;

            if (!(result.code == 200)) {
              _context4.next = 9;
              break;
            }

            //提交用户信息
            commit('GETUSERINFO', result.data);
            return _context4.abrupt("return", 'ok');

          case 9:
            return _context4.abrupt("return", Promise.reject(new Error('failed')));

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    });
  },
  //退出登录
  userLogout: function userLogout(_ref5) {
    var commit, result;
    return regeneratorRuntime.async(function userLogout$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            commit = _ref5.commit;
            _context5.next = 3;
            return regeneratorRuntime.awrap((0, _api.reqLogout)());

          case 3:
            result = _context5.sent;

            if (!(result.code == 200)) {
              _context5.next = 9;
              break;
            }

            commit('CLEAR');
            return _context5.abrupt("return", 'ok');

          case 9:
            return _context5.abrupt("return", Promise.reject(new Error('failed')));

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    });
  }
};
var getters = {};
var _default = {
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
};
exports["default"] = _default;