<template>
  <mu-paper>
    <mu-bottom-nav :value="bottomNav" @change="handleChange">
      <mu-bottom-nav-item href="https://github.com/moonlitlaputa">
        <mu-avatar src="static/img/github-black.png" backgroundColor="white"/>
      </mu-bottom-nav-item>
      <!--<mu-bottom-nav-item value="favorites" title="Favorites" icon="favorite"/>-->
      <!--<mu-bottom-nav-item value="nearby" title="Nearby" icon="location_on"/>-->
    </mu-bottom-nav>
  </mu-paper>
</template>

<script>
  export default {
    data () {
      return {
        bottomNav: 'recents'
      }
    },
    methods: {
      handleChange (val) {
        this.bottomNav = val
      }
    }
  }
</script>
