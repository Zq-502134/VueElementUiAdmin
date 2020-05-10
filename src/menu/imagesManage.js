export default {
  name: "轮播图模块管理",
  permissionsKey: "",
  icon: "fa el-icon-picture-outline",
  children: {
    courseCardList: {
      name: "轮播图管理",
      permissionsKey: "",
      path: "/images_manage/list"
    },
    organCardList: {
      name: "添加轮播图",
      permissionsKey: "",
      path: "/images_manage/category"
    }
  }
};
