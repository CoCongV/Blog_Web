<template>
    <v-layout column>
        <v-flex xs12 v-for="article in articles" :key="article.id" class="article-card">
            <my-article :article="article" name="article"></my-article>
        </v-flex>
    </v-layout>
</template>

<script>
import ArticleBody from "@/components/article/ArticleBody";
import { api } from "@/libs/api";
export default {
    props: ["articles"],
    components: {
        myArticle: ArticleBody
    },
    watch: {
        page: function(newVal, oldVal) {
            console.log(this.page);
            this.axios.get(
                api.posts, 
                {
                    params: {
                        page: newVal
                    }
                }).then((response) => {
                    this.articles = response.data.posts;
                    this.length = response.data.count;
                });
        }
    }
};
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
    transition: all 0.3s ease;
}
</style>
