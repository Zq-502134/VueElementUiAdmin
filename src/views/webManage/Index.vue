<template>
	<div>
		<el-menu :default-active="activeIndex1" class="el-menu-demo" mode="horizontal" @select="handleSelect"
		 background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
			<el-menu-item index="1">首页</el-menu-item>
			<el-submenu index="2">
				<template slot="title" >商品类型</template>
				<el-menu-item index="2-1">电子</el-menu-item>
				<el-menu-item index="2-2">服饰</el-menu-item>
				<el-menu-item index="2-3">美食</el-menu-item>
				<el-submenu index="2-4">
					<template slot="title">日用</template>
					<el-menu-item index="2-4-1">扇子</el-menu-item>
					<el-menu-item index="2-4-2">毛巾</el-menu-item>
					<el-menu-item index="2-4-3">浴巾</el-menu-item>
				</el-submenu>
			</el-submenu>
			<el-submenu index="3">
			<template slot="title">关于我们</template>
			<el-menu-item index="3-1">联系我们</el-menu-item>
				<el-menu-item index="3-2">
					<!-- http://localhost:8089/#/login -->
					<a href="#" target="_blank" style="color: #FFF;">商家登陆</a>
				</el-menu-item>
			</el-submenu>
			<el-menu-item index="4" style="float: right;" @click.native="$router.push({name:'CarIndex'})">
				<!-- <a href="http://localhost:8089/#/carIndex" target="_self" style="color: #FFF;">购物车</a> -->
			购物车
			</el-menu-item>
			<el-menu-item index="5" style="float: right;" @click.native="$router.push({name:'Order'})">
			我的订单
			</el-menu-item>
			<el-menu-item index="5" style="float: right;" @click.native="$router.push({name:'Order1'})">
			我的订单
			</el-menu-item>
		</el-menu>
		<!-- 轮播图 -->
		<div class="box">
			<el-carousel height="450px">
				<el-carousel-item v-for="item in carouselList" :key="item.id">
					<h2 class="small">{{ item.cardesc }}</h2>
					<el-image style="width: 790px;height: 340px;" :src="serverImageUrl+'carousel/'+item.imgpath"></el-image>
				</el-carousel-item>
			</el-carousel>
		</div>
		<!-- 布局  遍历商品列表 -->
		<div class="goodsList">
			<el-row :gutter="20">
				<!-- 一行三个（24）多的会自动换行 -->
				<el-col :span="8" v-for="item in goodsList" :key="item.id">
					<!-- 下面三行代码尽量放在一个盒子里，整体布局-->
					<h3>{{item.name}}</h3> <!-- 标题 -->
					<el-image style="width: 300px;height: 300px;" :src="serverImageUrl+'goods/'+item.imgpath"></el-image>
					<p>{{item.goodsdesc}}</p>
					<!-- <el-button type="primary" style="background-color:red;">添加到购物车>></el-button> -->
						<el-button type="primary" style="background-color: red;color: #EEEEEE;margin-top: 20px;">添加到购物车</el-button>
				</el-col>
			</el-row>
		</div>


	</div>
</template>
<script>
	import {
		serverApiUrl
	} from "@/config/apiUrl";
	import {
		carouselList
	} from "@/api/carouselManage/carousel";
	import {
		goods
	} from "@/api/goodsManage/list"
	export default {
		data() {
			return {
				activeIndex1: '1',
				serverImageUrl: serverApiUrl + "/upload/",
				//轮播图
				carouselList: [],
				//商品
				goodsList: [],
				pageNo: 1,
				pageSize: 9
			};
		},
		created() {
			this.initData();
		},
		methods: {
			initData() {
				carouselList()
					.then(r => {
						this.carouselList = r;
					}).catch(() => {});

				goods({
					pageSize: this.pageSize,
					pageNo: this.pageNo
				}).then(r => {
					this.goodsList = r.list;
				}).catch(() => {});
			},
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			}
		},
	};
 
</script>

<style lang="scss">
	.box {
		text-align: center;
		padding: 30px;
		background: #999; //灰色背景
	}

	.box h2 {
		color: #fff;
		margin-bottom: 20px;
	}

	.goodsList {
		margin: 30px 30px;
		text-align: center;
	}

	.goodsList el-col {
		padding-bottom: 40px;
	}
</style>
