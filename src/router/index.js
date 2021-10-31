import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from '@/pages/dashboard.vue'
import ArrayPage from '@/pages/array.vue'
import SharesPage from '@/pages/shares.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/array',
    name: 'Array',
    component: ArrayPage
  },
  {
    path: '/shares',
    name: 'Shares',
    component: SharesPage
  },

]

const router = new VueRouter({
  routes
})

export default router
