// store文件夹下index.js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// function storeLocalStore (state) {
//   window.localStorage.setItem('userMsg', JSON.stringify(state))
// }
export default new Vuex.Store({
  state: {
    openId: '',
    globalUrl: 'http://api.print.heartqiu.cn',
    uid: '',
    openShop: '',
    cookie: '',
    accesstoken: '',
    islogin: '0',
    nickName: ''
  },
  mutations: {
    login (state, payload) {
      state.openId = payload.openId
      state.uid = payload.uid
      state.nickName = payload.nickName
      state.openShop = payload.openShop
      state.cookie = payload.cookie
      state.accesstoken = payload.accesstoken
      state.islogin = payload.islogin
      console.log('STATE' + state.accesstoken)
      // storeLocalStore(state)
    },
    submitForm (state, payload) {
      state.openShop = payload.openShop
      // storeLocalStore(state)
    }
  }

})
