import Vue from "vue";
import Vuex from "vuex"

//使用插件一次
Vue.use(Vuex);

//引入小仓库
import home from './home';
import search from './search';
import detail from "@/store/detail";
import shopcart from "@/store/shopcart";
import user from "@/store/user"
import trade from "@/store/trade";
/*const state={};//仓库存储数据的地方
const mutations={};//修改state的唯一手段
const actions={};//处理action，可以书写自己的业务逻辑，也可以处理异步
const getters={};//理解为计算属性，用于简化仓库数据*/

//对外暴露Store类的一个实例
export default new Vuex.Store({
  //实现Vuex仓库模块式开发存储数据
  modules: {
    home,
    search,
    detail,
    shopcart,
    user,
    trade
  }
})