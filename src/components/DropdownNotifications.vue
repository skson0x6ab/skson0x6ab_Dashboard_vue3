<template>
  <div class="relative inline-flex ">
    <!-- 인증된 상태: GUEST 텍스트 -->
<span
  v-if="isAuthenticated"
  class="truncate ml-2 text-sm font-medium text-green-500 dark:text-green-400 group-hover:text-green-600"
>Authenticated
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
      <transition
        enter-active-class="transition ease-out duration-200 transform"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-out duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-show="dropdownOpen" class="origin-top-right z-10 absolute top-full min-w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 py-1.5 rounded-lg shadow-lg overflow-hidden mt-1" :class="align === 'right' ? 'right-0' : 'left-0'">
          <div class="pt-0.5 pb-2 px-3 mb-1 border-b border-gray-200 dark:border-gray-700/60">
            <div class="font-medium text-gray-800 dark:text-gray-100">skson0x6ab.</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 italic">Administrator</div>
          </div>
          <ul
            ref="dropdown"
            @focusin="dropdownOpen = true"
            @focusout="dropdownOpen = false"
          >
            <li>
              <router-link class="font-medium text-sm text-violet-500 hover:text-violet-600 dark:hover:text-violet-400 flex items-center py-1 px-3" to="/" @click="dropdownOpen = false">Settings</router-link>
            </li>
<li>
  <button
    class="font-medium text-sm text-violet-500 hover:text-violet-600 dark:hover:text-violet-400 flex items-center py-1 px-3"
    @click="handleSignOut"
  >
    Sign Out
  </button>
</li>
          </ul>
        </div>
      </transition>
</span>

    <!-- 인증되지 않은 상태: 버튼 -->
    <button
     ref="trigger"
      v-else
      class="inline-flex justify-center items-center group"
      aria-haspopup="true"
      @click.prevent="openPopup"
    >
      <img class="w-8 h-8 rounded-full" :src="UserAvatar" width="32" height="32" alt="User" />
      <div class="flex items-center truncate">
        <span class="truncate ml-2 text-sm font-medium text-gray-600 dark:text-gray-100 group-hover:text-gray-800 dark:group-hover:text-white">Login</span>
      </div>
    </button>

    <!-- 팝업 모달 -->
    <transition
      enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-out duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-show="popupOpen" class="popup-overlay" @click="closePopup">
        <div class="popup-content" @click.stop>
          <div class="popup-header">
            <button @click="closePopup" class="close-btn">X</button>
          </div>
          <div class="popup-body">
            <div class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase pt-1.5 pb-2 px-4">
              Enter your Auth Key
            </div>
            <ul>
              <!-- 인증되지 않은 상태 -->
              <li
                v-if="!isAuthenticated"
                class="border-b border-gray-200 dark:border-gray-700/60 last:border-0"
              >
                <input
                  v-model="authKey"
                  type="text"
                  placeholder="Enter Auth Key"
                  class="w-full px-4 py-2 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  @keyup.enter="submitAuthKey"
                />
              </li>
              <li
                v-if="!isAuthenticated"
                class="border-b border-gray-200 dark:border-gray-700/60 last:border-0"
              >
                <button
                  class="w-full py-2 px-4 text-white bg-blue-500 rounded-md mt-2"
                  @click="submitAuthKey"
                >
                  Authenticate
                </button>
              </li>

              <!-- 인증된 상태 -->
              <li
                v-if="isAuthenticated"
                class="text-green-500 text-sm mt-2 px-4"
              >
                You are authenticated and the auth key is saved in cookie.
              </li>
              <li
                v-else
                class="text-red-500 text-sm mt-2 px-4"
              >
                Please enter the authentication key to authenticate.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { authenticateUser } from '/src/utils/login.js'; // 클라이언트용 login.js
import UserAvatar from '../images/user-avatar-32.png';
import { useRouter } from 'vue-router'; // useRouter를 import
import Cookies from 'js-cookie';

export default {
  name: 'AuthKeyPopup',
  props: ['align'],
  setup() {
    const router = useRouter();
    const popupOpen = ref(false); // 팝업 상태 관리
    const authKey = ref('');
    const isAuthenticated = ref(false);
    const dropdownOpen = ref(false)
        const trigger = ref(null)
        const dropdown = ref(null)

    const checkAuthentication = () => {
      const authKeyCookie = Cookies.get('authKey'); // 쿠키에서 authKey 확인
      console.log(Cookies.get('authKey'))
      if (authKeyCookie) {
        isAuthenticated.value = true; // 인증된 상태로 설정
      } else {
        isAuthenticated.value = false; // 인증되지 않은 상태로 설정
      }
    };
        // close on click outside
        const clickHandler = ({ target }) => {
          if (!dropdownOpen.value || dropdown.value.contains(target) || trigger.value.contains(target)) return
          dropdownOpen.value = false
        }

        // close if the esc key is pressed
        const keyHandler = ({ keyCode }) => {
          if (!dropdownOpen.value || keyCode !== 27) return
          dropdownOpen.value = false
        }
    // 팝업 열기
    const openPopup = () => {
      popupOpen.value = true;
    };

    // 팝업 닫기
    const closePopup = () => {
      popupOpen.value = false;
    };

    // 로그인
    const submitAuthKey = async () => {
      if (authKey.value) {
        try {
          await authenticateUser(authKey.value); // 쿠키에 저장
          isAuthenticated.value = true; // 인증 성공
        } catch (error) {
          console.error('Authentication failed:', error);
          isAuthenticated.value = false; // 인증 실패
        }
      }
    };
    // 로그아웃
    const handleSignOut = () => {
      console.log('logout');
      Cookies.remove('authKey'); // 쿠키 삭제
      isAuthenticated.value = false; // 인증 상태 업데이트
      router.push('/'); // 홈 페이지로 이동
    };

    onMounted(() => {
      document.addEventListener('click', clickHandler)
      document.addEventListener('keydown', keyHandler)
      checkAuthentication();
    })

    onUnmounted(() => {
      document.removeEventListener('click', clickHandler)
      document.removeEventListener('keydown', keyHandler)
    })
    return {
      popupOpen,
      authKey,
      isAuthenticated,
      openPopup,
      closePopup,
      submitAuthKey,
      UserAvatar,
            dropdownOpen,
            trigger,
            dropdown,
      handleSignOut,
    };
  },
};
</script>

<style scoped>
/* 기존 스타일 유지 */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  background-color: #1a202c;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.popup-header {
  position: relative;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.popup-body {
  margin-top: 20px;
}



button:active,
input:active {
  background-color: #2b2b2b;
}
</style>