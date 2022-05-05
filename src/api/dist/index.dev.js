"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reqMyOrderList = exports.reqPayStatus = exports.reqPayInfo = exports.reqSubmitOrder = exports.reqOrderInfo = exports.reqAddressInfo = exports.reqLogout = exports.reqUserInfo = exports.reqUserLogin = exports.reqUserRegister = exports.reqGetCode = exports.reqUpdateCheckedById = exports.reqDeleteCartById = exports.reqCartList = exports.reqAddOrUpdateShopCart = exports.reqGoodsInfo = exports.reqGetSearchInfo = exports.reqFloorList = exports.reqGetBannerList = exports.reqCategoryList = void 0;

var _ajax = _interopRequireDefault(require("./ajax"));

var _mockAjax = _interopRequireDefault(require("./mockAjax"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//对api进行统一管理
// 三级联动接口
// /api/product/getBaseCategoryList     get
var reqCategoryList = function reqCategoryList() {
  // 发请求 axios发送请求返回结果Promise对象
  return (0, _ajax["default"])({
    url: '/product/getBaseCategoryList',
    method: 'get'
  });
}; // 获取banner （home首页轮播图接口）


exports.reqCategoryList = reqCategoryList;

var reqGetBannerList = function reqGetBannerList() {
  return _mockAjax["default"].get('/banner');
}; //  获取floor数据


exports.reqGetBannerList = reqGetBannerList;

var reqFloorList = function reqFloorList() {
  return _mockAjax["default"].get('/floor');
}; //  获取搜索模块数据    请求地址：/api/list   请求方式：post  需要带参数
//  当前这个接口，给服务器传递参数params，至少是一个空对象


exports.reqFloorList = reqFloorList;

var reqGetSearchInfo = function reqGetSearchInfo(params) {
  return (0, _ajax["default"])({
    url: '/list',
    method: 'post',
    data: params
  });
}; //获取产品详情信息的接口 URL: /api/item/{skuId}  请求方式：get


exports.reqGetSearchInfo = reqGetSearchInfo;

var reqGoodsInfo = function reqGoodsInfo(skuId) {
  return (0, _ajax["default"])({
    url: "/item/".concat(skuId),
    method: 'get'
  });
}; //将产品添加到购物车中 （获取更新某一个产品的个数）


exports.reqGoodsInfo = reqGoodsInfo;

var reqAddOrUpdateShopCart = function reqAddOrUpdateShopCart(skuId, skuNum) {
  return (0, _ajax["default"])({
    url: "/cart/addToCart/".concat(skuId, "/").concat(skuNum),
    method: 'POST'
  });
}; //获取购物车列表数据接口
///api/cart/cartList method：get


exports.reqAddOrUpdateShopCart = reqAddOrUpdateShopCart;

var reqCartList = function reqCartList() {
  return (0, _ajax["default"])({
    url: '/cart/cartList',
    method: 'get'
  });
}; //删除购物车产品的接口
// /api/cart/deleteCart/{skuId}  method：delete


exports.reqCartList = reqCartList;

var reqDeleteCartById = function reqDeleteCartById(skuId) {
  return (0, _ajax["default"])({
    url: "/cart/deleteCart/".concat(skuId),
    method: 'DELETE'
  });
}; //修改商品的选中状态
// /api/cart/checkCart/{skuID}/{isChecked} method ：get


exports.reqDeleteCartById = reqDeleteCartById;

var reqUpdateCheckedById = function reqUpdateCheckedById(skuId, isChecked) {
  return (0, _ajax["default"])({
    url: "/cart/checkCart/".concat(skuId, "/").concat(isChecked),
    method: 'get'
  });
}; //获取验证码
//URL:/api/user/passport/sendCode/{phone}  get


exports.reqUpdateCheckedById = reqUpdateCheckedById;

var reqGetCode = function reqGetCode(phone) {
  return (0, _ajax["default"])({
    url: "/user/passport/sendCode/".concat(phone),
    method: 'get'
  });
}; //注册
//URL /api/user/passport/register post    phone、code、password


exports.reqGetCode = reqGetCode;

var reqUserRegister = function reqUserRegister(data) {
  return (0, _ajax["default"])({
    url: "/user/passport/register",
    data: data,
    method: 'post'
  });
}; //登录
// url /api/user/passport/login post     phone，password


exports.reqUserRegister = reqUserRegister;

var reqUserLogin = function reqUserLogin(data) {
  return (0, _ajax["default"])({
    url: '/user/passport/login',
    method: 'post',
    data: data
  });
}; //获取用户信息 需要带用户的token向服务器要用户信息
//URL /user/passport/auth/getUserInfo   method-get


exports.reqUserLogin = reqUserLogin;

var reqUserInfo = function reqUserInfo() {
  return (0, _ajax["default"])({
    url: '/user/passport/auth/getUserInfo',
    method: 'get'
  });
}; //退出登录
//URL /user/passport/logout   get


exports.reqUserInfo = reqUserInfo;

var reqLogout = function reqLogout() {
  return (0, _ajax["default"])({
    url: '/user/passport/logout',
    method: 'get'
  });
}; //获取用户的地址信息


exports.reqLogout = reqLogout;

var reqAddressInfo = function reqAddressInfo() {
  return (0, _ajax["default"])({
    url: '/user/userAddress/auth/findUserAddressList',
    method: "GET"
  });
}; //获取商品清单
//url /api/order/auth/trade method：get


exports.reqAddressInfo = reqAddressInfo;

var reqOrderInfo = function reqOrderInfo() {
  return (0, _ajax["default"])({
    url: '/order/auth/trade',
    method: 'GET'
  });
}; //提交订单的接口
//URL /api/order/auth/submitOrder?tradeNo={tradeNo} method：post


exports.reqOrderInfo = reqOrderInfo;

var reqSubmitOrder = function reqSubmitOrder(tradeNo, data) {
  return (0, _ajax["default"])({
    url: "/order/auth/submitOrder?tradeNo=".concat(tradeNo),
    data: data,
    method: 'POST'
  });
}; //获取支付信息
// url：/api/payment/weixin/createNative/{orderId} GET


exports.reqSubmitOrder = reqSubmitOrder;

var reqPayInfo = function reqPayInfo(orderId) {
  return (0, _ajax["default"])({
    url: "/payment/weixin/createNative/".concat(orderId),
    method: 'GET'
  });
}; //获取支付订单状态
// URL /api/payment/weixin/queryPayStatus/{orderId} method：get


exports.reqPayInfo = reqPayInfo;

var reqPayStatus = function reqPayStatus(orderId) {
  return (0, _ajax["default"])({
    url: "/payment/weixin/queryPayStatus/".concat(orderId),
    method: 'get'
  });
}; //获取个人中心的数据
// URL /api/order/auth/{page}/{limit} method get


exports.reqPayStatus = reqPayStatus;

var reqMyOrderList = function reqMyOrderList(page, limit) {
  return (0, _ajax["default"])({
    url: "/order/auth/".concat(page, "/").concat(limit),
    method: 'get'
  });
};

exports.reqMyOrderList = reqMyOrderList;