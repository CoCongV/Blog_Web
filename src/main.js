import Vue from 'vue'
import Vuex from "vuex"
import VueCookie from 'vue-cookie'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false
Vue.config.devtools = true
Vue.use(VueCookie)
Vue.use(Vuex)
Vue.use(Vuetify)
Vue.use(VueAxios, axios)

axios.interceptors.request.use(function (config) {
  if (Vue.cookie.get('token')) {
    config.headers.Authorization = 'token ' + Vue.cookie.get('token')
  }
  return config
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
