import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home')
    },
    {
      path: '/article/:id(\\d+)',
      name: 'article',
      component: () => import('@/views/Article')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/UserProfile')
    },
    {
      path: '/article/add',
      name: 'addArticle',
      component: () => import('@/views/AddArticle')
    },
    {
      path: '/article/edit/:id(\\d+)',
      name: 'editArticle',
      component: () => import('@/views/EditArticle')
    }
  ]
})
