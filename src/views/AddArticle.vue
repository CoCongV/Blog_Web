<template>
    <v-app>
        <toolbar :title="toolbarTitle"></toolbar>
        <v-container>
            <v-layout>
                <edit-card></edit-card>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
import EditCard from "@/components/article/EditCard"
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
