import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home/Home.vue'
const Login = () => import('@/views/login/Login.vue')
const RegisterAndReset = () => import('@/views/registerAndReset/RegisterAndReset.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        nofade: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterAndReset,
      meta: {
        nofade: true
      }
    },
    {
      path: '/resetPwd',
      name: 'resetPwd',
      component: RegisterAndReset,
      meta: {
        nofade: true
      }
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
