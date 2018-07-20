<template>
  <mu-flex justify-content="center">
    <mu-card class="login">
      <mu-flex justify-content="center" fill>
        <mu-container>
          <form>
            <mu-flex justify-content="center">
              <mu-text-field
                label="邮箱"
                type="email"
                icon="account_circle"
                v-model="email"
                :error-text="error_email"
                label-float/>
            </mu-flex>
            <mu-flex justify-content="center">
              <mu-text-field
              label="密码"
              label-float
              type="password"
              icon="locked"
              :error-text="error_password"
              v-model="password"
              @keyup.enter.native="login"/>
            </mu-flex>
          </form>
        </mu-container>
      </mu-flex>
      <mu-card-actions style="text-align: center">
        <mu-button color="primary" @click="login">登录</mu-button>
      </mu-card-actions>
    </mu-card>
  </mu-flex>
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
            )
            localStorage.setItem('login', true)
            this.$store.commit('login')
            this.$store.commit('permission', response.data.permission)
            this.$router.push({
              name: 'index'
            })
          }).catch((error) => {
            console.log(error)
            this.$store.commit('showToast', error.response.data.message)
          })
      }
    }
  }
</script>

<style scoped>
  .login {
    margin: 8px;
    width: 100%;
  }
</style>
