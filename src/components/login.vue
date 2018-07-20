<template>
  <mu-flex justify-content="center">
    <mu-card class="login">
      <mu-flex justify-content="center" fill>
        <mu-container>
          <mu-form ref="form"  :model="validateForm">
            <mu-flex justify-content="center">
              <mu-form-item label="邮箱" icon="account_circle" :rules="emailRules" prop="email">
                <mu-text-field type="email" v-model="validateForm.email" :error-text="error_email"/>
              </mu-form-item> 
            </mu-flex>
            <mu-flex justify-content="center">
              <mu-form-item label="密码" icon="locked" :rules="passwordRules" prop="password">
                <mu-text-field
                type="password"
                :error-text="error_password"
                v-model="validateForm.password"
                @keyup.enter.native="login"/>
              </mu-form-item>
            </mu-flex>
          </mu-form>
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
        error_password: '',
        validateForm: {
          email: '',
          password: ''
        },
        emailRules: [
          {validate: (val) => !!val, message: '邮箱不能为空'}
        ],
        passwordRules: [
          {validate: (val) => !!val, message: '密码不能为空'}
        ]
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
        this.axios.post(
          api.login,
          {
            email: this.validateForm.email,
            password: md5.hex(this.validateForm.password)
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
