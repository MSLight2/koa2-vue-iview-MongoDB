import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('@/views/home/Home.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
})
