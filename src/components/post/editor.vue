<template>
  <div id="app">
    {{ showBody }}
    <vue-editor v-model="body"></vue-editor>
  </div>
</template>

<script>
  import { VueEditor } from 'vue2-editor'
  export default {
    props: {
      content: ''
    },
    data: function () {
      return {
        body: '',
        reply: ''
      }
    },
    components: {
      VueEditor
    },
    computed: {
      showBody: function () {
        console.log(this.content)
        this.body = this.content
      }
    }
  }
</script>
