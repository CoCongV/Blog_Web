// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-teal.css'
import VueResource from 'vue-resource'
import VueCookie from 'vue-cookie'
import Vuex from 'vuex'
import store from './store'
import VueParticles from 'vue-particles'

Vue.use(MuseUI)
Vue.use(VueResource)
Vue.use(VueCookie)
Vue.use(Vuex)
Vue.use(VueParticles)

/* http setup */
Vue.config.productionTip = false
Vue.http.interceptors.push((request, next) => {
  // let oldUrl = request.url
  // request.url = 'http://localhost:5000' + oldUrl
  if (store.state.login) {
    request.headers.set('Authorization', 'token ' + Vue.cookie.get('token'))
  }
  // request.headers.common['Authorization'] = 'token ' + Vue.cookie.get('token')
  next()
})

/* router setup */
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.login) {
      next({
        name: 'login',
        query: {requiresAuth: to.fullPath}
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
/* eslint-disable no-new */
import api from './services/api'
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created: function () {
    if (this.$cookie.get('token')) {
      this.$http.get(api.token, {
        headers: {
          Authorization: 'token ' + Vue.cookie.get('token')
        }
      }).then((response) => {
        this.$store.commit('login')
      }, (response) => {
        this.$store.commit('logout')
      })
      this.$http.get(api.permission, {
        headers: {
          Authorization: 'token ' + Vue.cookie.get('token')
        }
      }).then((response) => {
        this.$store.commit('permission', response.data.permission)
      }, (response) => {
        this.$store.commit('permission', 0)
      })
    }
  }
})
