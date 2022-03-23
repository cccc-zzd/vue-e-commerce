//登录与注册的模块
import {reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout} from "@/api";
import {setToken, getToken, removeToken} from "@/utils/token"

const state = {
  code: '',
  token: getToken(),
  userInfo: {}
};
const mutations = {
  GETCODE(state, code) {
    state.code = code
  },
  USERLOGIN(state, token) {
    state.token = token;
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  //清除本地数据
  CLEAR(state) {
    //清除相关用户信息
    state.token = '';
    state.userInfo = {};
    //清除token
    removeToken();

  }

};
const actions = {
  //获取验证码
  async getCode({commit}, phone) {
    let result = await reqGetCode(phone);
    //正常只需要发送请求即可
    if (result.code == 200) {
      //一般发送到手机上，但是条件不足，需要自己接受
      commit('GETCODE', result.data);

      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  //用户注册
  async userRegister({commit}, user) {
    let result = await reqUserRegister(user);
    if (result.code == 200) {
      return 'ok';
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  //用户登录
  async userLogin({commit}, data) {
    let result = await reqUserLogin(data);
    if (result.code == 200) {
      //用户已经成功登录，并获取token
      commit("USERLOGIN", result.data.token);
      //持久化存储token
      setToken(result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  //获取用户信息
  async getUserInfo({commit}) {
    let result = await reqUserInfo();
    if (result.code == 200) {
      //提交用户信息
      commit('GETUSERINFO', result.data);
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  //退出登录
  async userLogout({commit}) {
    //只是向服务器发送请求，通知服务器清除token
    let result = await reqLogout();
    if (result.code == 200) {
      commit('CLEAR')
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  }
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters
}
