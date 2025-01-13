import { createRouter, createWebHistory } from 'vue-router';
import Layout from './layouts/Layout.vue';
import Dashboard from './pages/Dashboard.vue';
import Genshin from './pages/releasenote/Genshin.vue';
import StarRail from './pages/releasenote/StarRail.vue';
import ZenlessZoneZero from './pages/releasenote/ZenlessZoneZero.vue';
import Maplestory from './pages/releasenote/Maplestory.vue';
import FF14 from './pages/releasenote/FF14.vue';
import GenshinCodeRedeem from './pages/coderedeem/GenshinCodeRedeem.vue';
import StarRailCodeRedeem from './pages/coderedeem/StarRailCodeRedeem.vue';
import ZenlessCodeRedeem from './pages/coderedeem/ZenlessCodeRedeem.vue';
import NexonAPI from './pages/NexonAPI/NexonAPI.vue';
import TMP from './pages/TMP/TMP.vue';
import Login from './pages/login/login.vue'; // 로그인 페이지 추가

import { getCookie } from './utils/Cookies';

const routerHistory = createWebHistory();

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
          name: 'Dashboard',
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
          component: GenshinCodeRedeem,
          meta: { requiresAuth: true }
        },
        {
          path: '/StarRailCodeRedeem',
          component: StarRailCodeRedeem,
          meta: { requiresAuth: true }
        },
        {
          path: '/ZenlessCodeRedeem',
          component: ZenlessCodeRedeem,
          meta: { requiresAuth: true }
        },
        {
          path: '/NexonAPI',
          component: NexonAPI,
          meta: { requiresAuth: true }
        },
        {
          path: '/TMP',
          component: TMP
        },
        {
          path: '/Login', // 로그인 페이지 경로 추가
          component: Login,
          meta: { requiresAuth: true }
        }
      ]
    },
  ]
});

router.beforeEach((to, from, next) => {
  const authKey = getCookie('authKey');  // 쿠키에서 인증키 가져오기

  // 로그인 페이지 접근 시 인증된 사용자는 홈으로 리디렉션
  if (to.path === '/Login' && authKey) {
    next('/');  // 홈 페이지로 리디렉션
  }

  // 인증이 필요한 페이지인 경우
  else if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!authKey) {
      // 인증이 필요하지만 인증되지 않은 상태이면 팝업을 열도록 설정
      if (window.app && window.app.$root) {
        window.app.$root.$emit('openLoginPopup', true);
      }
      next(false);  // 라우트 이동을 취소하고 팝업을 띄움
    } else {
      next();  // 인증된 상태라면 그대로 진행
    }
  } else {
    next();  // 인증이 필요 없는 페이지는 그대로 진행
  }
});

export default router;