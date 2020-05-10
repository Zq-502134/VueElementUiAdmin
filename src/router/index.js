import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/layout/App.vue";
// import ArticleManage from "./articleManage";
import GoodsManage from "./goodsManage";
import ImagesManage from "./imagesManage";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Layout,
    name: "Dashboard",
    redirect: "/home",
    meta: {
      title: "电子购物管理系统"
    },
    children: [
      {
        path: "home",
        name: "DashboardHome",
        meta: {
          title: "首页"
        },
        component: resolve => require(["@/views/home/Index.vue"], resolve)
      }
    ]
  },
  // ArticleManage,
  GoodsManage,
  ImagesManage,
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "后台登录",
      keepAlive: false //保持激活状态
    },
    components: {
      blank: resolve => require(["@/views/login/Login.vue"], resolve)
    }
  },
  {
    path: "/webIndex",
    name: "WebIndex",
    meta: {
      title: "商城首页",//相当于title标签 
    },
    components: {
      blank: resolve => require(["@/views/webManage/Index.vue"], resolve)
    }
  },
  {
    path: "/carIndex",
    name: "CarIndex",
    meta: {
      title: "购物车",//相当于title标签 
    },
    components: {
      blank: resolve => require(["@/views/webManage/Cart.vue"], resolve)
    }
  },
  {
      path:'/order',
      name:'Order',
      meta: {
        title: "订单",
        keepAlive: false
      },
      components: {
        blank: resolve => require(["@/views/webManage/Order.vue"], resolve)
     }
  },
  {
      path:'/order1',
      name:'Order1',
      meta: {
        title: "订单",
        keepAlive: false
      },
      components: {
        blank: resolve => require(["@/views/webManage/Order1.vue"], resolve)
     }
  },
  {
      path:'/orderSave',
      name:'OrderSave',
      meta: {
        title: "提交订单",
        keepAlive: false
      },
      components: {
        blank: resolve => require(["@/views/webManage/OrderSave.vue"], resolve)
     }
  },
  {
      path:'/paySuccess',
      name:'PaySuccess',
      meta: {
        title: "订单",
        keepAlive: false
      },
      components: {
        blank: resolve => require(["@/views/webManage/paySuccess.vue"], resolve)
     }
  },
];

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const router = new VueRouter({
  routes
});

export default router;
