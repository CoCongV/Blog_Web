<template>
    <div>
        <left-col></left-col>
        <v-container>
            <v-layout>
                <v-flex xs12 md9 offset-md3>
                    <article-body :article="article"></article-body>
                </v-flex>
            </v-layout>
            <v-speed-dial v-model="fab" right bottom direction="top" open-on-hover fixed v-if="deletePermission">
                <v-btn slot="activator" v-model="fab" color="blue darken-2" fab>
                    <v-icon>apps</v-icon>
                    <v-icon>close</v-icon>
                </v-btn>
                <v-btn fab small color="error" @click="deleteArticle">
                    <v-icon>delete</v-icon>
                </v-btn>
                <v-btn fab small color="warning" @click="editArticle">
                    <v-icon>edit</v-icon>
                </v-btn>
            </v-speed-dial>
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
        this.axios.get(this.$route.query.url).then((response) => {
            this.article = response.data.post
            this.axios.get(api.postPermission, {
                params: {
                    post_id: this.article.post_id
                }
            }).then((response) => {
                console.log('get post permission return')
                this.deletePermission = true
            }).catch((error) => {
                this.deletePermission = false
            })
        })
        this.axios.get(api.comment, {
            params: {
            post_id: this.$route.params.id
            }
        }).then((response) => {
            this.comments = response.data.comments
            this.total = response.data.count
        })
    },
    methods: {
        deleteArticle () {
            this.axios.delete(
                api.post.replace(':id', this.article.post_id),
            ).then((response) => {
                this.$router.push({name: 'home'})
            }).catch((error) => {
                this.$store.commit('showSnackbar', {text: error.response.data.message, color: 'error'})
            })
        },
        editArticle () {
            this.$router.push({name: 'editArticle', params: {'id': this.article.post_id}})
        }
    }
}
</script>

