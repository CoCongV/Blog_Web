<template>
  <v-app dark style="min-height: 100%">
    <div id="app">
      <router-view></router-view>
    </div>
    <snackbar></snackbar>
  </v-app>
</template>

<script>
import Snackbar from '@/components/Snackbar'
import Home from '@/views/Home'
import { api } from "@/libs/api";
export default {
  components: {
    home: Home,
    snackbar: Snackbar,
  },
  mounted () {
    this.axios.get(api.user).then((response) => {
      console.log(response)
      this.$store.commit('login', response.data)
    }).catch((error) => {
      console.log(error)
      this.$store.commit('logout')
    })
  }
}
</script>

<style>
  #app {
    height: 100%;
  }
</style>

