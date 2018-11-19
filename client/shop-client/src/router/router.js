import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('@/views/home/Home.vue')
const Login = () => import('@/views/login/Login.vue')
const RegisterAndReset = () => import('@/views/registerAndReset/RegisterAndReset.vue')
const ProductDetail = () => import('@/views/detail/ProductDetail.vue')
const Checkout = () => import('@/views/checkout/Checkout.vue')
const Store = () => import('@/views/shopStore/Store.vue')
const Cart = () => import('@/views/cart/Cart.vue')
const Collection = () => import('@/views/collection/Collection.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
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
      path: '/register',
      name: 'register',
      component: RegisterAndReset
    },
    {
      path: '/resetPwd',
      name: 'resetPwd',
      component: RegisterAndReset
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
    },
    {
      path: '/store',
      name: 'store',
      component: Store
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/collection',
      name: 'collection',
      component: Collection
    }
  ]
})
