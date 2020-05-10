<template>
	<div>
		<ToolBar>
			<div style="margin: 0 auto;padding: 10px 10px;">
				<el-input style="width: 200px" placeholder="请输入商品名称" v-model="searchParams.title" clearable></el-input>
				<el-button type="primary" @click="refresh()" icon="el-icon-search">搜索</el-button>
			</div>
		</ToolBar>


		<!-- <div>.slice((currpage-1)*pagesize,currpage*pagesize) -->
		<el-table ref="multipleTable"  @selection-change="handleSelectionChange" :data="tableData" border style="width: 100%;">
			<el-table-column width="100px" align="center" type="selection"></el-table-column>
		   <!-- <el-table-column label="序号" width="70px" align="center"> </el-table-column> -->
			<el-table-column label="商品名" align="center">
				<template slot-scope="s">
					<template>{{s.row.goods.name}}</template>
				</template>
			</el-table-column>
			<el-table-column label="单价" align="center">
				<template slot-scope="s">
					<template>{{s.row.goods.price}}</template>
				</template>
			</el-table-column>
			<el-table-column label="数量"  align="center">
				<template slot-scope="s">
					<el-input-number v-model="s.row.num" @change="numChange(s.id)" :min="1" :max="10"></el-input-number>
				</template>
			</el-table-column>
				<el-table-column label="小计" align="center">
				<template slot-scope="s">
					<template>{{s.row.goods.price*s.row.num|toDecimal}}</template>
				</template>
			</el-table-column>
			
			<el-table-column label="图片" align="center">
			  <template slot-scope="s" >
			    <el-image
			      style="width:90px; height: 90px;"
			      :src="serverImageUrl+'goods/'+s.row.goods.imgpath"></el-image>
			  </template>
			</el-table-column>
				
			<el-table-column fixed="right" label="操作" align="center" width="200px">
			       <template slot-scope="s">
			        <el-button size="small" type="danger"
			         @click="handleDelete(s.$index, s.row)" icon="el-icon-delete">删除</el-button>
			        </template>
			 </el-table-column>
			 	</el-table>
			 	<div style="font-size: 18px;margin-top: 30px;  padding-right: 55px;" slot="append">
			 		<div style="float: left;margin-left: 20px;font-size: 15px;">
						<div>
							<a>  
								<el-button @click="deles">删除选中</el-button> 
							</a> 
						</div>
			 		</div> 
			 		<div style="float: right;" >
			 			<span>已选商品 <span id="selectGoodsCount">{{totalCount}}</span> 件</span>
			 			<span>总价：</span> <span>￥<span>{{sum|toDecimal}}</span></span>
			 			<el-button style="background-color: brown;color: white;margin-left: 5px;" :class="totalCount>0?'':' submitDis'" @click.native="toOrderSave">去结算</el-button><!-- submitDis禁用样式-->
			 		</div> 
			 	</div>
	

	

	<!-- 	<el-pagination layout="prev, pager, next" @current-change="currentChange" @size-change="handleSizeChange"
		 :current-page="currpage" :page-size="pagesize" :total="6">
		</el-pagination> -->
</div>
</template>

<script>
	import {
		serverApiUrl
	} from "@/config/apiUrl";
	import { cartList } from "@/api/cartManage/cart"
	export default {
		data() {
			return {
				searchParams: {
					title: ""
				},
				serverImageUrl: serverApiUrl + "/upload/",
				// pagesize: 3, //每页显示的数据
				// currpage: 1, //默认为第一页
				multipleSelection:[],//存储选中的列表
				tableData:[]
			};
		},
		computed:{
			totalCount:function(){//总件数
				var counts=0;
				this.multipleSelection.forEach(function(v){
					counts += v.num;
				})
				return  counts;
			},
			sum:function(){
				//总价钱
				var totalSum=0.0;
				this.multipleSelection.forEach(function(v){
					totalSum += v.num*v.goods.price;
				})
				return totalSum;
			}
		},
		created() {
		  cartList({userId:1})
		    .then(r=>{
				this.tableData = r
			})
			.catch(()=>{});
		},
		methods: {
			toOrderSave(){
				var cartOrder=[]
				for(var i = 0;i<this.multipleSelection.length;i++){
					cartOrder[i]=this.multipleSelection[i];
				}
				this.$router.push({path:'OrderSave',query:{cartOrder:cartOrder}})
			},
			deles(){//删除选中
					

			},
			// currentChange(currentPage) {
			// 	this.currpage = currentPage;
			// },
			// handleSizeChange(size) {
			// 	this.pagesize = size;
			// },
			refresh() {
				//this.$refs.pagination.Refresh(); //分页刷新
			},
			returnData(pageList) {
				this.tableData = pageList.list;
			},
			handleSelectionChange(val){
				      this.multipleSelection = val;
			},
			handleDelete(index, row) {
				  console.log(index, row);
				this.tableData.splice(index,1);
			 },
			 numChange(value){
				 console.log(value);
			 }
		}
	};
</script>

<style lang="scss">
#selectGoodsCount{
	    margin-right: 5px;
}
</style>
