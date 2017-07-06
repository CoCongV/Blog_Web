/**
 * Created by lvcong on 17-6-23.
 */
export default {
  login: (state) => {
    state.login = true
  },
  logout: (state) => {
    state.login = false
  },
  permission: (state, n) => {
    state.permission = n
  },
  showToast: (state, msg) => {
    state.toast = true
    state.message = msg
  },
  hideToast: (state) => {
    state.toast = false
    state.message = ''
  }
}
