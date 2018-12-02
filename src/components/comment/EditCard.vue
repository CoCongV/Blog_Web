<template>
    <v-card light raised>
        <v-toolbar>
            <v-avatar><img :src="this.$store.state.avatar" alt="avatar"></v-avatar>
            <v-toolbar-title>Comment</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <vue-editor :editorOptions="editorSettings" :editorToolbar="customToolbar" v-model="body"></vue-editor>
        </v-card-text>
        <v-card-actions>
            <v-layout align-center justify-end>
                <v-btn color="success" @click="submit">Submit</v-btn>
            </v-layout>
        </v-card-actions>
    </v-card>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { api } from "@/libs/api";
import Vue from 'vue';
export default {
    props: {
        post_id: ''
    },
    components: {
        vueEditor: VueEditor,
    },
    data () {
        return {
            customToolbar: [
                ['bold', 'italic', 'underline'],
                [{'list': 'ordered'}, {'list': 'bullet'}],
                ['code-block']
            ],
            editorSettings: {
                modules: {
                    syntax: true
                }
            },
            body: '',
        }
    },
    methods: {
        submit () {
            this.axios.post(api.postComments.replace(':id', this.post_id), {
                body: this.body
            }).then((response) => {
                this.$store.commit('showSnackbar', {text: 'Comment Success', color: 'success'})
            }).catch((error) => {
                this.$store.commit('showSnackbar', {text: error.response.data.message, color: 'error'})
            })
            this.reset()
            this.$emit('commentSubmit')
        },
        reset () {
            this.body = ''
        }
    }
}
</script>

<style>

</style>
