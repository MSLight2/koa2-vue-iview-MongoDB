import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import jQuery from 'jquery'
import 'swiper/dist/css/swiper.css'
Vue.config.productionTip = false

window.jQuery = window.$ = jQuery
Vue.use(VueAwesomeSwiper)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
