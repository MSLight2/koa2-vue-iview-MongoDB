import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('@/views/home/Home.vue')
const Login = () => import('@/views/login/Login.vue')
const ProductDetail = () => import('@/views/detail/ProductDetail.vue')
const Checkout = () => import('@/views/checkout/Checkout.vue')

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
    },
    {
      path: '/detail',
      name: 'detail',
      component: ProductDetail
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout
    }
  ]
})
