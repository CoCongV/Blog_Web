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
    avatar: '',
    permission: 0,
    bloggerUsername: '',
    bloggerAvatar: '',
    aboutBlogger: '',
    bloggerID: '',
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
      state.avatar = userInfo.avatar
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
      state.bloggerID = blogger.uid
    }
  },
  actions: {

  }
})
