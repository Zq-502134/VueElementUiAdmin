<template>
  <div>
     <ToolBar>
		<el-button type="primary" @click="showEditDialog = true">添加轮播图</el-button> 
	  <!-- <el-button type="primary" size="small" @click="exportTable"
				  >本地导出表格</el-button> -->
			  <div>
				<el-button type="warning" size="mini" @click="open()">帮助</el-button>
			   <!-- <el-button type="warning" @click="clearSearchParams()">重置</el-button> -->
			  </div>
    </ToolBar> 
		<el-table :data="tableData.slice((currpage-1)*pagesize,currpage*pagesize)" border style="width: 100%;height: 450px;">
					  <el-table-column prop="index" label="序号"></el-table-column>
					  <el-table-column prop="" label="图片">
							<template slot-scope="s">
							  <el-image style="width: 150px;" :src="s.row.url"></el-image>
							  </template>
							</el-table-column>
					  <el-table-column prop="detail" label="描述"></el-table-column>
		</el-table>

		  <el-pagination
			layout="prev, pager, next"
			@current-change="currentChange"
			@size-change="handleSizeChange"
		    :current-page="currpage"
			:page-size="pagesize"
		    :total="7">
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
 import carousel01 from '@/assets/images/carousel/1.jpg'
 import carousel02 from '@/assets/images/carousel/2.jpg'
 import carousel03 from '@/assets/images/carousel/3.jpg'
 import carousel04 from '@/assets/images/carousel/4.jpg'
 import carousel05 from '@/assets/images/carousel/5.jpg'
 import carousel06 from '@/assets/images/carousel/6.jpg'
 import carousel07 from '@/assets/images/carousel/7.jpg'
 import carousel08 from '@/assets/images/carousel/8.jpg'
 
//import { topics } from "@/api/articleManage/list";
import { exportCvsTable } from "@/utils/cvs";
// import { resetObject } from "@/utils/common";
import Edit from "./Edit.vue";
export default {
  data() {
    return {
      searchParams: {
        title: "",
        type: ""
      },
	  pagesize: 4,//每页显示的数据
	  currpage: 1,//默认为第一页
      showEditDialog: false,
	  tableData: [
		  {
			index:1,
		  	url:carousel01,
		  	detail:'高端家电品质享受',
		  },
		  {
		  	index:2,
		  	url:carousel02,
		  	detail:'时尚生活温心鲜果',
		  },
		  {
		  	index:3,
		  	url:carousel03,
		  	detail:'万锅来潮，先吃为敬',
		  },
		  {
		  	index:4,
		  	url:carousel04,
		  	detail:'高端家电品质享受',
		  },
		  {
		  	index:5,
		  	url:carousel05,
		  	detail:'高端家电品质享受',
		  },
		  {
		  	index:6,
		  	url:carousel06,
		  	detail:'高端家电品质享受',
		  },
		  {
		  	index:7,
		  	url:carousel07,
		  	detail:'高端家电品质享受',
		  },
		  {
		  	index:8,
		  	url:carousel08,
		  	detail:'高端家电品质享受',
		  },
	  ],
    };
  },
  created() {
    //topics()
    //  .then(r => {
    //    this.tableData = r;
    //  })
    // .catch(() => {});
  },
  methods: {
    routeDemo() {
      this.$message.info("待添加");
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
    open() {
      //this.$refs.pagination.Refresh(); //分页刷新
	  this.$alert('暂未开启帮助服务', '提示', {
	           dangerouslyUseHTMLString: true
	         });
    },
    returnData(pageList) {
      this.tableData = pageList.list;
    },
    // clearSearchParams() {
    //   resetObject(this.searchParams);
    //   this.refresh();
    // },
    removeItem(row) {
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
	  this.currpage = currentPage;
	},
	 handleSizeChange(size) {
			this.pagesize = size;
		},
  },
  components: { Edit }
};
</script>