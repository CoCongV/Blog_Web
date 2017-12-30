<template>
  <mu-avatar>
      {{ showAvatar }}
      <moon-upload field="img"
      @crop-success="cropSuccess"
      @crop-upload-success="cropUploadSuccess"
      @crop-upload-fail="cropUploadFail"
      v-model="show"
      :width="300"
      :height="300"
      :params="params"
      :headers="headers"
      img-format="png"
      ref="upload"></moon-upload>
      <img :src="imgDataURL" @click="toogleShow">
  </mu-avatar>
</template>

<script>
import 'babel-polyfill'
import myUpload from 'vue-image-crop-upload'
import data2blob from '@/components/data2blob.js'
import api from '@/services/api'
export default {
  props: {
    avatar: String
  },
  data () {
    return {
      show: false,
      params: {
        token: '123456',
        name: 'avatar'
      },
      headers: {
        smail: '*_~'
      },
      imgDataURL: ''
    }
  },
  components: {
    'moon-upload': myUpload
  },
  methods: {
    toogleShow () {
      this.show = !this.show
    },
    cropSuccess (imgDataURL, field) {
      console.log('------------crop success ---------')
      console.log(field)
      this.imgDataURL = imgDataURL
      let data = data2blob(imgDataURL, this.$refs.upload.mime)
      console.log(data)
      let formData = new FormData()
      formData.append('image', data, field + '.' + this.$refs.upload.imgFormat)
      this.axios(
        {
          url: api.userAvatarUpload,
          method: 'PUT',
          data: formData
        }
      ).then((result) => {
        this.imgDataURL = result.url
      }).catch((error) => {
        console.log(error)
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
  },
  computed: {
    showAvatar () {
      this.imgDataURL = this.avatar
    }
  }
}
</script>

