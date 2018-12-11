<template>
    <v-app style="margin-top: 60px">
        <toolbar :title="toolbarTitle"></toolbar>
        <v-container>
            <v-layout align-center justify-center>
                <v-flex xs12 md9 lg6>
                    <edit-card :initTitle="title" :initContent="content"
                        :initTags="tags" :initUrl="url" :edit="edit" v-if="render"
                    ></edit-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
import EditCard from "@/components/article/ArticleEditCard"
import Toolbar from "@/components/Toolbar"
import { api } from "@/libs/api";
export default {
    components: {
        toolbar: Toolbar,
        editCard: EditCard
    },
    data () {
        return {
            toolbarTitle: "Edit Article",
            content: '',
            title: '',
            tags: [],
            url: '',
            edit: true,
            render: false
        }
    },
    mounted () {
        this.url = api.post.replace(':id', this.$route.params.id)
        this.axios.get(
            this.url,
        ).then((response) => {
            this.title = response.data.post.title
            this.content = response.data.post.body
            this.tags = response.data.post.tags
            this.render = true
        })
    }
}
</script>

<style>

</style>
