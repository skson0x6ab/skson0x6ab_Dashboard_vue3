<template>
  <div class="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
    <header class="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
      <h2 class="font-semibold text-gray-800 dark:text-gray-100">Monitor</h2>
    </header>
    <div class="p-3">

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="table-auto w-full dark:text-gray-300">
          <thead class="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm">
            <tr>
              <th class="p-2">
                <div class="font-semibold text-left">Game</div>
              </th>
              <th class="p-2">
                <div class="font-semibold text-left">Update</div>
              </th>
            </tr>
          </thead>
          <tbody class="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
            <tr v-for="(item, index) in jsonData" :key="index">
              <td class="p-2">
                <div class="flex items-center">
                  <div class="text-gray-800 dark:text-gray-100">{{ item.name }}</div>
                </div>
              </td>
              <td class="p-2">
                <div class="flex items-center">
                  <div class="text-gray-800 dark:text-gray-100">{{ item.date }}</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { useMonitorStore } from '/src/stores/MonitorStore'; // Pinia store import

export default {
  name: 'MonitorDashboard',
  computed: {
    // Pinia store에서 데이터 가져오기
    jsonData() {
      return this.MonitorStore.jsonData;
    },
  },
  methods: {
    // Pinia store의 액션 호출
    async fetchJsonData() {
      await this.MonitorStore.fetchJsonData();
    },
  },
  created() {
    // 컴포넌트가 생성될 때 데이터를 가져옵니다.
    this.fetchJsonData();
  },
  setup() {
    const MonitorStore = useMonitorStore(); // Pinia store 인스턴스 가져오기

    return {
      MonitorStore,
    };
  },
};
</script>