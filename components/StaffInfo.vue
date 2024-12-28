<template>
  <div>
    <el-table :data="StaffData" height="250" style="width: 100%">
    <el-table-column prop="username" label="UserName" width="180" />
    <el-table-column prop="password" label="PassWord" />
  </el-table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'StaffInfo',

    created:function (){
        axios.get("/FindAllStaff")
        .then((response)=>{
            this.StaffData = response.data;
        })
    },

    data:function() {
        return {
            StaffData: []
        }
    },
    
}
</script>

<style>

</style>