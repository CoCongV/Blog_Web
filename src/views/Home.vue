<template>
  <div>
    <left-col></left-col>
    <v-container>
      <article-list></article-list>
      <v-speed-dial v-model="fab" right bottom direction="top" :open-on-hover="desktop" style="position: fixed" v-resize="getHoverAttr">
        <v-btn slot="activator" v-model="fab" color="blue darken-2" fab>
          <v-icon>apps</v-icon>
          <v-icon>close</v-icon>
        </v-btn>
        <v-btn fab small color="error" v-if="getLoginState" @click="logout">
          <v-icon>exit_to_app</v-icon>
        </v-btn>
        <v-btn fab small color="success" class="fab" v-if="addArticlePermission" @click="addArticle">
          <v-icon>create</v-icon>
        </v-btn>
        <v-btn fab small color="info" class="fab" @click="profile">
          <v-icon>person</v-icon>
        </v-btn>
      </v-speed-dial>
    </v-container>
  </div>
</template>

<script>
import LeftCol from '@/components/LeftCol'
import ArticleList from '@/components/article/ArticleList'
import userAgent from '@/libs/userAgent'

export default {
  name: 'home',
  data () {
    return {
      fab: false,
      desktop: true
    }
  },
  components: {
    LeftCol: LeftCol,
    articleList: ArticleList
  },
  methods: {
    profile () {
      this.$router.push({name: 'profile'})
    },
    logout () {
      this.$store.commit('logout')
      this.$cookie.delete('token')
      this.$store.commit('showSnackbar', {text: 'Logout Success', color: 'success'})
    },
    getHoverAttr () {
      if (userAgent.isMobile()) {
        this.desktop = false
      } else {
        this.desktop = true
      }
    },
    addArticle () {
      this.$router.push({name: 'addArticle'})
    }
  },
  computed: {
    addArticlePermission () {
      if (this.$store.state.permission >= 255) {
        return true
      } else {
        return false
      }
    },
    getLoginState () {
      if (this.$store.state.login) {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    this.getHoverAttr()
  }
}
</script>

<style scoped>
  .home {
    margin-left: 0% !important;
    padding-left: 0% !important;
    padding-right: 0% !important;
  }
  /* .fab {
    position: fixed
  } */
</style>
