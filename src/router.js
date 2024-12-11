import { createRouter, createWebHistory } from 'vue-router'
import Layout from './layouts/Layout.vue'
import Dashboard from './pages/Dashboard.vue'
import Genshin from './pages/releasenote/Genshin.vue'
import StarRail from './pages/releasenote/StarRail.vue'
import Maplestory from './pages/releasenote/Maplestory.vue'
import FF14 from './pages/releasenote/FF14.vue'

const routerHistory = createWebHistory()

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      redirect: '/Dashboard',
      component: Layout,
      children: [
        {
            path: '/Dashboard',
            component: Dashboard
        },
        {
            path: '/Genshin',
             component: Genshin
        },
        {
            path: '/StarRail',
             component: StarRail
        },
        {
            path: '/Maplestory',
             component: Maplestory
        },
        {
            path: '/FF14',
             component: FF14
        },
      ]
    },
  ]
})

export default router
