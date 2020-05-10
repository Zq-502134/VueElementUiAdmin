<template>
  <div style="width: 100vw;height: 100vh;display: flex;justify-content: center;align-items: center">
		  <el-form ref="loginform" :rules="rules" :model="loginform" label-width="80px">
			  <h2 style="text-align: center;padding-bottom: 10px;">商城购物管理系统后台</h2>
			  <el-form-item label="用户名" prop="name">
				  <el-input v-model="loginform.name"></el-input>
			  </el-form-item>
			  <el-form-item label="密码" prop="pass">
				   <el-input v-model="loginform.pass" show-password></el-input>
			  </el-form-item>
			  <el-form-item label="角色" prop="pass">
				  <el-select v-model="loginform.role" placeholder="请选择角色">
					  <el-option label="顾客" value="2"></el-option>
					  <el-option label="管理员" value="1"></el-option>  
				  </el-select>
			  </el-form-item>
			    <el-form-item >
					  <el-button type="primary" @click="clicklogin('loginform')">登陆</el-button>
					  <el-button @click="resetForm('loginform')">重置</el-button>
				</el-form-item>
				<el-row>
				  <el-col :span="12">
						<el-link type="primart" style="float: left;color: grey;font-size: 2px;">立即注册</el-link>  
				  </el-col>
				  <el-col :span="12">
					  <el-link type="primart" style="float: right;color: grey;font-size: 2px;">忘记密码？</el-link> 
				  </el-col>
				</el-row>
			</el-form>
	 </div>
</template>
<script>
import { setToken } from "@/utils/common";
import { login } from "@/api/user/user";
export default {
  data(){
    return {
		loginform:{
			name:'',
			pass:''
		},
		rules:{
				name: [
				  { required: true, message: '请输入用户名', trigger: 'blur' }
				],
				pass: [
				  { required: true, message: '请输入密码', trigger: 'change' }
				]
			  }
	};
  },
  methods: {
    clicklogin(loginform) {//登陆验证
	  this.$refs[loginform].validate((valid) => {
	            if (valid) {
					login({username:this.loginform.name,
						   password:this.loginform.pass})
					  .then(r => {
					    console.log(r);
						if(r != null){
							setToken("HJDF844GDFG5D8J7FGHFG5");
							if(r.role == 1){
							this.$router.push("/");
							}else if(r.role == 2){
								this.$router.push("/webIndex");
							}
						}else{
							this.$alert("用户名或密码错误",'提示',{
								confirmButtonText:'确定'
								});
						}
						
					  })
					  .catch(() => {});
					}else {
					this.$message('用户名或密码错误！！');
					return false;
					}
	          });
    },
	resetForm(loginform) {
	        this.$refs[loginform].resetFields();
	      }
  },
	mounted: function() {}
};
</script>
