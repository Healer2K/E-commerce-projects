"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _api = require("../api");

var state = {
  address: [],
  orderInfo: {}
};
var mutations = {
  GETUSERADDRESS: function GETUSERADDRESS(state, address) {
    state.address = address;
  },
  GETORDERINFO: function GETORDERINFO(state, orderInfo) {
    state.orderInfo = orderInfo;
  }
};
var actions = {
  //获取用户地址信息
  getUserAddress: function getUserAddress(_ref) {
    var commit, result;
    return regeneratorRuntime.async(function getUserAddress$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            commit = _ref.commit;
            _context.next = 3;
            return regeneratorRuntime.awrap((0, _api.reqAddressInfo)());

          case 3:
            result = _context.sent;

            if (result.code == 200) {
              commit('GETUSERADDRESS', result.data);
            }

          case 5:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  //获取用户商品清单数据
  getOrderInfo: function getOrderInfo(_ref2) {
    var commit, result;
    return regeneratorRuntime.async(function getOrderInfo$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            commit = _ref2.commit;
            _context2.next = 3;
            return regeneratorRuntime.awrap((0, _api.reqOrderInfo)());

          case 3:
            result = _context2.sent;

            if (result.code == 200) {
              commit('GETORDERINFO', result.data);
            }

          case 5:
          case "end":
            return _context2.stop();
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