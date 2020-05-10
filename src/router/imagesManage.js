import Layout from "@/views/layout/App.vue";
export default {
  path: "/images_manage",
  component: Layout,
  name: "ImagesManage",
  redirect: "/images_manage/list",
  meta: {
    title: "轮播图管理"
  },
  children: [
    {
      path: "list",
      name: "ImagesManageList",
      meta: {
        title: "轮播图主页"
      },
      component: resolve =>
        require(["@/views/imagesManage/imagesList/Index.vue"], resolve)
    },
	{
	  path: "category",
	  name: "ImagesManageList",
	  meta: {
	    title: "添加轮播图"
	  },
	  component: resolve =>
	    require(["@/views/imagesManage/imagesList/Category.vue"], resolve)
	}
  ]
};
