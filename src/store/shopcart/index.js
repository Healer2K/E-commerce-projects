import { reqCartList,reqDeleteCartById } from "@/api";
import {reqUpdateCheckedById} from '../../api'
const state = {
    cartList:[]
};
const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList = cartList;
    }
};
const actions = {
    // 获取购物车列表数据
    async getCartList({commit}){
        let result = await reqCartList();
        //测试是否能获取个人购物车的数据
        if(result.code == 200){
            commit('GETCARTLIST',result.data)
        }
    },
    //删除购物车的某个产品
    async deleteCartListBySkuId({commit},skuId){
        let result = await reqDeleteCartById(skuId);
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },
    //修改购物车某一个产品的选中状态
    async updateCheckedById({commit},{skuId,isChecked}){
        let result = await reqUpdateCheckedById(skuId,isChecked);
        if(result.code == 200){
            return 'ok';
        }else{
            return Promise.reject(new Error('failed'))
        }
    },
    //删除全部勾选的产品
    deleteAllCheckedCart({dispatch,getters}){
        //context:小仓库，commit【提交mutations修改state】 getters【计算属性】 dispatch【派发action】 state【当前仓库数据】
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked==1?dispatch('deleteCartListBySkuId',item.skuId):"";
            PromiseAll.push(promise)
        });
        //只要全部p1,p2,...都成功，返回的结果即为成功
        //如果有一个失败，返回的即是失败的结果
        return Promise.all(PromiseAll)    
    },
    //修改全部产品的状态
    updateAllCartIsChecked({dispatch,state},isChecked){
        let PromiseAll = []
        state.cartList[0].cartInfoList.forEach(item=>{
            let promise =  dispatch('updateCheckedById',{skuId:item.skuId,isChecked})
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    }
};
const getters = {
    cartList(state){
        return state.cartList[0]||{};
    },
    // cartInfoList(state){
    //     //计算出来购物车数据
    //     return 
    // }
};
export default{
    state,mutations,actions,getters
}