<template>
  <v-app dark style="min-height: 100%">
    <div id="app">
      <router-view></router-view>
    </div>
    <snackbar></snackbar>
    <circle-progress></circle-progress>
    <overlay></overlay>
  </v-app>
</template>

<script>
import circleProgress from "@/components/progress/Circle"
import Snackbar from '@/components/Snackbar'
import Overlay from '@/components/Overlay'
import { api } from "@/libs/api";
export default {
  components: {
    snackbar: Snackbar,
    circleProgress: circleProgress,
    overlay: Overlay,
  },
  mounted () {
    this.axios.get(api.token).then((response) => {
      if (response.data.state) {
        this.$store.commit('login', response.data)
        this.$store.commit('showSnackbar', {text: `Welcome Back ${response.data.username}`, color: 'cyan darken-2'})
      }
    })
    this.axios.get(api.blogger).then((response) => {
      this.$store.commit('cacheBlogger', response.data)
    }).catch((error) => {
      this.$store.commit('showSnackbar', {text: 'Cache Failed', color: 'error'})
    })
  }
}
</script>

<style>
  #app {
    height: 100%;
  }
</style>
