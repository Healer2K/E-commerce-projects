"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _api = require("@/api");

var _uuid_token = require("@/utils/uuid_token");

//封装了游客身份模块uuid--》生成一个随机字符串（生成后不能改变）
var state = {
  goodInfo: {},
  // 游客的临时身份
  uuid_token: (0, _uuid_token.getUUID)(),
  skuInfo: {},
  spuSaleAttrList: []
};
var mutations = {
  GETGOODINFO: function GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo;
  }
};
var actions = {
  // 获取产品信息的action
  getGoodInfo: function getGoodInfo(_ref, skuId) {
    var commit, result;
    return regeneratorRuntime.async(function getGoodInfo$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            commit = _ref.commit;
            _context.next = 3;
            return regeneratorRuntime.awrap((0, _api.reqGoodsInfo)(skuId));

          case 3:
            result = _context.sent;

            if (result.code == 200) {
              commit('GETGOODINFO', result.data);
            }

          case 5:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  //将产品添加到购物车中
  AddOrUpdateShopCart: function AddOrUpdateShopCart(_ref2, _ref3) {
    var commit, skuId, skuNum, result;
    return regeneratorRuntime.async(function AddOrUpdateShopCart$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            commit = _ref2.commit;
            skuId = _ref3.skuId, skuNum = _ref3.skuNum;
            _context2.next = 4;
            return regeneratorRuntime.awrap((0, _api.reqAddOrUpdateShopCart)(skuId, skuNum));

          case 4:
            result = _context2.sent;

            if (!(result.code == 200)) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", 'ok');

          case 9:
            return _context2.abrupt("return", Promise.reject(new Error('failed')));

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
}; //简化数据而生

var getters = {
  //路径导航简化的数据
  categoryView: function categoryView(state) {
    //比如说：state.goodInfo初始状态空对象，空对象的categoryView属性值是undefined
    //当前计算出的categoryview属性值至少是一个空对象，假的报错就不存在了
    return state.goodInfo.categoryView || {};
  },
  //简化产品信息的数据
  skuInfo: function skuInfo(state) {
    return state.goodInfo.skuInfo || {};
  },
  //产品售卖属性的简化
  spuSaleAttrList: function spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || [];
  }
};
var _default = {
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
};
exports["default"] = _default;