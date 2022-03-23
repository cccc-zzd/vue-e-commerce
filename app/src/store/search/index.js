import {reqGetSearchInfo} from "@/api"
//search模块的小仓库
const state = {
  //仓库初始状态
  searchList: {}
};
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList;
  }
};
const actions = {
  //获取search模块数据
  async getSearchList({commit}, params = {}) {
    //params形参，
    let result = await reqGetSearchInfo(params);
    if (result.code == 200) {
      commit("GETSEARCHLIST", result.data)
    }

  }
};
//getters是计算属性，为了简化数据
const getters = {
  //当前形参state，是当前仓库的state，不是大仓库的state
  goodsList(state) {
    /*return a&&b如果a为true，则返回b，否则返回a；
      return a||b 如果a为true，则返回a，否则返回b；
      return a,b,c 返回c，就是返回最后一个；*/
    return state.searchList.goodsList || [];
  },
  trademarkList(state) {
    return state.searchList.trademarkList;
  },
  attrsList(state) {
    return state.searchList.attrsList;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}