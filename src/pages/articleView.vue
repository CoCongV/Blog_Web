<template>
  <div class="article">
    <mu-row>
      <mu-col width="5" tablet="10" desktop="25"></mu-col>
      <mu-col width="90" tablet="80" desktop="50">
        <mu-flexbox orient="vertical">
          <mu-flexbox-item>
            <moon-article :post="post" :deletePermission="permission" @deleteEvent="deletePost"></moon-article>
          </mu-flexbox-item>
          <mu-flexbox-item>
            <mu-card v-for="comment in comments" :key="comment.id">
              <mu-card-header :title="comment.author" :subTitle="comment.timestamp">
              <mu-avatar src="/static/uicon.png" slot="avatar"/>
              </mu-card-header>
              <mu-divider />
              <mu-card-text v-html="comment.body_html">
              </mu-card-text>
            </mu-card>
            <mu-pagination :total="total" :current="current" @pageChange="handleClick">
            </mu-pagination>
          </mu-flexbox-item>
        </mu-flexbox>
      </mu-col>
      <mu-col width="5" tablet="10" desktop="25"></mu-col>
    </mu-row>
    <moon-dialog :post="post.post_id" @submit="reloadComment"></moon-dialog>
  </div>
</template>

<script>
  import article from '../components/post/article.vue'
  import editor from '../components/comment/editor.vue'
  import dialog from '../components/post/articleDialog.vue'
  import api from '../services/api'
  export default {
    data: function () {
      return {
        post: '',
        comments: '',
        deletePermission: '',
        total: 0,
        current: 1
      }
    },
    mounted: function () {
      this.$http.get(this.$route.query.url).then((response) => {
        this.post = response.data.post
        this.deletePermission = response.data.delete_permission
      }, (response) => {
        console.log(response)
      })
      this.$http.get(api.comment, {
        params: {
          post: this.$route.params.id
        }
      }).then((response) => {
        this.comments = response.data.comments
        this.total = response.data.count
      }, (response) => {
        console.log(response)
      })
    },
    computed: {
      permission: function () {
        if (!this.$store.state.login) {
          this.deletePermission = false
        }
        return this.deletePermission
      }
    },
    components: {
      'moon-editor': editor,
      'moon-article': article,
      'moon-dialog': dialog
    },
    methods: {
      reloadComment: function () {
        this.$http.get(
          api.comment,
          {
            params: {
              post: this.post.post_id
            }
          }
        ).then((response) => {
          this.comments = response.data.comments
        })
      },
      deletePost: function () {
        this.$http.delete(
          api.post,
          {
            params: {
              post_id: this.post.post_id
            }
          }
        ).then((response) => {
          this.$router.push({name: 'index'})
        })
      },
      handleClick: function (newIndex) {
        this.$http.get(
          api.comment,
          {
            params: {
              post: this.$route.params.id,
              page: newIndex
            }
          }
        ).then((response) => {
          this.comments = response.data.comments
          this.total = response.data.count
        })
      }
    }
  }
</script>
<style>
  .chip {
    margin: 10px !important;
  }
  .article {
    margin-top: 8px;
  }
</style>
