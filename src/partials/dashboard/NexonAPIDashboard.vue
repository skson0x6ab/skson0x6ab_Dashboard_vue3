<template>
<!-- 테이블 1 -->
  <div class="bg-white dark:bg-gray-800 shadow-sm rounded-xl mb-6 mx-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="(character, index) in characters"
        :key="character.ocid"
        class="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4 min-w-[250px] flex flex-col cursor-pointer mb-6 mx-4 mt-4"
        @click="selectCharacter(character)"
      >
        <header class="flex justify-between items-center mb-2">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">{{ character.character_class }}</h2>
        </header>
        <div class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">
          Level: {{ character.character_level }}
        </div>
      </div>
    </div>
  </div>
<!-- 테이블 2 -->
  <div class="bg-white dark:bg-gray-800 shadow-sm rounded-xl mb-6 mx-4">
    <div class="p-3 mb-6">
      <!-- Table for Custom Symbol -->
      <div v-if="selectedCharacter" class="overflow-x-auto">
        <table class="table-auto w-full dark:text-gray-300">
          <thead class="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/60 rounded-sm">
            <tr>
              <th class="p-2 text-center">Symbol Name</th>
              <th class="p-2 text-center">Level</th>
              <th class="p-2 text-center">Growth Count</th>
            </tr>
          </thead>
          <tbody class="text-sm divide-y divide-gray-100 dark:divide-gray-700">
            <tr v-for="(symbol, index) in selectedCharacter.custom_symbol" :key="index">
              <td class="p-2 text-center">{{ symbol.symbol_name }}</td>
              <td class="p-2 text-center">{{ symbol.symbol_level }}</td>
              <td class="p-2 text-center">{{ symbol.symbol_growth_count }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

<!-- 테이블 3 -->
  <div class="bg-white dark:bg-gray-800 shadow-sm rounded-xl mb-6 mx-4">
    <div class="p-3 mb-6">
      <!-- Table for Item Equipment -->
      <div v-if="selectedCharacter" class="overflow-x-auto">
        <table class="table-auto w-full dark:text-gray-300">
          <thead class="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/60 rounded-sm">
            <tr>
              <th class="p-1 text-center">Part</th>
              <th class="p-1 text-center">Item</th>
              <th class="p-1 text-center">Options</th>
              <th class="p-1 text-center">Options</th>
              <th class="p-1 text-center">Golden Hammer Flag</th>
            </tr>
          </thead>
          <tbody class="text-sm divide-y divide-gray-100 dark:divide-gray-700">
            <tr v-for="(item, index) in selectedCharacter.item_equipment" :key="index">
              <td class="p-1 text-center">{{ item.item_equipment_part }}</td>
              <td class="p-1 text-center">{{ item.item_name }}</td>
              <td class="p-1 text-center">
                <div v-if="item.potential_option_1">{{ item.potential_option_1 }}</div>
                <div v-if="item.potential_option_2">{{ item.potential_option_2 }}</div>
                <div v-if="item.potential_option_3">{{ item.potential_option_3 }}</div>
              </td>
              <td class="p-1 text-center">
                <div v-if="item.additional_potential_option_1">{{ item.additional_potential_option_1 }}</div>
                <div v-if="item.additional_potential_option_2">{{ item.additional_potential_option_2 }}</div>
                <div v-if="item.additional_potential_option_3">{{ item.additional_potential_option_3 }}</div>
              </td>
              <td class="p-1 text-center">{{ item.golden_hammer_flag }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { useNexonAPIMaplestoryStore } from '/src/stores/NexonAPIMaplestoryStore';

export default {
  name: 'NexonAPIMaplestoryDashboard',
  data() {
    return {
      characters: [], // API에서 가져온 캐릭터 데이터
      selectedCharacter: null, // 선택된 캐릭터
    };
  },
  methods: {
 async fetchJsonData() {
    try {
      // 데이터를 가져오기
      await this.NexonAPIMaplestory.fetchJsonData();

      // jsonData의 구조 확인 및 캐릭터 리스트 처리
      if (this.NexonAPIMaplestory.jsonData && Array.isArray(this.NexonAPIMaplestory.jsonData)) {
        this.characters = this.NexonAPIMaplestory.jsonData;
        console.log('Fetched Characters:', this.characters);
      } else {
        console.warn('No valid characters found in jsonData');
        this.characters = [];
      }
    } catch (error) {
      console.error('Failed to fetch JSON data:', error);
      this.characters = [];
    }
  },
    selectCharacter(character) {
      this.selectedCharacter = character;
    },
  },
  created() {
    this.fetchJsonData();
  },
  setup() {
    const NexonAPIMaplestory = useNexonAPIMaplestoryStore();

    return {
      NexonAPIMaplestory,
    };
  },
};
</script>