import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import List from '../views/List.vue'

const routes = [
  {
    path: '/',
    component: List
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/detail/:id',
    component: () => import('../views/Detail.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router