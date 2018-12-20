import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import vSelect from 'vue-select'
Vue.component('v-select', vSelect)
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/help',
      name: 'Help',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/page',
      name: 'Add',
      component: () => import('./views/Page.vue')
    },
    {
      path: '/friends',
      name: 'Friends',
       component: () => import('./views/Friends.vue')
    },
    {
      path: '/auto',
      name: 'AutoComplete',
      component: () => import('./views/Autocomplete.vue')
    }
  ]
})
