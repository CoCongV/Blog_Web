<template>
    <div>
        <v-navigation-drawer fixed clipped app v-model="drawer">
            <v-list dense>
                <v-list-tile>
                    <v-list-tile-content>
                        <v-list-tile-title class="title">{{getUsername}}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
            <v-divider></v-divider>
            <v-subheader class="mt-3 grey--text text--darken-1">TOOLS</v-subheader>
            <v-list dense class="pt-0">
                <v-list-tile
                    v-for="tool in tools"
                    :key="tool.title"
                    @click="tool.click"
                    :v-if="!tool.hide"
                >
                    <v-list-tile-action>
                        <v-icon>{{tool.icon}}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title class="subheading">{{tool.title}}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar color="red" dense fixed clipped-left app>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <router-link :to="{name: 'home'}">
                <v-icon class="mx-3">home</v-icon>
            </router-link>
            <v-toolbar-title>{{title}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-layout row align-center style="max-width: 20%">
                <v-text-field
                    placeholder="Search"
                    single-line
                    append-icon="search"
                    color="white"
                    hide-detail
                    @keyup.enter="search"
                    v-model="searchParam"
                ></v-text-field>
            </v-layout>
        </v-toolbar>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: "Personal Center"
        },
    },
    data() {
        return {
            drawer: false,
            tools: [
                { icon: "label", title: "Spider", click: this.test },
                {
                    icon: "drafts",
                    title: "Draft Box",
                    click: () => {this.$router.push({name: "draftBox", params: {page: 1}})},
                    hide: this.isBlogger
                },
                {
                    icon: "book",
                    title: "Book Cloud",
                    click: () => {this.$router.push({name: "books"})},
                    hide: this.isResource
                },
                {
                    icon: "person",
                    title: "Personal Center",
                    click: () => {this.$router.push({name: "profile"})}
                }
            ],
            searchParam: ''
        };
    },
    methods: {
        test() {
            this.$store.commit("showSnackbar", {
                text: "假的",
                color: "error"
            });
        },
        search() {
            if (this.searchParam) {
                this.$emit('search')
            }
        }
    },
    computed: {
        getUsername() {
            return this.$store.state.username;
        },
        isBlogger() {
            if (this.$store.state.permission >= 255) {
                return true;
            } else {
                return false;
            }
        },
        isResource() {
            if (this.$store.state.permission >= 10) {
                return true
            } else {
                return false
            }
        }
    }
};
</script>

