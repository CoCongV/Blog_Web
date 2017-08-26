<template>
  <div id="app">
    <moon-nav></moon-nav>
    <vue-particles color="#dedede" :particleOpacity="0.8" :particlesNumber="60" shapeType="circle" :particleSize="6" linesColor="#dedede" :linesWidth="1" :lineOpacity="0.4" :linesDistance="200" :moveSpeed="3" class="particles" style="position: fixed; background-size: cover;width: 100%; height: 100%;top:0;left:0;">
    </vue-particles>
    <div class="moon-content">
      <router-view></router-view>
    </div>
    <moon-foot id="foot-bar"></moon-foot>{{ showToast }}
    <mu-toast v-if="toast" :message="message" @close="hideToast" />
  </div>
</template>

<script>
import nav from './components/navbar.vue'
import foot from './components/footbar.vue'
import api from './services/api'
export default {
  name: 'app',
  data: function () {
    return {
      toast: false,
      message: ''
    }
  },
  created: function () {
    if (this.$cookie.get('token')) {
      this.axios.get(
        api.token
      ).then((response) => {
        this.$store.commit('login')
      }).catch((error) => {
        console.log(error)
        this.$store.commit('logout')
      })
      this.axios.get(api.permission).then((response) => {
        this.$store.commit('permission', response.data.permission)
      }).catch((error) => {
        console.log(error)
        this.$store.commit('permission', 0)
      })
    }
  },
  components: {
    'moon-nav': nav,
    'moon-foot': foot
  },
  computed: {
    showToast: function () {
      if (this.$store.state.toast) {
        this.toast = this.$store.state.toast
        this.message = this.$store.state.message
        if (this.toastTimer) clearTimeout(this.toastTimer)
        this.toastTimer = setTimeout(() => { this.hideToast() }, 2000)
      }
    }
  },
  methods: {
    hideToast: function () {
      this.$store.commit('hideToast')
      this.toast = false
      this.message = ''
      if (this.toastTimer) clearTimeout(this.toastTimer)
    }
  }
}
</script>
<style>
.particles {
  position: absolute;
  background-size: cover;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
