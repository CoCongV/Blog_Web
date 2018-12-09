<template>
    <div>
        <left-col></left-col>
        <v-container>
            <v-layout>
                <v-flex xs12 md9 offset-md3>
                    <article-body :article="article" :hover="false" :overview="false"></article-body>
                    <v-card class="commentCard" v-if="!this.$store.state.login">
                        <v-card-text>
                            <p class="text-xs-center">发表评论请先
                                <router-link
                                    :to="{name: 'login', query: {fromURL: this.$route.fullPath + '#comment-edit'}}"
                                >登录</router-link>
                            </p>
                        </v-card-text>
                    </v-card>
                    <comment-edit-card
                        class="commentCard"
                        v-if="this.$store.state.login"
                        @commentSubmit="getComments"
                        :post_id="article.post_id"
                    ></comment-edit-card>
                    <div v-for="comment in comments" :key="comment.id">
                        <comment-card
                            :content="comment.body_html"
                            :author="comment.author"
                            class="commentCard"
                            :uid="comment.uid"
                            :avatar="comment.avatar"
                            :timestamp="comment.timestamp"
                        ></comment-card>
                    </div>
                </v-flex>
            </v-layout>
            <v-speed-dial
                fab
                right
                bottom
                direction="top"
                open-on-hover
                fixed
                v-if="deletePermission"
            >
                <v-btn slot="activator" color="blue darken-2" fab>
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
            <v-btn v-else fab fixed right bottom 
                color="pink lighten-3" @click="$vuetify.goTo(0)"
            >
                <v-icon>arrow_upward</v-icon>
            </v-btn>
        </v-container>
    </div>
</template>

<script>
import ArticleBody from "@/components/article/ArticleBody";
import CommentCard from "@/components/comment/CommentCard";
import CommentEditCard from "@/components/comment/EditCard";
import { api } from "@/libs/api";
import LeftCol from "@/components/LeftCol";

export default {
    data() {
        return {
            article: {},
            comments: [],
            page: 1,
            length: 1,
            deletePermission: false
        };
    },
    components: {
        leftCol: LeftCol,
        articleBody: ArticleBody,
        commentCard: CommentCard,
        commentEditCard: CommentEditCard
    },
    mounted() {
        this.axios.get(this.$route.query.url).then(response => {
            this.article = response.data.post;
            this.axios
                .get(api.postPermission, {
                    params: {
                        post_id: this.article.post_id
                    }
                })
                .then(response => {
                    this.deletePermission = true;
                })
                .catch(error => {
                    this.deletePermission = false;
                });
        });
        this.getComments();
    },
    methods: {
        deleteArticle() {
            this.axios
                .delete(api.post.replace(":id", this.article.post_id))
                .then(response => {
                    this.$router.push({ name: "home" });
                })
                .catch(error => {
                    this.$store.commit("showSnackbar", {
                        text: error.response.data.message,
                        color: "error"
                    });
                });
        },
        editArticle() {
            this.$router.push({
                name: "editArticle",
                params: { id: this.article.post_id }
            });
        },
        getComments() {
            console.log("get comment");
            this.axios
                .get(api.postComments.replace(":id", this.$route.params.id))
                .then(response => {
                    this.comments = response.data.comments;
                    this.total = response.data.count;
                });
        }
    }
};
</script>

<style>
.commentCard {
    margin-top: 10px;
}
</style>

