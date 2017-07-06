<template>
  <mu-appbar>
    <mu-flat-button label="Blog" icon="home" slot="left" :to="{name: 'index'}" primary/>
    <mu-text-field
      name="input"
      icon="search"
      class="appbar-search-field"
      slot="right"
      hintText="请输入搜索内容"
      v-model="searchData"
      @keyup.enter.native="search"
    />
    <mu-flat-button v-show="loginState" v-bind:label="name" slot="right"/>
    <mu-icon-menu icon="more_vert" slot="right">
      <mu-menu-item v-show="!loginState" title="登录" @click="login"/>
      <mu-menu-item v-show="!loginState" title="注册" @click="register" />
      <mu-menu-item v-show="loginState" title="个人主页" @click="profile" />
      <mu-menu-item v-show="permissionAuth" title="发表文章" @click="addPost" />
      <mu-menu-item v-show="loginState" title="注销" @click="logout"/>
    </mu-icon-menu>
    <mu-snackbar
      v-if="snackbar"
      message="注销"
      action="关闭"
      @actionClick="hideSnackbar"
      @close="hideSnackbar"
      style="height: 20px; font-size: medium;"
    />
  </mu-appbar>
</template>

<script>
  import api from '../services/api'
  export default {
    data: function () {
      return {
        title: 'blog',
        name: '',
        searchData: '',
        snackbar: false
      }
    },
    mounted: function () {
      if (this.$store.state.login) {
        this.$http.get(api.user).then((response) => {
          this.name = response.data.username
        }, (response) => {
          console.log(response)
        })
      }
    },
    methods: {
      Home: function () {
        alert('home')
      },
      logout: function () {
        this.snackbar = true
        if (this.snackTimer) clearTimeout(this.snackTimer)
        this.snackTimer = setTimeout(() => { this.snackbar = false }, 2000)
        this.$store.commit('logout')
        this.$store.commit('permission', 0)
        this.$cookie.delete('token')
        localStorage.removeItem('login')
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
        this.$router.push({name: 'result', query: {search: this.searchData}})
      },
      hideSnackbar () {
        this.snackbar = false
        if (this.snackTimer) clearTimeout(this.snackTimer)
      },
      profile: function () {
        this.$router.push({name: 'profileIndex'})
      }
    },
    computed: {
      loginState: function () {
        if (this.$store.state.login) {
          this.$http.get(api.user).then((response) => {
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
</style>
