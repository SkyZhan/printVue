// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'element-ui/lib/theme-chalk/index.css'
import Validator from 'vue-validator'
import store from './store/index.js'

Vue.use(Validator)
Vue.use(VueAxios, axios)
Vue.use(ElementUI)
Vue.config.productionTip = false
//
// axios.defaults.headers.post['accesstoken'] = '5-7762e39c640684ab8ec8c1cd6a45480f'
// axios.defaults.headers.get['accesstoken'] = '5-7762e39c640684ab8ec8c1cd6a45480f'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
