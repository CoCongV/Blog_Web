<template>
    <v-app>
        <toolbar :title="toolbarTitle"></toolbar>
        <v-container class="bookContainer">
            <v-layout>
                <v-flex xs12 sm4 offset-sm1>
                    <v-card v-for="book in books" :key="book.id">
                        <v-card-title primary-title>
                            <div class="bookTitle">
                                <h3 class="headline mb-0">{{ book.name }}</h3>
                                <br>
                                <span>作者:&nbsp;</span><span v-for="author in book.authors" :key="author">{{ author }}</span>
                            </div>
                        </v-card-title>
                        <v-card-actions>
                            <v-layout justify-space-around>
                                <v-btn color="blue darken-2" small @click="download(book)">
                                    <v-icon left>cloud_download</v-icon>下载
                                </v-btn>
                                <v-btn color="blue darken-4" small>
                                    <v-icon left>email</v-icon>推送
                                </v-btn>
                            </v-layout>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
        <v-speed-dial
                v-model="fab"
                right
                bottom
                direction="top"
                :open-on-hover="desktop"
                style="position: fixed"
                v-resize="getHoverAttr"
            >
                <v-btn slot="activator" v-model="fab" color="blue darken-2" fab>
                    <v-icon>apps</v-icon>
                    <v-icon>close</v-icon>
                </v-btn>
                <v-btn fab small color="pink lighten-3" @click="$vuetify.goTo(0)">
                    <v-icon>arrow_upward</v-icon>
                </v-btn>
                <v-btn
                    fab
                    small
                    color="success"
                    class="fab"
                    v-if="addResourcePermission"
                    @click="addBook"
                >
                    <v-icon>cloud_upload</v-icon>
                </v-btn>
            </v-speed-dial>
    </v-app>
</template>

<script>
import Toolbar from '@/components/Toolbar'
import userAgent from "@/libs/userAgent";
import { api } from "@/libs/api";
export default {
    data () {
        return {
            toolbarTitle: 'Book Cloud',
            fab: false,
            desktop: true,
            load: false,
            books: []
        }
    },
    components: {
        toolbar: Toolbar
    },
    methods: {
        getHoverAttr() {
            if (userAgent.isMobile()) {
                this.desktop = false;
            } else {
                this.desktop = true;
            }
        },
        isResource() {
            if (this.$store.state.permission >= 10) {
                return true
            } else {
                return false
            }
        },
        logout() {
            this.$store.commit("logout");
            this.$cookie.delete("token");
            this.$store.commit("showSnackbar", {
                text: "Logout Success",
                color: "success"
            });
        },
        addBook() {

        },
        download(book) {
            this.axios({
                url: api.book.replace(':book_id', book.id),
                method: 'GET',
                responseType: 'blob',
            })
            .then((response) =>{
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', book.file)
                document.body.appendChild(link)
                link.click()
            })
            .catch((error) => {
                this.$store.commit('showSnackbar', {text: '下载失败', color: 'error'})
            })
        },
        async loadBooks(page) {
            await this.getBooks(page);
            this.load = true
            this.$store.commit('hideCircleProgress')
        },
        async getBooks(page) {
            await this.axios
                .get(api.books, {
                    params: {
                        page: page
                    }
                })
                .then(response => {
                    this.books = response.data.books;
                    this.length = response.data.pages
                })
                
        }
    },
    computed: {
        addResourcePermission() {
            if (this.$store.state.permission >= 10) {
                return true;
            } else {
                return false;
            }
        },
    },
    mounted() {
        let page = this.$route.params.page;
        this.getHoverAttr()
        if (!page) {
            this.loadBooks(1)
        } else {
            this.page = parseInt(page)
            this.loadBooks(this.page)
        }
    }
}
</script>

<style>
.bookContainer {
    margin-top: 35px;
}
.bookTitle {
    margin: 0 auto;
}
</style>
