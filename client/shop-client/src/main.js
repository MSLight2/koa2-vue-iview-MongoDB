import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import jQuery from 'jquery'
import 'swiper/dist/css/swiper.css'
import 'iview/dist/styles/iview.css'
import {
  Button
} from 'iview'
// iview组件
Vue.component('Button', Button)

window.jQuery = window.$ = jQuery
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
