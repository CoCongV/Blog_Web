<template>
  <mu-card>
    <router-link :to="{
    name: 'userProfile',
    query: {
      author_url: post.author_url
    }}">
      <mu-card-header v-bind:title="post.author" v-bind:subTitle="post.timestamp" class="article-head">
        <mu-avatar :src="post.avatar" slot="avatar"/>
      </mu-card-header>
    </router-link>
    <mu-card-title v-bind:title="post.title" class="article-title" style="text-align: center;"/>
    <mu-card-text class="article-body" v-html="post.body_html">
    </mu-card-text>
    <mu-divider/>
    <mu-content-block class="article-foot" style="color: grey;">
      <div>
        <mu-chip v-for="tag in post.tags" class="tag" :style="{backgroundColor: randomColors}" :key="tag.id">
          {{ tag }}
        </mu-chip>
      </div>
      <div style="text-align: right;">
        <mu-chip class="demo-chip" style="right: 0;">
          <mu-avatar :size="24" icon="visibility"/>&nbsp;&times;&nbsp;{{ post.view }}
        </mu-chip>
      </div>
    </mu-content-block>
    <mu-card-actions class="article-button">
      <mu-icon-button icon="delete" @click="deleteEvent" v-show="deletePermission"/>
      <mu-checkbox class="demo-checkbox" uncheckIcon="favorite_border" checkedIcon="favorite"/> <br/>
    </mu-card-actions>
  </mu-card>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'
  export default {
    props: {
      post: '',
      deletePermission: ''
    },
    methods: {
      deleteEvent: function () {
        this.$emit('deleteEvent')
      }
    },
    computed: {
      ...mapGetters([
        'randomColors'
      ]),
      ...mapState([
        'colors'
      ])
    }
  }
</script>

<style scoped>
  .article-button {
    text-align: right;
  }
</style>
