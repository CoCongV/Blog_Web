<template>
  <div class="register">
    <mu-row gutter>
      <mu-col width="5" tablet="25" desktop="25"></mu-col>
      <mu-col width="90" tablet="50" desktop="50">
        <mu-card>
          <mu-text-field label="用户名" hintext="用户名最长32个字符"
                         icon="account_circle" type="text"
                         :errorText="error_username" v-model="username"
                         @blur="verifyUsername" labelFloat/>
          <br/>
          <mu-text-field label="邮箱" hintText="用于登录"
                         icon="mail" type="email"
                         :errorText="error_email" v-model="email"
                         @blur="verifyEmail" labelFloat/>
          <br/>
          <mu-text-field label="密码" hintText="密码8-20字符"
                         icon="lock" type="password"
                         :errorText="error_password"
                         v-model="password" labelFloat/>
          <br/>
          <mu-text-field label="地址" hintText="最长64个字符"
                         icon="place" type="text"
                         v-model="location" labelFloat/>
          <br/>
          <mu-text-field label="简介" icon="perm_contact_calendar"
                         type="text" multiLine :rows="3"
                         :rowsMax="6" v-model="about_me" labelFloat/>
          <br/>
          <mu-card-actions>
            <mu-raised-button label="注册" v-on:click="register" primary/>
          </mu-card-actions>
        </mu-card>
      </mu-col>
      <mu-col width="5" tablet="25" desktop="25"></mu-col>
    </mu-row>
  </div>
</template>

<script>
  import api from '../services/api'
  import status from '../services/status'
  import md5 from 'js-md5'
  export default {
    data: function () {
      return {
        username: '',
        email: '',
        location: '',
        password: '',
        about_me: '',
        error_username: '',
        error_email: '',
        error_password: ''
      }
    },
    methods: {
      register: function () {
        let flag = true
        if (!this.username) {
          this.error_username = '用户名不能为空'
          flag = false
        }
        if (!this.email) {
          this.error_email = '邮箱不能为空'
          flag = false
        }
        if (!this.password) {
          this.error_password = '密码不能为空'
          flag = false
        }
        if (!flag) return
        if (this.password.length < 8) {
          this.error_password = '密码过短, 需大于8位'
          return
        } else if (this.password.length > 20) {
          this.error_password = '密码过长,需小于20位'
          return
        }
        this.axios.post(
          api.user,
          {
            email: this.email,
            password: md5.hex(this.password),
            username: this.username,
            location: this.location,
            about_me: this.about_me
          }
        ).then((response) => {
          this.$cookie.set(
            'token',
            response.data.token,
            {expires: response.data.expiration + 's'}
          )
          this.$store.commit('login')
          this.$store.commit('permission', response.data.permission)
          this.$router.push({name: 'index'})
        }).catch((error) => {
          if (error.response.status === status.USER_EXIST) {
            this.$store.commit('showToast', '用户名或邮箱已被注册')
            return
          }
          this.$store.commit('showToast', '网络异常')
        })
      },
      verifyEmail: function () {
        this.axios.get(
          api.emailExist,
          {
            params: {
              email: this.email
            }
          }
        ).then((respose) => {
          this.error_email = ''
        }).catch((error) => {
          console.log(error)
          this.error_email = '邮箱已存在'
        })
      },
      verifyUsername: function () {
        this.axios.get(
          api.usernameExist,
          {
            params: {
              username: this.username
            }
          }
        ).then((response) => {
          this.error_username = ''
        }).catch((error) => {
          console.log(error)
          this.error_username = '用户名已被使用'
        })
      }
    }
  }
</script>

<style scoped>
  .register {
    text-align: center;
    margin-top: 8px;
  }
</style>
