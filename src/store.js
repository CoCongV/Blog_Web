import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snackbar: false,
    snackbarText: '',
    snackbarColor: '',
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
    }
  },
  actions: {

  }
})
