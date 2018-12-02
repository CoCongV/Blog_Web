<template>
    <v-app style="margin-top: 60px">
        <toolbar :title="toolbarTitle"></toolbar>
        <v-container>
            <v-layout align-center justify-center>
                <v-flex xs12 md9 lg6>
                    <edit-card></edit-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
import EditCard from "@/components/article/ArticleEditCard"
import Toolbar from "@/components/Toolbar"
export default {
    components: {
        editCard: EditCard,
        toolbar: Toolbar
    },
    data () {
        return {
            toolbarTitle: 'Public Article'
        }
    },
}
</script>

<style>

</style>
