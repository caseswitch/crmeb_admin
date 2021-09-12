import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login/index'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: login
  }
]

const router = new VueRouter({
  routes
})

export default router
