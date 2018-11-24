<template>
  <div>
    <left-col></left-col>
    <v-container>
        <article-list></article-list>
    </v-container>
  </div>
</template>

<script>
import LeftCol from '@/components/LeftCol'
import ArticleList from '@/components/article/ArticleList'

export default {
  name: 'home',
  components: {
    LeftCol: LeftCol,
    articleList: ArticleList
  }
}
</script>

<style>
  .home {
    margin-left: 0% !important;
    padding-left: 0% !important;
    padding-right: 0% !important;
  }
</style>
