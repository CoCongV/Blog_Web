<template>
  <div class="parent">
    <mu-row class="child" gutter>
      <mu-col width="5" tablet="25" desktop="33"></mu-col>
      <mu-col width="90" tablet="50" desktop="33">
        <form>
          <moon-login></moon-login>
        </form>
      </mu-col>
      <mu-col width="5" tablet="25" desktop="33"></mu-col>
    </mu-row>
  </div>
</template>

<script>
  import login from '../components/login.vue'
  export default {
    components: {
      'moon-login': login
    }
  }
</script>

<style lang="css">
  .parent {
    position: fixed;
    width: 100%;
    height: 100%;
  }
  .child {
    width: 100%;
    height: 40%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
</style>
