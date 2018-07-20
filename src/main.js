// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import VueCookie from 'vue-cookie'
import Vuex from 'vuex'
import VueParticles from 'vue-particles'
import VueHighlightJS from 'vue-highlightjs'
import theme from 'muse-ui/lib/theme'
import Toast from 'muse-ui-toast'

theme.add('teal', {
  primary: '#474a4f',
  secondary: '#ff4081',
  success: '#4caf50',
  warning: '#ffeb3b'
}, 'light')

theme.use('teal')

Vue.use(MuseUI)
Vue.use(Toast, {close: false})
Vue.use(VueCookie)
Vue.use(Vuex)
Vue.use(VueParticles)
Vue.use(VueHighlightJS)
Vue.prototype.axios = axios

axios.interceptors.request.use(function (config) {
  if (Vue.cookie.get('token')) {
    config.headers.Authorization = 'token ' + Vue.cookie.get('token')
  }
  return config
})

/* router setup */
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.login) {
      next({
        name: 'login',
        query: { requiresAuth: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
