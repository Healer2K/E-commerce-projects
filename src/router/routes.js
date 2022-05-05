// 引入路由组件
// import Home from '@/views/Home'
// import Search from '@/views/Search'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Detail from '@/views/Detail'
import AddCartSuccess from '@/views/AddCartSuccess'
import ShopCart from '../views/ShopCart'
import Trade from '@/views/Trade'
import Pay from '@/views/Pay'
import PaySuccess from '@/views/PaySuccess'
import Center from '@/views/Center'
//引入二级路由组件
import MyOrder from '@/views/Center/myOrder'
import GroupOrder from '@/views/Center/groupOrder'




/* 
    当打包构建应用时，JavaScript 包会变得非常大，影响页面加载
    如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了
*/
// 路由配置信息
export default [
    {
        path:'/center',
        component:Center,
        meta:{show:true},
        //二级路由组件
        children:[
            {
                path:'myorder',
                component:MyOrder,
            },
            {
                path:'grouporder',
                component:GroupOrder,
            },
            {
                path:'/center',
                redirect:'/center/myorder',
            },
        ]
    },
    {
        path:'/paysuccess',
        component:PaySuccess,
        meta:{show:true},
        beforeEnter: (to, from, next) => {
            if(from.path=='/pay'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path:'/home',
        component:()=>import('@/views/Home'),
        meta:{show:true}
    },
    {
        path:'/search/:keyword?',
        component:()=>import('@/views/Search'),
        meta:{show:true},
        name:"search"
    },
    {
        path:'/login',
        component:Login,
        meta:{show:false}
    },
    {
        path:'/register',
        component:Register,
        meta:{show:false}
    },
    {
        path:'/detail/:skuid',
        component:Detail,
        meta:{show:true}
    },
    {
        path:'/addcartsuccess',
        name:'addcartsuccess',
        component:AddCartSuccess,
        meta:{show:true}
    },
    {
        path:'/shopcart',
        component:ShopCart,
        meta:{show:true}
    },
    {
        path:'/trade',
        component:Trade,
        meta:{show:true},
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            if(from.path=='/shopcart'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path:'/pay',
        component:Pay,
        meta:{show:true},
        beforeEnter: (to, from, next) => {
            if(from.path=='/trade'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        // 重定向 在项目跑起来的时候，访问/，让他立马定向到首页
        path:'*',
        redirect:"/home"
    }
]