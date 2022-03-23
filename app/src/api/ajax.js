//对axios二次封装
import axios from "axios";
//引入进度条
import nprogress from 'nprogress';
//在当前模块中引入store
import store from '@/store';
//引入进度条样式
import "nprogress/nprogress.css";

//start：进度条开始      done：进度条结束


//1.利用axios对象的方法create，去创建一个axios实例
//2.request就是axios，只不过稍微配置一下
const requests = axios.create({
  //配置对象
  //基础路径，发送请求的时候，路径当中会出现api
  baseURL: "/api",
  //代表请求超时的时间
  timeout: 5000
})
//请求拦截器
requests.interceptors.request.use((config) => {
  //进度条开始动
  if (store.state.detail.uuid_token) {
    //请求头添加一个字段(userTempId):和后端统一
    config.headers.userTempId = store.state.detail.uuid_token;
  }
  //需要携带token带给服务器
  if (store.state.user.token) {
    config.headers.token = store.state.user.token
  }
  nprogress.start();
  //config：配置对象，配置里面有一个属性很重要，headers请求头
  return config;
})
//响应拦截器
requests.interceptors.response.use((res) => {
  //进度条结束
  nprogress.done();
  return res.data;//成功的回调函数，服务器返回数据以后，可以做一些事情

}, (error) => {
  return Promise.reject(new Error('faile'));
})

//对外暴露
export default requests;