import Layout from "@/views/layout/App.vue";
export default {
  path: "/goods_manage",
  component: Layout,
  name: "GoodsManage",
  redirect: "/goods_manage/list",
  meta: {
    title: "商品主页"
  },
  children: [
    {
      path: "list",
      name: "GoodsManageList",
      meta: {
        title: "商品管理"
      },
      component: resolve =>
        require(["@/views/goodsManage/goodsList/Index.vue"], resolve)
    },
	{
	  path: "category",
	  name: "GoodsManageList",
	  meta: {
	    title: "添加商品"
	  },
	  component: resolve =>
	    require(["@/views/goodsManage/goodsList/Category.vue"], resolve)
	}
  ]
};
