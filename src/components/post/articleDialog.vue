<template>
  <div>
    <mu-float-button icon="add" @click="open" class="dialog"/>
    <mu-dialog :open="dialog" title="Dialog" @close="close">
      <moon-editor ref="editor" id="comment-editor"></moon-editor>
      <mu-flat-button slot="actions" @click="close" primary label="取消"/>
      <mu-flat-button slot="actions" primary @click="submit" label="确定"/>
    </mu-dialog>
  </div>
</template>

<script>
  import editor from '../comment/comment_editor.vue'
  import api from '@/services/api'
  export default {
    props: ['post'],
    data () {
      return {
        dialog: false
      }
    },
    methods: {
      open () {
        this.dialog = true
      },
      close () {
        this.dialog = false
      },
      submit: function () {
        this.$http.post(
          api.comment,
          {
            post: this.post,
            reply: this.$refs.editor.reply,
            body: this.$refs.editor.content
          }
        ).then((response) => {
          this.$emit('submit')
          this.dialog = false
        }, (response) => {
          this.$router.push({name: 'login'})
        })
      }
    },
    components: {
      'moon-editor': editor
    }
  }
</script>
