<template>
  <div>
    <vue-editor v-model="body" :editorToolbar="customToolbar"></vue-editor>
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
        reply: '',
        customToolbar: [
          ['bold', 'italic', 'underline'],
          [{'list': 'ordered'}, {'list': 'bullet'}],
          ['code-block']
        ]
      }
    },
    components: {
      'vue-editor': VueEditor
    }
  }
</script>
