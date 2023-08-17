import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import List from '../views/List.vue'

const routes = [
  {
    path: '/',
    name: 'List',
    component: List
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/detail/:title',
    name: 'Detail',
    component: () => import('../views/Detail.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router