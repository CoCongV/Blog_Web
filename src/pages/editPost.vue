<template>
  <mu-row gutter>
    <mu-col width="5" tablet="25" desktop="20"></mu-col>
    <mu-col width="90" tablet="50" desktop="60">
      <mu-card class="editor">
        <mu-text-field label="标题" hintText="请输入标题" type="text" v-model="title" labelFloat/><br/>
        <moon-editor ref="editor" :content="body"></moon-editor>
        <div class="tag-input">
          <mu-text-field label="标签" hintText="以空格进行切割" type="text" v-model="tags" labelFloat/><br/>
        </div>
        <mu-card-actions class="editor-button">
          <mu-raised-button class="demo-raised-button" icon="done" @click="submit" primary/>
        </mu-card-actions>
      </mu-card>
    </mu-col>
    <mu-col width="5" tablet="25" desktop="20"></mu-col>
  </mu-row>
</template>

<script>
  import editor from '../components/post/editor.vue'
  import api from '@/services/api'
  export default {
    data: function () {
      return {
        title: '',
        body: '',
        tags: ''
      }
    },
    components: {
      'moon-editor': editor
    },
    mounted: function () {
      this.axios.get(
        api.post.replace(':id', this.$route.params.id),
      ).then((response) => {
        this.title = response.data.post.title
        this.body = response.data.post.body
        this.tags = response.data.post.tags
      })
    },
    methods: {
      submit () {
        this.axios.put(
          api.post.replace(':id', this.$route.params.id),
          {
            title: this.title,
            content: this.$refs.editor.body,
            tags: this.tags.split(' '),
            post_id: this.$route.params.id
          }
        ).then((response) => {
          this.$router.push(
            {
              name: 'post',
              params: {
                id: response.data.post_id
              },
              query: {
                url: response.data.url
              }
            }
          )
        })
      }
    }
  }
</script>
