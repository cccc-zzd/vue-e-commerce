//路由配置信息
//引入一级路由
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess"
import ShopCart from "@/pages/ShopCart"
import Trade from "@/pages/Trade"
import Pay from "@/pages/Pay"
import PaySuccess from "@/pages/PaySuccess"
import Center from "@/pages/Center"


//引入二级路由
import MyOrder from "@/pages/Center/myOrder"
import GroupOrder from "@/pages/Center/groupOrder"

export default [
  {
    path: "/center",
    component: Center,
    meta: {show: true},
    //center的二级路由组件
    children: [
      {
        path: 'myorder',
        component: MyOrder
      },
      {
        path: 'grouporder',
        component: GroupOrder
      },
      {
        path: '/center',
        redirect: '/center/myorder'
      }
    ]
  },
  {
    path: "/paysuccess",
    component: PaySuccess,
    meta: {show: true}
  },
  {
    path: "/pay",
    component: Pay,
    meta: {show: true},
    beforeEnter(to, from, next) {
      if (from.path == "/trade") {
        next();
      } else {
        //其他的直接停留在当前页面
        next(false)
      }
    }
  },
  {
    path: "/trade",
    component: Trade,
    meta: {show: true},
    //路由独享守卫
    beforeEnter: (to, from, next) => {
      //去交易界面必须从购物车来
      if (from.path == "/shopcart") {
        next();
      } else {
        //其他的直接停留在当前页面
        next(false)
      }
    }
  },
  {
    path: "/shopcart",
    component: ShopCart,
    meta: {show: true}
  },
  {
    path: "/home",
    component: Home,
    meta: {show: true}
  },
  {
    /*path: "/search/:keyword",*/


    path: "/search/:keyword?",
    //尝试懒加载
    //component: Search,
    component: () => import('@/pages/Search'),
    meta: {
      show: true
    },
    name: "search"
  },
  {
    path: "/login",
    component: Login,
    meta: {
      show: false
    }
  },
  {
    path: "/register",
    component: Register,
    meta: {
      show: false
    }
  },
//重定向，在项目跑起来的时候，访问/，立马让他定向到首页
  {
    path: "*",
    redirect: "/home"
  },
  {
    path: "/detail/:skuid",
    component: Detail,
    meta: {show: true}
  },
  {
    path: "/addcartsuccess",
    component: AddCartSuccess,
    meta: {show: true},
    name: 'addcartsuccess'
  }
]