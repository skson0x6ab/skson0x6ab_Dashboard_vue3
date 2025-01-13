<template>
  <div id="app">
    <!-- 로그인 팝업을 열 때, 상태에 따라 팝업 컴포넌트가 나타남 -->
    <AuthKeyPopup
      :popupOpen="popupOpen"
      :isAuthenticated="isAuthenticated"
      @update:popupOpen="popupOpen = $event"
      @update:isAuthenticated="handleAuthenticationChange"
    />
    <!-- 기타 페이지 내용 -->
    <router-view></router-view>
  </div>
</template>

<script>
import './charts/ChartjsConfig';
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import AuthKeyPopup from '/src/partials/login/loginPopup.vue'; // 로그인 팝업 컴포넌트
import { getCookie } from './utils/Cookies';

export default {
  name: 'App',
  components: {
    AuthKeyPopup
  },
  setup() {
    const router = useRouter();
    const popupOpen = ref(false); // 팝업 상태
    const isAuthenticated = ref(false); // 인증 상태

    // 인증 상태 확인 함수
    const checkAuthentication = () => {
      const authKeyCookie = getCookie('authKey');
      if (authKeyCookie) {
        isAuthenticated.value = true; // 쿠키가 있으면 인증된 상태
      } else {
        isAuthenticated.value = false; // 쿠키가 없으면 인증되지 않음
      }
    };

    // 페이지 로드 시 인증 상태 확인
    onMounted(() => {
      checkAuthentication();
    });

    // 인증 상태가 변경되었을 때 처리
    const handleAuthenticationChange = (state) => {
      isAuthenticated.value = state;
      if (state) {
        // 인증 완료되면 홈 페이지로 리디렉션
        router.push('/');  // 홈 페이지로 이동
      } else {
        // 인증되지 않으면 로그아웃 처리 후 리디렉션
        router.push('/login');  // 로그인 페이지로 이동
      }
    };

    // 팝업 열기 이벤트 리스닝
    const handleOpenLoginPopup = (state) => {
      popupOpen.value = state;
    };

    // 로그인 팝업 열기 이벤트를 글로벌 이벤트로 연결
    window.app = {
      $root: {
        $emit: handleOpenLoginPopup
      }
    };

    // isAuthenticated가 변경될 때마다 리디렉션 처리
    watch(isAuthenticated, (newVal) => {
      if (newVal) {
        // 인증되었을 때
        router.push('/');  // 홈 페이지로 이동
      } else {
        // 인증되지 않았을 때
        router.push('/login');  // 로그인 페이지로 이동
      }
    });

    return {
      popupOpen,
      isAuthenticated,
      handleAuthenticationChange
    };
  },
};
</script>