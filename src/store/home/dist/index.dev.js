"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _api = require("@/api");

var state = {
  //state中的数据默认值别瞎写，服务器返回对象，服务器返回数据  【根据接口返回值初始化的】
  categoryList: [],
  //轮播图的数据
  bannerList: [],
  //floor组件的数据
  floorList: []
};
var mutations = {
  CATEGORYLIST: function CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  GETBANNERLIST: function GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  GETFLOORLIST: function GETFLOORLIST(state, floorList) {
    state.floorList = floorList;
  }
};
var actions = {
  //通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
  categoryList: function categoryList(_ref) {
    var commit, result;
    return regeneratorRuntime.async(function categoryList$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            commit = _ref.commit;
            _context.next = 3;
            return regeneratorRuntime.awrap((0, _api.reqCategoryList)());

          case 3:
            result = _context.sent;

            // console.log(result)
            if (result.code === 200) {
              commit('CATEGORYLIST', result.data);
            }

          case 5:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  //获取首页轮播图的数据
  getBannerList: function getBannerList(_ref2) {
    var commit, result;
    return regeneratorRuntime.async(function getBannerList$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            commit = _ref2.commit;
            _context2.next = 3;
            return regeneratorRuntime.awrap((0, _api.reqGetBannerList)());

          case 3:
            result = _context2.sent;

            // console.log(result)
            if (result.code === 200) {
              commit('GETBANNERLIST', result.data);
            }

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  getFloorList: function getFloorList(_ref3) {
    var commit, result;
    return regeneratorRuntime.async(function getFloorList$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            commit = _ref3.commit;
            _context3.next = 3;
            return regeneratorRuntime.awrap((0, _api.reqFloorList)());

          case 3:
            result = _context3.sent;

            // console.log(result)
            if (result.code === 200) {
              commit('GETFLOORLIST', result.data);
            }

          case 5:
          case "end":
            return _context3.stop();
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