<template>
  <v-app dark>
    <div id="app">
      <router-view></router-view>
    </div>
    <snackbar></snackbar>
  </v-app>
</template>

<script>
import Snackbar from '@/components/Snackbar'
import Home from '@/views/Home'
export default {
  components: {
    home: Home,
    snackbar: Snackbar,
  }
}
</script>

<style>
  #app {
    height: 100%;
  }
</style>

