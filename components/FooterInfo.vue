<template>
  <div>
    <el-col :span="24">
      <el-card id="FooterCard" shadow="hover" style="margin:-10px 0 0 0">
        <el-row>
          <el-col :span="6">
            <h1 style="margin:-2px 0 0 0; text-align: left; color: #909399;" >Disigned By <span style="color:#06C0F6" >JayNe Lee</span></h1>
          </el-col>
          <el-col :span="4">
            <h3 style="margin:4px 0 0 -30px; text-align: left; color: #06C0F6;" >
            </h3>
          </el-col>
          <el-col :span="10">
            <h1 style="margin:-2px 0 0 0; text-align: right; color: #909399;" >了解我们——</h1>
          </el-col>

          <el-col :span="2">
            <el-button type="success" @click="JumpMy()" plain>我的空间</el-button>
          </el-col>

          <el-col :span="2">
            <el-button type="primary" @click="JumpSchool()" plain>我的学校</el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </div>
</template>

<script>
export default {
    name:'Hello',
    props: {
        msg: String
    },
    data:function(){
        return {
            message: 'Hello Vue!'
        }
    },
    methods: {
      JumpMy(){
        window.location.href = 'https://gitee.com/JayNe99995'; 
      },
      JumpSchool(){
        window.location.href = 'http://www.zzuli.edu.cn/'; 
      }
    }

}
</script>

<style>
.loginCard {
  text-align: right;

}
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
</style>