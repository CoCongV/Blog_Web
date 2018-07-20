<template>
  <div>
    <mu-appbar color="primary">
      <mu-button icon slot="left" @click="open = !open">
        <mu-icon value="menu"></mu-icon>
      </mu-button>
      <!-- <mu-button flat slot="left" @click="home">Blog</mu-button> -->
      <mu-button flat slot="left" @click="home">
        <mu-icon left value="home"></mu-icon>Blog
      </mu-button>
      <mu-button flat slot="right" v-show="loginState">
        {{ name }}
      </mu-button>
      <mu-menu slot="right">
        <mu-button flat>
          <mu-icon value="more_vert"></mu-icon>
        </mu-button>
        <mu-list slot="content">
          <mu-list-item button @click="login" v-show="!loginState">
              <mu-list-item-title>登录</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button @click="register" v-show="!loginState">
              <mu-list-item-title>注册</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button @click="profile" v-show="!loginState">
              <mu-list-item-title>个人主页</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button @click="addPost" v-show="permissionAuth">
              <mu-list-item-title>发表文章</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button @click="logout" v-show="loginState">
              <mu-list-item-title>注销</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-menu>
    </mu-appbar>
    <mu-container>
      <mu-drawer :open.sync="open" :docked="false" :right="false">
        <mu-list>
          <mu-list-item button>
            <mu-list-item-title>Menu Item 1</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-title>爬虫(dev)</mu-list-item-title>
          </mu-list-item>
          <mu-list-item  @click="open = false" button>
            <mu-list-item-title>Close</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-drawer>
    </mu-container>
    <!-- <mu-drawer :open="open" :docked="docked" @close="toggle()">
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
    </mu-drawer> -->
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
