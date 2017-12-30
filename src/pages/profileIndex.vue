<template>
  <mu-row class="profile">
    <mu-col width="5" tablet="25" desktop="25"></mu-col>
    <mu-col width="100" tablet="50" desktop="50">
      <mu-card class="profile">
        <mu-card-header>
          <moon-avatar :avatar="info.avatar"></moon-avatar>
        </mu-card-header>
        <mu-divider/>
        <mu-text-field label="用户名" hintext="用户名最长32个字符"
                       icon="account_circle" type="text"
                       :errorText="error_username" @blur="verifyUsername"
                       v-model="info.username" labelFloat/>
        <br/>
        <mu-text-field label="邮箱" hintText="用于登录"
                       icon="mail" type="email"
                       :errorText="error_email"
                       v-model="info.email" @blur="verifyEmail"
                       :errorColor="EmailErrorColor"
                       labelFloat/>
        <a v-show="showAuth" @click="emailAuth">验证</a>
        <br/>
        <mu-text-field label="地址" hintText="最长64个字符" icon="place" type="text" v-model="info.location" labelFloat/>
        <br/>
        <mu-text-field
          label="简介" icon="perm_contact_calendar"
          type="text" multiLine :rows="3"
          :rowsMax="6" v-model="info.about_me" labelFloat/><br/>
        <mu-card-actions style="text-align: right">
          <mu-raised-button label="确认" @click="submit" primary/>
        </mu-card-actions>
      </mu-card>
      <mu-card style="margin-top: 10px">
        <mu-text-field label="原密码" hintText="密码8-20字符" icon="lock" type="password" :errorText="error_password" v-model="old_password" labelFloat/><br/>
        <mu-text-field label="新密码" hintText="密码8-20字符" icon="lock" type="password" :errorText="error_password" v-model="new_password" labelFloat/><br/>
        <mu-card-actions style="text-align: right">
          <mu-raised-button label="确认" @click="submitPassword" primary/>
        </mu-card-actions>
      </mu-card>
      <mu-card style="margin-top: 10px">
        <mu-text-field icon="visibility" label="最后一次访问时间" v-model="info.last_seen" disabled fullWidth/><br/>
        <mu-text-field icon="watch_later" label="注册时间" v-model="info.member_since" disabled fullWidth/><br/>
      </mu-card>
    </mu-col>
    <mu-col width="5" tablet="25" desktop="25"></mu-col>
    <mu-toast v-if="toast" :message="message" @close="hideToast"/>
  </mu-row>
</template>

<script>
  import api from '@/services/api'
  import userAvatar from '@/components/user/avatar'
  export default {
    data: function () {
      return {
        info: '',
        toast: false,
        error_username: '',
        error_email: '',
        error_password: '',
        EmailErrorColor: 'orange',
        message: '权限异常',
        old_password: '',
        new_password: ''
      }
    },
    components: {
      'moon-avatar': userAvatar
    },
    mounted: function () {
      this.axios.get(
        api.user,
      ).then((response) => {
        this.info = response.data
        if (!this.info.confirmed) {
          this.error_email = '邮箱未验证'
        }
      }).catch((error) => {
        this.showToast(error.response.data.message | '网络异常')
      })
    },
    methods: {
      hideToast () {
        this.toast = false
        if (this.toastTimer) clearTimeout(this.toastTimer)
      },
      submit: function () {
        if (!this.info.username) {
          this.error_username = '用户名不能为空'
          return
        }
        if (!this.info.email) {
          this.error_email = '邮箱不能为空'
          return
        }
        this.axios.patch(
          api.user,
          {
            email: this.info.email,
            username: this.info.username,
            about_me: this.info.about_me,
            location: this.info.location
          }
        ).then((response) => {
          this.initData()
          this.showToast('修改成功')
        }).catch((error) => {
          console.log(error)
          this.showToast('修改失败')
        })
      },
      submitPassword: function () {
        if (!this.old_password) {
          this.showToast('旧密码不能为空')
          return
        }
        if (!this.new_password) {
          this.showToast('新密码不能为空')
          return
        }
        if (this.old_password === this.new_password) {
          this.showToast('新旧密码不能相同')
          return
        }
        this.axios.post(
          api.password,
          {
            old_password: this.old_password,
            new_password: this.new_password
          }
        ).then((response) => {
          this.showToast('更新成功')
          this.$store.commit('logout')
          this.$store.commit('permission', 0)
          this.$cookie.delete('token')
          this.$router.push({name: 'login'})
        }).catch((error) => {
          console.log(error)
          this.showToast('更新失败')
        })
      },
      showToast: function (msg) {
        this.$store.commit('showToast', msg)
      },
      emailAuth: function () {
        this.axios.get(api.emailAuth).then((response) => {
          this.showToast('发送成功')
        })
      },
      initData: function () {
        this.axios.get(
          api.user,
        ).then((response) => {
          this.info = response.data
          if (this.info.confirmed === 'False') {
            this.error_email = '邮箱未验证'
          }
        }).catch((error) => {
          console.log(error)
          this.toast = true
          if (this.toastTimer) clearTimeout(this.toastTimer)
          this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
          this.$router.push({name: 'index'})
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
    },
    computed: {
      showAuth: function () {
        if (!this.info.confirmed) {
          return true
        }
      }
    }
  }
</script>

<style>
  .profile {
    justify-content: center !important;
    margin-top: 10px;
  }
</style>
