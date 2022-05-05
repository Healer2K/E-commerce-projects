import Vue from 'vue'
import App from './App.vue'
//三级联动组件---全局组件
import TypeNav from './components/TypeNav/'
import Carousel from './components/Carousel'
import Pagination from './components/Pagination'
import { Button,MessageBox} from 'element-ui';
//全局组件：第一个参数：全局组件的名字  第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
//注册全局组件
Vue.component(Button.name,Button)
//ElementUI注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//引入MockServe.js   mock数据
import './mock/mockServe';
//引包 swiper样式
import 'swiper/css/swiper.css'

Vue.config.productionTip = false
// 引用路由
import router from '@/router'
// 引入仓库
import store from './store'

//统一接收api文件夹里面的全部请求函数
//统一引入
import * as API from '@/api'
import lazy from '@/assets/1.png'

//引入lazyload 图片懒加载插件
import VueLazyload from 'vue-lazyload'
//注册插件
Vue.use(VueLazyload,{
  //懒加载默认的图片
  loading: lazy,
})








//引入自定义插件
import myPlugins from '@/plugins/myPlugins'

Vue.use(myPlugins,{name:'upper'})

//引入表单校验插件
import '@/plugins/validate'
new Vue({
  render: h => h(App),
  //全局事件总线$bus配置
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  // 注册路由
  router,
  // 注册仓库:组件实例的身上会多一个属性$store
  store
}).$mount('#app')
