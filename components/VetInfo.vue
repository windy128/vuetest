<template>
  <el-table
    :data="VetData"
    style="width: 100%"
    :row-class-name="tableRowClassName"
    :cell-class-name="tableCellClassName"
    @cell-click="cellClick"
    >

    <el-table-column prop="vid" label="医生编号" />
    <el-table-column prop="vname" label="医生姓名" />
    <el-table-column prop="sid" label="科目编号" />
    <el-table-column prop="sname" label="科目名称" />

    <el-table-column fixed="right" label="操作(双击)">
        <template #default="scope">
        <el-button link type="primary" size="small" @Dblclick="drawer=true">修改</el-button>
        <el-button link type="danger" size="small" @Dblclick="(dialogVisible = true)">删除</el-button>
        </template>
    </el-table-column>
    </el-table>

     <!-- 新增按钮 -->
     <el-row>
        <el-col :span="22"></el-col>
        <!-- 新增兽医 -->
        <el-col :span="2">
            <el-button type="primary" plain style="margin:20px auto 0px" @click="dialogFormVisible = true">新增兽医</el-button>
        </el-col>
    </el-row>

    <!-- 对话框 新增兽医表单 -->

    <el-dialog v-model="dialogFormVisible" title="新增兽医" v-loading="Newloading">

        <el-form :model="form">

            <el-form-item label="医生编号">
                <el-popover
                placement="left"
                title="格式"
                :width="200"
                trigger="hover"
                content="编号仅能输入数字以及按照格式：年份后两位+科目编号首尾两数字+加第几位医生。例：(229101)"
            >
                <template #reference>
                    <el-input v-model="NewVet.vid" placeholder= "请按照规范格式输入编号" oninput="value=value.replace(/\D/g,'')" />
                </template>
            </el-popover>
            </el-form-item>

            <el-form-item label="医生姓名">
                <el-input v-model="NewVet.vname" />
            </el-form-item>

            <el-form-item label="科目编号">
                <el-popover
                placement="left"
                title="格式"
                :width="200"
                trigger="hover"
                content="编号仅能输入数字以及按照格式：9XXX。例：(9001)"
            >
                <template #reference>
                    <el-input v-model="NewVet.sid" placeholder= "请按照规范格式输入编号" oninput="value=value.replace(/\D/g,'')" />
                </template>
            </el-popover>
            </el-form-item>


            <el-form-item label="科目名称">
                <el-input v-model="NewVet.sname" />
            </el-form-item>
        </el-form>

        <template #footer>
        <span class="dialog-footer">
            <el-button type="primary" @click="SaveVet">增加</el-button>
            <el-button @click="dialogFormVisible = false">取消</el-button>
        </span>
        </template>

    </el-dialog>


     <!-- 抽屉 更新客户信息 -->
  
     <el-drawer v-model="drawer" title="Update Infomation" :with-header="false">
        <div class="common-layout">
            <el-container>
            <el-header>
                <h1>修改医生信息</h1>
                <!-- <h1>{{TableRowId}}</h1> -->
            </el-header>

            <!-- 表单 -->
            <el-main>
                <el-form
                :label-position="right"
                label-width="100px"
                :model="formLabelAlign"
                style="max-width: 460px"
                v-loading="ChangeLoading">

                <el-form-item label="医生编号">
                    <el-input v-model="input" disabled :placeholder = this.VetData[TableRowIndex].vid />
                </el-form-item>
                
                <el-form-item label="医生姓名">
                    <el-input v-model="this.VetData[TableRowIndex].vname" />
                </el-form-item>


                <el-form-item label="科目编号">
                    <el-input v-model="this.VetData[TableRowIndex].sid" />
                </el-form-item>

                <el-form-item label="科目名称">
                    <el-input v-model="this.VetData[TableRowIndex].sname" />
                </el-form-item>

                <el-form-item>

                    <el-button type="primary" @click="ChangeVet">修改</el-button>
                    <el-button @click="(drawer = false)">取消</el-button>
                </el-form-item>
                </el-form>

            </el-main>
            </el-container>
        </div>
    </el-drawer>


    <!-- 对话框 确定删除兽医 -->
    <el-dialog
    v-model="dialogVisible"
    title="确认删除"
    width="30%"
    :before-close="handleClose"
    v-loading="DropLoading"
  >
    <span>请确认要删除该兽医的信息，一旦删除后将无法找回！</span>

    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="DropVet">删除</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
  
</template>

<script>
import axios from 'axios'

let NewVet= {
    vid: undefined,
    vname: '',
    sid: undefined,
    sname: '',
}
let TableRowIndex = Number;

export default {
    name: 'VetInfo',

    data:function() {
        return {
            VetData: [],
            NewVet,

            dialogFormVisible: false,
            dialogVisible: false,
            drawer:false,

            TableRowIndex,
        }
    },
    created:function (){
        axios.get("/FindAllVet")
        .then((response)=>{
            this.VetData = response.data;
        })
    },
    methods: {
        SaveVet(){
            console.log(NewVet);
            axios.post('/SaveVet', NewVet)
            .then(({data:res}) => {
                if(res.code !== 0){
                    console.log(1);
                    this.dialogFormVisible = false;
                    window.history.go(0);
                    return axios.$message.error(res.msg);
                }else {
                    console.log(0);
                }
            })
            .catch((error) =>{
                // console.log(error);
            });
            
        },
        ChangeVet(){
            let NeedChangeVet = {
                vid: this.VetData[this.TableRowIndex].vid,
                vname: this.VetData[this.TableRowIndex].vname,
                sid: this.VetData[this.TableRowIndex].sid,
                sname: this.VetData[this.TableRowIndex].sname,
            };
            console.log(NeedChangeVet);
            
            axios.post("/ChangeVet", NeedChangeVet)
            .then(({data:res})=>{
                if(res.code != 0){
                    this.ChangeLoading = false;
                    this.drawer = false;
                    console.log(1);
                    window.history.go(0);
                    return axios.$message.error(res.msg);
                }else {
                    console.log(0);
                }
            })
            .catch((error)=>{
                console.log(error);
            })

        },

        DropVet(){
            this.DropLoding = true;
            let NeedDropVet = {
                vid: this.VetData[this.TableRowIndex].vid,
            }
            console.log(NeedDropVet);
            axios.post("/DropVet", NeedDropVet)
            .then(({data:res}) => {
                if(res.code !== 0){
                    console.log(1);
                    this.DropLoding = false;
                    this.dialogVisible=false;
                    window.history.go(0);
                    return axios.$message.error(res.msg);
                } else {
                    console.log(0);
                }
            })
            .catch((error) => {
                // console.log(error);
            })
            
        },

        tableCellClassName({row, column, rowIndex, columnIndex}){
            //注意这里是解构
            //利用单元格的 className 的回调方法，给行列索引赋值
            row.index=rowIndex;
            column.index=columnIndex;
        },
        cellClick(row, column, cell, event){
            this.TableRowIndex = row.index;
            // console.log(row.index);
            console.log(this.TableRowIndex);
            // console.log(column.index);
            // console.log(cell);
            // console.log(event);
        },

    }
}
</script>

<style>

</style>