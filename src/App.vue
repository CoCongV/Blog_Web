<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Home from '@/views/Home'
import { LeftCol } from "@/components/LeftCol";
export default {
  components: {
    home: Home,
    leftCol: LeftCol
  }
}
</script>
