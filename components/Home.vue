<template>
<div id="building">
  <el-row class="row-bg" justify="center">

    <!-- 调整排版 左 -->
    <el-col :span="2"><div class="grid-content ep-bg-purple" />
    </el-col>

    <!-- 中心排版 -->
    <el-col :span="20"><div class="grid-content ep-bg-purple-light" />
        
      <div class="common-layout">
          <el-container>
            <el-header>
              <h1 id="head">爱心宠物医院系统</h1>
            </el-header>
            <el-main>

              <el-col :span="24">
                <el-card id="loginCard" shadow="hover" style="margin:0 0 10px 0">
                  <el-row>
                  <el-col :span="22">
                    <div>
                    </div>
                  
                  </el-col>
                  <!-- 登录信息 -->
                  <el-col :span="2">
                      <el-button color="#626aef" :dark="isDark" plain @click="OutLogin" >退出登录</el-button>
                  </el-col>
                </el-row>
                </el-card>
              </el-col>

              <el-tabs type="border-card">

                <!-- 兽医信息 -->
              <el-tab-pane label="兽医信息">
                <VetInfo></VetInfo>
              </el-tab-pane>

              <!-- 顾客信息 -->
              <el-tab-pane label="顾客信息">
                <OwnerInfo></OwnerInfo>
              </el-tab-pane>

              <!-- 宠物信息 -->
              <el-tab-pane label="宠物信息">
                <PetInfo></PetInfo>
              </el-tab-pane>

              <!-- 访问信息 -->
              <el-tab-pane label="访问信息">
                <VisitInfo></VisitInfo>
              </el-tab-pane>

            </el-tabs>
            </el-main>

            <el-footer>
              <FooterInfo></FooterInfo>
            </el-footer>
          </el-container>
        </div>

    </el-col>

    <!-- 调整排版 右 -->
    <el-col :span="2"><div class="grid-content ep-bg-purple" />
    </el-col>
  </el-row>
</div>
</template>

<script>
import FooterInfo from './FooterInfo.vue'
import VetInfo from './VetInfo.vue'
import OwnerInfo from './OwnerInfo.vue' 
import PetInfo from './PetInfo.vue'
import VisitInfo from './VisitInfo.vue'



export default {
  name: 'Home',
  created: function(){
    },
  components: {
    VetInfo,
    OwnerInfo,
    PetInfo,
    VisitInfo,
    FooterInfo,

  },
  data() {
    return {
    }
  },
  methods: {
    OutLogin(){
        this.$router.push('/Login');
        
    }
  }
}
</script>

<style>

#Home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
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

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
#building{
  background:url("../assets/R-C2.jpg");
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
}
</style>