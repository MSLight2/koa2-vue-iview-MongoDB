import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('@/views/home/Home.vue')
const Login = () => import('@/views/login/Login.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
