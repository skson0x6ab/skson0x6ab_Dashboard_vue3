<template>
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
            <li v-if="!isAuthenticated" class="border-b border-gray-200 dark:border-gray-700/60 last:border-0">
              <input
                v-model="authKey"
                type="text"
                placeholder="Enter Auth Key"
                class="w-full px-4 py-2 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                @keyup.enter="submitAuthKey"
              />
            </li>
            <li v-if="!isAuthenticated" class="border-b border-gray-200 dark:border-gray-700/60 last:border-0">
              <button class="w-full py-2 px-4 text-white bg-blue-500 rounded-md mt-2" @click="submitAuthKey">
                Authenticate
              </button>
            </li>

            <li v-if="isAuthenticated" class="text-green-500 text-sm mt-2 px-4">
              You are authenticated and the auth key is saved in cookie.
            </li>
            <li v-else class="text-red-500 text-sm mt-2 px-4">
              Please enter the authentication key to authenticate.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ref } from 'vue';
import { authenticateUser } from '/src/utils/login.js'; // 클라이언트용 login.js

export default {
  name: 'AuthKeyPopup',
  props: ['popupOpen', 'isAuthenticated'],
  emits: ['update:popupOpen', 'update:isAuthenticated'],
  setup(props, { emit }) {
    const authKey = ref('');

    const submitAuthKey = async () => {
      if (authKey.value) {
        try {
          await authenticateUser(authKey.value); // 쿠키에 저장
          emit('update:isAuthenticated', true); // 인증 성공
          emit('update:popupOpen', false); // 팝업 닫기
        } catch (error) {
          console.error('Authentication failed:', error);
          emit('update:isAuthenticated', false); // 인증 실패
        }
      }
    };

    const closePopup = () => {
      emit('update:popupOpen', false);
    };

    return {
      authKey,
      submitAuthKey,
      closePopup
    };
  }
};
</script>

<style scoped>
/* 전체 화면을 덮는 배경 */
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

/* 팝업 내용 */
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

/* 닫기 버튼 스타일 */
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.popup-header {
  text-align: right;
}

.popup-body {
  padding-top: 10px;
}
</style>