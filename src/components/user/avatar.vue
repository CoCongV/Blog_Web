<template>
  <div>
      <!-- <mu-avatar :src="avatar" slog="avatar" @click="toogelShow"/> -->
      <a class="btn" @click="toogleShow">设置头像</a>
      <my-upload field="img"
      @crop-success="cropSuccess"
      @crop-upload-success="cropUploadSeccuess"
      @crop-upload-fail="cropUPloadFail"
      v-model="show"
      :width="300"
      :height="300"
      url="/upload"
      :params="params"
      :headers="headers"
      img-format="png"></my-upload>
      <img :src="avatar">
  </div>
</template>

<script>
import 'babel-polyfill'
import myUpload from 'vue-image-crop-upload/upload-1.vue'
export default {
  props: {
    avatar: ''
  },
  data () {
    return {
      show: true,
      params: {
        token: '123456',
        name: 'avatar'
      },
      headers: {
        smail: '*_~'
      },
      imgDataUrl: ''
    }
  },
  components: {
    'moon-upload': myUpload
  },
  methods: {
    openAvatar () {
      this.userAvatarDialog = true
    },
    closeAvatar () {
      this.userAvatarDialog = false
    },
    toogelShow () {
      this.show = !this.show
    },
    cropSuccess (imgDataUrl, field) {
      console.log('------------crop success ---------')
      this.imgDataUrl = imgDataUrl
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

