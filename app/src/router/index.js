//配置路由的地方
/*-----------------------------------------*/
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "@/router/routers";
//使用插件
Vue.use(VueRouter);
//引入路由组件
/*import Home from "@/pages/Home"
import Search from "@/pages/Search"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Detail from "@/pages/Detail"
import * as path from "path";*/
//引入store
import store from "@/store"
import el from "element-ui/src/locale/lang/el";

//先把VueRouter原型对象的push保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

//重写push/replace
//第一个参数：告诉原来push方法，你往哪里跳转（传递哪些参数）
//第二个参数：成功回调
//第三个参数：失败回调
VueRouter.prototype.push = function (location,
                                     resolve,
                                     reject) {
  if (resolve && reject) {
    //call和apply区别
    //相同点：都可以调用函数一次，都可以篡改函数的上下文一次
    //不同点：call传递参数用逗号隔开，apply方法执行，传递数组
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(this, location, () => {
    }, () => {
    });
  }
}
VueRouter.prototype.replace = function (location,
                                        resolve,
                                        reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(this, location, () => {
    }, () => {
    });
  }
}
//对外暴露VueRouter类的实例
let router = new VueRouter({
  //配置路由
  routes,
  //滚动行为
  scrollBehavior(to, from, savedPosition) {
    return {y: 0}
  }
})
//全局守卫：前置守卫---在路由跳转之前判断
router.beforeEach(async (to, from, next) => {
  //to---目的路由
  //from---来源路由
  //next---放行函数，next(),next(path)放行到指定路由，next(false)
  //用户登录才有token，不然一定没有
  let token = store.state.user.token;
  //用户信息
  let name = store.state.user.userInfo.name;
  if (token) {
    /*登陆以后不能再去登录界面*/
    if (to.path == '/login') {
      next('/home')
    } else {
      if (name) {
        next()
      } else {
        //没有用户信息，派发action让仓库存储用户信息再跳转

        try {
          //获取用户信息在首页展示
          await store.dispatch('getUserInfo');
          next();
        } catch (e) {
          //token失效了-->获取不到用户信息，需要重新登录
          //清除token
          await store.dispatch('userLogout')
          next('/login')
        }
      }
    }
  } else {
    //未登录--不能去交易相关、不能去支付相关、不能去个人中心
    //未登录去上面的页面只能先登录
    let toPath = to.path;
    if (toPath.indexOf('/trade') != -1
      || toPath.indexOf('/pay') != -1
      || toPath.indexOf('/center') != -1) {
      next('/login?redirect=' + toPath);
    } else {
      next();
    }

  }
})

export default router;