<template>
  <div>
    <!-- <Home></Home> -->
    <!-- <router-link to="/Home">Go to Home</router-link>
    <router-link to="/Login">Go to Login</router-link> -->
    <router-view></router-view>
  </div>
</template>

<script>
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import { ref } from 'vue'

const tabPosition = ref('left')
// const drawer = ref(false)
export default {
  name: 'App',
  components: {
    Login,
    Home,

  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
.asideCard {
  /* background-color: green; */
  /* height: 25%; */
  margin: 10px 0;
}
.loginCard {
  text-align: right;

}
body{
  margin:0;
  padding:0;
  border:0
}
.Unique{
  color: #06C0F6;
}

</style>
