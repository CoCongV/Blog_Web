<template>
    <v-layout>
        <v-flex xs12 md9 offset-md3>
            <v-layout column>
                <v-flex xs12 v-for="article in articles" :key="article.id" class="article-card">
                    <router-link 
                        :to="{ name: 'article',
                        params: {id: article.post_id},
                        query: {url: article.url}}"
                        style="text-decoration: none"
                    >
                        <my-article :article="article" name="article"></my-article>
                    </router-link>
                </v-flex>
            </v-layout>
            <div class="text-xs-center">
              <v-pagination v-model="page" :length="length"></v-pagination>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
import ArticleBody from '@/components/article/ArticleBody'
import { api } from '@/libs/api'
export default {
    data: function () {
        return {
            articles: [],
            length: 0,
            page: 1,
        }
    },
    components: {
        myArticle: ArticleBody
    },
    mounted: function () {
      this.axios.get(api.posts).then((response) => {
        this.articles = response.data.posts
        this.length = response.data.pages
      })
    },
    watch: {
        page: function(newVal, oldVal) {
            console.log(this.page)
            this.axios.get(api.posts, {
                params: {
                    page: newVal
                }
            }).then((response) => {
                this.articles = response.data.posts
                this.length = response.data.count
            })
        }
    }
}
</script>

<style>
    .article-card {
        margin: 10px 0px;
    }
    .article-fade-enter {
        transform: translateX(10px);
        opacity: 0;
    }
    .article-fade-enter-active {
        transition: all .3s ease;
    }
</style>
