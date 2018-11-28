import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snackbar: false,
    snackbarText: '',
    snackbarColor: '',
    login: false,
    username: '',
    permission: 0,
    bloggerUsername: '',
    bloggerAvatar: '',
    aboutBlogger: '',
  },
  mutations: {
    showSnackbar (state, config) {
      state.snackbarText = config.text
      state.snackbarColor = config.color
      state.snackbar = true
    },
    hideSnackbar (state) {
      state.snackbar = false
      state.snackbarText = ''
      state.snackbarColor = ''
    },
    login (state, userInfo) {
      state.login = true
      state.username = userInfo.username
      state.permission = userInfo.permission
    },
    logout (state) {
      state.login = false
      state.username = ''
      state.permission = 0
    },
    cacheBlogger (state, blogger) {
      state.bloggerUsername = blogger.username
      state.bloggerAvatar = blogger.avatar
      state.aboutBlogger = blogger.about_me
    }
  },
  actions: {

  }
})
