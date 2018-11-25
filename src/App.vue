<template>
  <v-app dark>
    <div id="app">
      <router-view></router-view>
    </div>
  </v-app>
</template>

<script>
import Home from '@/views/Home'
export default {
  components: {
    home: Home,
  }
}
</script>
