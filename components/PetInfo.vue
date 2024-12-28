<template>

    <el-table
    :data="PetData"
    style="width: 100%"
    :row-class-name="tableRowClassName"
    :cell-class-name="tableCellClassName"
    @cell-click="cellClick"
    >
    <el-table-column prop="id" label="宠物编号" />
    <el-table-column prop="name" label="宠物姓名" />
    <el-table-column prop="birthday" label="宠物生日" />
    <el-table-column prop="oid" label="主人编号" />
    <el-table-column prop="oname" label="主人姓名" />

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
        <!-- 新增宠物信息 -->
        <el-col :span="2">
            <el-button type="primary" plain style="margin:20px auto 0px" @click="dialogFormVisible = true">新增宠物</el-button>
        </el-col>
    </el-row>

    <!-- 对话框 新增宠物表单 -->

    <el-dialog v-model="dialogFormVisible" title="新增宠物信息" v-loading="Newloading">

        <el-form :model="form">
            <el-form-item label="宠物编号">
                <el-input v-model="inputId" disabled  />
            </el-form-item>
            <el-form-item label="宠物姓名">
                <el-input v-model="NewPet.name" />
            </el-form-item>
            <el-form-item label="宠物生日">
                <el-date-picker  v-model="NewPet.birthday" type="date" style="width: 100%" format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
            </el-form-item>

            <el-form-item label="主人编号及姓名">
                <el-select v-model="NewPet.oid" clearable placeholder="选择客户的编号">

                    <el-option v-for="Owner in OwnerData" :key="Owner.id" :label="Owner.id" :value="Owner.id" >

                        <span style="float: left">
                            {{ Owner.id }}
                        </span>
                        <span style=" float: right; color: var(--el-text-color-secondary); font-size: 13px;">
                            {{ Owner.name }}
                        </span>

                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>

        <template #footer>
        <span class="dialog-footer">
            <el-button type="primary" @click="SavePet">增加</el-button>
            <el-button @click="dialogFormVisible = false">取消</el-button>
        </span>
        </template>
    </el-dialog>

    <!-- 抽屉 修改宠物信息 -->
    <el-drawer v-model="drawer" title="Update Infomation" :with-header="false">
        <div class="common-layout">
            <el-container>
            <el-header>
                <h1>修改宠物信息</h1>
                <!-- <h1>{{TableRowIndex}}</h1> -->
            </el-header>

            <!-- 表单 -->
            <el-main>
                <el-form
                :label-position="right"
                label-width="100px"
                :model="formLabelAlign"
                style="max-width: 460px"
                v-loading="ChangeLoading">

                <el-form-item label="宠物编号">
                    <el-input v-model="input" disabled :placeholder = this.PetData[TableRowIndex].id />
                </el-form-item>
                
                <el-form-item label="宠物姓名">
                    <el-input v-model="this.PetData[TableRowIndex].name" />
                </el-form-item>

                <el-form-item label="宠物生日">
                    <el-date-picker  v-model="this.PetData[TableRowIndex].birthday" type="date" style="width: 100%" format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
                </el-form-item>

                <el-form-item label="主人编号及姓名">
                    <el-select v-model="this.PetData[TableRowIndex].oid" clearable placeholder="选择客户的编号">

                        <el-option v-for="Owner in OwnerData" :key="Owner.id" :label="Owner.id" :value="Owner.id" >

                            <span style="float: left">
                                {{ Owner.id }}
                            </span>
                            <span style=" float: right; color: var(--el-text-color-secondary); font-size: 13px;">
                                {{ Owner.name }}
                            </span>

                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="ChangePet">修改</el-button>
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
    <span>请确认要删除该宠物的信息，一旦删除后将无法找回！</span>

    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="DropPet">删除</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script>
import axios, { Axios } from 'axios'

let Pet = {
    id: Number,
    name: String,
    birthday: Date,
    oid: Number,
    onamne: String,

};

let NewPet = {
    name: '',
    birthday: '',
    oid: undefined,
    oname: '',
};

let TableRowIndex = Number;

export default {
    name: "PetInfo",

    data:function() {
        return {
            PetData: [],
            OwnerData: [],

            dialogFormVisible: false,
            drawer:false,
            dialogVisible:false,

            TableRowIndex: Number,

            inputId: "宠物编号无法自定义",
            NewPet,
        }
    },
    created:function (){
        axios.get("/FindAllPet")
        .then((response)=>{
            this.PetData = response.data;
            // console.log(this.PetData);
        });
        axios.get("/FindAllOwner")
        .then((res) => {
            this.OwnerData = res.data;
            // console.log(this.OwnerData);
        });
    },
    methods: {
        SavePet(){
            let NeedSavePet = {
                name: NewPet.name,
                birthday: NewPet.birthday,
                oid: NewPet.oid,
                oname: '',
            };

            this.OwnerData.map((owner) => {
                if((NeedSavePet.oid == owner.id)) {
                    NeedSavePet.oname = owner.name;
                    // console.log(NeedSavePet.oname);
                }
            });
            axios.post("/SavePet", NeedSavePet)
            .then(({data:res}) => {
                if(res.code !== 0){
                    console.log(1);
                    this.dialogFormVisible = false;
                    return axios.$message.error(res.msg);
                }else {
                    console.log(0);
                }
            })
            .catch((error) =>{
                // console.log(error);
            });
            console.log(NeedSavePet);
            this.dialogFormVisible = false;
            window.history.go(0);
        },
        ChangePet(){
            this.ChangeLoading = true;
            let NeedChangePet = {
                id: this.PetData[this.TableRowIndex].id,
                name: this.PetData[this.TableRowIndex].name,
                birthday: this.PetData[this.TableRowIndex].birthday,
                oid: this.PetData[this.TableRowIndex].oid,
                oname: '',
            };

            this.OwnerData.map((owner) => {
                if((this.PetData[this.TableRowIndex].oid == owner.id)) {
                    NeedChangePet.oname = owner.name;
                    // console.log(NeedSavePet.oname);
                }
            });
            // console.log(this.PetData[this.TableRowIndex]);
            console.log(NeedChangePet);

            axios.post("/ChangePet", NeedChangePet)
            .then(({data:res}) => {
                if(res.code !== 0){
                    console.log(1);
                    this.ChangeLoading = false;
                    this.drawer = false;
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
        DropPet(){
            let DropPet = {
                id: this.PetData[this.TableRowIndex].id,
            };
            axios.post("/DropPet", DropPet)
            .then(({data: res})=>{
                console.log(1);
                this.dialogVisible = false;
                return axios.$message.error(res.msg);
            })
            .catch((error) =>{
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
            this.TableRowIndex = row.index;
            // console.log(row.index);
            console.log(this.TableRowIndex);
            // console.log(column.index);
            // console.log(cell);
            // console.log(event);
        },
    },

}

</script>

<style>

</style>