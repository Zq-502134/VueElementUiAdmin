export default {
  name: "商品模块管理",
  permissionsKey: "",
  icon: "el-icon-shopping-cart-2",
  children: {
    courseCardList: {
      name: "商品管理",
      permissionsKey: "",
      path: "/goods_manage/list"
    },
    organCardList: {
      name: "添加商品",
      permissionsKey: "",
      path: "/goods_manage/category"
    }
  }
};
