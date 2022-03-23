import Vue from 'vue'
import App from './App.vue'
//引入仓库
import store from '@/store';

//引入路由
import router from '@/router';
//三级联动-全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import {Button, MessageBox} from 'element-ui'

//引入插件
import VueLazyload from 'vue-lazyload'
import timo from '@/assets/images/1.gif'
//注册插件
Vue.use(VueLazyload, {
  //懒加载默认的图片
  loading: timo
})
//第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);
Vue.component(Button.name, Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//引入mockServe.js---mock数据--因为mockServe.js没有暴露，所以不需要from
import "@/mock/mockServe";
//引入swiper样式---样式表同样不需要from
import "swiper/css/swiper.css";
//统一接口api文件夹里面全部请求函数
import * as API from "@/api"

//引入表单验证插件
import "@/plugins/validate";
//测试
/*import {reqCategoryList} from "@/api";
reqCategoryList();*/
new Vue({
  render: h => h(App),
  //全局事件总线$bus配置,this就是大写的VM
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  //注册路由:下面的写法KV一致，省略V，【router小写】
  router,
  //注册仓库：组件实例的身上多一个$store属性
  store
}).$mount('#app')
