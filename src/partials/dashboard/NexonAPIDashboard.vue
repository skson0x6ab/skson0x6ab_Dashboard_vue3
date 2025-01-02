<template>
<!-- 심볼 테이블 -->
  <div class="bg-white dark:bg-gray-800 shadow-sm rounded-xl mb-6 mx-4">
    <div class="p-3 mb-6">
      <!-- Custom Symbol 테이블 -->
      <div v-if="selectedCharacter" class="overflow-x-auto">
        <table class="table-auto w-full dark:text-gray-300">
          <thead class="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/60 rounded-sm">
            <tr>
              <th class="p-2">Symbol Name</th>
              <th class="p-2">Symbol Count</th>
            </tr>
          </thead>
          <tbody class="text-sm divide-y divide-gray-100 dark:divide-gray-700">
            <tr v-for="(symbol, index) in selectedCharacter.custom_symbol" :key="index">
              <td class="p-2">{{ symbol.symbol_name }}</td>
              <td class="p-2">
                <div v-if="symbol.symbol_name.includes('아케인')">
                  {{ calculateArcane(symbol) }} : 2679
                </div>
                <div v-if="symbol.symbol_name.includes('어센틱')">
                  {{ calculateAuthentic(symbol) }} : 4565
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
<!-- 캐릭터 테이블 -->
  <div class="bg-white dark:bg-gray-800 shadow-sm rounded-xl mb-6 mx-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-1">
      <div
        v-for="(character, index) in characters"
        :key="character.ocid"
        class="bg-white dark:bg-gray-700 shadow-lg rounded-xl p-4 min-w-[0px] flex flex-col cursor-pointer mb-1 mx-1 mt-1"
        @click="selectCharacter(character)"
      >
        <header class="flex justify-between items-center mb-2">
          <!-- 이미지 불러오기 -->
        </header>
        <div class="font-semibold text-gray-400 mb-1">
          {{ character.character_level }} <br />
          {{ character.character_class }}
        </div>
      </div>
    </div>
  </div>



  <!-- 장비 테이블 -->
  <div class="bg-white dark:bg-gray-800 shadow-sm rounded-xl mb-6 mx-4">
    <div class="p-3 mb-6">
      <!-- Item Equipment 테이블 -->
      <div v-if="selectedCharacter" class="overflow-x-auto">
        <table class="table-auto w-full dark:text-gray-300">
          <thead class="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/60 rounded-sm">
            <tr>
              <th class="p-1 text-center">Part</th>
              <th class="p-1 text-center">Item</th>
              <th class="p-1 text-center">Options</th>
              <th class="p-1 text-center">Options</th>
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
              <td class="p-1 text-center">
                <div v-if="item.additional_potential_option_1">str: {{ item.item_add_option.str }}</div>
                <div v-if="item.additional_potential_option_1">dex: {{ item.item_add_option.dex }}</div>
                <div v-if="item.additional_potential_option_1">int: {{ item.item_add_option.int }}</div>
                <div v-if="item.additional_potential_option_1">luk: {{ item.item_add_option.luk }}</div>
                <div v-if="item.additional_potential_option_1">all: {{ item.item_add_option.all_stat }}</div>
              </td>
              <td class="p-1 text-center">
                <div v-if="item.additional_potential_option_1">atk: {{ item.item_add_option.attack_power }}</div>
                <div v-if="item.additional_potential_option_1">mag: {{ item.item_add_option.magic_power }}</div>
                <div v-if="item.additional_potential_option_1">boss: {{ item.item_add_option.boss_damage }}</div>
                <div v-if="item.additional_potential_option_1">dmg: {{ item.item_add_option.damage }}</div>
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
    getArcaneMappedValue(level) {
      let mappedValue;
      switch (level) {
        case 1: mappedValue = 0;  break;
        case 2: mappedValue = 12; break;
        case 3: mappedValue = 27; break;
        case 4: mappedValue = 47; break;
        case 5: mappedValue = 74; break;
        case 6: mappedValue = 110; break;
        case 7: mappedValue = 157; break;
        case 8: mappedValue = 217; break;
        case 9: mappedValue = 292; break;
        case 10: mappedValue = 384; break;
        case 11: mappedValue = 495; break;
        case 12: mappedValue = 627; break;
        case 13: mappedValue = 782; break;
        case 14: mappedValue = 962; break;
        case 15: mappedValue = 1169; break;
        case 16: mappedValue = 1405; break;
        case 17: mappedValue = 1672; break;
        case 18: mappedValue = 1972; break;
        case 19: mappedValue = 2307; break;
        case 20: mappedValue = 2679; break;
        default: mappedValue = 0;
      }
      return mappedValue;
    },
    getAuthenticMappedValue(level) {
        let mappedValue;
        switch (level) {
          case 1: mappedValue = 0;  break;
          case 2: mappedValue = 29; break;
          case 3: mappedValue = 105; break;
          case 4: mappedValue = 246; break;
          case 5: mappedValue = 470; break;
          case 6: mappedValue = 795; break;
          case 7: mappedValue = 1239; break;
          case 8: mappedValue = 1820; break;
          case 9: mappedValue = 2556; break;
          case 10: mappedValue = 3465; break;
          case 11: mappedValue = 4565; break;
          default: mappedValue = 0;
        }
        return mappedValue;
    },
    calculateArcane(symbol) {
      const mappedValue = this.getArcaneMappedValue(symbol.symbol_level);
      return 2679 - (mappedValue + symbol.symbol_growth_count);
    },
    calculateAuthentic(symbol) {
      const mappedValue = this.getAuthenticMappedValue(symbol.symbol_level);
      return 4565 - (mappedValue + symbol.symbol_growth_count);
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