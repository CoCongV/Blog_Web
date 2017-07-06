/**
 * Created by lvcong on 17-6-21.
 */
export default {
  randomColors: state => {
    return state.colors[Math.floor(Math.random() * state.colors.length)]
  }
}
