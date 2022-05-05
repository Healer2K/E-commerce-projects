"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _api = require("@/api");

var _api2 = require("../../api");

var state = {
  cartList: []
};
var mutations = {
  GETCARTLIST: function GETCARTLIST(state, cartList) {
    state.cartList = cartList;
  }
};
var actions = {
  // 获取购物车列表数据
  getCartList: function getCartList(_ref) {
    var commit, result;
    return regeneratorRuntime.async(function getCartList$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            commit = _ref.commit;
            _context.next = 3;
            return regeneratorRuntime.awrap((0, _api.reqCartList)());

          case 3:
            result = _context.sent;

            //测试是否能获取个人购物车的数据
            if (result.code == 200) {
              commit('GETCARTLIST', result.data);
            }

          case 5:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  //删除购物车的某个产品
  deleteCartListBySkuId: function deleteCartListBySkuId(_ref2, skuId) {
    var commit, result;
    return regeneratorRuntime.async(function deleteCartListBySkuId$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            commit = _ref2.commit;
            _context2.next = 3;
            return regeneratorRuntime.awrap((0, _api.reqDeleteCartById)(skuId));

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
  //修改购物车某一个产品的选中状态
  updateCheckedById: function updateCheckedById(_ref3, _ref4) {
    var commit, skuId, isChecked, result;
    return regeneratorRuntime.async(function updateCheckedById$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            commit = _ref3.commit;
            skuId = _ref4.skuId, isChecked = _ref4.isChecked;
            _context3.next = 4;
            return regeneratorRuntime.awrap((0, _api2.reqUpdateCheckedById)(skuId, isChecked));

          case 4:
            result = _context3.sent;

            if (!(result.code == 200)) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", 'ok');

          case 9:
            return _context3.abrupt("return", Promise.reject(new Error('failed')));

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  //删除全部勾选的产品
  deleteAllCheckedCart: function deleteAllCheckedCart(_ref5) {
    var dispatch = _ref5.dispatch,
        getters = _ref5.getters;
    //context:小仓库，commit【提交mutations修改state】 getters【计算属性】 dispatch【派发action】 state【当前仓库数据】
    var PromiseAll = [];
    getters.cartList.cartInfoList.forEach(function (item) {
      var promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : "";
      PromiseAll.push(promise);
    }); //只要全部p1,p2,...都成功，返回的结果即为成功
    //如果有一个失败，返回的即是失败的结果

    return Promise.all(PromiseAll);
  },
  //修改全部产品的状态
  updateAllCartIsChecked: function updateAllCartIsChecked(_ref6, isChecked) {
    var dispatch = _ref6.dispatch,
        state = _ref6.state;
    var PromiseAll = [];
    state.cartList[0].cartInfoList.forEach(function (item) {
      var promise = dispatch('updateCheckedById', {
        skuId: item.skuId,
        isChecked: isChecked
      });
      PromiseAll.push(promise);
    });
    return Promise.all(PromiseAll);
  }
};
var getters = {
  cartList: function cartList(state) {
    return state.cartList[0] || {};
  } // cartInfoList(state){
  //     //计算出来购物车数据
  //     return 
  // }

};
var _default = {
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
};
exports["default"] = _default;