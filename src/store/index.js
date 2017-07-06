/**
 * Created by lvcong on 17-6-21.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getter'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  colors: ['#e8eaf6', '#e3f2fd', '#e1f5fe', '#e0f7fa', '#a7ffeb'],
  login: false,
  permission: 0,
  toast: false,
  message: ''
}

export default new Vuex.Store({
  state,
  getters,
  mutations
})
