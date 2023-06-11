import { createRouter, createWebHashHistory } from 'vue-router'
import { h } from 'vue'
import { ElNotification } from 'element-plus'

const routes = [
    {
          path: '/home',
          name: 'Home',
          redirect:'/home/userHome', // 重定向
          component: () => import('../views/home/Hindex.vue'),
          meta:{
            title:"首页"
          },
          children:[
              {
                  path:"userHome", //首页
                  name: 'Home',
                  component: () => import('../views/home/Home.vue'),
                  meta:{
                      title:"首页"
                  },
              },{
                  path: "goods", //全部商品
                  component: ()=>import('../views/goods/Goods.vue')
              },{
                  path:"detail", //商品详情页
                  component: ()=>import('../views/goods/Detail.vue')
              },{
                  path: "favorite", //收藏夹
                  component: ()=>import('../views/favorite/Favorite.vue')
              },{
                  path:"cart", //购物车
                  component: ()=>import('../views/cart/Cart.vue')
              },{
                  path:"confirmOrder", //确认订单
                  component: ()=>import('../views/order/ConfirmOrder.vue')
              },{
                  path:"trade", //付款
                  component: ()=>import('../views/trade/Trade.vue')
              },{
                  path: "mine", //个人主页
                  redirect:'/home/mine/own',
                  component: ()=>import('../views/person/MinePage.vue'),
                  children:[
                      {
                          path:"own",
                          component: ()=>import('../views/person/MinMain.vue')
                      },{
                          path:"cart",  //购物车
                          component: ()=>import('../views/cart/Cart.vue')
                      },{
                          path:"modifiedData",  //修改资料
                          component: ()=>import('../views/modified/ModifiedData.vue')
                      },{
                          path:"address",  //地址管理
                          component: ()=>import('../views/address/Address.vue')
                      },{
                          path: "personOrder", //全部订单
                          redirect:"/home/mine/personOrder/all",
                          component: ()=>import('../views/order/PersonOrder.vue'),
                          children:[
                              {
                                  path:"all",  //全部订单
                                  component: ()=>import('../views/order/AllOrder.vue')
                              },{
                                  path:"paid",  //已付款
                                  component: ()=>import('../views/order/PaidOrder.vue')
                              },{
                                  path:"notPaid",  //未付款
                                  component: ()=>import('../views/order/NotPaidOrder.vue')
                              },{
                                  path:"receive",  //待收货
                                  component: ()=>import('../views/order/ReceiveOrder.vue')
                              },
                          ]
                      },
                  ]
              }, {
                  path: "other",
                  component: ()=>import('../views/person/OtherPage.vue')
              }, {
                  path: "cart",
                  component: ()=>import('../views/cart/Cart.vue')
              }
          ]
      }, {
            path: "/test",
            component: ()=>import('../views/test/test1.vue')
    }, {
          path: '/',
          name: 'Login',
          component: () => import('../views/login/Login.vue'),
          meta:{
            title:"登录",
            requireAuth: true
          }
      }, {
          path: '/register',
          name: 'Register',
          component: () => import('../views/login/Register.vue'),
          meta:{
            title:"注册",
            requireAuth: true //自定义字段，用于判断是否登录
          }
      }, {
          path: '/password',
          name: 'Password',
          component: () => import('../views/login/Password.vue'),
          meta:{
            title:"修改密码",
            requireAuth: true
          }
      }, {
          path: '/admin',
          name: 'AdminHome',
          redirect:'/admin/adminHome',
          component: () => import('../views/admin/Aindex.vue'),
          meta:{
             title:"管理首页"
          },
          children:[
              {
                  path:"adminHome",
                  component: () => import('../views/admin/AdminHome.vue'),
              }, {
                  path:"goodsManage",
                  component: () => import('../views/admin/GoodsManage.vue'),
              }, {
                  path:"userManage",
                  component: () => import('../views/admin/UserManage.vue'),
              }, {
                  path:"orderManage",
                  component: () => import('../views/admin/OrderManage.vue'),
              }, {
                  path:"test",
                  component: () => import('../views/test/test.vue'),
              },
            ]
      }, {
        path: '/shop',
        name: 'MerchantHome',
        redirect:'/shop/merchantHome',
        component: () => import('../views/shop/Sindex.vue'),
        meta:{
            title:"管理首页"
        },
        children:[
            {
                path:"merchantHome",
                component: () => import('../views/shop/MerchantHome.vue'),
            }, {
                path:"addGoods",
                component: () => import('../views/shop/AddGoods.vue'),
            }, {
                path:"goodsManage",
                component: () => import('../views/shop/ShopGoodsManage.vue'),
            }, {
                path:"orderManage",
                redirect:'/shop/orderManage/all',
                component: () => import('../views/shop/OrderManage.vue'),
                children:[
                    {
                        path:"all", //所有订单
                        component: () => import('../views/order/AllShopOrder.vue'),
                    },{
                        path:"notPaid", //未付款
                        component: () => import('../views/order/NotPaidShopOrder.vue'),
                    },{
                        path:"refund", //退款处理
                        component: () => import('../views/order/RefundShopOrder.vue'),
                    },
                ]
            }, {
                path:"logisticsManage",
                redirect:'/shop/logisticsManage/unfinished',
                component: () => import('../views/shop/LogisticsManage.vue'),
                children:[
                    {
                        path:"unfinished", //所有订单
                        component: () => import('../views/shop/NotHaveLogistics.vue'),
                    },{
                        path:"finished", //未付款
                        component: () => import('../views/shop/HaveLogistics.vue'),
                    }
                ]
            }, {
                path:"shopInfo",
                component: () => import('../views/shop/ShopInfo.vue'),
            }, {
                path:"modifiedShop",
                component: () => import('../views/modified/ModifiedShop.vue'),
            }
        ]
    }
]

export const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes
})


/**
 * 路由守卫
 */
router.beforeEach((to, from, next) => {
    // 判断路由访问是否需要的登录
    // requireAuth为true时，不需要登录
    if (to.matched.some(res => res.meta.requireAuth)) {
        next();
    }
    // 不设置requireAuth为true时，需要登录
    else {
        // 判断是否已经登录
        if (window.sessionStorage.getItem("uid")) {
            next();
        } else {
            ElNotification({
                title: '提示',
                message: h('i', { style: 'color: teal' }, '请先登陆系统！'),
            })
            next({path: '/'});
        }
    }
});




/**
 * 输出对象
 */
export default router
