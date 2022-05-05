import { reqGetCode,reqUserLogin,reqUserRegister,reqUserInfo,reqLogout } from "../api";
import { setToken,getToken,removeToken } from "../utils/token";
//登录与注册的模块
const state={
    code:'',
    token:getToken(),
    userInfo:{},
};
const mutations={
    GETCODE(state,code){
        state.code = code;
    },
    USERLOGIN(state,token){
        state.token = token;
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    //退出登录时清除本地数据
    CLEAR(state){
        //把仓库中相关信息清空
        state.token = '';
        state.userInfo = {};
        //把本地存储的token清空
        removeToken();
    }
};
const actions={
    //获取验证码
    async getCode({commit},phone){
        //获取验证码的这个窗口，把验证码返回了，但是正常情况是后台把验证码发到用户的手机号上
        let result =  await reqGetCode(phone)
        if(result.code==200){
            commit('GETCODE',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },
    //用户注册
    async userRegister({commit},user){
        let result = await reqUserRegister(user);
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },
    //登录业务 token
    async userLogin({commit},data){
        let result = await reqUserLogin(data);
        //服务器下发token，类似用户唯一标识符（uuid）
        //将来经常通过带token找服务器要用户信息进行展示
        if(result.code==200){
            commit('USERLOGIN',result.data.token)
            // 持久化存储token
            setToken(result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },
    //获取用户信息 通过token
    async getUserInfo({commit}){
        let result =  await reqUserInfo();
        if(result.code==200){
            //提交用户信息
            commit('GETUSERINFO',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },
    //退出登录
    async userLogout({commit}){
        //只是向服务器发起一次请求，通知服务器清除token
        let result =  await reqLogout()
        //action里不能操作state，得提交mutations来修改
        if(result.code==200){
            commit('CLEAR');
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    }
};
const getters={};
export default{
    state,
    mutations,
    actions,
    getters
}