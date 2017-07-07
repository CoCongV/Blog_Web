<template>
  <mu-row class="profile">
    <mu-col width="100" tablet="50" desktop="50">
      <mu-card class="profile">
        <mu-card-header :title="info.username" :subTitle="info.email">
          <mu-avatar :src="info.avatar" slot="avatar"/>
        </mu-card-header>
        <mu-divider/>
        <mu-card-text>
          <mu-sub-header>关于</mu-sub-header>
          {{ info.about_me }}
        </mu-card-text>
        <mu-divider/>
      </mu-card>
      <mu-flexbox justify="center" orient="vertical" style="margin-top: 8px">
        <mu-flexbox-item>
          <mu-sub-header>文章列表</mu-sub-header>
          <router-link :to="{name: 'post', params: {id: post.post_id}, query: {url: post.url}}"
                       v-for="post in posts" :key="post.id">
            <mu-card>
              <mu-card-title :title="post.title" :subTitle="post.timestamp"/>
            </mu-card>
          </router-link>
        </mu-flexbox-item>
      </mu-flexbox>
    </mu-col>
    <mu-float-button icon="mode_edit" class="dialog"/>
  </mu-row>
</template>

<script>
  import api from '../services/api'
  export default {
    data: function () {
      return {
        info: '',
        posts: '',
        editPermission: ''
      }
    },
    mounted: function () {
      this.$http.get(this.$route.query.author_url).then((response) => {
        this.info = response.data.user
        this.editPermission = response.data.edit_permission
        this.$http.get(api.posts, {
          params: {
            uid: this.info.uid
          }
        }).then((response) => {
          this.posts = response.data.posts
        })
      })
    }
  }
</script>

<style>
  .profile {
    justify-content: center !important;
    margin-top: 10px;
  }
</style>

