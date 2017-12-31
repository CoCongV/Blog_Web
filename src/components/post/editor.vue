<template>
  <div>
    {{ showBody }}
    <vue-editor
    useCustomImageHandler
    @imageAdded="handleImageAdded"
    v-model="body">
    </vue-editor>
  </div>
</template>

<script>
import api from '@/services/api'
import { VueEditor } from 'vue2-editor'
export default {
  props: {
    content: ''
  },
  data () {
    return {
      body: '',
      reply: ''
    }
  },
  components: {
    'vue-editor': VueEditor
  },
  computed: {
    showBody () {
      this.body = this.content
    }
  },
  methods: {
    handleImageAdded (file, Editor, cursorLocation) {
      console.log('start post img')
      let formData = new FormData()
      console.log(file)
      formData.append('image', file)
      console.log(formData)
      this.axios(
        {
          url: api.postImgUpload,
          method: 'PUT',
          data: formData
        }
      ).then((result) => {
        let url = result.data.url
        console.log(url)
        Editor.insertEmbed(cursorLocation, 'image', url)
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
