<template>
    <v-card light raised>
        <v-toolbar>
            <v-layout align-center justify-center>
                <v-flex xs6 md3>
                    <v-text-field label="Title" class="title" v-model="title"></v-text-field>
                </v-flex>
            </v-layout>
        </v-toolbar>
        <vue-editor v-model="content"></vue-editor>
        <v-layout class="tag">
            <v-flex xs3 md3 lg2 v-for="tag of tags" :key="tag">
                <v-chip close @input="remove(tag)">{{tag}}</v-chip>
            </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout class="tag" justify-end>
            <v-flex xs3 md3 lg2>
                <v-text-field lable="Tag" placeholder="Tag" solo v-model="cacheTag"></v-text-field>
            </v-flex>
            <v-btn flat icon @click="addTag">
                <v-icon>add</v-icon>
            </v-btn>
        </v-layout>
        <v-card-actions>
            <v-btn color="success" :loading="loadingSubmit" :disabled="loadingSubmit" @click="submit">Submit<v-icon right>check</v-icon></v-btn>
            <v-btn color="warning" :loading="loadingCache" :disabled="loadingCache">Cache<v-icon right>archive</v-icon></v-btn>
            <v-btn color="error" @click="reset" :loading="loadingReset" :disabled="loadingReset">Reset<v-icon right>refresh</v-icon></v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { api } from "@/libs/api";
export default {
    components: {
        vueEditor: VueEditor,
    },
    props: {
        initContent: '',
        edit: false,
        initTitle: '',
        initTags: {
            default: []
        },
        url: '',
    },
    data () {
        return {
            cacheTag: '',
            content: this.initContent,
            title: this.initTitle,
            tags: this.initTags,
            updated: false,
            loader: null,
            loadingSubmit: false,
            loadingCache: false,
            loadingReset: false,
        }
    },
    methods: {
        addTag () {
            if (this.cacheTag) {
                this.tags.push(this.cacheTag)
                this.cacheTag = ''
            }
        },
        remove (item) {
            this.tags.splice(this.tags.indexOf(item), 1)
        },
        reset () {
            this.loadingReset = true
            if (this.edit) {
                this.axios.get(this.url).then((response) => {
                    this.content = response.data.post.content
                    this.title = response.data.post.title
                    this.tags = response.data.post.tags
                })
            } else {
                this.title = ''
                this.tags = []
                this.cacheTag = ''
                this.content = ''
                }
            this.loadingReset = false
        },
        submit () {
            this.loadingSubmit = true
            let content = {
                tags: this.tags,
                content: this.content,
                title: this.title
            }
            this.axios({
                method: this.edit ? 'patch' : 'post',
                url: this.edit ? this.url : api.posts,
                data: content
            }).then((response) => {
                this.$store.commit('showSnackbar', {text: 'Public Success', color: 'success'})
                this.$router.push({name: 'home'})
            }).catch((error) => {
                console.log(error.response)
                this.$store.commit('showSnackbar', {text: error.response.data.message, color: 'error'})
            }).then(() => {
                this.loadingSubmit = false
            })
        }
    },
}
</script>

<style scoped>
.tag {
    margin: 10px 0px 10px 0px
}
.custom-loader {
    animation: loader 1s infinite;
    display: flex;
}
@-moz-keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
@-webkit-keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
@-o-keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
@keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
