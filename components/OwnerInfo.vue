<template>

    <el-table
    :data="tableData"
    style="width: 100%"
    :row-class-name="tableRowClassName"
    :cell-class-name="tableCellClassName"
    @cell-click="cellClick"
    >

    <el-table-column prop="id" label="客户编号" />
    <el-table-column prop="name" label="客户姓名" />
    <el-table-column prop="telephone" label="联系电话" />
    <el-table-column prop="city" label="居住城市" />
    <el-table-column prop="address" label="居住地址" />

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
        <!-- 新增客户 -->
        <el-col :span="2">
            <el-button type="primary" plain style="margin:20px auto 0px" @click="dialogFormVisible = true">新增客户</el-button>
        </el-col>
    </el-row>

    <!-- 对话框 新增客户表单 -->

    <el-dialog v-model="dialogFormVisible" title="新增客户" v-loading="Newloading">

        <el-form :model="form">
            <el-form-item label="客户编号">
                <el-input v-model="inputId" disabled  />
            </el-form-item>
            <el-form-item label="客户姓名">
                <el-input v-model="NewOwner.name" />
            </el-form-item>
            <el-form-item label="客户电话">
                <el-input v-model="NewOwner.telephone" />
            </el-form-item>
            <el-form-item label="居住城市">
                <el-input v-model="NewOwner.city" />
            </el-form-item>
            <el-form-item label="居住住址">
                <el-input v-model="NewOwner.address" />
            </el-form-item>
        </el-form>

        <template #footer>
        <span class="dialog-footer">
            <el-button type="primary" @click="SaveOwner">增加</el-button>
            <el-button @click="dialogFormVisible = false">取消</el-button>
        </span>
        </template>

    </el-dialog>


  <!-- 抽屉 更新客户信息 -->
  
    <el-drawer v-model="drawer" title="Update Infomation" :with-header="false">
        <div class="common-layout">
            <el-container>
            <el-header>
                <h1>修改客户信息</h1>
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

                <el-form-item label="客户编号">
                    <el-input v-model="input" disabled :placeholder = this.tableData[TableRowId].id />
                </el-form-item>
                
                <el-form-item label="客户姓名">
                    <el-input v-model="this.tableData[TableRowId].name" />
                </el-form-item>

                <el-form-item label="联系电话">
                    <el-input v-model="this.tableData[TableRowId].telephone" />
                </el-form-item>

                <el-form-item label="居住城市">
                    <el-input v-model="this.tableData[TableRowId].city" />
                </el-form-item>

                <el-form-item label="居住地址">
                    <el-input v-model="this.tableData[TableRowId].address" />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="ChangeOwner">修改</el-button>
                    <el-button @click="(drawer = false)">取消</el-button>
                </el-form-item>
                </el-form>

            </el-main>
            </el-container>
        </div>
    </el-drawer>

    <!-- 对话框 确定删除客户 -->
    <el-dialog
    v-model="dialogVisible"
    title="确认删除"
    width="30%"
    :before-close="handleClose"
    v-loading="DropLoading"
  >
    <span>请确认要删除该客户的信息，一旦删除后将无法找回！</span>

    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="DropOwner">删除</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script>
import axios from 'axios'

let Owner = {
    id: Number,
    name: String,
    address: String,
    city: String,
    telephone: String,
};
let TableRowId = Number;

let NewOwner = {
    name: '',
    address: '',
    city: '',
    telephone: '',
};

export default {
    name: 'OwnerInfo',
    
    data:function() {
        return {
            tableData: [],
            drawer: false,
            dialogVisible: false,
            dialogFormVisible: false,
            Owner,
            NewOwner,
            TableRowId: Number,
            ChangeLoading:false,
            NewLoading:false,
            DropLoding:false,
            DropId: Number,
            inputId: "客户编号无法自定义",
            list: [],

        }
    },
    created:function (){
        axios.get("/FindAllOwner")
        .then((response)=>{
            this.tableData = response.data;
        })
    },
    methods: {
        handleClick: () => {
            console.log(1)
        },
        ChangeOwner(){
            this.ChangeLoading = true;
            console.log(this.tableData[this.TableRowId]);
            Owner = this.tableData[this.TableRowId];
            let OutOwner = {
                id: Owner.id,
                name: Owner.name,
                address: Owner.address,
                city: Owner.city,
                telephone: Owner.telephone,
            };
            console.log(typeof(OutOwner));
            console.log(OutOwner);
            axios.post("/ChangeOwner", OutOwner)
            .then(({data: res}) => {
                if(res.code !== 0){
                    this.ChangeLoading = false;
                    this.drawer = false;
                    console.log(1);
                    window.history.go(0);
                    return axios.$message.error(res.msg);
                    
                }else {
                    console.log(0);
                }
            })
            .catch(() => {
                console.log(0);
            })
        },
        SaveOwner(){
            this.NewLoading = true,
            console.log(NewOwner);
            axios.post("/SaveOwner", this.NewOwner)
            .then(({data:res1}) => {
                if(res1.code !== 0){
                    console.log(1);
                    this.NewLoading  = false;
                    this.dialogFormVisible = false;
                    
                    return axios.$message.error(res1.msg);
                }else {
                    console.log(0);
                }
            })
            .catch((error) => {
                // console.log(error);
            })
            window.history.go(0);
        },
        DropOwner(){
            this.DropLoding = true;
            let NeedDropOwner = {
                id: this.tableData[this.TableRowId].id,
            }
            console.log(NeedDropOwner);
            axios.post("/DropOwner", NeedDropOwner)
            .then(({data:res}) => {
                if(res.code !== 0){
                    console.log(1);
                    this.DropLoding = false;
                    this.dialogVisible=false;
                    return axios.$message.error(res.msg);
                } else {
                    console.log(0);
                }
            })
            .catch((error) => {
                // console.log(error);
            })
            window.history.go(0);
        },

        tableCellClassName({row, column, rowIndex, columnIndex}){
            //注意这里是解构
            //利用单元格的 className 的回调方法，给行列索引赋值
            row.index=rowIndex;
            column.index=columnIndex;
        },
        cellClick(row, column, cell, event){
            this.TableRowId = row.index;
            // console.log(TableRowId);
            // console.log(column.index);
            // console.log(cell);
            // console.log(event);
        }, 
        
    },
}

</script>

<style>
.dialog-footer button:first-child {
  margin-right: 10px;
}

</style>