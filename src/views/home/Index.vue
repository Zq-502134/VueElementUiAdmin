<template>
  <div>
    <el-card style="border-radius: 0">
      <div slot="header" style="text-align: center;">
        <h2>欢迎进入管理系统后台</h2>
      <br>
		   <el-image style="width:80%;margin: 0,auto;" :src="url"></el-image>
	  </div>
      <div class="demo">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content ">
              <div style="padding: 10px;background: #673AB7">
                <i class="el-icon-s-custom index-icon"></i>
                用户管理
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content ">
              <div style="padding: 10px;background: #3c8dbc">
                <i class="el-icon-picture index-icon"></i>
                轮播图管理
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content ">
              <div style="padding: 10px;background: #009688">
                <i class="el-icon-shopping-bag-1 index-icon"></i>
               商品管理
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content ">
              <div style="padding: 10px;background: #607D8B">
                <i class="el-icon-shopping-cart-2 index-icon"></i>
              订单管理
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import imges from '@/assets/welcome.jpg'
export default {
  data() {
    return {
		url:imges
    };
  },
  // methods: {
  //   open() {
  //     this.$alert("这是一段内容", "标题名称", {
  //       confirmButtonText: "确定",
  //       callback: () => {
  //         this.$message({
  //           message: "恭喜你，这是一条成功消息",
  //           type: "success"
  //         });
  //       }
  //     });
  //   }
  // },
  mounted: function() {}
};
</script>
<style lang="scss">
.demo {
  margin: 10px;
  .grid-content {
    border-radius: 4px;
    overflow: hidden;
    color: #fff;
    background: #d3dce6;
    .index-icon {
      font-size: 82px;
      color: #fff;
    }
  }
}
</style>
