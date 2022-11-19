import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/home/Home.vue'),
  },
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/login/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/login/Register.vue'),
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
