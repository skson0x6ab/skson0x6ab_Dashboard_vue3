<template>
  <div class="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
    <header class="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
      <h2 class="font-semibold text-gray-800 dark:text-gray-100">Zenless Zone Zero</h2>
    </header>
    <div class="p-3">
      <!-- 로딩 중 상태 -->
      <div v-if="loading" class="text-center text-gray-600">로딩 중...</div>
      <!-- 에러 메시지 -->
      <div v-if="error" class="text-center text-red-600">{{ error }}</div>

      <!-- 테이블 -->
      <div class="overflow-x-auto" v-if="!loading && originalCodes.length > 0">
        <table class="table-auto w-full dark:text-gray-300">
          <thead class="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm">
            <tr>
              <th class="p-2">
                <div class="font-semibold text-left">CodeRedeem</div>
              </th>
              <th class="p-2">
                <div class="font-semibold text-center">Action</div>
              </th>
            </tr>
          </thead>
          <tbody class="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
            <!-- activeCodes 배열 순회 -->
            <tr v-for="(code, index) in originalCodes" :key="index">
              <td class="p-2">
                <a :href="'https://zenless.hoyoverse.com/redemption?code=' + code" target="_blank" rel="noopener noreferrer">
                    <div class="flex items-center">
                        <div class="text-gray-800 dark:text-gray-100">
                            {{ code }}
                        </div>
                    </div>
               </a>
              </td>
              <td class="p-2">
                <div class="text-center">
                  <!-- 코드가 이미 사용된 코드에 없다면 추가 버튼 -->
                  <button
                    v-if="!isCodeUsed(code)"
                    @click="addCodeToUsed(code)"
                    class="bg-blue-500 text-white p-2 rounded"
                  >
                    Check Code
                  </button>
                  <span v-else class="text-green-600">Already Used</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 코드가 없으면 빈 메시지 표시 -->
      <div v-if="!loading && originalCodes.length === 0" class="text-center text-gray-600">
        No codes available.
      </div>
    </div>
  </div>
</template>

<script>
import { useZenlessCodeRedeemStore } from '/src/stores/ZenlessCodeRedeemStore'; // 원본 코드 데이터
import { useZenlessCodeRedeemStoreUsed } from '/src/stores/ZenlessCodeRedeemStoreUsed'; // 사용된 코드 데이터

export default {
  name: 'ZenlessCodeRedeemDashboard',
  computed: {
    // 원본 코드 데이터를 가져옴
    originalCodes() {
      return this.ZenlessCodeRedeemStore.jsonData.activeCodes || []; // jsonData가 없을 경우 빈 배열
    },
    // 사용된 코드 데이터를 가져옴
    usedCodes() {
      return this.ZenlessCodeRedeemStoreUsed.jsonData.activeCodes || []; // jsonData가 없을 경우 빈 배열
    },
    loading() {
      return this.ZenlessCodeRedeemStoreUsed.loading || this.ZenlessCodeRedeemStore.loading;
    },
    error() {
      return this.ZenlessCodeRedeemStoreUsed.error || this.ZenlessCodeRedeemStore.error;
    },
  },
  methods: {
    async fetchOriginalCodes() {
      await this.ZenlessCodeRedeemStore.fetchJsonData();
    },
    async fetchUsedCodes() {
      await this.ZenlessCodeRedeemStoreUsed.fetchJsonData();
    },
    // 코드가 이미 사용된 코드 목록에 있는지 확인
    isCodeUsed(code) {
      return this.usedCodes.includes(code);
    },
    // 사용된 코드에 추가
    async addCodeToUsed(code) {
      await this.ZenlessCodeRedeemStoreUsed.appendCode(code);
    },
  },
  created() {
    this.fetchOriginalCodes();
    this.fetchUsedCodes();
  },
  setup() {
    const ZenlessCodeRedeemStore = useZenlessCodeRedeemStore();
    const ZenlessCodeRedeemStoreUsed = useZenlessCodeRedeemStoreUsed();

    return {
      ZenlessCodeRedeemStore,
      ZenlessCodeRedeemStoreUsed,
    };
  },
};
</script>