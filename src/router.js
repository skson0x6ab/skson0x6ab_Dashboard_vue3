import { createRouter, createWebHistory } from 'vue-router'
import Layout from './layouts/Layout.vue'
import Dashboard from './pages/Dashboard.vue'
import Genshin from './pages/releasenote/Genshin.vue'
import StarRail from './pages/releasenote/StarRail.vue'
import ZenlessZoneZero from './pages/releasenote/ZenlessZoneZero.vue'
import Maplestory from './pages/releasenote/Maplestory.vue'
import FF14 from './pages/releasenote/FF14.vue'
import GenshinCodeRedeem from './pages/coderedeem/GenshinCodeRedeem.vue'
import StarRailCodeRedeem from './pages/coderedeem/StarRailCodeRedeem.vue'
import ZenlessCodeRedeem from './pages/coderedeem/ZenlessCodeRedeem.vue'
import NexonAPI from './pages/NexonAPI/NexonAPI.vue'

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
            path: '/ZenlessZoneZero',
            component: ZenlessZoneZero
        },
        {
            path: '/Maplestory',
            component: Maplestory
        },
        {
            path: '/FF14',
            component: FF14
        },
        {
            path: '/GenshinCodeRedeem',
            component: GenshinCodeRedeem
        },
        {
            path: '/StarRailCodeRedeem',
            component: StarRailCodeRedeem
        },
        {
            path: '/ZenlessCodeRedeem',
            component: ZenlessCodeRedeem
        },
        {
            path: '/NexonAPI',
            component: NexonAPI
        },
      ]
    },
  ]
})

export default router
