// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes';
// 使用插件
Vue.use(VueRouter)
//引用store 以便获取token来验证是否能对某些路由进行跳转
import store from '../store';

// 先把vueRouter原型对象的push，先保存一份
let orginPush = VueRouter.prototype.push;
let orginReplace = VueRouter.prototype.replace;

// 重写push|replace
VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve&&reject){
        orginPush.call(this,location,resolve,reject)
    }else{
        orginPush.call(this,location,()=>{},()=>{})
    }
}
VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve&&reject){
        orginReplace.call(this,location,resolve,reject)
    }else{
        orginReplace.call(this,location,()=>{},()=>{})
    }
}

let router = new VueRouter({
    // 配置路由
    routes:routes,
    //滚动行为
    scrollBehavior(to,from,savedPosition){
        //返回的y=0，代表的滚动条在最上方
        return {y:0}
    }
});

//全局前置守卫：在路由跳转之前进行判断
router.beforeEach( async (to,from,next)=>{
    //to:获取到你要跳转到那个路由的信息
    // from：将要离开的路由的信息
    // next：调用方法，才能离开的钩子放行函数
    // next('/login') 放行到指定的路由    next(false)当路由发生变化时，会跳回到from的路由
    next()
    //用户登录了才会有token
    let token = store.state.user.token
    //用户信息
    let name = store.state.user.userInfo.name;
    if(token){
        //禁止登录的用户去login
        if(to.path=='/login'||to.path=='/register'){
            next('/')
        }else{
            //登录了，但去的不是login 
            if(name){
                next()
            }else{
                //没有用户信息,派发action让仓库存储用户信息后再进行跳转
                try {
                    //获取用户信息成功
                    await store.dispatch('getUserInfo');
                    next()
                } catch (error) {
                    //token失效了
                    //清除token
                    await store.dispatch('userLogout');
                    next('/login');
                }
            }
            
        }
    }else{
        //未登录：不能其交易相关、不能去支付相关（pay，paysuccess）、不能去个人中心
        //未登录去上面这些路由会跳转到login
        let toPath = to.path;
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
            next('/login?redirect='+toPath); //记录未登录之前要去的路由，存储到地址中，待用户成功登录后直接跳转
        }else{
            //去的不是上面的路由 -- 放行
            next()
        }
    }
    
})

export default router;