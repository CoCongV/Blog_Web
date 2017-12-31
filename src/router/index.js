import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import index from '@/pages/index.vue'
import login from '@/pages/login.vue'
import register from '@/pages/register.vue'
import addPost from '@/pages/addPost.vue'
import postView from '@/pages/articleView.vue'
import userProfile from '@/pages/user.vue'
import result from '@/pages/result.vue'
import profileIndex from '@/pages/profileIndex.vue'
import editPost from '@/pages/editPost.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/login/',
      name: 'login',
      component: login,
      beforeEnter: (to, from, next) => {
        if (!store.state.login) {
          next()
        } else {
          next({
            path: from.fullPath
          })
        }
      }
    },
    {
      path: '/register/',
      name: 'register',
      component: register
    },
    {
      path: '/post/:id(\\d+)',
      name: 'post',
      component: postView
    },
    {
      path: '/post/add',
      name: 'addPost',
      component: addPost
    },
    {
      path: '/user_profile/',
      name: 'userProfile',
      component: userProfile
    },
    {
      path: '/profile_index/',
      name: 'profileIndex',
      component: profileIndex
    },
    {
      path: '/results/',
      name: 'result',
      component: result
    },
    {
      path: '/edit/:id(\\d+)',
      name: 'edit',
      component: editPost
    }
  ]
})
