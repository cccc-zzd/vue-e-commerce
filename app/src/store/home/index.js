import {reqCategoryList, reqGetBannerList, reqFloorList} from '@/api';
//home模块的小仓库
const state = {
  //home仓库中存储三级菜单的数据
  categoryList: [],
  //轮播图的数据
  bannerList: [],
  //floor组件的数据
  floorList: []

};
//mutations是唯一修改state的地方
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList.slice(0, 16)
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList
  }

};
//用户处理派发action，可以书写异步语句、业务逻辑
const actions = {
  //通过 api里面的接口函数调用，想服务器发送请求，获取服务器的数据
  async categoryList({commit}) {
    let result = await reqCategoryList();
    if (result.code == 200) {
      commit("CATEGORYLIST", result.data);
    }
  },
  //获取首页轮播图的数据
  async getBannerList({commit}) {
    let result = await reqGetBannerList();
    if (result.code == 200) {
      commit("GETBANNERLIST", result.data);
    }
  },
  //获取floor数据
  async getFloorList({commit}) {
    let result = await reqFloorList();
    if (result.code == 200) {
      commit("GETFLOORLIST", result.data);
    }
  }


};
//计算属性
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters
}