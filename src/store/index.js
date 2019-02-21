// store文件夹下index.js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    openId: '',
    globalUrl: 'http://192.168.0.138:81',
    uid: '',
    openShop: '',
    cookie: '',
    accesstooken: ''
  },
  mutations: {
    login (state, payload) {
      state.openId = payload.openId
      state.uid = payload.uid
      state.openShop = payload.openShop
      state.cookie = payload.cookie
      state.accesstoken = payload.accesstoken
      console.log('STATE' + state.accesstoken)
    },
    submitForm (state, payload) {
      state.openShop = payload.openShop
    }
  }

})
