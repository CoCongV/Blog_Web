<template>
  <mu-card :key="post.id" v-bind:id="post.post_id">
    <mu-card-header v-bind:title="post.author" v-bind:subTitle="post.timestamp" class="article-head">
      <mu-avatar :src="post.avatar" slot="avatar"/>
    </mu-card-header>
    <mu-card-title v-bind:title="post.title" class="article-title"/>
    <mu-card-text class="article-head">
      <div v-html="post.body_html"></div>
    </mu-card-text>
  </mu-card>
</template>

<script>
  export default {
    props: {
      post: ''
    }
  }
</script>
