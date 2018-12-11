import axios from 'axios'
import Vue from 'vue'
import Vuex from "vuex"
import VueCookie from 'vue-cookie'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false
Vue.config.devtools = true
Vue.use(VueCookie)
Vue.use(Vuex)
Vue.use(Vuetify)
Vue.use(VueAxios, axios)

Vue.directive(
  'highlight', function (el) {
    let blocks = el.querySelectorAll('pre');
    blocks.forEach(
      (block) => {
        hljs.highlightBlock(block)
      }
    ) 
  }
)

axios.interceptors.request.use(function (config) {
  if (Vue.cookie.get('token')) {
    config.headers.Authorization = 'token ' + Vue.cookie.get('token')
  }
  return config
})

axios.interceptors.response.use((response) =>{
  return response
}, (error) => {
  console.log(error)
  if (error.response.status === 401) {
    router.push({name: 'login'})
  } else if (error.response.status === 500) {
    store.commit('showSnackbar', {'text': '服务器炸了', 'color': 'error'})
  }
  return Promise.reject(error)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
