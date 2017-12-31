<template>
  <div>
    <mu-appbar>
      <mu-icon-button icon="menu" slot="left" @click="toggle(true)"/>
      <mu-flat-button label="Blog" slot="left" labelClass="home-label" @click="home"/>
      <mu-flat-button v-show="loginState" v-bind:label="name" slot="right"/>
      <mu-icon-menu icon="more_vert" slot="right">
        <mu-menu-item v-show="!loginState" title="登录" @click="login"/>
        <mu-menu-item v-show="!loginState" title="注册" @click="register" />
        <mu-menu-item v-show="loginState" title="个人主页" @click="profile" />
        <mu-menu-item v-show="permissionAuth" title="发表文章" @click="addPost" />
        <mu-menu-item v-show="loginState" title="注销" @click="logout"/>
      </mu-icon-menu>
    </mu-appbar>
    <mu-drawer :open="open" :docked="docked" @close="toggle()">
      <mu-list>
        <mu-list-item>
          <mu-text-field
            name="input"
            icon="search"
            hintText="请输入搜索内容"
            v-model="searchData"
            @keyup.enter.native="search"
          />
        </mu-list-item>
        <mu-list-item title="爬虫(dev)" @click="toggle()"/>
      </mu-list>
    </mu-drawer>
  </div>
</template>

<script>
  import api from '../services/api'
  export default {
    data: function () {
      return {
        title: 'blog',
        name: '',
        searchData: '',
        snackbar: false,
        open: false,
        docked: true
      }
    },
    mounted: function () {
      if (this.$store.state.login) {
        this.axios.get(api.user).then((response) => {
          this.name = response.data.username
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    methods: {
      home () {
        this.$router.push({name: 'index'})
      },
      logout: function () {
        this.$store.commit('showToast', '注销成功')
        this.$store.commit('logout')
        this.$store.commit('permission', 0)
        this.$cookie.delete('token')
        this.$router.push({name: 'index'})
      },
      login: function () {
        this.$router.push({name: 'login'})
      },
      register: function () {
        this.$router.push({name: 'register'})
      },
      addPost: function () {
        this.$router.push({name: 'addPost'})
      },
      search: function () {
        this.toggle()
        this.$router.push({name: 'result', query: {search: this.searchData}})
      },
      hideSnackbar () {
        this.snackbar = false
        if (this.snackTimer) clearTimeout(this.snackTimer)
      },
      profile: function () {
        this.$router.push({name: 'profileIndex'})
      },
      toggle (flag) {
        this.open = !this.open
        this.docked = !flag
      }
    },
    computed: {
      loginState: function () {
        if (this.$store.state.login) {
          this.axios.get(api.user).then((response) => {
            this.name = response.data.username
          })
        } else {
          this.name = ''
        }
        return this.$store.state.login
      },
      permissionAuth: function () {
        return this.$store.state.login ? this.$store.state.permission >= 255 : false
      }
    }
  }
</script>

<style lang="less">
  .appbar-search-field{
    color: #FFF;
    margin-bottom: 0;
    &.focus-state {
      color: #FFF;
    }
    .mu-text-field-hint {
      color: fade(#FFF, 54%);
    }
    .mu-text-field-input {
      color: #FFF;
    }
    .mu-text-field-focus-line {
      background-color: #FFF;
    }
  }
  .demo-snackbar-button{
    margin: 12px;
  }
  .home-label {
    font-size: 125% !important;
  }
</style>
