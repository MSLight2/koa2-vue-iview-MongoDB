import { createApp } from 'vue'
import { createPinia } from 'pinia'
// @ts-ignore
import ViewUIPlus from 'view-ui-plus';
// @ts-ignore
import jQuery from 'jquery';
import VueLazyLoad from 'vue3-lazyload';
import 'view-ui-plus/dist/styles/viewuiplus.css';

import App from './App.vue';
import router from './router';

// @ts-ignore
window.jQuery = window.$ = jQuery;

const app = createApp(App);

app.use(createPinia())
  .use(router)
  .use(ViewUIPlus)
  .use(VueLazyLoad, {
    error: '/src/assets/img/loadfail.png',
    loading: '/src/assets/img/loading.png'
  });

app.mount('#app');
