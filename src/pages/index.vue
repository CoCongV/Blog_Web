<template>
  <div class="grid">
    <mu-row gutter>
      <mu-col width="0" tablet="15" desktop="15"></mu-col>
      <mu-col width="100" tablet="50" desktop="50">
        <router-link v-for="post in posts"
                     :to="{ name: 'post',
                      params: {id: post.post_id},
                       query: {url: post.url}}"
                     :key="post.id">
          <moon-article v-bind:post="post"></moon-article>
        </router-link>
        <mu-pagination :total="total" :current="current" @pageChange="handleClick">
        </mu-pagination>
      </mu-col>
      <mu-col width="100" tablet="20" desktop="10">
        <mu-paper class="demo-paper" :zDepth="1">
          <moon-slide></moon-slide>
        </mu-paper>
      </mu-col>
      <mu-col width="0" tablet="15" desktop="15"></mu-col>
    </mu-row>
    <mu-icon-button icon="arrow_upward" class="dialog" @click="pageScroll"/>
  </div>
</template>

<script>
  import article from '../components/post/articleOutline.vue'
  import slide from '../components/slidebar/slidebar.vue'
  import api from '../services/api'
  export default {
    data: function () {
      return {
        posts: '',
        total: 1,
        current: 1
      }
    },
    mounted: function () {
      this.axios.get(api.posts).then((response) => {
        this.posts = response.data.posts
        this.total = response.data.count
      })
    },
    components: {
      'moon-slide': slide,
      'moon-article': article
    },
    methods: {
      Like: function () {
        alert(1)
      },
      handleClick (newIndex) {
        this.axios.get(
          api.posts,
          {
            params: {
              page: newIndex
            }
          }
        ).then((response) => {
          this.posts = response.data.posts
          this.total = response.data.count
          this.pageScroll()
        }).catch((error) => {
          this.$store.commit('showToast', error.response.data.message | 'Network anomaly')
        })
      },
      pageScroll: function () {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      }
    }
  }
</script>

<style lang="css">
  .grid {
    margin-top: 8px;
    padding: 8px;
  }
</style>

