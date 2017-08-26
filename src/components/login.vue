<template>
  <mu-card class="login">
    <div>
      <mu-flexbox orient="vertical" align="center" style="text-align: center;">
        <mu-flexbox-item>
          <mu-text-field
            label="邮箱"
            type="email"
            icon="account_circle"
            v-model="email"
            v-bind:errorText="error_email"
            v-on:click="clear(this)"
            labelFloat/>
        </mu-flexbox-item>
        <mu-flexbox-item>
          <mu-text-field
            label="密码"
            labelFloat
            type="password"
            icon="https"
            v-bind:errorText="error_password"
            v-model="password"
            @keyup.enter.native="login"
          />
        </mu-flexbox-item>
      </mu-flexbox>
    </div>
    <mu-card-actions style="text-align: center">
      <mu-raised-button label="登录" v-on:click="login" primary/>
    </mu-card-actions>
  </mu-card>
</template>

<script>
  import md5 from 'js-md5'
  import api from '../services/api'
  export default {
    data: function () {
      return {
        email: '',
        password: '',
        error_email: '',
        error_password: ''
      }
    },
    watch: {
      email: function () {
        if (this.email) {
          this.error_email = ''
        }
      },
      password: function () {
        if (this.password) {
          this.error_password = ''
        }
      }
    },
    methods: {
      login: function () {
        if (!this.email) {
          this.error_email = '用户名为空'
          return
        } else if (!this.password) {
          this.error_password = '密码为空'
          return
        }
        this.axios.post(
          api.login,
          {
            email: this.email,
            password: md5.hex(this.password)
          }).then((response) => {
            this.$cookie.set(
              'token',
              response.data.token,
              {expires: response.data.expiration.toString() + 's'}
            )
            localStorage.setItem('login', true)
            this.$store.commit('login')
            this.$store.commit('permission', response.data.permission)
            this.$router.push({
              name: 'index'
            })
          }).catch((error) => {
            this.$store.commit('showToast', error.response.data.message)
          })
      }
    }
  }
</script>

<style scoped>
  .login {
    margin: 8px;
  }
</style>
