import {reqCartList, reqDeleteCartById, reqUpdateCheckedById} from "@/api";

const state = {
  cartList: []
};
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList;
  }
};
const actions = {
    //获取购物车列表数据
    async getCartList({commit}) {
      let result = await reqCartList();
      if (result.code == 200) {
        commit('GETCARTLIST', result.data)
      }

    },
    //删除购物车某一产品
    async deleteCartListBySkuId({commit}, skuId) {
      let result = await reqDeleteCartById(skuId);
      if (result.code == 200) {
        return 'ok';
      } else {
        return Promise.reject(new Error('faile'))
      }
    },
    //修改购物车中某一产品的选中状态
    async updateCheckedById({commit}, {skuId, isChecked}) {
      let result = await reqUpdateCheckedById(skuId, isChecked);
      if (result.code == 200) {
        return 'ok';
      } else {
        return Promise.reject(new Error('faile'));
      }
    },
    //删除全部勾选的产品
    deleteAllCheckedCart({dispatch, getters}) {
      let PromiseAll = [];
      //context：小仓库
      //获取购物车中的全部产品
      getters.cartList.cartInfoList.forEach(item => {
        let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : '';
        PromiseAll.push(promise);
      });
      //都成功即成功，有一个失败就失败
      return Promise.all(PromiseAll);

    },
    //修改全部产品的状态
    updateAllCartIsChecked({dispatch, state}, isChecked) {

      /*let promiseAll = [];
      state.cartList[0].cartInfoList.forEach(item => {
        let promise = dispatch('updateCheckedById', {
          skuId: item.skuId,
          isChecked: isChecked
        });
        promiseAll.push(promise);
        return Promise.all(promiseAll);
      })*/
      let promiseAll = [];
      state.cartList[0].cartInfoList.forEach((item) => {
        let promise = dispatch("updateCheckedById", {
          skuId: item.skuId,
          isChecked,
        });
        promiseAll.push(promise);
      });
      //最终返回结果
      return Promise.all(promiseAll);


    }
  }
;
const getters = {
  cartList(state) {
    return state.cartList[0] || {};
  },
  /*cartInfoList(state){
    return state.cartList.cartInfoList
  }*/
};

export default {
  state,
  mutations,
  actions,
  getters
}