import { createRouter, createWebHashHistory } from 'vue-router'

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
                  path:"userHome",
                  component: () => import('../views/home/Home.vue'),
              },{
                  path:"detail",
                  component: ()=>import('../views/goods/Detail.vue')
              },{
                  path: "search",
                  component: ()=>import('../views/search/Search.vue')
              },{
                  path: "favorite", //收藏夹
                  component: ()=>import('../views/favorite/Favorite.vue')
              },{
                  path:"cart",
                  component: ()=>import('../views/goods/Cart.vue')
              },{
                  path:"confirmOrder",
                  component: ()=>import('../views/order/ConfirmOrder.vue')
              },{
                  path: "goods", //全部商品
                  component: ()=>import('../views/goods/Goods.vue')
              }, {
                  path: "refreshgoods",  //更新商品
                  component: ()=>import('../views/refresh/Refreshgoods.vue')
              }, {
                  path: "mine",
                  redirect:'/home/mine/own',
                  component: ()=>import('../views/person/MinePage.vue'),
                  children:[
                      {
                          path:"own",
                          component: ()=>import('../views/person/MinMain.vue')
                      },{
                          path:"cart",
                          component: ()=>import('../views/goods/Cart.vue')
                      },{
                          path:"modifiedData",
                          component: ()=>import('../views/modified/ModifiedData.vue')
                      }
                  ]
              }, {
                  path: "other",
                  component: ()=>import('../views/person/OtherPage.vue')
              }, {
                  path: "cart",
                  component: ()=>import('../views/goods/Cart.vue')
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
            title:"登录"
          }
      }, {
          path: '/register',
          name: 'Register',
          component: () => import('../views/login/Register.vue'),
          meta:{
            title:"注册"
          }
      }, {
          path: '/password',
          name: 'Password',
          component: () => import('../views/login/Password.vue'),
          meta:{
            title:"修改密码"
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
      }
]

export const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes
})


/**
 * 路由守卫
 */
// router.beforeEach((guard)=>{
//   brforeEach.checkAuth(guard,router);
// })



/**
 * 输出对象
 */
export default router
