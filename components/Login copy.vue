<template>
    <div id="building">
    <el-form ref="LoginForm" :model="form" :rules="rules" label-width="8epx" class="login-box" :append-to-body="true">
        <h3 class="login-title">欢迎登录</h3>
        <el-form-item label="账号" prop="username">
        <el-input type="text" placeholder="请输入账号" v-model="user.username"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="user.password" show-password/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="Login('LoginForm')">登录</el-button>
        </el-form-item>
    </el-form>
  </div>
    <!-- <el-button plain @click="open4"> Error </el-button> -->
</template>

<script>
import {ref} from 'vue'
import axios from 'axios'
import { h } from 'vue'
import { ElNotification } from 'element-plus'

let user = {
    username: '',
    password: '',
}

export default {
    name: "Login",
    data:function(){
        return {
            StaffData: [],
            user,
            dialogVisible: false
        }
    },
    
    created:function (){
        axios.get("/FindAllStaff")
        .then((response)=>{
            this.StaffData = response.data;
        });
        
    },
    
    methods: {
        Login(){
            // console.log(this.StaffData);
            let LoginFlag = false;

            this.StaffData.map((Staff) => {
                if((user.username == Staff.username && user.password == Staff.password)) {
                    console.log(user);
                    console.log(Staff);
                    LoginFlag = true;
                }else {
                    if(LoginFlag){
                        user.password = '',
                        this.$router.push('/home');
                    }else {
                        LoginFlag = false;
                        
                    }
                    
                }
            })
            if(LoginFlag == false){
                alert("账号密码错误！")
            }
            
        },
    },
}

</script>

<style>
  .login-box {
  border:1px solid #dccfcf;
  width: 350px;
  margin:180px auto;
  padding: 35px 80px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
  background-color:rgba(255,255,255,0.7);
}

  .login-title {
  text-align: center;
  margin: 0 auto 40px auto;
    color: #303133;
  }

  #building{
  background:url("../assets/R-C.jpg");
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
}
</style>