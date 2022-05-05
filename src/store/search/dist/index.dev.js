"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _api = require("@/api");

var state = {
  // 仓库初始状态
  searchList: {}
};
var mutations = {
  GETSEARCHLIST: function GETSEARCHLIST(state, searchList) {
    state.searchList = searchList;
  }
};
var actions = {
  //获取search模块数据
  getSearchList: function getSearchList(_ref) {
    var commit,
        params,
        result,
        _args = arguments;
    return regeneratorRuntime.async(function getSearchList$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            commit = _ref.commit;
            params = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            _context.next = 4;
            return regeneratorRuntime.awrap((0, _api.reqGetSearchInfo)(params));

          case 4:
            result = _context.sent;

            if (result.code === 200) {
              commit('GETSEARCHLIST', result.data);
            }

          case 6:
          case "end":
            return _context.stop();
        }
      }
    });
  }
}; // 计算属性：在项目当中，为了简化数据而生  项目当中getters主要作用是：简化仓库中的数据

var getters = {
  //     //当前形参的state，当前仓库中的state，并非大仓库中的那个state
  goodsList: function goodsList(state) {
    //state.searchList.goodsList如果数据回来是一个数组，假如网络不给力，就会返回undefined 因此加个空数组
    return state.searchList.goodsList || [];
  },
  trademarkList: function trademarkList(state) {
    return state.searchList.trademarkList || [];
  },
  attrsList: function attrsList(state) {
    return state.searchList.attrsList || [];
  }
};
var _default = {
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
};
exports["default"] = _default;