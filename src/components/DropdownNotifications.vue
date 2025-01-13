<template>
  <div class="relative inline-flex">
    <!-- 인증된 상태 -->
    <span v-if="isAuthenticated" class="truncate ml-2 text-sm font-medium text-green-500 dark:text-green-400 group-hover:text-green-600">
      Authenticated
      <button
        ref="trigger"
        class="inline-flex justify-center items-center group"
        aria-haspopup="true"
        @click.prevent="dropdownOpen = !dropdownOpen"
        :aria-expanded="dropdownOpen"
      >
        <div class="flex items-center truncate">
          <svg class="w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500" viewBox="0 0 12 12">
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>

      <!-- 드롭다운 메뉴 -->
      <transition
        enter-active-class="transition ease-out duration-200 transform"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-out duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-show="dropdownOpen" class="origin-top-right z-10 absolute top-full min-w-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 py-1.5 rounded-lg shadow-lg overflow-hidden mt-1" :class="align === 'right' ? 'right-0' : 'left-0'">
          <div class="pt-0.5 pb-2 px-3 mb-1 border-b border-gray-200 dark:border-gray-700/60 text-left">
            <div class="font-medium text-gray-800 dark:text-gray-100">skson0x6ab.</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 italic">Administrator</div>
          </div>
          <ul ref="dropdown" @focusin="dropdownOpen = true" @focusout="dropdownOpen = false" class="text-left">
            <li>
              <router-link class="font-medium text-sm text-violet-500 hover:text-violet-600 dark:hover:text-violet-400 flex items-center py-1 px-3 justify-start" to="/" @click="dropdownOpen = false">Settings</router-link>
            </li>
            <li>
              <button class="font-medium text-sm text-violet-500 hover:text-violet-600 dark:hover:text-violet-400 flex items-center py-1 px-3 justify-start" @click="handleSignOut">Sign Out</button>
            </li>
          </ul>
        </div>
      </transition>
    </span>

    <!-- 인증되지 않은 상태: 로그인 팝업 -->
    <router-link v-else :to="{ path: '/Login' }" class="inline-flex justify-center items-center group" aria-haspopup="true">
      <svg class="shrink-0 fill-current" :class="'text-gray-400 dark:text-gray-500'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
        <path d="M7.586 9H1a1 1 0 1 1 0-2h6.586L6.293 5.707a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 1 1-1.414-1.414L7.586 9ZM3.075 4.572a1 1 0 1 1-1.64-1.144 8 8 0 1 1 0 9.144 1 1 0 0 1 1.64-1.144 6 6 0 1 0 0-6.856Z" />
      </svg>
    </router-link>

  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';

export default {
  name: 'ParentComponent',
  setup() {
    const router = useRouter();
    const popupOpen = ref(false); // 팝업 상태
    const isAuthenticated = ref(false); // 인증 상태
    const dropdownOpen = ref(false); // 드롭다운 상태

    // 인증 상태 확인
    const checkAuthentication = () => {
      const authKeyCookie = Cookies.get('authKey');
      isAuthenticated.value = !!authKeyCookie;
    };

    // 로그아웃 처리
    const handleSignOut = () => {
      Cookies.remove('authKey'); // 쿠키 삭제
      isAuthenticated.value = false; // 인증 상태 업데이트
      router.push('/'); // 홈 페이지로 리디렉션
    };

    // 인증 상태를 1초마다 체크
    let authCheckInterval;

    onMounted(() => {
      checkAuthentication(); // 페이지 로드 시 처음 한 번 체크
      authCheckInterval = setInterval(checkAuthentication, 1000); // 1초마다 체크
    });

    onUnmounted(() => {
      clearInterval(authCheckInterval); // 컴포넌트가 언마운트될 때 인터벌 정리
    });

    return {
      popupOpen,
      isAuthenticated,
      dropdownOpen,
      handleSignOut
    };
  },
};
</script>
