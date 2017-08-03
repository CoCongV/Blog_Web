<template>
  <!-- bidirectional data binding（双向数据绑定） -->
  <quill-editor v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)">
  </quill-editor>

  <!-- Or manually control the data synchronization（或手动控制数据流） -->
</template>

<script>
  import {quillEditor} from 'vue-quill-editor'

  export default {
    data () {
      return {
        content: '',
        relay: '',
        editorOption: {
          modules: {
            toolbar: [
              [{'size': ['small', false, 'large']}],
              ['bold', 'italic'],
              [{'list': 'ordered'}, {'list': 'bullet'}],
              ['code-block']
            ]
          }
        }
      }
    },
    components: {
      quillEditor
    },
    // if you need to manually control the data synchronization, parent component needs to explicitly emit an event instead of relying on implicit binding
    // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
    methods: {
      onEditorBlur (editor) {
        // console.log('editor blur!', editor)
        return
      },
      onEditorFocus (editor) {
        // console.log('editor focus!', editor)
        return
      },
      onEditorReady (editor) {
        console.log('editor ready!', editor)
        return
      },
      onEditorChange ({ editor, html, text }) {
        // console.log('editor change!', editor, html, text)
        // this.content = html
        return
      }
    },
    // get the current quill instace object.
    computed: {
      editor () {
        return this.$refs.myQuillEditor.quill
      }
    },
    mounted () {
      // you can use current editor object to do something(quill methods)
      console.log('this is current quill instance object', this.editor)
    }
  }
</script>

<style lang="scss">
  .ql-container .ql-editor {
    min-height: 20em;
    padding-bottom: 1em;
    max-height: 25em;
  }
</style>
