<template>
  <div class="article">
    <mu-row>
      <mu-col width="5" tablet="10" desktop="25"></mu-col>
      <mu-col width="90" tablet="80" desktop="50">
        <mu-flexbox orient="vertical">
          <mu-flexbox-item>
            <moon-article :post="post" :postPermission="permission" @deleteEvent="deletePost"></moon-article>
          </mu-flexbox-item>
          <mu-flexbox-item>
            <mu-card v-for="comment in comments" :key="comment.id">
              <mu-card-header :title="comment.author" :subTitle="comment.timestamp">
              <mu-avatar :src="comment.avatar" slot="avatar"/>
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
  import article from '@/components/post/article.vue'
  import dialog from '@/components/post/articleDialog.vue'
  import api from '@/services/api'
  export default {
    data: function () {
      return {
        post: '',
        comments: '',
        postPermission: false,
        total: 0,
        current: 1
      }
    },
    created: function () {
      this.axios.get(this.$route.query.url).then((response) => {
        this.post = response.data.post
        this.postPermission = response.data.delete_permission
      }).catch((error) => {
        console.log(error)
      })
      this.axios.get(api.comment, {
        params: {
          post_id: this.$route.params.id
        }
      }).then((response) => {
        this.comments = response.data.comments
        this.total = response.data.count
      }).catch((error) => {
        console.log(error)
      })
    },
    computed: {
      permission: function () {
        if (!this.post) return this.postPermission
        this.axios.get(
          api.postPermission,
          {
            params: {
              post_id: this.post.post_id
            }
          }
        ).then((response) => {
          this.postPermission = true
        })
        return this.postPermission
      }
    },
    components: {
      'moon-article': article,
      'moon-dialog': dialog
    },
    methods: {
      reloadComment: function () {
        this.axios.get(
          api.comment,
          {
            params: {
              post_id: this.post.post_id
            }
          }
        ).then((response) => {
          this.comments = response.data.comments
        })
      },
      deletePost: function () {
        this.axios.delete(
          api.post.replace(':id', this.post.post_id),
        ).then((response) => {
          this.$router.push({name: 'index'})
        })
      },
      handleClick: function (newIndex) {
        this.axios.get(
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
    margin: 8px !important;
  }
  .article {
    margin-top: 8px;
  }
</style>
