<template>
  <div class="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
    <header class="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
      <h2 class="font-semibold text-gray-800 dark:text-gray-100">Final Fantasy XIV</h2>
    </header>
    <div class="p-3">
      <!-- 로딩 중 상태 -->
      <div v-if="loading" class="text-center text-gray-600">로딩 중...</div>
      <!-- 에러 메시지 -->
      <div v-if="error" class="text-center text-red-600">{{ error }}</div>

      <!-- 테이블 -->
      <div class="overflow-x-auto" v-if="!loading && jsonData">
        <table class="table-auto w-full dark:text-gray-300">
          <thead class="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm">
            <tr>
              <th class="p-2">
                <div class="font-semibold text-left">소식</div>
              </th>
              <th class="p-2">
                <div class="font-semibold text-center">날짜</div>
              </th>
            </tr>
          </thead>
          <tbody class="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
            <tr v-for="(item, index) in jsonData" :key="index">
              <td class="p-2">
                <div class="flex items-center">
                  <div class="text-gray-800 dark:text-gray-100">{{ item.Text }}</div>
                </div>
              </td>
              <td class="p-2">
                <div class="text-center">{{ item.Date }}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { useMaplestoryStore } from '/src/stores/MaplestoryStore';

export default {
  name: 'MaplestoryDashboard',
  computed: {
    jsonData() {
      return this.MaplestoryStore.jsonData;
    },
    loading() {
      return this.MaplestoryStore.loading;
    },
    error() {
      return this.MaplestoryStore.error;
    },
  },
  methods: {
    async fetchJsonData() {
      await this.MaplestoryStore.fetchJsonData();
    },
  },
  created() {
    this.fetchJsonData();
  },
  setup() {
    const MaplestoryStore = useMaplestoryStore();

    return {
      MaplestoryStore,
    };
  },
};
</script>