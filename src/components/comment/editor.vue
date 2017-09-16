<template>
  <div>
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
        body: this.content,
        reply: ''
      }
    },
    components: {
      'vue-editor': VueEditor
    }
  }
</script>
