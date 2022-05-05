<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在Home、Search显示的 在登录、注册隐藏 -->
    <!-- <Footer v-show="$route.path==='/home' || $route.path==='/search'"></Footer> -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header/index.vue";
import Footer from "./components/Footer/index.vue";
export default {
  name: "App",
  data() {
    return {
      msg:'abcccc',
    }
  },
  components: {
    Header,
    Footer,
  },
  mounted() {
    console.log("我是根组件App");
    //派发一个action||通知Vuex发请求，获取数据，存储于仓库当中
    this.$store.dispatch("categoryList");
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
