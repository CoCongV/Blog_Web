<template>
    
</template>

<script>
import ArticleList from "@/components/article/ArticleList"
import ArticleEditCardVue from '../../components/article/ArticleEditCard.vue';
export default {
    data () {
        return {
            articles: [],
        }
    },
    components: {
        articlesList: ArticleList,
    },
    mounted () {
        let page = this.$route.params.page
        if (!page) {
            this.loadArticle(1)
        } else {
            let page = parseInt(page)
            this.loadArticle(page)
        }
    },
    methods: {
        async getArticle(page) {
            this.axios
                .get(api.posts, {
                    params: {
                        page: page
                    }
                })
                .then(response => {
                    this.articles = response.data.posts;
                    this.length = response.data.pages;
                });
        },
        async loadArticle(page) {
            await this.getArticle(page);
            this.load = true;
        },
    }
}
</script>

<style>

</style>
