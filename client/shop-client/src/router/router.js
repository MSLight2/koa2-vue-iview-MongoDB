import Vue from 'vue'
import Router from 'vue-router'
import VuexStore from '@/store/store'
import LoginStorage from '@/utils/login'
const Home = () => import('@/views/home/Home.vue')
const Login = () => import('@/views/login/Login.vue')
const RegisterAndReset = () => import('@/views/registerAndReset/RegisterAndReset.vue')
const ProductDetail = () => import('@/views/detail/ProductDetail.vue')
const Checkout = () => import('@/views/checkout/Checkout.vue')
const Order = () => import('@/views/order/Order.vue')
const Store = () => import('@/views/shopStore/Store.vue')
const Cart = () => import('@/views/cart/Cart.vue')
const Collection = () => import('@/views/collection/Collection.vue')
const Success = () => import('@/views/success/Success.vue')
const UserCenter = () => import('@/views/userCenter/UserCenter.vue')

Vue.use(Router)

const router = new Router({
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
      path: '/order',
      name: 'order',
      component: Order
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
    },
    {
      path: '/success',
      name: 'success',
      component: Success
    },
    {
      path: '/userCenter/',
      name: 'userCenter',
      component: UserCenter
    }
  ]
})

router.beforeEach((to, from, next) => {
  let noFetchArr = ['userMsg', 'userOrder', 'userCollection', 'userAddress']
  let noLoginNames = ['register', 'resetPwd']
  if (noFetchArr.indexOf(from.query.name) === -1) {
    if (from.name !== 'store') {
      VuexStore.dispatch('getUserInfoAction')
      VuexStore.dispatch('getCountAction')
    }
  }
  if (LoginStorage.getLoginStatus() && noLoginNames.indexOf(to.name) !== -1) {
    next({ name: 'home' })
  }
  next()
})

export default router
