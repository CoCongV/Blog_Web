<template>
    <v-avatar size="125px" style="margin: 10px" @click="show = !show">
        <img :src="avatar" class="img-circle elevation-7 mb1">
        <my-upload v-model="show" field="avatar"
            @crop-success="cropSuccess"
            @crop-upload-success="cropUploadSuccess"
            @crop-upload-fail="cropUploadFail"
            :params="params" ref="upload"
        ></my-upload>
    </v-avatar>
</template>

<script>
import myUpload from 'vue-image-crop-upload'
import data2blob from '@/libs/data2blob.js'
import { api } from "@/libs/api";
export default {
    props: {
        initAvatar: {
            type: String,
        },
    },
    data () {
        return {
            show: false,
            avatar: this.initAvatar,
            params: {
                token: '',
                name: 'avatar'
            },
            imgDataURL: ''
        }
    },
    components: {
        myUpload: myUpload
    },
    methods: {
        cropSuccess (imgDataURL, field) {
            // console.log(imgDataURL)
            this.imgDataURL = imgDataURL
            let data = data2blob(imgDataURL, this.$refs.upload.mime)
            let formData = new FormData()
            formData.append('image', data, field + '.' + this.$refs.upload.imgFormat)
            this.axios.put(api.userAvatarUpload, formData).then((response) => {
                this.imgDataURL = response.url
            })
        },
        cropUploadSuccess (jsonData, field) {
            console.log('-------------upload success --------')
            console.log(jsonData)
            console.log('field: ' + field)
        },
        cropUploadFail (status, field) {
            console.log('--------- upload fail ---------')
            console.log(status)
            console.log('field: ' + field)
        }
    }
}
</script>

<style>

</style>
