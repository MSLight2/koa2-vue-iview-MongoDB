import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import SetGlobalFilters from '@/utils/GlobalFilters'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueLazyload from 'vue-lazyload'
import './style/iconfont/iconfont'
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
  Slider,
  DatePicker,
  Radio,
  RadioGroup,
  Option,
  Select,
  Drawer,
  Notice
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
Vue.component('DatePicker', DatePicker)
Vue.component('Radio', Radio)
Vue.component('RadioGroup', RadioGroup)
Vue.component('Option', Option)
Vue.component('Select', Select)
Vue.component('Drawer', Drawer)
Vue.component('Notice', Notice)
Vue.prototype.$Message = Message
Vue.prototype.$Modal = Modal
Vue.prototype.$Notice = Notice

// 这里使用jQuery是因为轮播插件有依赖jQuery╮(╯▽╰)╭，用空再换= 。=
window.jQuery = window.$ = jQuery
Vue.use(VueAwesomeSwiper)
SetGlobalFilters(Vue)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('@/assets/img/loadfail.png'),
  loading: require('@/assets/img/loading.png'),
  attempt: 1
})

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
