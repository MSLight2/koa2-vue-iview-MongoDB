import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import SetGlobalFilters from '@/utils/GlobalFilters'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import './style/iconfont/iconfont';
import jQuery from 'jquery'
import 'swiper/dist/css/swiper.css'
import 'iview/dist/styles/iview.css'
import {
  Button,
  Form,
  FormItem,
  Input,
  Message,
  Spin,
  Icon,
  Modal,
  Page,
  Slider
} from 'iview'
// iview组件
Vue.component('Button', Button)
Vue.component('Form', Form)
Vue.component('FormItem', FormItem)
Vue.component('Input', Input)
Vue.component('Spin', Spin)
Vue.component('Icon', Icon)
Vue.component('Modal', Modal)
Vue.component('Page', Page)
Vue.component('Slider', Slider)
Vue.prototype.$Message = Message
Vue.prototype.$Modal = Modal

window.jQuery = window.$ = jQuery
Vue.use(VueAwesomeSwiper)
SetGlobalFilters(Vue)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
