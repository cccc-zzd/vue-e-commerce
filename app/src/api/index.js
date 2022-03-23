//当前这个模块：对api进行统一管理
import requests from "./ajax";
import mockRequests from "./mockAjax";
import * as url from "url";
//三级联动接口
///api/product/getBaseCategoryList     get  无参数
//发请求：axios发请求返回结果Promise对象
export const reqCategoryList = () => requests({url: 'api/product/getBaseCategoryList', method: 'get'});
//当前函数执行需要把服务器返回结果

//获取banner（Home首页轮播图接口）
export const reqGetBannerList = () => mockRequests.get('/banner')
//获取floor数据
export const reqFloorList = () => mockRequests.get('/floor');
//获取搜索模块数据  请求地址：/api/list   请求方式：post   参数：需要带参数
/*
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
*/
//当前这个接口给服务器传递参数params，至少是一个空对象{}
export const reqGetSearchInfo = (params) =>
  requests({url: "api/list", method: "post", data: params});
//请求地址--/api/item/{ skuId } GET
export const reqGoodsInfo = (skuId) => requests({url: `api/item/${skuId}`, method: 'get'});
/*
export const reqGoodsInfo = (skuId)=>requests({url:`/item/${skuId}`,method:'get'});*/
//将产品添加到购物车中，获取更新某一个产品的个数
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({
  url: `/api/cart/addToCart/${skuId}/${skuNum}`,
  method: 'post'
});
//获取购物车中的数据
export const reqCartList = () => requests({url: '/api/cart/cartList', method: 'get'})
//删除购物产品的接口
export const reqDeleteCartById = (skuId) => requests({url: `/api/cart/deleteCart/${skuId}`, method: 'delete'})
//获取接口选中状态
export const reqUpdateCheckedById = (skuId, isChecked) => requests({
  url: `/api/cart/checkCart/${skuId}/${isChecked}`,
  method: 'get'
})

//获取验证码
/*/api/user/passport/sendCode/{phone}    get*/
export const reqGetCode = (phone) => requests({url: `/api/user/passport/sendCode/${phone}`, method: 'get'})

//注册
export const reqUserRegister = (data) => requests({url: '/api/user/passport/register', data, method: 'post'});

//登录
///api/user/passport/login
export const reqUserLogin = (data) => requests({url: '/api/user/passport/login', data, method: 'post'});

//获取用户信息--需要带着用户的token向服务器请求信息
///api/user/passport/auth/getUserInfo
export const reqUserInfo = () => requests({url: '/api/user/passport/auth/getUserInfo', method: 'get'});

//退出登录
///api/user/passport/logout
export const reqLogout = () => requests({url: '/api/user/passport/logout', method: 'get'})

//获取用户地址信息
export const reqAddressInfo = () => requests({url: '/api/user/userAddress/auth/findUserAddressList', method: 'get'})
//获取商品清单
export const reqOrderInfo = () => requests({url: '/api/order/auth/trade', method: 'get'})
//提交订单的接口
export const reqSubmitOrder = (tradeNo, data) => requests({
  url: `/api/order/auth/submitOrder?tradeNo=${tradeNo}`,
  data,
  method: 'post'
})
//获取支付信息
//  /api/payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId) => requests({url: `/api/payment/weixin/createNative/${orderId}`, method: 'get'})
//查询订单状态
// /api/payment/weixin/queryPayStatus/{orderId}
export const reqPayStatus = (orderId) => requests({url: `/api/payment/weixin/queryPayStatus/${orderId}`, method: 'get'})
//获取个人中心的数据
export const reqMyOrderList = (page, limit) => requests({url: `/api/order/auth/${page}/${limit}`, method: 'get'})
