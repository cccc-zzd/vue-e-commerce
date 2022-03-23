import {reqAddOrUpdateShopCart, reqGoodsInfo} from "@/api";
//封装游客身份模块，生成一次不再变
import {getUUID} from "@/utils/uuid_token";

const state = {
  goodInfo: {},
  //游客临时身份
  uuid_token: getUUID(),
}
const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo
  }
}
const actions = {
  async getGoodInfo({commit}, skUid) {
    let result = await reqGoodsInfo(skUid);
    if (result.code == 200) {
      commit('GETGOODINFO', result.data)

    }
  },
  //将产品添加到购物车中
  async addOrUpdateShopCart({commit}, {skuId, skuNum}) {
    let result = await reqAddOrUpdateShopCart(skuId, skuNum);
    //服务器写入数据成功，并没有返回其他数据，不需要三连环
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faille'))
    }
  }
}
//getters用于简化数据
const getters = {
  /*路径导航简化的数据*/
  categoryView(state) {
    return state.goodInfo.categoryView || {};
  },
  /*简化产品信息的数据*/
  skuInfo(state) {
    return state.goodInfo.skuInfo || {};
  },
  /*产品售卖属性的简化*/
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || [];
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}