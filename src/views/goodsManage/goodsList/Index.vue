<template>
  <div>
    <ToolBar>
	  <div>
		  <div>
			<el-button type="warning"  @click="remove(row)" icon="el-icon-delete">批量删除</el-button>
			<el-button type="primary" @click="showEditDialog = true" >添加商品</el-button>
		<!-- 	<el-button type="primary" icon="el-icon-refresh" ></el-button> -->
	   <!--     <el-button type="primary" size="small" @click="exportTable"
			  >本地导出表格</el-button> -->
		  </div>
		  <div>
			<el-input
			  placeholder="请输入商品名"
			  size="small"
			  style="width: 140px"
			  v-model="searchParams.title"
			  clearable>
			  </el-input>
			<el-select
			  v-model="searchParams.type"
			  clearable
			  style="width: 140px"
			  placeholder="请选择类型"
			  size="small">
			  <el-option  v-for="item in goodsTypeData" :key="item.id" :label="item.typename" :value="item.id"></el-option>

			</el-select>
			<el-button type="success" @click="refresh()" icon="el-icon-search">搜索</el-button>
		   <!-- <el-button type="warning" @click="clearSearchParams()">重置</el-button> -->
		  </div>
	  </div>
    </ToolBar>
				<el-table :data="tableData" border style="width: 100%;">
				 <el-table-column  prop="id" label="序号"  align="center" width="70px"></el-table-column>
				  <el-table-column prop="name" label="商品名"  align="center"> </el-table-column>
				  <el-table-column prop="price" label="价格" width="70px"  align="center"></el-table-column>
				  <el-table-column prop label="图片"  align="center">
						<template slot-scope="s">
						  <el-image style="width: 100px;height: 100px;" :src="serverImageUrl+s.row.imgpath"></el-image>
						  </template>
						</el-table-column>
					
					<el-table-column prop="goodsdesc" label="描述" width="180px"  align="center"></el-table-column>
					<el-table-column  prop label="状态" width="70px" align="center">
						<template slot-scope="s">
							<div v-if="s.row.state == 1" style="color: red;">已下架</div>
							<div v-if="s.row.state == 2" style="color: green;">已上架</div>
						<!-- 	<el-tooltip :content="stateValue" placement="top">
							  <el-switch
							    v-model="stateValue"
							    active-color="#13ce66"
							    inactive-color="#ff4949"
							    active-value="2"
							    inactive-value="1"
								 @change="updateState(s.row.id,s.state)"></el-switch>
							</el-tooltip> -->
						  </template>
						</el-table-column>	
						<!--  icon="el-icon-circle-check"
								icon="el-icon-remove"
						 -->
				  <el-table-column prop="createtime" label="上架时间" :formatter="getdata" width="180px" align="center"></el-table-column>
				  <el-table-column fixed="right" label="操作"  align="center" width="280px">
				    <div slot-scope="s" >
					  <el-button type="primary" size="small" @click="editItem(s.row.id)" icon="el-icon-edit">修改</el-button>
				      <el-button type="danger" size="small" @click="updateState(s.row.id,0)" icon="el-icon-delete">删除</el-button>
			
					<el-button v-if="s.row.state == 1" type="success" size="small" @click="updateState(s.row.id,2)" >上架</el-button>
				      <el-button v-if="s.row.state == 2" type="warning" size="small" @click="updateState(s.row.id,1)" >下架</el-button>
				</div>
				  </el-table-column>
    </el-table>

		  <el-pagination background
			layout="prev, pager, next"
			@current-change="currentChange"
			:page-size="pageSize"
		    :total="total">
		  </el-pagination>

    <!--    <Pagination-->
    <!--      :params="searchParams"-->
    <!--      :requestFunc="requestFunc"-->
    <!--      ref="pagination"-->
    <!--      @returnData="returnData"-->
    <!--    />-->
    <Edit :showEditDialog="showEditDialog" @close="showEditDialog = false" />  
  </div>
</template>

<script>
import { goodsTypeList } from "@/api/goodsTypeManage/goodsType";
import { goods,updateGoodsState } from "@/api/goodsManage/list";
import { exportCvsTable } from "@/utils/cvs";
import { serverApiUrl }from "@/config/apiUrl";
import { resetObject } from "@/utils/common";
import Edit from "./Edit.vue";
import moment from 'moment';
export default {
  data() {
    return {
	 serverImageUrl:serverApiUrl+"/upload/goods/",
     pageSize: 3,//每页显示的数据
     total:0,//总条数
     pageNo:1,//当前页码默认第一页
	  searchParams: {
        title: "",
        type: ""
      },  
      showEditDialog: false,
	  tableData: [],
	  goodsTypeData:[],
	  id:null
	  // stateValue:1
    };
  },
  created() {
        this.initData()//页面加载就初始化商品数据，默认选第一页的数据
  },
  methods: {
	getdata(row,column){
		var data =row[column.property];
		if(data == undefined){
			return '';
		}
		return moment(data).format("YYYY-MM-DD HH:mm:ss");
	},
    editItem(id) {
		this.id = id;
	    this.showEditDialog = true; 
    },

    exportTable() {
      exportCvsTable(
        [
          { title: "文章标题", field: "title" },
          { title: "浏览量", field: "visit_count" }
        ],
        this.tableData,
        "文章列表"
      );
    },	
    refresh() {
       this.initData()
    },
    returnData(pageList) {
      this.tableData = pageList.list;
    },
    clearSearchParams() {
      resetObject(this.searchParams);
      this.refresh();
    },
    updateState(id,newstate) {
		if(newstate == 0){//删除
			this.$confirm("确定删除?", "提示", {
			  confirmButtonText: "确定",
			  cancelButtonText: "取消",
			  type: "warning"
			})
        .then(() => {
		    this.updateStateApi(id,newstate);
        })
        .catch(() => {});
		}else{//上下架
			 this.updateStateApi(id,newstate);
		}
    },
	//请求接口
	updateStateApi(id,newstate){
		console.log(id,newstate);
		updateGoodsState({ id:id , state:newstate})
		  .then(r => {
		    this.$message({
		      type: "success",
		      message: r.msg//对应后台的status
		    });
		    this.refresh();
		  })
		  .catch(() => {});
	},
	remove(row) {
	  this.$confirm("确定删除?", "提示", {
	    confirmButtonText: "确定",
	    cancelButtonText: "取消",
	    type: "warning"
	  })
	    .then(() => {
	      row.d = 0;
	      // updateStatus({ id: row.id})
	      //   .then(r => {
	      //     this.$message({
	      //       type: "success",
	      //       message: "操作成功!"
	      //     });
	      //     this.refresh();
	      //   })
	      //   .catch(() => {});
	    })
	    .catch(() => {});
	},
	currentChange(currentPage){
	  this.pageNo = currentPage;
	  this.initData()//根据新的页码选取分页数据
	},
	initData(){
	      goods({ //获取商品列表
			  //左边的名字是在mapper.xml文件中使用的，右边的是源于vue对象data中定义的的
				  pageNo:this.pageNo,
				  pageSize:this.pageSize,
				  name:this.searchParams.title,
				  typeid:this.searchParams.type,
				})
	      .then(r => {
	        this.tableData = r.list;
	        this.total=r.count
	      }).catch(() => {});
		  
		 goodsTypeList().then(r=>{//获取商品类型列表
			 this.goodsTypeData=r
		 }).catch(()=>{});
		 
	    },
  },
  components: { Edit }
};
</script>