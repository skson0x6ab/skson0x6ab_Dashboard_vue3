<template>
  <div>
    <div class="relative inline-flex">
      <button
        ref="trigger"
        class="w-8 h-8 flex items-center justify-center hover:bg-gray-100 lg:hover:bg-gray-200 dark:hover:bg-gray-700/50 dark:lg:hover:bg-gray-800 rounded-full"
        :class="{ 'bg-gray-200 dark:bg-gray-800': dropdownOpen }"
        aria-haspopup="true"
        @click.prevent="dropdownOpen = !dropdownOpen"
        :aria-expanded="dropdownOpen"
      >
        <span class="sr-only">Notifications</span>
        <svg class="fill-current text-gray-500/80 dark:text-gray-400/80" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 0a7 7 0 0 0-7 7c0 1.202.308 2.33.84 3.316l-.789 2.368a1 1 0 0 0 1.265 1.265l2.595-.865a1 1 0 0 0-.632-1.898l-.698.233.3-.9a1 1 0 0 0-.104-.85A4.97 4.97 0 0 1 2 7a5 5 0 0 1 5-5 4.99 4.99 0 0 1 4.093 2.135 1 1 0 1 0 1.638-1.148A6.99 6.99 0 0 0 7 0Z" />
          <path d="M11 6a5 5 0 0 0 0 10c.807 0 1.567-.194 2.24-.533l1.444.482a1 1 0 0 0 1.265-1.265l-.482-1.444A4.962 4.962 0 0 0 16 11a5 5 0 0 0-5-5Zm-3 5a3 3 0 0 1 6 0c0 .588-.171 1.134-.466 1.6a1 1 0 0 0-.115.82 1 1 0 0 0-.82.114A2.973 2.973 0 0 1 11 14a3 3 0 0 1-3-3Z" />
        </svg>
      </button>
      <transition
        enter-active-class="transition ease-out duration-200 transform"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-out duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-show="dropdownOpen" class="origin-top-right z-10 absolute top-full -mr-48 sm:mr-0 min-w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 py-1.5 rounded-lg shadow-lg overflow-hidden mt-1">
          <div class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase pt-1.5 pb-2 px-4">Enter your Auth Key</div>
          <ul ref="dropdown" @focusin="dropdownOpen = true" @focusout="dropdownOpen = false">
            <li class="border-b border-gray-200 dark:border-gray-700/60 last:border-0">
              <input
                v-model="authKey"
                type="text"
                placeholder="Enter Auth Key"
                class="w-full px-4 py-2 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                @keyup.enter="submitAuthKey"
              />
            </li>
            <li class="border-b border-gray-200 dark:border-gray-700/60 last:border-0">
              <button
                class="w-full py-2 px-4 text-white bg-blue-500 rounded-md mt-2"
                @click="submitAuthKey"
              >
                Authenticate
              </button>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { authenticateUser } from '/src/utils/login.js';
import { setCookie } from '/src/utils/Cookies';

export default {
  setup() {
    const authKey = ref('');
    const dropdownOpen = ref(false);

    const submitAuthKey = async () => {
      try {
        await authenticateUser(authKey.value);
        setCookie('authKey', authKey.value, 1);  // 쿠키에 인증키 저장
      } catch (error) {
        alert('Authentication failed!');
      }
    };

    return {
      authKey,
      dropdownOpen,
      submitAuthKey,
    };
  },
};
</script>