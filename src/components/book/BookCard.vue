<template>
    <v-card>
        <v-card-title primary-title>
            <div class="bookTitle">
                <h3 class="headline mb-0">{{ book.name }}</h3>
                <br>
                <span>作者:&nbsp;</span>
                <span v-for="author in book.authors" :key="author">{{ author }}</span>
                <br>
                <span>格式:&nbsp;{{getFileType(book.file)}}</span>
                <br>
                <span>创建者:&nbsp;{{book.creator}}</span>
                <br>
                <span>上传时间:&nbsp;{{getDate(book.upload_time)}}</span>
            </div>
        </v-card-title>
        <v-card-actions>
            <v-layout justify-space-around>
                <v-btn color="blue darken-2" small @click="download(book)">
                    <v-icon left>cloud_download</v-icon>下载
                </v-btn>
                <v-btn color="blue darken-4" small @click="pushEmail(book)">
                    <v-icon left>email</v-icon>推送
                </v-btn>
            </v-layout>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    methods: {
        pushEmail(book) {
            this.$store.commit("showCircleProgress", "#f44336");
            this.axios
                .put(api.bookPush.replace(":book_id", book.id))
                .then(response => {
                    this.$store.commit("showSnackbar", {
                        text: "Push Success",
                        color: "success"
                    });
                })
                .catch(error => {
                    this.$store.commit("showSnackbar", {
                        text: error.response.data.message,
                        color: "error"
                    });
                })
                .finally(() => {
                    this.$store.commit("hideCircleProgress");
                }
            );
        }
    }
};
</script>

