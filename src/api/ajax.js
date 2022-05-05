//对于axios进行二次封装
import axios from "axios";
// 引入进度条
import nprogress, { configure } from "nprogress";
// 引入进度条样式
import "nprogress/nprogress.css"
// 在当前模块中引入store
import store from "@/store";
// 1.利用axios对象的方法create 去创建一个axios实例
// 2.request就是axios，只不过可以稍微配置一下
const requests = axios.create({
    // 配置对象
    // 基础路径，发请求时，路径当中会出现挨api
    baseURL:"/api",
    // 代表请求超时的时间5s
    timeout:5000,
})

// 请求拦截器：在发请求之前，可以做一些处理
requests.interceptors.request.use((config)=>{
    // config:配置对象，对象里面有一个属性很重要，header请求头
    // 进度条开始动
    if(store.state.detail.uuid_token){
        //请求头添加一个字段(userTempId)：和后台商量好的
        config.headers.userTempId = store.state.detail.uuid_token;
    }
    //需要携带token给服务器
    if(store.state.user.token){
        config.headers.token = store.state.user.token;
    }
    nprogress.start()
    return config;
})

//响应拦截器
requests.interceptors.response.use((res)=>{
    // 成功的回调函数
    // 进度条结束
    nprogress.done()
    return res.data;
},(err)=>{
    // 服务器响应失败的回调函数
    return Promise.reject(new Error(err));
})

// 对外暴露
export default requests;