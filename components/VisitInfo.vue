<template>

    <el-table
    :data="VisitData"
    style="width: 100%"
    :row-class-name="tableRowClassName"
    :cell-class-name="tableCellClassName"
    @cell-click="cellClick"
    >
    <el-table-column prop="id" label="记录编号" />
    <el-table-column prop="pid" label="宠物编号" />
    <el-table-column prop="pname" label="宠物姓名" />
    <el-table-column prop="visitDate" label="记录时间" :formatter="carTimeFilter" />
    <el-table-column prop="description" label="记录情况" />

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
        <!-- 新增访问信息 -->
        <el-col :span="2">
            <el-button type="primary" plain style="margin:20px auto 0px" @click="dialogFormVisible = true">新增记录</el-button>
        </el-col>
    </el-row>

    <!-- 对话框 新增记录信息表单 -->

    <el-dialog v-model="dialogFormVisible" title="新增记录信息" v-loading="Newloading">

<el-form :model="form">

    <el-form-item label="记录编号">
        <el-input v-model="inputId" disabled  />
    </el-form-item>

    <el-form-item label="宠物编号及姓名">
        <el-select v-model="NewVisit.pid" clearable placeholder="选择宠物的编号">

            <el-option v-for="Pet in PetData" :key="Pet.id" :label="Pet.id" :value="Pet.id" >

                <span style="float: left">
                    {{ Pet.id }}
                </span>
                <span style=" float: right; color: var(--el-text-color-secondary); font-size: 13px;">
                    {{ Pet.name }}
                </span>

            </el-option>
        </el-select>
    </el-form-item>

    <el-form-item label="记录时间">
        <el-date-picker  v-model="NewVisit.visitDate" type="date" style="width: 100%" format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
    </el-form-item>

    <el-form-item label="记录情况">
        <el-input v-model="NewVisit.description" type="textarea" />
    </el-form-item>

</el-form>

<template #footer>
<span class="dialog-footer">
    <el-button type="primary" @click="SaveVisit">增加</el-button>
    <el-button @click="dialogFormVisible = false">取消</el-button>
</span>
</template>
</el-dialog>


<!-- 抽屉 修改宠物信息 -->
<el-drawer v-model="drawer" title="Update Infomation" :with-header="false" >
        <div class="common-layout">
            <el-container>
            <el-header>
                <h1>修改访问信息</h1>
            </el-header>

            <!-- 表单 -->
            <el-main>
                <el-form
                :label-position="right"
                label-width="100px"
                :model="formLabelAlign"
                style="max-width: 460px"
                >

                <el-form-item label="记录编号">
                    <el-input v-model="input" disabled :placeholder = this.VisitData[TableRowIndex].id />
                </el-form-item>

                <el-form-item label="宠物编号及姓名">
                    <el-select v-model="this.VisitData[TableRowIndex].pid" clearable placeholder="选择宠物的编号">

                        <el-option v-for="Pet in PetData" :key="Pet.id" :label="Pet.id" :value="Pet.id" >

                            <span style="float: left">
                                {{ Pet.id }}
                            </span>
                            <span style=" float: right; color: var(--el-text-color-secondary); font-size: 13px;">
                                {{ Pet.name }}
                            </span>

                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="记录时间">
                    <el-date-picker  v-model="this.VisitData[TableRowIndex].visitDate" type="date" style="width: 100%" value-format="YYYY-MM-DD" format="YYYY-MM-DD"  />
                </el-form-item>
                
                <el-form-item label="记录情况">
                    <el-input v-model="this.VisitData[TableRowIndex].description" type="textarea" />
                </el-form-item>

                
                <el-form-item>
                    <el-button type="primary" @click="ChangeVisit">修改</el-button>
                    <el-button @click="drawer = false">取消</el-button>
                </el-form-item>
                </el-form>

            </el-main>
            </el-container>
        </div>
    </el-drawer>


    <!-- 对话框 确定删除记录 -->
    <el-dialog
    v-model="dialogVisible"
    title="确认删除"
    width="30%"
    :before-close="handleClose"
    v-loading="DropLoading"
  >
    <span>请确认要删除该宠物的历史病历记录，一旦删除后将无法找回！</span>

    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="DropVisit">删除</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script>
import axios from 'axios';
import moment from 'moment';
import dayjs from "dayjs"

let NewVisit = {
    id: undefined,
    pid: undefined,
    pname: '',
    visitDate: '',
    description: '',
};
let TableRowIndex = Number;

export default {
    name: 'VisitInfo',

    data:function() {
        return {
            VisitData: [],
            PetData: [],

            dialogFormVisible: false,
            dialogVisible: false,
            drawer: false,


            inputId: "记录编号无法自定义",
            NewVisit,
            TableRowIndex,
        }
    },

    created:function (){
        axios.get("/FindAllVisit")
        .then((response)=>{
            this.VisitData = response.data;
        });
        axios.get("/FindAllPet")
        .then((response)=>{
            this.PetData = response.data;
            // console.log(this.PetData);
        });
    },

    
    methods: {
        SaveVisit(){
            let NeedSaveVisit = {
                pid: NewVisit.pid,
                pname: '',
                visitDate: NewVisit.visitDate,
                description: NewVisit.description,
            };
            this.PetData.map((pet) => {
                if((NeedSaveVisit.pid == pet.id)) {
                    NeedSaveVisit.pname = pet.name;
                    console.log(NeedSaveVisit);
                }
            });
            axios.post("/SaveVisit", NeedSaveVisit)
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
            console.log(NeedSaveVisit);
            this.dialogFormVisible = false;
            window.history.go(0);
        },

        ChangeVisit(){
            let NeedChangeVisit = {
                id: this.VisitData[this.TableRowIndex].id,
                pid: this.VisitData[this.TableRowIndex].pid,
                pname: '',
                visitDate: dayjs(this.VisitData[this.TableRowIndex].visitDate).format('YYYY-MM-DD'),
                description: this.VisitData[this.TableRowIndex].description,
            }
            console.log(NeedChangeVisit);

            this.PetData.map((Pet) => {
                if(this.VisitData[this.TableRowIndex].pid == Pet.id){
                    NeedChangeVisit.pname = Pet.name;
                    console.log(NeedChangeVisit);
                }
            });

            axios.post("/ChangeVisit", NeedChangeVisit)
            .then(({data: res}) => {
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
            .catch((error) => {
                console.log(error);
            })

        },

        DropVisit(){
            let DropVisit = {
                id: this.VisitData[this.TableRowIndex].id,
            };
            axios.post("/DropVisit", DropVisit)
            .then(({data: res})=>{
                console.log(DropVisit);
                this.dialogVisible = false;
                return axios.$message.error(res.msg);
            })
            .catch((error) =>{
                // console.log(error);
            })
          
            window.history.go(0);
        },

        carTimeFilter(row, column, cellValue, index) {
            const daterc = row[column.property]
            if(daterc !=null){
                return moment(daterc).format("YYYY-MM-DD")
            }
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