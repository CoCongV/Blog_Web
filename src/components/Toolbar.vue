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
                <div
                    v-for="tool in tools"
                    :key="tool.title"
                >
                    <v-list-tile
                        @click="tool.click"
                        v-if="!tool.hide"
                    >
                        <v-list-tile-action>
                            <v-icon>{{tool.icon}}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title class="subheading">{{tool.title}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </div>
                <v-divider></v-divider>
                <div>
                    <v-list-tile @click="logout">
                        <v-list-tile-action>
                            <v-icon>exit_to_app</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title class="subheading">Logout</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </div>
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
import { role } from "@/libs/role"
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
                { icon: "label", title: "Spider", click: this.test, hide: false },
                {
                    icon: "drafts",
                    title: "Draft Box",
                    click: () => {this.$router.push({name: "draftBox", params: {page: 1}})},
                    hide: !this.isBlogger()
                },
                {
                    icon: "book",
                    title: "Book Cloud",
                    click: () => {
                        if (this.isResource) {
                            this.$router.push({name: "books", params: {page: 1}})
                        } else {
                            this.$store.commit('showSnackbar', {'text': '权限被拒绝', color: 'error'})
                        }
                    },
                    hide: false
                },
                {
                    icon: "person",
                    title: "Personal Center",
                    click: () => {this.$router.push({name: "profile"})},
                    hide: false
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
        },
        isBlogger() {
            if (this.$store.state.permission == role.administrator) {
                return true;
            } else {
                return false;
            }
        },
        logout() {
            this.$store.commit("logout");
            this.$cookie.delete("token");
            this.$store.commit("showSnackbar", {
                text: "Logout Success",
                color: "success"
            });
            this.$router.push({name: "home"})
        },
    },
    computed: {
        getUsername() {
            return this.$store.state.username;
        },
        isResource() {
            if (this.$store.state.permission >= role.advancedUser) {
                return true
            } else {
                return false
            }
        }
    }
};
</script>

