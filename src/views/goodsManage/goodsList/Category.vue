<template>
	<div>
		<el-button type="primary" @click="showEditDialog = true">点我添加商品</el-button>
		
		<el-carousel :interval="4000" type="card" height="500px">
		    <el-carousel-item v-for="item in tableData" :key="item">
		        <el-image style="width: 450px;" :src="item.url"></el-image>
		    </el-carousel-item>
		  </el-carousel>
		  
		<Edit :showEditDialog="showEditDialog" @close="showEditDialog = false" />
	</div>
</template>

<script>
import goods01 from '@/assets/images/goods/2018110107.jpg'
import goods02 from '@/assets/images/goods/2018110108.jpg'
import goods03 from '@/assets/images/goods/2018110109.jpg'
import Edit from "./Edit.vue";
export default {
  data() {
    return {
         showEditDialog: false,
		 tableData: [
		 		  {url:goods01},
		 		  {url:goods02},
				  {url:goods03},
			]
      }
	},
  components: { Edit }
 }
</script>

<style>
</style>
