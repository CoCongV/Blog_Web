<template>
    <v-app dark>
        <toolbar :title="toolbarTitle" ref="toolbar" @search="search"></toolbar>
        <v-container class="bookContainer" fluid grid-list-md>
            <v-layout row wrap>
                <v-flex v-for="book in books" :key="book.id" xs12 md4>
                    <v-card>
                        <v-card-title primary-title>
                            <div class="bookTitle">
                                <h3 class="headline mb-0">{{ book.name }}</h3>
                                <br>
                                <span>作者:&nbsp;</span>
                                <span v-for="author in book.authors" :key="author">{{ author }}</span>
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
                <v-flex xs12 md9 class="pagination">
                    <pagination :initPage="page" :length="length" @pageChange="bindPageChange"></pagination>
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
                @click="upload = !upload"
            >
                <v-icon>cloud_upload</v-icon>
            </v-btn>
        </v-speed-dial>
        <v-dialog v-model="upload">
            <v-data-table :headers="headers" :items="files" class="elevation-1">
                <template v-slot:items="props">
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.author }}</td>
                    <td>{{ props.item.size }}</td>
                    <td>{{ props.item.speed }}</td>
                    <td>{{ props.item.status }}</td>
                    <td>
                        <v-btn color="error">Action</v-btn>
                    </td>
                </template>
            </v-data-table>
            <v-layout justify-space-around>
                <v-btn color="blue darken-2">
                    <file-upload ref="upload" v-model="files" @input-file="inputFile">Select File</file-upload>
                </v-btn>
                <v-btn color="success">Upload</v-btn>
            </v-layout>
        </v-dialog>
    </v-app>
</template>

<script>
import Toolbar from "@/components/Toolbar";
import userAgent from "@/libs/userAgent";
import Pagination from "@/components/Pagination";
import { api } from "@/libs/api";
export default {
    data() {
        return {
            toolbarTitle: "Book Cloud",
            fab: false,
            desktop: true,
            load: false,
            books: [],
            upload: false,
            files: [],
            headers: [
                { text: "#", sortable: false },
                { text: "Name", sortable: false },
                { text: "Author", sortable: false },
                { text: "Size", sortable: false },
                { text: "Speed", sortable: false },
                { text: "Status", sortable: false },
                { text: "Action", sortable: false }
            ],
            pagination: {},
            page: 1,
            length: 0,
            searchParam: ""
        };
    },
    components: {
        toolbar: Toolbar,
        pagination: Pagination
    },
    methods: {
        search() {
            this.$router.push({
                name: "bookSearch",
                params: { searchParam: this.$refs.toolbar.searchParam, page: 1 }
            });
        },
        getHoverAttr() {
            if (userAgent.isMobile()) {
                this.desktop = false;
            } else {
                this.desktop = true;
            }
        },
        isResource() {
            if (this.$store.state.permission >= 10) {
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
        },
        addBook() {},
        download(book) {
            this.axios({
                url: api.book.replace(":book_id", book.id),
                method: "GET",
                responseType: "blob"
            })
                .then(response => {
                    const url = window.URL.createObjectURL(
                        new Blob([response.data])
                    );
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", book.file);
                    document.body.appendChild(link);
                    link.click();
                })
                .catch(error => {
                    this.$store.commit("showSnackbar", {
                        text: "下载失败",
                        color: "error"
                    });
                });
        },
        inputFile(newFile, oldFile) {},
        bindPageChange(page) {
            this.$router.push({ name: "bookPage", params: { page: page } });
        },
        async loadBooks(page) {
            await this.getBooks(page);
            this.load = true;
            this.$store.commit("hideCircleProgress");
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
                    this.length = response.data.pages;
                });
        },
        async loadSearchBooks(page, param) {
            await this.getSearchBooks(page, param);
            this.load = true;
            this.$store.commit("hideCircleProgress");
        },
        async getSearchBooks(page, param) {
            await this.axios
                .get(api.bookSearch, {
                    params: {
                        page: page,
                        param: param
                    }
                })
                .then(response => {
                    this.books = response.data.books;
                    this.length = response.data.pages;
                });
        }
    },
    computed: {
        addResourcePermission() {
            if (this.$store.state.permission >= 255) {
                return true;
            } else {
                return false;
            }
        },
        pages() {
            if (
                this.pagination.rowsPerPage == null ||
                this.pagination.totalItems == null
            )
                return 0;
            return Math.ceil(
                this.pagination.totalItems / this.pagination.rowsPerPage
            );
        }
    },
    mounted() {
        let page = this.$route.params.page;
        this.searchParam = this.$route.params.searchParam;
        this.getHoverAttr();
        if (!page) {
            this.page = 1;
        } else {
            this.page = parseInt(page);
        }
        if (!this.searchParam) {
            this.loadBooks(this.page);
        } else {
            this.loadSearchBooks(this.page, this.searchParam);
        }
    },
    watch: {
        $route: function(val) {
            let page = val.params.page;
            this.searchParam = val.params.searchParam;
            if (page) {
                this.page = parseInt(page);
            } else {
                this.page = 1;
            }
            if (!this.searchParam) {
                this.loadBooks(this.page);
            } else {
                this.loadSearchBooks(this.page, this.searchParam);
            }
            this.$vuetify.goTo(0);
        }
    }
};
</script>

<style>
.bookContainer {
    margin-top: 35px;
}
.bookTitle {
    margin: 0 auto;
}
.pagination {
    margin: 0 15% auto auto;
}
</style>
