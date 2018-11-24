<template>
    <div>
        <left-col></left-col>
        <v-container>
            <v-layout>
                <v-flex xs12 md9 offset-md3>
                    <article-body :article="article"></article-body>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import ArticleBody from '@/components/article/ArticleBody'
import { api } from "@/libs/api"; 
import LeftCol from '@/components/LeftCol'

export default {
    data () {
        return {
            article: {},
            comments: [],
            page: 1,
            length: 1,
            deletePermission: false
        }
    },
    components: {
        leftCol: LeftCol,
        articleBody: ArticleBody
    },
    created () {
        console.log('test')
        this.axios.get(this.$route.query.url).then((response) => {
            this.article = response.data.post
            this.deletePermission = response.data.delete_permission
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
}
</script>

