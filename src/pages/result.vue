<template>
  <div class="grid">
    <mu-row gutter>
      <mu-col width="0" tablet="20" desktop="20"></mu-col>
      <mu-col width="100" tablet="60" desktop="60">
        <router-link v-for="post in posts"
                     :to="{ name: 'post',
                      params: {id: post.post_id},
                       query: {url: post.url}}"
                     :key="post.id">
          <moon-article v-bind:post="post"></moon-article>
        </router-link>
      </mu-col>
      <mu-col width="0" tablet="20" desktop="20"></mu-col>
    </mu-row>
  </div>
</template>

<script>
  import api from '../services/api'
  import article from '../components/post/articleOutline.vue'
  export default {
    data: function () {
      return {
        posts: ''
      }
    },
    mounted: function () {
      this.$http.get(
        api.postSearch,
        {
          params: {...this.$route.query}
        }
      ).then((response) => {
        this.posts = response.data.posts
      })
    },
    components: {
      'moon-article': article
    }
  }
</script>
