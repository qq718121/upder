
import Vue from 'vue'
import App from './App'
import axios from './common/axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import url from './common/url'
import router from './router'
Vue.use(ElementUI);
Vue.prototype.$http = axios;
Vue.prototype.$url = url;
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
